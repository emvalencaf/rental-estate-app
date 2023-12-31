'use client';

// hooks
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

// custom hooks
import { useLoginModal } from "../../../../hooks";

// constants
import { categories } from "../../../../constants";

// custom components
import { Container } from "../../../../components";

// custom listing components
import { ListingHead, ListingInfo, ListingReservation } from "../../../../components/listings";

// utils
import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { toast } from "react-hot-toast";

// reservation dates
const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
}

// interfaces
import { SafeListing } from "../../../../types/SafeListing";
import { SafeUser } from "../../../../types/SafeUser";
import { Range } from "react-date-range";
import { SafeReservation } from "../../../../types/SafeReservation";

export interface ListingClientProps {
    reservations?: SafeReservation[];
    listing: SafeListing & {
        user: SafeUser;
    };
    currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
    listing,
    currentUser,
    reservations = [],
}) => {

    // login modal controller
    const loginModal = useLoginModal();

    // navigation controller
    const router = useRouter();

    const disabledDates = useMemo(() => {

        let dates: Date[] = [];

        reservations.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate),
            });

            dates = [...dates, ...range];
        });

        return dates;
    }, [reservations]);

    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);

    const onCreateReservation = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }
        setIsLoading(true);

        axios.post('/api/reservations', {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?.id
        })
            .then(() => {
                toast.success('Listing reserved!');
                setDateRange(initialDateRange);
                router.push('/trips');
            })
            .catch(() => {
                toast.error('Something went wrong.');
            })
            .finally(() => {
                setIsLoading(false);
            })
    },
        [
            totalPrice,
            dateRange,
            listing?.id,
            router,
            currentUser,
            loginModal
        ]);

    useEffect(() => {

        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate,
            );

            dayCount && listing.price ?
                setTotalPrice(dayCount * listing.price)
                : setTotalPrice(listing.price);
        }

    }, [dateRange, listing.price]);

    const category = useMemo(() => {
        return categories.find((item) => item.label === listing.category);
    }, [listing.category]);

    return (
        <Container>
            <div
                className="max-w-screen-lg mx-auto"
            >
                <div
                    className="flex flex-col gap-6"
                >
                    <ListingHead
                        title={listing.title}
                        imageSrc={listing.imageSrc}
                        locationValue={listing.locationValue}
                        id={listing.id}
                        currentUser={currentUser}
                    />
                    <div
                        className="
                        grid
                        grid-cols-1
                        md:grid-cols-7
                        md:gap-10
                        mt-6
                        "
                    >
                        <ListingInfo
                            user={listing.user}
                            category={category}
                            description={listing.description}
                            roomCount={listing.roomCount}
                            guestCount={listing.guestCount}
                            bathroomCount={listing.bathroomCount}
                            locationValue={listing.locationValue}
                        />
                        <div
                            className="
                            order-first
                            mb-10
                            md:order-last
                            md:col-span-3
                            "
                        >
                            <ListingReservation
                                price={listing.price}
                                totalPrice={totalPrice}
                                dateRange={dateRange}
                                onChangeDate={(value) => setDateRange(value)}
                                onSubmit={onCreateReservation}
                                disabled={isLoading}
                                disabledDates={disabledDates}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default ListingClient;