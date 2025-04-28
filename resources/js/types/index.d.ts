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
    question_count: number;
    is_active: boolean;
}

export type GameProps = Game;
export type PlayedGameProps = Game & {
    game_id: number;
    author_user_id: number;
    guest_user_id: number;
};

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

export interface PlayedQuestion {
    map(arg0: (played_question: PlayedQuestionProps) => JSX.Element): import("react").ReactNode;
    id: number;
    played_game_id: number;
    question_id: number;
    question: string;
    image: string;
    correct_percent: number;
}

export type PlayedQuestionProps = PlayedQuestion;

export interface PlayedChoice {
    map(arg0: (played_choice: PlayedChoiceProps) => JSX.Element): import("react").ReactNode;
    id: number;
    played_question_id: number;
    choice_id: number;
    description: string;
    image: string;
    is_correct: boolean;
    is_answer: boolean;
}

export type PlayedChoiceProps = PlayedChoice;

export type PlayedQuestionsWithChoicesProps = {
    playedQuestion: PlayedQuestionProps;
    playedChoices: PlayedChoiceProps;
}

export interface Score {
    map(arg0: (score: ScoreProps) => JSX.Element): import("react").ReactNode;
    id: number;
    played_game_id: number;
    game_id: number;
    user_id: number;
    score: number;
    question_count: number;
    is_passed: boolean;
    created_at: Date;
}

export type ScoreProps = Score;

export type PlayedGamesWithQuesionsAndChoicesProps = {
    score: ScoreProps;
    playedGame: PlayedGameProps;
    playedQuestionsWithChoices: [PlayedQuestionsWithChoicesProps];
}
