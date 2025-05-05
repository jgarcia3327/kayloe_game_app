import { ShoppingImageProps } from "@/types/shopping";
import { Carousel } from "@material-tailwind/react"

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
        <Carousel 
            className="rounded-xl"
            navigation={({ setActiveIndex, activeIndex, length }) => (
                <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                  {new Array(length).fill("").map((_, i) => (
                    <span
                      key={i}
                      className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                        activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                      }`}
                      onClick={() => setActiveIndex(i)}
                    />
                  ))}
                </div>
              )}
        >
            {shoppingImages && shoppingImages.map((i:ShoppingImageProps, index) => 
                <img
                    key={i.id}
                    src={'/storage/assets/images/shopping/' + i.name}
                    alt={"image " + index}
                    className="max-h-96 max-w-3xl object-contain"
                />
            )}
        </Carousel>
    )
}