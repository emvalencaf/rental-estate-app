"use client";

// hooks
import { useMemo, useState } from "react";

// custom hooks
import { useRentModal } from "../../../hooks";

// custom components
import Heading from "../../Heading";

// custom modals
import { Modal } from "..";

// constants
import { categories } from "../../../constants";

// enums
import { STEPS } from "../../../enums";
import { CategoryInput } from "../..";
import { FieldValues, useForm } from "react-hook-form";

const RentModal: React.FC = () => {
    
    // rent modal controller
    const rentModal = useRentModal();
    
    // states
    const [step, setStep ] = useState(STEPS.CATEGORY);

    // forms states
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroom: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: '',
        },
    });

    const category = watch('category');

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        });
    }

    // navigate between steps on creating a listing
    const onBack = () => setStep((value) => value -1);

    const onNext = () => setStep((value) => value + 1);

    // dynamic changing the button to navigate between steps
    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) return 'Create';

        return 'Next';
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) return undefined;

        return 'Back';
    }, [step]);


    let bodyContent = (
        <div
            className="flex flex-col gap-8"
        >
            <Heading
                title="Which of these best describes your place?"
                subtitle="Pick a category"
            />
            <div
                className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto"
            >
                {
                    categories.map((item) => (
                        <div
                            key={item.label}
                            className="col-span-1"
                        >
                            <CategoryInput
                                onClick={(category) => setCustomValue('category', category)}
                                selected={category === item.label}
                                label={item.label}
                                icon={item.icon}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )

    return (
        <Modal
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={rentModal.onClose}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            title="Airbnb your home!"
        />
    );
}

export default RentModal;