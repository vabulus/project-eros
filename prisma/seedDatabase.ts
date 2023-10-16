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
                { text: "Mangelnder Respekt" },
              ],
            },
          },
          {
            text: "Wie habe ich mich während des Streits gefühlt?",
            text_short: "Gefühle",
            QuestionHelp: {
              create: [
                { text: "f" },
                { text: "a" },
                { text: "a Probleme" },
                { text: "d Meinungen" },
                { text: "d Kommunikation" },
                { text: "c Unterschiede" },
                { text: "v Verletzungen" },
                { text: "a Erwartungen" },
                { text: "d Werte und Prioritäten" },
                { text: "f Respekt" },
              ],
            },
          },
        ],
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
