'use client';

// hooks
import { useEffect } from "react";

//import { EmptyState } from "./components";

interface ErrorStateProps {
    error: Error;
    reset: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({
    error,
    reset,
}) => {

    useEffect(() => {
        console.error(error);
    }, [error])

    return (
        <div
            className="h-[60vh]
                flex flex-col gap-2
                justify-center
                items-center">
            <div className="text-center">
                <div className="text-2xl font-bold">Uh Oh</div>
                <div className="font-light text-neutral-500 mt-2">
                    Something went wrong!
                </div>
            </div>
            <div
                className="w-48 mt-4
        ">
                <button
                    onClick={
                        // Attempt to recover by trying to re-render the segment
                        () => reset()
                    }
                    className=" 
                        relative
                        disabled:opacity-70
                        disabled:cursor-not-allowed
                        rounded-lg
                        hover:opacity-80
                        transition
                        w-full
                       bg-white
                       border-black
                       text-black
                       ">
                    Reset
                </button>
            </div>
        </div>
    );
}

export default ErrorState;