import { JSX } from "react/jsx-runtime";

export interface ShoppingItem {
    map(arg0: (shoppingItem: ShoppingItemProps) => JSX.Element): import("react").ReactNode;
    id: number;
    title: string;
    description: string;
    user_id: number;
    ticket_count: number;
    ticket_price: number;
    item_price: number;
    draw_date: Date;
    expire_date: Date;
    draw_option: number;
    is_active: boolean;
    shopping_images?: [ShoppingImageProps];
    shopping_tickets?: [ShoppingTicketProps];
    shopping_draws?: [ShoppingDrawProps];
}
export type ShoppingItemProps = ShoppingItem;

export type ShoppingImageProps = {
    id: number;
    name: string;
}

export type ShoppingTicketProps = {
    id: number;
    uuid: string;
}

export type ShoppingDrawProps = {
    id: number;
    shopping_ticket_id: number;
}