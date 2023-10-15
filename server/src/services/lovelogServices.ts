import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export async function getLoveLogTemplateFromDB(id: number) {
    return prisma.template.findUnique({
        where: { id: id },
        include: {
            Question: {
                include: {
                    QuestionHelp: true
                }
            }
        }
    });
}
