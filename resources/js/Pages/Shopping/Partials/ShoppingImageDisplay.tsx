import { ShoppingImageProps, ShoppingItemProps } from "@/types/shopping";
import { ImageDeleteModal } from "./ImageDeleteModal";
import { Carousel, IconButton } from "@material-tailwind/react";
import { ImageModal } from "./ImageModal";

export default function ShoppingImageDisplay({shoppingItem, isOwner, className}:{
    shoppingItem: ShoppingItemProps;
    isOwner: Boolean | false;
    className?: string
}) {

    return (
        <Carousel 
          className="rounded-xl"
          loop={true}
          navigation={({ setActiveIndex, activeIndex, length }) => (
              <div className="absolute bottom-3 left-2/4 z-50 flex -translate-x-2/4 gap-3">
                {new Array(length).fill("").map((_, i) => (
                  <span
                    key={i}
                    className={`shadow-md block h-2 cursor-pointer rounded-2xl transition-all content-[''] ${
                      activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                    }`}
                    onClick={() => setActiveIndex(i)}
                  />
                ))}
              </div>
            )}
            prevArrow={({ handlePrev }) => (
              <IconButton
                variant="text"
                color="white"
                size="lg"
                onClick={handlePrev}
                className="!absolute top-2/4 left-4 -translate-y-2/4 shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  />
                </svg>
              </IconButton>
            )}
            nextArrow={({ handleNext }) => (
              <IconButton
                variant="text"
                color="white"
                size="lg"
                onClick={handleNext}
                className="!absolute top-2/4 !right-4 -translate-y-2/4 shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </IconButton>
            )}
        >
            {shoppingItem.shopping_images?.map((image:ShoppingImageProps) => 
              <div 
                key={image.id}
                className="relative h-full w-full text-center object-center bg-gray-600 place-items-center"
              >
                {/* <img
                    src={'/storage/assets/images/shopping/' + image.name}
                    alt={"image " + index}
                    className={"inline object-center " + className}
                /> */}
                <ImageModal 
                  shoppingItem={shoppingItem}
                  image={image}
                  className={className}               
                />
                {isOwner && (
                  <div className="absolute inset-0 grid h-full w-full">
                    <div className="w-3/4">
                      <div className="mt-3 ml-3 flex gap-2">
                        <ImageDeleteModal
                          image={image}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
        </Carousel>
    )
}