import { useForm } from "@inertiajs/react";
import InputLabel from "../../../Components/InputLabel";
import { Transition } from "@headlessui/react";
import PrimaryButton from "../../../Components/PrimaryButton";
import { GameProps } from "@/types";

export default function GameImageUpload({game, className=''}:{
    game: GameProps,
    className?: string
}){

    const { data, setData, delete: destroy, post, processing, recentlySuccessful } = useForm<any>({
        image: undefined
    }); 

    const handleUpload = (e:any) => {
        e.preventDefault();
        post(route('game.image.store', game.id));
    };

    const handleDelete = (e:any) => {
        e.preventDefault();
        let c = confirm("Confirm image delete:\n" + game.title);
        if (c === true) {
            destroy(route('game.image.delete', game.id));
        }
    }

    return (
        <>
            <div>
                {game.image && 
                    <div className="flex items-center justify-center">
                        <img className="w-full max-w-3xl gap-4" src={'/storage/assets/images/games/'+game.image}/>
                    </div>
                }
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
                    <PrimaryButton disabled={processing} className="bg-purple-800">
                        {game.image? <>Update Image</> : <>Upload Image</>}
                    </PrimaryButton> 
                    {game.image && 
                        <PrimaryButton 
                            disabled={processing} 
                            className="ml-3 bg-red-600"
                            onClick={handleDelete}
                        >
                            Delete Image
                        </PrimaryButton> 
                    }
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
