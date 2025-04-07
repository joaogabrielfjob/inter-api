import puppeteer from 'puppeteer'
import { Match } from '../../domain/match/match_entity.js'
import { nanoid } from '../../utils/nanoid.js'
import { MatchRepository } from '../../domain/match/match_repository.js'
import { Scraped } from './types.js'

export class ScrapingMatches {

  constructor(private readonly repo: MatchRepository) { }

  async do(): Promise<number> {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    const url = "https://www.placardefutebol.com.br/time/internacional/proximos-jogos"

    await page.goto(url)

    const scraped = await page.evaluate(() => {
      const matches = document.querySelectorAll('div.match__lg_card')
  
      return Array.from(matches).map((match) => {
        const home = match.querySelector<HTMLElement>('div.match__lg_card--ht-name')!.innerText
        const away = match.querySelector<HTMLElement>('div.match__lg_card--at-name')!.innerText
        
        const isInternacionalHome = home === 'Internacional'
        const emblemSufix = isInternacionalHome ? 'at' : 'ht'

        const opponent = isInternacionalHome ? away : home
        const league = match.querySelector<HTMLElement>('div.match__lg_card--league')!.innerText
        const emblem = match.querySelector<HTMLImageElement>(`div.match__lg_card--${emblemSufix}-logo img`)!.src
  
        const dateElement = match.querySelector<HTMLElement>('div.match__lg_card--datetime')!
        const dateText = dateElement.childNodes.item(0).textContent!.trim().split(', ')[1]
        const timeText = dateElement.childNodes.item(2).textContent!.trim()
  
        const [day, month] = dateText.split('/')
        const [hour, minute] = timeText.split(':')
  
        const matchPage = (match.parentElement as HTMLLinkElement).href
  
        return { opponent, league, emblem, matchPage, month, day, hour, minute }
      })
    })

    for (const match of scraped as Scraped[]) {
      await page.goto(match.matchPage)

      const location = await page.evaluate(() => {
        const details = document.querySelector<HTMLElement>('div.match-details')!.querySelectorAll('p')
        const location = details[1].innerText
  
        return location
      })

      const year = new Date().getFullYear()

      match.date = new Date(year, Number(match.month) - 1, Number(match.day), Number(match.hour), Number(match.minute))
      match.location = location
    }
  
    await browser.close()

    const output = this.persist(scraped)

    return output
  }

  async persist(scraped: Scraped[]) {
    this.deletePreviousMatches()

    const matches: Match[] = []

    for (const input of scraped) {
      const identifier = nanoid()

      const match: Match = {
        identifier,
        opponent: input.opponent,
        location: input.location!,
        league: input.league,
        date: input.date!,
        emblem: input.emblem
      }

      matches.push(match)
    }

    const output = await this.repo.createMany(matches)

    return output ?? 0
  }

  /* 
    remove previously stored matches 
    to avoid duplication or inconsistencies 
    due to updates in match data
  */
  deletePreviousMatches = async () => await this.repo.deleteAll()
}