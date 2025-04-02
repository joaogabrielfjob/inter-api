import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const result_1 = await prisma.result.create({
    data: {
      identifier: "642c1",
      opponent: "Guarany de Bagé",
      location: "Estrela d'Alva (Bagé, RS)",
      league: "CAMPEONATO GAÚCHO",
      date: "2025-01-22T03:00:00.000Z",
      emblem: "https://www.placardefutebol.com.br/images/teams/guarany-de-bage.png",
      interGoals: 2,
      opponentGoals: 2
    }
  })

  const result_2 = await prisma.result.create({
    data: {
      identifier: "4bc47",
      opponent: "Juventude",
      location: "Beira-Rio (Porto Alegre, RS)",
      league: "CAMPEONATO GAÚCHO",
      date: "2025-01-25T03:00:00.000Z",
      emblem: "https://www.placardefutebol.com.br/images/teams/juventude.png",
      interGoals: 2,
      opponentGoals: 0
    }
  })

  const result_3 = await prisma.result.create({
    data: {
      identifier: "ccb21",
      opponent: "São José",
      location: "Passo d'Areia (Porto Alegre, RS)",
      league: "CAMPEONATO GAÚCHO",
      date: "2025-01-28T03:00:00.000Z",
      emblem: "https://www.placardefutebol.com.br/images/teams/sao-jose-rs.png",
      interGoals: 2,
      opponentGoals: 0
    }
  })

  const result_4 = await prisma.result.create({
    data: {
      identifier: "55464",
      opponent: "Avenida",
      location: "Beira-Rio (Porto Alegre, RS)",
      league: "CAMPEONATO GAÚCHO",
      date: "2025-02-02T03:00:00.000Z",
      emblem: "https://www.placardefutebol.com.br/images/teams/avenida.png",
      interGoals: 1,
      opponentGoals: 0
    }
  })

  const result_5 = await prisma.result.create({
    data: {
      identifier: "26711",
      opponent: "Brasil de Pelotas",
      location: "Beira-Rio (Porto Alegre, RS)",
      league: "CAMPEONATO GAÚCHO",
      date: "2025-02-05T03:00:00.000Z",
      emblem: "https://www.placardefutebol.com.br/images/teams/brasil-de-pelotas.png",
      interGoals: 3,
      opponentGoals: 0
    }
  })

  const result_6 = await prisma.result.create({
    data: {
      identifier: "6ccb7",
      opponent: "Grêmio",
      location: "Arena do Grêmio (Porto Alegre, RS)",
      league: "CAMPEONATO GAÚCHO",
      date: "2025-02-08T03:00:00.000Z",
      emblem: "https://www.placardefutebol.com.br/images/teams/gremio.png",
      interGoals: 1,
      opponentGoals: 1
    }
  })

  const result_7 = await prisma.result.create({
    data: {
      identifier: "53b54",
      opponent: "São Luiz",
      location: "19 de Outubro (Ijuí, RS)",
      league: "CAMPEONATO GAÚCHO",
      date: "2025-02-12T03:00:00.000Z",
      emblem: "https://www.placardefutebol.com.br/images/teams/sao-luiz-rs.png",
      interGoals: 3,
      opponentGoals: 1
    }
  })

  console.log({ result_1, result_2, result_3, result_4, result_5, result_6, result_7 })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })