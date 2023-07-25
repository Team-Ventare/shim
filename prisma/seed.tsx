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

const products = [
  {
    name: "Niltrate 10mg",
    amount: 100,
    location: "A1",
    type: "CONSMABLE_SUPPLIES",
  },
  {
    name: "Nursing Bed",
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
];

const purchaseRequests = [
  {
    title: "Latex Gloves",
    priority: "HIGH",
  },
  {
    title: "Neddles",
    priority: "MEDIUM",
    status: "APPROVED",
  },
  {
    title: "Scrubs",
    priority: "LOW",
    status: "REJECTED",
  },
  {
    title: "Syringes",
    priority: "HIGH",
    status: "BACKLOG",
  },
];

const suppliers = [
  {
    name: "Amazon",
    address: "123 Amazon Way",
    phone: "123-456-7890",
    email: "order@amazon.com",
    website: "https://www.amazon.com",
    notes: "",
  },
  {
    name: "Walmart",
    address: "123 Walmart Way",
    phone: "123-456-7890",
    email: "order@walmart.com",
    website: "https://www.walmart.com",
  },
  {
    name: "Target",
    address: "123 Target Way",
    phone: "123-456-7890",
    email: "help@target.com",
    website: "https://www.target.com",
  },
];

async function main() {
  console.log(`Start seeding ...`);

  const password = await hash("password", 12);
  for (const u of users) {
    const user = await prisma.users.create({
      data: {
        email: u.email,
        name: u.name,
        role: u.role,
        password: password,
        cart: {
          create: {},
        },
      },
    });
    console.log(`Created user with id: ${user.id}`);
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
