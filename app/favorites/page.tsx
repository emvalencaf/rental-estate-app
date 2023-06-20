// custom components
import { getCurrentUser, getFavoriteListings } from "../actions";

// custom components
import { ClientOnly, EmpetyState } from "../components";

// custom favorite page components
import { FavoriteClient } from "./components";

const ListingPage = async () => {

    const listings = await getFavoriteListings();
    const currentUser = await getCurrentUser();

    if ( !listings || listings?.length === 0) return (
        <ClientOnly>
            <EmpetyState
                title="No favorities found"
                subtitle="Looks like you have no favorite listings"
            />
        </ClientOnly>
    );


    return (
        <ClientOnly>
            <FavoriteClient
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    );
}

export default ListingPage;