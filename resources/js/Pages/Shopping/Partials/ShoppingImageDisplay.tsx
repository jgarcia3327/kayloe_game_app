import { ShoppingImageProps } from "@/types/shopping";


export default function ShoppingImageDisplay({shoppingImages}:{
    shoppingImages?: [ShoppingImageProps]
}) {

    const handleDelete = (e:any) => {
        e.preventDefault();
        let c = confirm("Confirm image delete:\n");
        if (c === true) {
            // TODO
            // destroy(route('shopping.image.delete', shoppingItem.id));
        }
    }

    return (
        <>
            {shoppingImages && shoppingImages.map((i:ShoppingImageProps) => 
                <div key={i.id}>
                    <img src={'/storage/assets/images/shopping/' + i.name} />
                </div>
            )}
        </>
    )
}