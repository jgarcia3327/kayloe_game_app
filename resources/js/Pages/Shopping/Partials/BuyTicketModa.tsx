import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { ShoppingItemProps } from "@/types/shopping";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";

export function BuyTicketModal({shoppingItem, btnText, className}:{
  shoppingItem: ShoppingItemProps;
  btnText: string;
  className?: string;
}) {
  const [open, setOpen] = React.useS
  const handleOpen = () => setOpen(!open);

  const { post, processing } = useForm({
              //
  });
 
  return (
    <>
      <Button onClick={handleOpen} variant="gradient"  className={"text-sm from-orange-400 to-orange-900 " + className}>
        {btnText}
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className="text-green-900">{shoppingItem.title} - Ticket</DialogHeader>
        <DialogBody>
          <div className="inline pr-6">Buy {parseInt(shoppingItem.ticket_price.toString())} credit</div>
          <PrimaryButton 
              className="cursor-pointer col-span-1 text-center bg-green-600 rounded-md text-white" 
              onClick={() => {
                post(route("ticket.buy", shoppingItem.id), {preserveScroll: true}); 
                setOpen(!open)
              }}
              disabled={processing}
          >
              Buy ticket
          </PrimaryButton>
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