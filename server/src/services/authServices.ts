import { PrismaClient, type User } from "@prisma/client";
import bcrypt from "bcryptjs";
import createError from "http-errors";

const prisma = new PrismaClient();

export async function check_user_existence(_username: string, _email: string) {
  const username_is_existing = Boolean(
    await prisma.user.findUnique({ where: { email: _email } })
  );
  const mail_is_existing = Boolean(
    await prisma.user.findUnique({ where: { username: _username } })
  );

  if (username_is_existing || mail_is_existing) {
    const errors: { username?: string; email?: string } = {};

    if (username_is_existing)
      errors.username = "This username is already taken.";
    if (mail_is_existing) errors.email = "This email is already registered.";

    return errors;
  }
  return null;
}

export async function getUserIdByEmail(_email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: _email,
    },
  });

  if (!user) {
    throw createError.Unauthorized("Invalid credentials");
  }

  return user.id;
}

export async function create_user(
  username: string,
  email: string,
  password: string
): Promise<User> {
  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync());

  const data = await prisma.user.create({
    data: {
      email: email,
      username: username,
      password: hashedPassword,
    },
  });

  return data;
  // TOKEN IS MISSING
}

export async function login_user(email: string, password: string) {
  const user: User | null = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw createError.Unauthorized("Invalid credentials");
  }
  if (!user.email || !user.password || !user.username) {
    throw createError.InternalServerError("Internal server error");
  }

  const check_password: boolean = bcrypt.compareSync(password, user.password);
  if (!check_password) {
    throw createError.Unauthorized("Invalid credentials");
  }

  return {
    email: user.email,
    username: user.username,
  };
}
