import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    // Create a sample user
    const user = await prisma.user.create({
        data: {
            email: "alice@example.com",
            username: "alice",
            password: "hashed_password_for_alice", // Remember to hash passwords in real-world scenarios
        },
    });

    // Create a template with questions
    const fight_template = await prisma.template.create({
        data: {
            name: "Fight Template",
            description: "A sample fight template for demonstration",
            Question: {
                create: [
                    {
                        text: "Was war der Auslöser für den Streit?",
                        text_short: "Auslöser",
                        QuestionHelp: {
                            create: [
                                { text: "Missverständnisse" },
                                { text: "Eifersucht" },
                                { text: "Finanzielle Probleme" },
                                { text: "Unterschiedliche Meinungen" },
                                { text: "Mangelnde Kommunikation" },
                                { text: "Kulturelle Unterschiede" },
                                { text: "Vergangene Verletzungen" },
                                { text: "Unausgesprochene Erwartungen" },
                                { text: "Unterschiedliche Werte und Prioritäten" },
                                { text: "Mangelnder Respekt" }
                            ]
                        }
                    },
                    {
                        text: "Wie habe ich mich während des Streits gefühlt?",
                        text_short: "Gefühle",
                        QuestionHelp: {
                            create: [
                                { text: "Missverständnisse" },
                                { text: "Eifersucht" },
                                { text: "Finanzielle Probleme" },
                                { text: "Unterschiedliche Meinungen" },
                                { text: "Mangelnde Kommunikation" },
                                { text: "Kulturelle Unterschiede" },
                                { text: "Vergangene Verletzungen" },
                                { text: "Unausgesprochene Erwartungen" },
                                { text: "Unterschiedliche Werte und Prioritäten" },
                                { text: "Mangelnder Respekt" }
                            ]
                        }
                    },
                ],
            },
        },
    });



    // Assuming PrismaClient and other required imports are already in the file
    // type AnswerMap = {
    //     [key: string]: string;
    // };
    //
    // const aliceAnswers: AnswerMap = {
    //     "Was war der A für den Streit?": "We had a disagreement about chores.",
    //     "Wie habe ich mich während des Streits gefühlt?": "I felt frustrated and unheard.",
    // };
    //
    // const alice = await prisma.user.findUnique({
    //     where: { email: "alice@example.com" }
    // });
    //
    // if (alice) {
    //     // Retrieve the Fight Template by name and its associated questions
    //     const fightTemplate = await prisma.template.findFirst({
    //         where: { name: "Fight Template" },
    //         include: { Question: true }
    //     });
    //
    //     if (fightTemplate) {
    //         const loveLog = await prisma.loveLog.create({
    //             data: {
    //                 author: { connect: { id: alice.id } },
    //                 template: { connect: { id: fightTemplate.id } },
    //                 answers: {
    //                     create: fightTemplate.Question.filter(question => aliceAnswers[question.text as keyof typeof aliceAnswers] !== undefined).map(question => ({
    //                         response: aliceAnswers[question.text as keyof typeof aliceAnswers],
    //                         question: { connect: { id: question.id } }
    //                     }))
    //                 }
    //             },
    //             include: { answers: true }
    //         });
    //         console.log("LoveLog with answers created:", loveLog);
    //     } else {
    //         console.error("Fight Template not found!");
    //     }
    // } else {
    //     console.error("User Alice not found!");
    // }


}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
