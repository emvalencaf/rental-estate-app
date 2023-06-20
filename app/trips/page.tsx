
// actions
import { getCurrentUser, getReservations } from "../actions"

// custom components
import { ClientOnly, EmpetyState } from "../components";

// custom trips page components
import { TripsClient } from "./components";

const TripsPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) return (
        <ClientOnly>
            <EmpetyState
                title="Unauthorized"
                subtitle="Please login"
            />
        </ClientOnly>
    );

    const reservations = await getReservations({
        userId: currentUser.id,
    });

    if (reservations.length === 0) return (
        <ClientOnly>
            <EmpetyState
                title="No trips found"
                subtitle="Looks like you havent reserved any trips."
            />
        </ClientOnly>
    );

    return (
        <ClientOnly>
            <TripsClient
                reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
    );
}

export default TripsPage;