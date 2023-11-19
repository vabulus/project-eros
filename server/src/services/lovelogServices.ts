import { PrismaClient } from "@prisma/client";
import {decrypt_access_token} from "../utils/jwt";
import {getUserIdByEmail} from "./authServices";

const prisma = new PrismaClient();

export async function getAllLovelogs(request: any) {
  try {
    const userId = await getUserIdByEmail(decrypt_access_token(request.headers.authorization).email);

    return prisma.loveLog.findUnique({
      where: { id: userId }
    });
  }
  catch (e) {
    console.log(e);
  }
}
export async function getLovelog(request: any) {

}

export async function getLoveLogTemplateFromDB(id: number) {
  return prisma.template.findUnique({
    where: { id: id },
    include: {
      Question: {
        include: {
          QuestionHelp: true,
        },
      },
    },
  });
}

export async function createLoveLog(request: any) {
  try {
    const userId = await getUserIdByEmail(decrypt_access_token(request.headers.authorization).email);

    return prisma.loveLog.create({
      data: {
        author: {
          connect: { id: userId },
        },
        template: {
          connect: { id: request.body.templateId },
        },
        answers: {
          createMany: {
            data: request.body.answers.map((answer: { response: any; questionId: any }) => ({
              response: answer.response,
              questionId: answer.questionId,
            })),
          },
        },
      },
    });

  }
  catch (e) {
      console.log(e);
  }

  return "success";
}