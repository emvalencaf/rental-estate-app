"use client";

// hooks
import { useRouter } from "next/navigation";

// custom components
import { Container, Heading, ListingCard } from "../../../components";

// utils
import axios from "axios";
import { toast } from "react-hot-toast";

// interfaces
import { SafeReservation } from "../../../types/SafeReservation";
import { SafeUser } from "../../../types/SafeUser";
import { useCallback, useState } from "react";

export interface ReservationClientProps {
    reservations: SafeReservation[];
    currentUser: SafeUser;
}

const ReservationClient: React.FC<ReservationClientProps> = ({
    reservations,
    currentUser,
}) => {

    // navigation controller
    const router = useRouter();

    // states
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/reservations/${id}`)
            .then(() => {
                toast.success("Reservation cancelled");
                router.refresh();
            })
            .catch(() => toast.error('Something went wrong'))
            .finally(() => setDeletingId(''));

    }, [router,]);

    return (
        <Container>
            <Heading
                title="Reservations"
                subtitle="Bookings on your properties"
            />
            <div
                className="
                mt-10
                grid
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-6
                gap-8
                "
            >
                {
                    reservations.map((reservation) => (
                        <ListingCard
                            key={reservation.id}
                            data={reservation.listing}
                            actionId={reservation.id}
                            onAction={onCancel}
                            disabled={deletingId === reservation.id}
                            actionLabel="Cancel guest reservation"
                            currentUser={currentUser}
                        />
                    ))
                }
            </div>
        </Container>
    );
}

export default ReservationClient;