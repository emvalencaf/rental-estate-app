"use client";

// next tools
import dynamic from "next/dynamic";

// hooks
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

// hoook form
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

// custom hooks
import { useRentModal } from "../../../hooks";

// custom components
import { CategoryInput, Counter, CountrySelect, CustomInput, Heading, ImageUpload } from "../..";

// custom modals
import { Modal } from "..";

// constants
import { categories } from "../../../constants";

// utils
import axios from "axios";
import { toast } from "react-hot-toast";

// enums
import { STEPS } from "../../../enums";

const RentModal: React.FC = () => {

    // navigator controller
    const router = useRouter();

    // rent modal controller
    const rentModal = useRentModal();

    // states
    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);

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
            bathroomCount: 1,
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
    const imageSrc = watch('imageSrc');


    const Map = useMemo(() => dynamic(() => import("../../../components/Map"), {
        ssr: false,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [location]);

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        });
    }

    // navigate between steps on creating a listing
    const onBack = () => setStep((value) => value - 1);

    const onNext = () => setStep((value) => value + 1);

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.PRICE) return onNext();

        setIsLoading(true);

        axios.post('/api/listings', data)
            .then(() => {
                toast.success('Listing created!');
                router.refresh();
                reset();
                setStep(STEPS.CATEGORY);
                rentModal.onClose();
            })
            .catch(() => {
                toast.error('Something went on wrong');
            })
            .finally(() => setIsLoading(false));
    }

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
        <div className="flex flex-col gap-8">
            <Heading
                title="Which of these best describes your place?"
                subtitle="Pick a category"
            />
            <div
                className="
              grid 
              grid-cols-1 
              md:grid-cols-2 
              gap-3
              max-h-[50vh]
              overflow-y-auto
            "
            >
                {categories.map((item) => (
                    <div key={item.label} className="col-span-1">
                        <CategoryInput
                            onClick={(category) =>
                                setCustomValue('category', category)}
                            selected={category === item.label}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    )


    if (step === STEPS.LOCATION) bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Where is your place located?"
                subtitle="Help guests find you!"
            />
            <CountrySelect
                value={location}
                onChange={(value) => setCustomValue('location', value)}
            />
            <Map center={location?.latlng} />
        </div>
    );

    if (step === STEPS.INFO) bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Share some basics about your place"
                subtitle="What amenitis do you have?"
            />
            <Counter
                onChange={(value) => setCustomValue('guestCount', value)}
                value={guestCount}
                title="Guests"
                subtitle="How many guests do you allow?"
            />
            <hr />
            <Counter
                onChange={(value) => setCustomValue('roomCount', value)}
                value={roomCount}
                title="Rooms"
                subtitle="How many rooms do you have?"
            />
            <hr />
            <Counter
                onChange={(value) => setCustomValue('bathroomCount', value)}
                value={bathroomCount}
                title="Bathrooms"
                subtitle="How many bathrooms do you have?"
            />
        </div>
    );

    if (step === STEPS.IMAGES) bodyContent = (
        <div
            className="flex flex-col gap-8"
        >
            <Heading
                title='Add a photo of your place'
                subtitle="Show guests what your place looks like!"
            />
            <ImageUpload
                value={imageSrc}
                onChange={(value) => setCustomValue('imageSrc', value)}
            />
        </div>
    );

    if (step === STEPS.DESCRIPTION) bodyContent = (
        <div
            className="flex flex-col gap-8"
        >
            <Heading
                title="How would you describe your place?"
                subtitle="Short and sweet works best!"
            />
            <CustomInput
                id="title"
                label="Title"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <hr />
            <CustomInput
                id="description"
                label="Description"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    );

    if (step === STEPS.PRICE) bodyContent = (
        <div
            className="flex flex-col gap-8"
        >
            <Heading
                title="Now, set your price"
                subtitle="How much do you charge per night?"
            />
            <CustomInput
                id="price"
                label="Price"
                formatPrice
                type="number"
                disabled={isLoading}
                errors={errors}
                register={register}
                required
            />
        </div>
    );


    return (
        <Modal
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            title="Airbnb your home!"
            body={bodyContent}
        />
    );
}

export default RentModal;