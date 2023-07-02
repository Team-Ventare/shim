import { hash } from "bcrypt";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const users = [
  {
    email: "nmoreland18@outlook.com",
    name: "Nicholas Moreland",
    role: "ADMIN",
  },
  {
    email: "enobong.mbosowo@gmail.com",
    name: "Enobong Mbosowo",
    role: "ADMIN",
  },
  {
    email: "alexisbarragan@gmail.com",
    name: "Alexis Barragan",
    role: "ADMIN",
  },
  {
    email: "coronabryan2002@gmail.com",
    name: "Bryan Corona",
    role: "ADMIN",
  },
  {
    email: "dev.henrytran@gmail.com",
    name: "Henry Tran",
    role: "ADMIN",
  },
];

const inventory = [
  {
    name: "Niltrate 10mg",
    amount: 100,
    location: "A1",
    type: "CONSMABLE_SUPPLIES",
  },
  {
    name: "Niltrate 20mg",
    amount: 100,
    location: "A1",
    type: "CONSMABLE_SUPPLIES",
  },
  {
    name: "Dell Computer",
    amount: 10,
    location: "A1",
    type: "COMPUTERS",
  },
  {
    name: "IV Arm",
    amount: 10,
    location: "A1",
    type: "SIMULATION_EQUIPMENT",
    status: "CHECKED_OUT",
  },
  {
    name: "Beds",
    amount: 10,
    location: "B2",
    type: "MEDICAL_FURNITURE",
    status: "CHECKED_OUT",
  },
  {
    name: "Surgical Tools",
    amount: 10,
    location: "B2",
    type: "NONCONSUMABLE_SUPPLIES",
  },
  {
    name: "Surgical Gloves",
    amount: 100,
    location: "B2",
    type: "CONSMABLE_SUPPLIES",
  },
];

async function main() {
  console.log(`Start seeding ...`);

  const password = await hash("password", 12);
  for (const u of users) {
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        email: u.email,
        name: u.name,
        role: u.role,
        password: password,
      },
    });
    console.log(`Created user with id: ${user.id}`);
  }

  for (const i of inventory) {
    const item = await prisma.inventory.create({
      data: {
        name: i.name,
        amount: i.amount,
        location: i.location,
        type: i.type,
        status: i.status,
      },
    });
    console.log(`Created item with id: ${item.id}`);
  }

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
