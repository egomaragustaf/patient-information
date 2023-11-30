import { prisma } from "~/libs/db.server"

async function main() {
    await prisma.user.create({
        data: {
            name: "Ego Maragustaf",
            email: "egomaragustaf@gmail.com",
            username: "egomaragustaf",
        }
    })    
}

main()
  .then(async () => {
    console.info("🔵 Seeding complete")
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    console.error("🔴 Seeding failed")
    await prisma.$disconnect()
    process.exit(1)
  })
