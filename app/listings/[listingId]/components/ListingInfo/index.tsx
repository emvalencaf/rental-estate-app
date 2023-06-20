'use client';

// custom hooks
import { useCountries } from "../../../../hooks";

// custom components
import { Avatar } from "../../../../components";

// custom listing components
import { ListingCategory } from "..";

// Map
const Map = dynamic(() => import('../../../../components/Map'), {
    ssr: false,
});

// interface
import { IconType } from "react-icons";
import { SafeUser } from "../../../../types/SafeUser";
import dynamic from "next/dynamic";

export interface ListingInfoProps {
    category: {
        icon: IconType;
        label: string;
        description: string;
    } | undefined;
    description: string;
    roomCount: number;
    guestCount: number;
    bathroomCount: number;
    locationValue: string;
    user: SafeUser;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
    user,
    category,
    locationValue,
    bathroomCount,
    roomCount,
    description,
    guestCount,
}) => {

    const { getByValue } = useCountries();

    const coordinates = getByValue(locationValue)?.latlng;

    return (
        <div
            className="col-span-4 flex flex-col gap-8"
        >
            <div
                className="flex flex-col gap-2"
            >
                <div
                    className="
                    text-xl
                    font-semibold
                    flex
                    flex-row
                    items-center
                    gap-2
                    "
                >
                    <div>
                        Hosted by {user?.name}
                    </div>
                    <Avatar
                        src={user?.image || ''}
                    />
                </div>
                <div
                    className="
                    flex
                    flex-row
                    items-center
                    font-light
                    text-neutral-500

                    "
                >
                    <div>
                        {guestCount} guests
                    </div>
                    <div>
                        {roomCount} rooms
                    </div>
                    <div>
                        {bathroomCount} bathrooms
                    </div>
                </div>
            </div>
            <hr />
            {category && (
                <ListingCategory
                    icon={category.icon}
                    label={category.label}
                    description={category.description}
                />
            )}
            <hr />
            <div
                className="text-lg font-light text-neutral-500"
            >
                {description}
            </div>
            <hr />
            <Map center={coordinates} />
        </div>
    );
}

export default ListingInfo;