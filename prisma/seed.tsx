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
    checkedOut: {},
  },
  {
    name: "Nursing Bed",
    amount: 100,
    location: "A1",
    type: "CONSMABLE_SUPPLIES",
    checkedOut: {},
  },
  {
    name: "Dell Computer",
    amount: 10,
    location: "A1",
    type: "COMPUTERS",
    checkedOut: {},
  },
];

const purchaseRequest = [
  {
    userId: "ce9d9155-0d37-44cd-a967-9b34822b55d9",
    name: "Latex Gloves",
    category: "CONSMABLE_SUPPLIES",
    price: 50,
  },
  {
    userId: "9fa1ff90-7b45-4b7a-a441-f20f549550e5",
    name: "Neddles",
    category: "CONSMABLE_SUPPLIES",
    price: 100,
    status: "APPROVED",
  },
  {
    userId: "101fe5a6-f439-4a66-b382-77aef57a3ab0",
    name: "Scrubs",
    category: "OTHER",
    price: 300,
    status: "REJECTED",
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
    notes: "",
  },
];

async function main() {
  console.log(`Start seeding ...`);

  const password = await hash("password", 12);
  for (const u of users) {
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: {
        name: u.name,
        role: u.role,
        password: password,
      },
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
      },
    });
    console.log(`Created item with id: ${item.id}`);
  }

  for (const p of purchaseRequest) {
    const purchase = await prisma.purchaseRequest.create({
      data: {
        name: p.name,
        category: p.category,
        price: p.price,
        status: p.status,
        user: {
          connect: { id: p.userId },
        },
      },
    });
    console.log(`Created purchase request with id: ${purchase.id}`);
  }

  for (const s of suppliers) {
    const supplier = await prisma.suppliers.create({
      data: {
        name: s.name,
        address: s.address,
        phone: s.phone,
        email: s.email,
        website: s.website,
        notes: s.notes,
      },
    });
    console.log(`Created supplier with id: ${supplier.id}`);
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
