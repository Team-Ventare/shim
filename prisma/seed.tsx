import { hash } from "bcrypt";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const users = [
  {
    email: "nmoreland18@outlook.com",
    name: "Nicholas Moreland",
    role: "Admin",
  },
  {
    email: "enobong.mbosowo@gmail.com",
    name: "Enobong Mbosowo",
    role: "Admin",
  },
  {
    email: "alexisbarragan@gmail.com",
    name: "Alexis Barragan",
    role: "Admin",
  },
  {
    email: "coronabryan2002@gmail.com",
    name: "Bryan Corona",
    role: "Admin",
  },
  {
    email: "dev.henrytran@gmail.com",
    name: "Henry Tran",
    role: "Admin",
  },
];

const suppliers = [
  {
    name: "Toby Eddy Tedd",
    title: "TBD",
    vendor: "AED Superstore",
    email: "TBD",
  },
  {
    name: "Toby Eddy Tedd",
    title: "TBD",
    vendor: "CAE",
    email: "TBD",
  },
  {
    name: "Toby Eddy Tedd",
    title: "TBD",
    vendor: "Diamedical",
    email: "TBD",
  },
  {
    name: "Toby Eddy Tedd",
    title: "TBD",
    vendor: "Double Robotics",
    email: "TBD",
  },
  {
    name: "Toby Eddy Tedd",
    title: "TBD",
    vendor: "Enasco",
    email: "TBD",
  },
  {
    name: "Toby Eddy Tedd",
    title: "TBD",
    vendor: "Gaumard",
    email: "TBD",
  },
  {
    name: "Toby Eddy Tedd",
    title: "TBD",
    vendor: "Global Industrial",
    email: "TBD",
  },
  {
    name: "Toby Eddy Tedd",
    title: "TBD",
    vendor: "Laerdal",
    email: "TBD",
  },
  {
    name: "Toby Eddy Tedd",
    title: "TBD",
    vendor: "Limbs and Things",
    email: "TBD",
  },
  {
    name: "Toby Eddy Tedd",
    title: "TBD",
    vendor: "Medline",
    email: "TBD",
  },
  {
    name: "Toby Eddy Tedd",
    title: "TBD",
    vendor: "PocketNurse",
    email: "TBD",
  },
  {
    name: "Toby Eddy Tedd",
    title: "TBD",
    vendor: "Simulab",
    email: "TBD",
  },
  {
    name: "Toby Eddy Tedd",
    title: "TBD",
    vendor: "Surgireal",
    email: "TBD",
  },
  {
    name: "Toby Eddy Tedd",
    title: "TBD",
    vendor: "Wallcur",
    email: "TBD",
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
