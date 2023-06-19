"use client";

// next auth tools
import { signIn } from "next-auth/react";

// custom components
import { CustomButton } from "../../..";

// icons
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

const AuthSocial = () => {
    return (
        <>
            <CustomButton
                outline
                label="Continue with Google"
                icon={FcGoogle}
                onClick={() => signIn('google')}
            />
            <CustomButton
                outline
                label="Continue with Github"
                icon={AiFillGithub}
                onClick={() => signIn('github')}
            />
        </>
    );
}

export default AuthSocial;