"use client";

// nextauth tools
import { signIn } from 'next-auth/react';

// hooks
import { useCallback, useState } from 'react';

// custom hooks
import { useLoginModal, useRegisterModal } from '../../../hooks';

// custom components
import { CustomInput, Heading } from '../..';

// internal modal custom components
import { AuthSocial, DemoButton } from '../components';

// custom modals
import { Modal } from '..';

// utils
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';

// icons
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

// constants
import { demoAccount } from '../../../constants';

const LoginModal: React.FC = ({

}) => {

    // navigation controller
    const router = useRouter();

    // regiter modal controller
    const registerModal = useRegisterModal();

    // login modal controller
    const loginModal = useLoginModal();

    // states modal
    const [isLoading, setIsLoading] = useState(false);

    // form states
    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const toogle = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
    }, [registerModal, loginModal]);

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        signIn('credentials', {
            ...data,
            redirect: false,
        })
            .then((callback) => {
                setIsLoading(false);

                if (callback?.ok) {
                    toast.success('Logged in');
                    loginModal.onClose();
                    router.refresh();
                }
            
                if (callback?.error) {
                    toast.error(callback.error);
                }
            });

    }

    const handleDemo = () => {
        setIsLoading(true);
        signIn('credentials', {
            ...demoAccount,
            redirect: false,
        })
            .then((callback) => {
                setIsLoading(false);

                if (callback?.ok) {
                    toast.success('Logged in');
                    loginModal.onClose();
                    router.refresh();
                }
            
                if (callback?.error) {
                    toast.error(callback.error);
                }
            });
    }

    const bodyContent = (
        <div
            className='flex flex-col gap-4'
        >
            <Heading
                title="Welcome back"
                subtitle='Login to your account'
            />
            <CustomInput
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <CustomInput
                id="password"
                label="Password"
                type='password'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    );

    const footerContent = (
        <div
            className='flex flex-col gap-4 mt-3'
        >
            <hr />
            <DemoButton
                onDemo={handleDemo}
            />
            <hr />
            <AuthSocial />
            <div
                className='
                text-neutral-500
                text-center
                mt-4
                font-light
                '
            >
                <div
                    onClick={loginModal.onClose}
                    className='justify-center flex flex-row items-center gap-2'
                >
                    <div>
                        First time using Airbnb?
                    </div>
                    <div
                        onClick={toogle}
                        className='
                        text-neutral-800
                        cursor-pointer
                        hover:underliine
                        '
                    >
                        Register
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Login"
            actionLabel='Continue'
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default LoginModal;