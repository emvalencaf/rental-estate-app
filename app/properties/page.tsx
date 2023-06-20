
// actions
import { getCurrentUser, getListings, getReservations } from "../actions"

// custom components
import { ClientOnly, EmpetyState } from "../components";

// custom trips page components
import { PropertiesClient } from "./components";

const PropertiesPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) return (
        <ClientOnly>
            <EmpetyState
                title="Unauthorized"
                subtitle="Please login"
            />
        </ClientOnly>
    );

    const listings = await getListings({
        userId: currentUser.id,
    });

    if (listings.length === 0) return (
        <ClientOnly>
            <EmpetyState
                title="No properties found"
                subtitle="Looks like you have no properties."
            />
        </ClientOnly>
    );

    return (
        <ClientOnly>
            <PropertiesClient
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    );
}

export default PropertiesPage;