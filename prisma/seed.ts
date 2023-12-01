import { prisma } from "~/libs/db.server";
import dataPatients from "./seed-data/patients.json";

async function main() {
  await seedUsers();
  await seedPatients();
}

async function seedUsers() {
  const deletedUsers = await prisma.user.deleteMany();
  console.info(`🟡 Deleted Users: ${deletedUsers.count} users`);

  const createdUser = await prisma.user.create({
    data: {
      firstName: "John",
      lastName: "Doe",
      gender: "Male",
      dateOfBirth: "1980-05-15",
      contactNumber: "+62 812-3456-7890",
      email: "john.doe@email.com",
      locations: {
        create: {
          street: "Jl. Utama No. 123",
          city: "Jakarta",
          province: "DKI Jakarta",
          postalCode: "12345",
          countryCode: "ID",
        },
      },
    },
  });
  console.info(`🟢 Created User: ${createdUser} user`);
}

async function seedPatients() {
  const deletedPatients = await prisma.patient.deleteMany();
  console.info(`🟡 Deleted Patients: ${deletedPatients.count} patients`);

  const deletedPatientsLocation = await prisma.patientLocation.deleteMany();
  console.info(
    `🟡 Deleted Patients Location: ${deletedPatientsLocation.count} patients`
  );

  for (const patients of dataPatients) {
    const newPatients = await prisma.patient.create({
      data: {
        firstName: patients.firstName,
        lastName: patients.lastName,
        gender: patients.gender,
        dateOfBirth: patients.dateOfBirth,
        contactNumber: patients.contactNumber,
        email: patients.email,
        locations: {
          create: {
            street: patients.locations.street,
            city: patients.locations.city,
            province: patients.locations.province,
            postalCode: patients.locations.postalCode,
            countryCode: patients.locations.countryCode,
          },
        },
      },
    });
    console.info(`🟢 Created Patients: ${newPatients} patients`);
  }
}

main()
  .then(async () => {
    console.info("🔵 Seeding complete");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    console.error("🔴 Seeding failed");
    await prisma.$disconnect();
    process.exit(1);
  });
