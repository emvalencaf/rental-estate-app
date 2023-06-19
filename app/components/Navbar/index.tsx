"use client";

// custom components
import { Container } from "..";

// internal custom components
import { Search, Logo, UserMenu } from "./components";


// interfaces
import { User } from "@prisma/client";

export interface NavbarProps {
    currentUser?: User;
}

const Navbar: React.FC<NavbarProps> = ({
    currentUser,
}) => {

    return (
        <div
            className="
            fixed
            w-full
            bg-white
            z-10
            shadow-sm
            "
        >
            <div
                className="
                py-4
                border-b-[1px]
                "
            >
                <Container>
                    <div
                        className="
                        flex
                        flex-row
                        items-center
                        justify-between
                        gap-3
                        md:gap-0
                        "
                    >
                        <Logo />
                        <Search />
                        <UserMenu
                            currentUser={currentUser}
                        />
                    </div>
                </Container>
            </div>
        </div>
    );
}

export default Navbar;