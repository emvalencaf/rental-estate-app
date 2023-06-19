"use client";

// hooks
import { useCallback, useState } from 'react';

// custom hooks
import { useRegisterModal } from '../../../hooks';

// custom components
import { CustomButton, CustomInput, Heading } from '../..';

// utils
import axios from 'axios';
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';

// icons
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { Modal } from '..';
import { toast } from 'react-hot-toast';



const RegisterModal: React.FC = ({

}) => {

    // modal controller
    const registerModal = useRegisterModal();

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
            name: '',
            email: '',
            password: '',
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/register', data)
            .then(() => {
                registerModal.onClose();
            })
            .catch((error: any) => {
                console.log(error);
                toast.error('Something went wrong!');
            })
            .finally(() => {
                setIsLoading(false);
            });
    }


    const bodyContent = (
        <div
            className='flex flex-col gap-4'
        >
            <Heading
                title="Welcome to Airbnb"
                subtitle='Create an account'
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
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <CustomInput
                id="password"
                label="Password"
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
            <CustomButton
                outline
                label="Continue with Google"
                icon={FcGoogle}
                onClick={() => { }}
            />
            <CustomButton
                outline
                label="Continue with Github"
                icon={AiFillGithub}
                onClick={() => { }}
            />
            <div
                className='
                text-neutral-500
                text-center
                mt-4
                font-light
                '
            >
                <div
                    onClick={registerModal.onClose}
                    className='justify-center flex flex-row items-center gap-2'
                >
                    <div>
                        Already have an account?
                    </div>
                    <div
                        className='
                        text-neutral-800
                        cursor-pointer
                        hover:underliine
                        '
                    >
                        Log in
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Register"
            actionLabel='Continue'
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default RegisterModal;