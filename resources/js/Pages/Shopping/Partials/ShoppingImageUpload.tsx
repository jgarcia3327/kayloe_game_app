import { useForm } from "@inertiajs/react";
import InputLabel from "../../../Components/InputLabel";
import { Transition } from "@headlessui/react";
import PrimaryButton from "../../../Components/PrimaryButton";
import ShoppingImageDisplay from "./ShoppingImageDisplay";
import { ShoppingItemProps } from "@/types/shopping";

export default function ShoppingImageUpload({shoppingItem, className=''}:{
    shoppingItem: ShoppingItemProps
    className?: string
}){

    const { data, setData, delete: destroy, post, processing, recentlySuccessful } = useForm<any>({
        image: undefined
    }); 

    const handleUpload = (e:any) => {
        e.preventDefault();
        post(route('shopping.image.store', shoppingItem.id));
        data.image = undefined;
    };

    

    return (
        <>
            <div>
                <ShoppingImageDisplay shoppingItem={shoppingItem} isOwner={true}/>
            </div>
            <form onSubmit={handleUpload} className={"mt-6 space-y-6 " + className} encType="multipart/form-data">
                <div>
                    <InputLabel htmlFor="image" value="Image" />

                    <input
                        type="file"
                        id="image"
                        className="mt-1 block w-full mb-2"
                        accept="image/png, image/gif, image/jpeg"
                        onChange={(e) => {
                            setData('image', e.target.files?.[0]);
                        }}
                    />
                    
                    <PrimaryButton disabled={data.image? false : true} className="bg-purple-800">
                        Upload Image
                    </PrimaryButton> 
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Uploaded.</p>
                    </Transition>
                </div>
            </form>
        </>
    )
}
