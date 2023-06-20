"use client";

// hooks
import { useCallback } from 'react';

// next tools
import { CldUploadWidget } from 'next-cloudinary';

// components
import Image from 'next/image';

// icons
import { TbPhotoPlus } from 'react-icons/tb';

declare global {
    var cloudinary: any;
}

export interface ImageUploadProps {
    onChange: (value: string) => void;
    value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    onChange,
    value,
}) => {

    const handleUpload = useCallback((result: any) => {
        onChange(result.info.secure_url);
    }, [onChange]);


    return (
        <CldUploadWidget
            onUpload={handleUpload}
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET}
            options={{
                maxFiles: 1,
            }}
        >
            {({ open }) => {
                return (
                    <div
                        onClick={() => open?.()}
                        className='
                        relative
                        cursor-pointer
                        hover:opacity-70
                        transition
                        border-2
                        p-20
                        border-neutral-300
                        flex
                        flex-col
                        justify-center
                        items-center
                        gap-4
                        text-neutral-600
                        '
                    >
                        <TbPhotoPlus
                            size={50}
                        />
                        <div
                            className='
                            font-semibold
                            text-lg
                            '
                        >
                            Click to uload
                        </div>
                        {
                            value && (
                                <div
                                    className='
                                    absolute
                                    inset-0
                                    w-full
                                    h-full
                                    '
                                >
                                    <Image
                                        alt="Upload"
                                        fill
                                        style={{
                                            objectFit: 'cover'
                                        }}
                                        src={value}
                                    />
                                </div>
                            )
                        }
                    </div>
                )
            }}
        </CldUploadWidget>
    );
}

export default ImageUpload;