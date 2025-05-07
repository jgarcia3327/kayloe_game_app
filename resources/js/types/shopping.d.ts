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
    is_active: boolean;
    shopping_images?: [ShoppingImageProps]
}
export type ShoppingItemProps = ShoppingItem;

export type ShoppingImageProps = {
    id: number;
    name: string;
}