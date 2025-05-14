import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { ShoppingImageProps, ShoppingItemProps } from "@/types/shopping";
import ShoppingImageDisplay from "./ShoppingImageDisplay";

export function ImageModal({shoppingItem, image, className}:{
  shoppingItem: ShoppingItemProps;
  image: ShoppingImageProps;
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  return (
    <>
      <img
        src={'/storage/assets/images/shopping/' + image.name}
        alt={image.name}
        className={"inline object-center cursor-pointer " + className}
        onClick={() => handleOpen("xl")}
      />
      <Dialog 
        size="xl" 
        open={open} 
        handler={handleOpen}
      >
        <DialogHeader className="text-green-900">{shoppingItem.title}</DialogHeader>
        <DialogBody>
          <ShoppingImageDisplay
            shoppingItem={shoppingItem}
          />
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