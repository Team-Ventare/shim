const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const users = [
  {
    name: "Admin",
    email: "inventoryadmin@gmail.com",
    purchaseRequest: {
      create: [
        {
          requestDate: new Date(),
          requestStatus: "Pending",
          requestItems: {
            create: [
              {
                item: {
                  create: {
                    itemName: "Laptop",
                    itemDescription: "Laptop",
                    itemPrice: 1000,
                    itemQuantity: 10,
                    itemCategory: "Electronics",
                    itemStatus: "Available",
                  },
                },
                quantity: 10,
              },
            ],
          },
        },
      ],
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);

  for (const u of users) {
    const user = await prisma.user.create({
      data: u,
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
