// actions
import { getListings, getCurrentUser } from "./actions";

// custom components
import { ClientOnly, Container, EmptyState, ListingCard } from "./components";

// interfaces
import { IListingsParams } from "./actions/getListings";
import { SafeListing } from "./types/SafeListing";

interface HomeProps {
  searchParams: IListingsParams;
}

const Home = async ({ searchParams }: HomeProps) => {

  searchParams = searchParams ?
    searchParams
    : {
      userId: undefined,
      guestCount: undefined,
      roomCount: undefined,
      bathroomCount: undefined,
      startDate: undefined,
      endDate: undefined,
      category: undefined,
      locationValue: undefined,
    };

  // fetching the listings
  const listings = await getListings(searchParams);

  // getting currentUser
  const currentUser = await getCurrentUser();

  if (!listings || listings.length === 0) return (
    <ClientOnly>
      <EmptyState showReset />
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
            listings.map((listing: SafeListing) => (
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

export default Home;