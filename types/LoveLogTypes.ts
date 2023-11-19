export type LoveLogTemplate = {
    id: number;
    name: string;
    description: string;
    Question: Array<{
        id: number;
        text: string;
        text_short: string;
        QuestionHelp: Array<{
            id: number;
            text: string;
            questionId: number;
        }>;
    }>;
};


export type LoveLogAnswer = {
    id: number;
    answers: Array<{
        id: number;
        text: string;
    }>;
    userID: number;
}
