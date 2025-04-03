import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const result_1 = await prisma.opponent.create({
    data: {
      name: 'Flamengo'
    }
  })

  const result_2 = await prisma.opponent.create({
    data: {
      name: 'Grêmio'
    }
  })

  const result_3 = await prisma.opponent.create({
    data: {
      name: 'Caxias'
    }
  })

  const result_4 = await prisma.opponent.create({
    data: {
      name: 'Monsoon'
    }
  })

  const result_5 = await prisma.opponent.create({
    data: {
      name: 'São Luiz'
    }
  })

  const result_6 = await prisma.opponent.create({
    data: {
      name: 'Brasil de Pelotas'
    }
  })

  const result_7 = await prisma.opponent.create({
    data: {
      name: 'Avenida'
    }
  })

  const result_8 = await prisma.opponent.create({
    data: {
      name: 'São José'
    }
  })

  const result_9 = await prisma.opponent.create({
    data: {
      name: 'Juventude'
    }
  })

  const result_10 = await prisma.opponent.create({
    data: {
      name: 'Guarany de Bagé'
    }
  })

  console.log({ result_1, result_2, result_3, result_4, result_5, result_6, result_7, result_8, result_9, result_10 })
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