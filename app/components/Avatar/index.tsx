"use client";

// components
import Image from "next/image";

// interfaces
export interface AvatarProps {
    src?: string;
}

const Avatar: React.FC<AvatarProps> = ({
    src,
}) => {
    return (
        <Image
            className="rounded-full"
            height="30"
            width="30"
            alt="Avatar"
            src={src ? src : '/images/placeholder.jpg'}
        />
    )
}

export default Avatar;