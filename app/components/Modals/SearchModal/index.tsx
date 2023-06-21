'use client';

// hooks
import { useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// custom hooks
import { useSearchModal } from "../../../hooks";

// custom components
import { Calendar, Counter, Heading } from "../..";

// custom modals
import { Modal } from "..";

// enums
import { SEARCH_STEPS } from "../../../enums";

// next tools
import dynamic from "next/dynamic";

// query-string tools
import qs from 'query-string';

// interfaces
import CountrySelect, { CountrySelectValue } from "../../CountrySelect";
import { formatISO } from "date-fns";
import { Range } from "react-date-range";

const SearchModal: React.FC = () => {

    // search modal controller
    const searchModal = useSearchModal();

    // navigation controller
    const router = useRouter();

    //params
    const params = useSearchParams();

    // states
    const [location, setLocation] = useState<CountrySelectValue>()
    const [step, setStep] = useState(SEARCH_STEPS.LOACTION);
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);
    const [dateRange,setDateRange] = useState<Range>(
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        },
    );

    const Map = useMemo(() => dynamic(() => import('../../Map'), {
        ssr: false,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [location]);

    const onBack = useCallback(() => {
        setStep((value) => value - 1);
    }, []);

    
    const onNext = useCallback(() => {
        setStep((value) => value + 1);
    }, []);

    const onSubmit = useCallback(async () => {
        if (step !== SEARCH_STEPS.INFO) return onNext();

        let currentQuery = {};

        if (params) currentQuery = qs.parse(params.toString());

        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount,
            bathroomCount,
        };

        if (dateRange.startDate) updatedQuery.startDate = formatISO(dateRange.startDate);

        if (dateRange.endDate) updatedQuery.endDate = formatISO(dateRange.endDate);


        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery,
        }, { skipNull: true });

        setStep(SEARCH_STEPS.LOACTION);

        searchModal.onClose();

        router.push(url);
    }, [step, onNext, params, location?.value, guestCount, roomCount, bathroomCount, dateRange.startDate, dateRange.endDate, searchModal, router]);


    const actionLabel = useMemo(() => {

        if (step === SEARCH_STEPS.INFO) return 'Search';

        return 'Next';
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === SEARCH_STEPS.LOACTION) return undefined;


        return 'Back';
    }, [step]);

    let bodyContent = (
        <div
            className="
            flex flex-col gap-8
            "
        >
            <Heading
                title="Where do wanna go?"
                subtitle="Find the perfect location!"
            />
            <CountrySelect
                value={location}
                onChange={(value) => setLocation(value as CountrySelectValue)}
            />
            <hr />
            <Map center={location?.latlng} />
        </div>
    );

    if (step === SEARCH_STEPS.DATE) bodyContent = (
        <div
            className="flex flex-col gap-8"
        >
            <Heading
                title="When do you plan to go?"
                subtitle="Make sure everyone is free!"
            />
            <Calendar
                value={dateRange}
                onChange={(value) => setDateRange(value.selection)}
            />
        </div>
    );


    if (step === SEARCH_STEPS.INFO) bodyContent = (
        <div
            className="flex flex-col gap-8"
        >
            <Heading
                title="More information"
                subtitle="Find your perfect place!"
            />
            <Counter
                title='Guests'
                subtitle="How many guests are coming?"
                value={guestCount}
                onChange={(value) => setGuestCount(value)}
            />
            <Counter
                title='Rooms'
                subtitle="How many rooms do you need?"
                value={roomCount}
                onChange={(value) => setRoomCount(value)}
            />
            <Counter
                title='Bathrooms'
                subtitle="How many bathrooms do you need?"
                value={bathroomCount}
                onChange={(value) => setBathroomCount(value)}
            />
        </div>
    );


    return (
        <Modal
            isOpen={searchModal.isOpen}
            onClose={searchModal.onClose}
            onSubmit={onSubmit}
            title="Filters"
            actionLabel="Search"
            body={bodyContent}
            secondaryAction={step === SEARCH_STEPS.LOACTION ? undefined : onBack}
            secondaryActionLabel={secondaryActionLabel}
        />
    );
}

export default SearchModal;