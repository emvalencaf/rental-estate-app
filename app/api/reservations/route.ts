// next tools
import { NextResponse } from "next/server";

// prisma tools
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
        listingId,
        startDate,
        endDate,
        totalPrice,
    } = body;

    if (
        !listingId ||
        !startDate ||
        !endDate ||
        !totalPrice
    ) throw NextResponse.error();

    const listingAndReservation = await prisma.listing.update({
        where: {
            id: listingId,
        },
        data: {
            reservations: {
                create: {
                    userId: currentUser.id,
                    startDate,
                    endDate,
                    totalPrice,
                },
            },
        },
    });

    return NextResponse.json(listingAndReservation);
}