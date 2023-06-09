'use client';

import { useCallback, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { BiUser } from 'react-icons/bi';
import UserMenuItem from './navbar/UserMenuItem';
import useSignupModal from '../hooks/useSignupModal';
import useSigninModal from '../hooks/useSigninModal';
import axios from 'axios';

const UserMenu = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const signupModal = useSignupModal();
    const signinModal = useSigninModal();

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    const onSignOut = async () => {
        axios
            .post('/api/users/signout')
            .then(() => {
                signOut({
                    callbackUrl: 'https://preemielove.com',
                    redirect: false,
                });
                router.refresh();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div
                    onClick={toggleOpen}
                    className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 
                rounded-full cursor-pointer hover:shadow-md transition"
                >
                    <div className="hidden md:block">
                        <BiUser />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="absolute min-w-[200px] px-1 rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-6 text-sm">
                    <div className="flex flex-col cursor-pointer">
                        {session?.user ? (
                            <>
                                <UserMenuItem
                                    onClick={() => router.push('/account')}
                                    label="Account"
                                />
                                <UserMenuItem
                                    onClick={onSignOut}
                                    label="Sign out"
                                />
                            </>
                        ) : (
                            <>
                                <UserMenuItem
                                    onClick={signinModal.onOpen}
                                    label="Sign in"
                                />
                                <UserMenuItem
                                    onClick={signupModal.onOpen}
                                    label="Sign up"
                                />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
