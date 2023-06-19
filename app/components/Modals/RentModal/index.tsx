"use client";

// next tools
import dynamic from "next/dynamic";

// hooks
import { useMemo, useState } from "react";

// hoook form
import { FieldValues, useForm } from "react-hook-form";

// custom hooks
import { useRentModal } from "../../../hooks";

// custom components
import { CategoryInput, Counter, CountrySelect, Heading } from "../..";


// custom modals
import { Modal } from "..";

// constants
import { categories } from "../../../constants";

// enums
import { STEPS } from "../../../enums";

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
    const location = watch('location');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');

    const Map = useMemo(() => dynamic(() => import("../../../components/Map"), {
        ssr: false,
    }), [location]);

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
    );

    if (step === STEPS.LOCATION) bodyContent = (
        <div
            className="flex flex-col gap-8"
        >
            <Heading
                title="Where is your place located?"
                subtitle="Help guests find you!"
            />
            <CountrySelect
                onChange={(value) => setCustomValue('location', value)}
                value={location}
            />
            <Map
                center={location?.latlng}
            />
        </div>
    );

    if (step === STEPS.INFO) bodyContent = (
        <div
            className="flex flex-col gap-8"
        >
            <Heading
                title="Share some basics about your place"
                subtitle="What amenities do you have?"
            />
            <Counter
                title="Guests"
                subtitle="How many guests do you allow?"
                value={guestCount}
                onChange={(value) => setCustomValue('guestCount', value)}
            />
            <hr />
            <Counter
                title="Rooms"
                subtitle="How many rooms do you have?"
                value={roomCount}
                onChange={(value) => setCustomValue('roomCount', value)}
            />
            <hr />
            <Counter
                title="Bathrooms"
                subtitle="How many bathrooms do you have?"
                value={bathroomCount}
                onChange={(value) => setCustomValue('bathroomCount', value)}
            />
        </div>
    );

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