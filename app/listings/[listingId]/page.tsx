// actions
import { getCurrentUser, getListingById } from "../../actions";

// custom components
import { ClientOnly, EmpetyState } from "../../components";

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
    const currentUser = await getCurrentUser();

    if (!listing) return (
        <ClientOnly>
            <EmpetyState />
        </ClientOnly>
    )

    return (
        <ClientOnly>
            <ListingClient
                listing={listing}
                currentUser={currentUser}
            />
        </ClientOnly>
    );
}

export default ListingPage;