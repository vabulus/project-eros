import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function get_user_details(username: string, _email: string) {
  return prisma.user.findUnique({
    where: {
      email: _email,
    },
    select: { email: true, username: true },
  });
}
