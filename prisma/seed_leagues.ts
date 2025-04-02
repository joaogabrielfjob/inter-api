import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const result_1 = await prisma.league.create({
    data: {
      name: 'Campeonato Gaúcho'
    }
  })

  const result_2 = await prisma.league.create({
    data: {
      name: 'Campeonato Brasileiro'
    }
  })

  const result_3 = await prisma.league.create({
    data: {
      name: 'Copa do Brasil'
    }
  })

  const result_4 = await prisma.league.create({
    data: {
      name: 'Copa Libertadores'
    }
  })

  console.log({ result_1, result_2, result_3, result_4 })
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