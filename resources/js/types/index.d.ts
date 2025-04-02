import { JSX } from "react/jsx-runtime";

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    is_admin: number;
}

export interface Game {
    map(arg0: (game: GameProps) => JSX.Element): import("react").ReactNode;
    id: number;
    user_id: number;
    title: string;
    description: string;
    image: string;
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

export type GameProps = Game;

export type HomeProps = {
    auth: PagePropsProps;
    games: GameProps;
}
