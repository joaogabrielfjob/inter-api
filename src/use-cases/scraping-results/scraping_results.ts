import puppeteer from 'puppeteer'
import { Match } from '../../domain/match/match_entity.js'
import { nanoid } from '../../utils/nanoid.js'
import { ResultRepository } from '../../domain/result/result_repository.js'
import { Scraped } from './types.js'
import { Result } from '../../domain/result/result_entity.js'

export class ScrapingResults {

  constructor(private readonly repo: ResultRepository) { }

  async do(): Promise<number> {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    const url =  process.env.RESULTS_URL!

    await page.goto(url)

    const scraped = await page.evaluate(() => {
      const results = document.querySelectorAll('div.match__lg_card')
  
      return Array.from(results).map((result) => {
        const home = result.querySelector<HTMLElement>('div.match__lg_card--ht-name')!.innerText
        const away = result.querySelector<HTMLElement>('div.match__lg_card--at-name')!.innerText
        
        const isInternacionalHome = home === 'Internacional'
        const emblemSufix = isInternacionalHome ? 'at' : 'ht'

        const opponent = isInternacionalHome ? away : home
        const league = result.querySelector<HTMLElement>('div.match__lg_card--league')!.innerText
        const emblem = result.querySelector<HTMLImageElement>(`div.match__lg_card--${emblemSufix}-logo img`)!.src
  
        const dateElement = result.querySelector<HTMLElement>('div.match__lg_card--date')!
        const dateText = dateElement.childNodes.item(0).textContent!.trim().split(', ')[1]
        const [day, month] = dateText.split('/')
  
        const matchPage = (result.parentElement as HTMLLinkElement).href

        const goals = result.querySelectorAll<HTMLElement>('div.match__lg_card--scoreboard b')

        const interGoals = isInternacionalHome ? goals[0].innerText : goals[1].innerText
        const opponentGoals = isInternacionalHome ? goals[1].innerText : goals[0].innerText
  
        return { opponent, league, emblem, matchPage, month, day, interGoals, opponentGoals }
      })
    })

    for (const result of scraped as Scraped[]) {
      await page.goto(result.matchPage)

      const location = await page.evaluate(() => {
        const details = document.querySelector<HTMLElement>('div.match-details')!.querySelectorAll('p')
        const location = details[details.length - 1]!.innerText
  
        return location
      })

      const year = new Date().getFullYear()

      result.date = new Date(year, Number(result.month) - 1, Number(result.day))
      result.location = location
    }
  
    await browser.close()

    const output = this.persist(scraped)

    return output
  }

  async persist(scraped: Scraped[]) {
    const results: Result[] = []

    for (const input of scraped) {
      const identifier = nanoid()

      const result: Result = {
        identifier,
        opponent: input.opponent,
        location: input.location!,
        league: input.league,
        date: input.date!,
        emblem: input.emblem,
        interGoals: Number(input.interGoals),
        opponentGoals: Number(input.opponentGoals)
      }

      results.push(result)
    }

    const output = await this.repo.createMany(results)

    return output ?? 0
  }
}