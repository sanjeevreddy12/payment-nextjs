import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt";
const prisma = new PrismaClient()

async function main() {
  const alice = await prisma.user.upsert({
    where: { number: '4444444444' },
    update: {},
    create: {
      number: '4444444444',
      password: await bcrypt.hash('alice', 10),
      name: 'alice1',
      Balance: {
        create: {
            amount: 20000,
            locked: 0
        }
      },
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "success",
          amount: 2000000,
          token: "token__1",
          provider: "HDFC Bank",
        },
      },
    },
  })
  const bob = await prisma.user.upsert({
    where: { number: '3333333333' },
    update: {},
    create: {
      number: '3333333333',
      password: await bcrypt.hash('bob', 10),
      name: 'bob1',
      Balance: {
        create: {
            amount: 2000000,
            locked: 0
        }
      },
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "failure",
          amount: 2000,
          token: "token__2",
          provider: "HDFC Bank",
        },
      },
    },
  })
  console.log({ alice, bob })
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