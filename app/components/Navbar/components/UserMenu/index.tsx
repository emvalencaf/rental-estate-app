"use client";

// next auth tools
import { signOut } from  'next-auth/react';

// hooks
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

// custom hooks
import { useLoginModal, useRegisterModal, useRentModal } from '../../../../hooks';

// custom components
import { Avatar } from '../../..';

// navbar custom components
import { MenuItem } from '..';

// icons
import { AiOutlineMenu } from 'react-icons/ai';

// interfaces
import { SafeUser } from '../../../../types/SafeUser';

export interface UserMenuProps {
    currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({
    currentUser,
}) => {
    // navigation controller
    const router = useRouter();

    // register modal controller
    const registerModal = useRegisterModal();

    // login modal controller
    const loginModal = useLoginModal();

    // rent modal controller
    const rentModal = useRentModal();

    // modal states
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    const onRent = useCallback(() => {
        
        if (!currentUser) return loginModal.onOpen();

        console.log('rent modal');

        rentModal.onOpen();
        
    }, [currentUser, loginModal, rentModal]);

    return (
        <div className="relative">
            <div
                className="
                flex
                flex-row
                items-center
                gap-3
                "
            >
                <div
                    onClick={onRent}
                    className="
                    hidden
                    md:block
                    text-sm
                    font-semibold
                    py-3
                    px-4
                    rounded-full
                    hover:bg-neutral-100transition
                    cursor-pointer
                    "
                >
                    Airbnb your home
                </div>
                <div
                    onClick={toggleOpen}
                    className="
                    p-4
                    md:py-1
                    md:px-2
                    border-[1px]
                    border-neutral-200
                    flex
                    flex-row
                    items-center
                    gap-3
                    rounded-full
                    cursor-pointer
                    hover:shadow-md
                    transition
                    "
                >
                    <AiOutlineMenu />
                    <div
                        className='hidden md:block'
                    >
                        <Avatar
                            src={currentUser?.image || ''}
                        />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div
                    className='
                    absolute
                    rounded-xl
                    shadow-md
                    w-[40vw]
                    md:w-3/4
                    bg-white
                    ovrflow-hidden
                    right-0
                    top-12
                    text-sm
                    '
                >
                    <div
                        className='
                        flex
                        flex-col
                        cursor-pointer
                        '
                    >
                        {
                            currentUser ? (
                                <>
                                    <MenuItem
                                        onClick={() => router.push('/trips')}
                                        label="My trips"
                                    />
                                    <MenuItem
                                        onClick={() => router.push('/favorites')}
                                        label="My favorites"
                                    />
                                    <MenuItem
                                        onClick={() => router.push("/reservations")}
                                        label="My reservations"
                                    />
                                    <MenuItem
                                        onClick={() => router.push('/properties')}
                                        label="My properties"
                                    />
                                    <MenuItem
                                        onClick={rentModal.onOpen}
                                        label="Airbnb my home"
                                    />
                                    <hr />
                                    <MenuItem
                                        onClick={() => signOut()}
                                        label="Logout"
                                    />
                                </>
                            ) : (

                                <>
                                    <MenuItem
                                        onClick={loginModal.onOpen}
                                        label="Login"
                                    />
                                    <MenuItem
                                        onClick={registerModal.onOpen}
                                        label="Sign up"
                                    />
                                </>
                            )
                        }
                    </div>
                </div>
            )
            }
        </div >
    );
}

export default UserMenu;