import { JSX } from "react/jsx-runtime";

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    is_admin: number;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};

export type AuthProps = { 
    user: User; 
}

export interface Game {
    map(arg0: (game: GameProps) => JSX.Element): import("react").ReactNode;
    id: number;
    user_id: number;
    title: string;
    description: string;
    image: string;
    passing_percent: number;
    time_in_sec: number;
}

export type GameProps = Game;

export type HomeProps = {
    auth: PagePropsProps;
    games: GameProps;
}

export interface Question {
    map(arg0: (question: QuestionProps) => JSX.Element): import("react").ReactNode;
    id: number;
    game_id: number;
    question: string;
    image: string;
    correct_percent: number;
}

export type QuestionProps = Question;

export interface Choice {
    map(arg0: (choice: ChoiceProps) => JSX.Element): import("react").ReactNode;
    id: number;
    question_id: number;
    description: string;
    image: string;
    is_correct: boolean;
}

export type ChoiceProps = Choice;

export type QuestionsWithChoicesProps = {
    question: QuestionProps;
    choices: ChoiceProps;
}
