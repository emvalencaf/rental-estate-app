// actions
import { getCurrentUser, getListingById, getReservations } from "../../actions";

// custom components
import { ClientOnly, EmptyState } from "../../components";

// custom listingId page components
import { ListingClient } from "./components";

// interfaces
interface IParams {
    listingId?: string;
}


const ListingPage = async ({
    params,
}: { params: IParams }) => {

    const listing = await getListingById(params);
    const reservations = await getReservations(params);
    const currentUser = await getCurrentUser();

    if (!listing) return (
        <ClientOnly>
            <EmptyState />
        </ClientOnly>
    )

    return (
        <ClientOnly>
            <ListingClient
                listing={listing}
                currentUser={currentUser}
                reservations={reservations}
            />
        </ClientOnly>
    );
}

export default ListingPage;