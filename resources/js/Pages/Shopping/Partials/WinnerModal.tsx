import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { ShoppingItemProps } from "@/types/shopping";

export function WinnerModal({shoppingItem, btnText}:{
  shoppingItem: ShoppingItemProps;
  btnText: string;
}) {
  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);

  const winningTicket = (ticketId:number) => shoppingItem.shopping_tickets?.find(ticket => ticket.id === ticketId);
 
  return (
    <>
      <Button onClick={handleOpen} variant="gradient"  className="text-sm from-orange-400 to-orange-900">
        {btnText}
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className="text-green-900">Winning ticket</DialogHeader>
        <DialogBody>
          {shoppingItem.shopping_draws?.map((shoppingDraw: ShoppingDrawProps) => 
            <ul>
              <li key={shoppingDraw.id}>
                <h3 className="text-3xl bold text-center tracking-wider">
                  {winningTicket(shoppingDraw.shopping_ticket_id)?.uuid}
                </h3>
              </li>
            </ul>
          )}
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="gray" onClick={handleOpen}>
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}