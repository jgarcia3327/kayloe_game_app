import { useForm } from "@inertiajs/react";
import InputLabel from "../../../Components/InputLabel";
import { Transition } from "@headlessui/react";
import PrimaryButton from "../../../Components/PrimaryButton";
import { GameProps } from "@/types";

export default function GameImageUpload({game, className=''}:{
    game: GameProps,
    className?: string
}){

    const { data, setData, post, processing, recentlySuccessful } = useForm({
        image : null
    }); 

    const imageUploadHandler = (e:any) => {
        e.preventDefault();
        post(route('game.image.store', game.id));
    };

    return (
        <form onSubmit={imageUploadHandler} className={"mt-6 space-y-6 " + className} encType="multipart/form-data">
            <div>
                <InputLabel htmlFor="image" value="Image" />

                <input
                    type="file"
                    id="image"
                    className="mt-1 block w-full mb-2"
                    accept="image/png, image/gif, image/jpeg"
                    onChange={(e) => {
                        if (e.target.files && e.target.files[0])
                            setData('image', e.target.files[0]);
                    }}
                />
                <PrimaryButton disabled={processing} className="bg-purple-800">Upload Image</PrimaryButton> 
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
    )
}
