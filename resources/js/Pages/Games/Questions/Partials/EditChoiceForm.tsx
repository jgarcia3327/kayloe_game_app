import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { ChoiceProps } from '@/types';
import { useForm, useFieldArray } from 'react-hook-form';

export default function EditChoiceForm({choices, className=''}:{
    choices: ChoiceProps;
    className?: string;
}) {

    type FormValues = {
        choice: ChoiceProps[];
    }

    const { register, setValue, formState: { errors }, handleSubmit, watch, control} = useForm<FormValues>({
        defaultValues: {
            choice: choices
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
            <h2 className="text-lg font-medium text-gray-900">Edit Choices</h2>

            {fields.map((field, index) => {
                return (
                    <div key={field.id} className="mt-3">
                        <hr className="mb-6"/>
                        <button className="float-right" type="button" onClick={() => remove(index)}>
                            [ Remove ]
                        </button>
                        <div>
                            <InputLabel htmlFor={`choice.${index}.description`} value="Description" />
                            <input {...register(`choice.${index}.description`)} className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 mt-1 block w-full"/>
                            <input {...register(`choice.${index}.id`)} type="hidden"/>
                        </div>
            
                        <div>
                            <InputLabel htmlFor={`choice.${index}.image`} value="Image"/>
                            <input {...register(`choice.${index}.image`)} className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 mt-1 block w-full"/>
                        </div> 
            
                        <div className="mt-2">
                            <InputLabel htmlFor={`choice.${index}.is_correct`} value="Is Correct?" className="inline" />
                            <input {...register(`choice.${index}.is_correct`)} type="checkbox" className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 ml-3"/>
                        </div>
                    </div>
                )
            })}

                <div className="mt-3 flex items-center gap-4">
                    <PrimaryButton 
                    onClick={(e) => { e.preventDefault(); append()}}
                    >
                        Add choices
                    </PrimaryButton> 
                </div>
        </section>
    );
}


