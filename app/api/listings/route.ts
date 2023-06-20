// types
import { NextResponse } from "next/server";

// prisma client
import prisma from '../../libs/prismadb';

// actions
import { getCurrentUser } from "../../actions";

export async function POST(
    request: Request,
) {
    const currentUser = await getCurrentUser();


    if (!currentUser) return NextResponse.error();

    const body = await request.json();

    const {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        location,
        price,
    } = body;

    // validation
    Object.keys(body).forEach((value: any) => {
        if (!body[value]) NextResponse.error();
    });

    const listing = await prisma.listing.create({
        data: {
            title,
            description,
            imageSrc,
            category,
            roomCount,
            bathroomCount,
            guestCount,
            locationValue: location.value,
            price: parseInt(price, 10),
            userId: currentUser.id,
        },
    });

    return NextResponse.json(listing);
}