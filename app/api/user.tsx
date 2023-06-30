import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";
import { GetResult } from "@prisma/client/runtime";

// POST /api/user
// Required fields in body: name, email
export default async function handler(
  req: { body: any },
  res: {
    json: (
      arg0: GetResult<
        {
          id: string;
          createdAt: Date;
          updatedAt: Date;
          email: string;
          name: string;
          role: Role;
        },
        any
      > & {}
    ) => void;
  }
) {
  const result = await prisma.user.create({
    data: {
      ...req.body,
    },
  });
  res.json(result);
}
