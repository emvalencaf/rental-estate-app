// actions
import { getListings, getCurrentUser} from "./actions";

// custom components
import { ClientOnly, Container, EmpetyState, ListingCard } from "./components";

// interfaces
import { Listing } from "@prisma/client";

export default async function Home() {
  
  // fetching the listings
  const listings = await getListings();

  // getting currentUser
  const currentUser = await getCurrentUser();

  if (!listings || listings.length === 0) return (
    <ClientOnly>
      <EmpetyState showReset />
    </ClientOnly>
  );

  return (
    <ClientOnly>
      <Container>
        <div
          className="
          pt-24
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
            listings.map((listing: Listing) => (
              <ListingCard
                currentUser={currentUser}
                key={listing.id}
                data={listing}
              />
            ))
          }
        </div>
      </Container>
    </ClientOnly>
  )
}
