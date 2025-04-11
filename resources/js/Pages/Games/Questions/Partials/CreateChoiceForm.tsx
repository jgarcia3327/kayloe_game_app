import Checkbox from '@/Components/Checkbox';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm, useFieldArray } from 'react-hook-form';

export default function CreateChoiceForm({className=''}) {

    type FormValues = {
        choice: {
            description: string;
            image: string;
            is_correct: boolean;
        }[];
    }

    const { register, setValue, formState: { errors }, handleSubmit, watch, control} = useForm<FormValues>({
        defaultValues: {
            choice: [{
                description: "description",
                image: "image",
                is_correct: false
            }]
        }
    });

    const {fields, append, remove} = useFieldArray({
        name: "choice",
        control,
        rules: {
        required: "Please append at least 1 item"
        }
    });

    return (
        <section className={'max-w-full bg-gray-300 border-transparent border-8 rounded-md ' + className}>
            <h2 className="text-lg font-medium text-gray-900">Choices</h2>

            {fields.map((field, index) => {
                return (
                    <div key={field.id} className="mt-3">
                        <hr className="mb-6"/>
                        <button className="float-right" type="button" onClick={() => remove(index)}>
                            [ Remove ]
                        </button>
                        <div>
                            <InputLabel htmlFor={`choice-${index}-description`} value="Description" />
                            <TextInput
                                id={`choice-${index}-description`}
                                name={`choice.${index}.description`}
                                className="mt-1 block w-full"
                                required={true}
                            />
                        </div>
            
                        <div>
                            <InputLabel htmlFor={`choice-${index}-image`} value="Image" />
            
                            <TextInput
                                id={`choice-${index}-image`}
                                name={`choice.${index}.image`}
                                className="mt-1 block w-full"
                            />
                        </div> 
            
                        <div className="mt-2">
                            <InputLabel htmlFor={`choice-${index}-is_correct`} value="Is Correct?" className="inline" />
                            <Checkbox
                                id={`choice-${index}-is_correct`}
                                name={`choice.${index}.is_correct`}
                                className="ml-3"
                            />
                        </div>
                    </div>
                )
            })}

                <div className="mt-3 flex items-center gap-4">
                    <PrimaryButton 
                    onClick={() => append({
                        description: "description here",
                        image:"image here",
                        is_correct: false
                    })}
                    >
                        Add choices
                    </PrimaryButton> 
                </div>
        </section>
    );
}


