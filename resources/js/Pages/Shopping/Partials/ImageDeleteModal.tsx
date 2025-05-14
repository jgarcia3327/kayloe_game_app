import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useForm } from "@inertiajs/react";
import { ShoppingImageProps } from "@/types/shopping";

export function ImageDeleteModal({image}:{
  image: ShoppingImageProps;
}) {
  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);

  const { delete: destroy, processing } = useForm({
              // 
  });

  const handleImageDelete = () => {
    destroy(route('shopping.image.delete', image.id));
    handleOpen;
  }
 
  return (
    <>
      <Button onClick={handleOpen} variant="gradient"  className="from-red-400 to-red-900">
        Delete image
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Confirm delete.</DialogHeader>
        <DialogBody>
          Are you sure you want to delete {image.name}?
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleImageDelete}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}