// crypt tools
import bcrypt from 'bcrypt';

// next tools
import { NextResponse } from 'next/server';

// prisma tool
import prisma from '../../libs/prismadb';

export async function POST(
    request: Request
) {
    const body = await request.json();

    const {
        email,
        name,
        password,
    } = body;

    // encrypt register password
    const hashedPassword = await bcrypt.hash(password, 12);

    // push a new register into db
    const user = await prisma?.user.create({
        data: {
            email,
            name,
            hashedPassword,
        },
    });

    return NextResponse.json(user);
}