'use client';

// hooks
import { useEffect } from "react";
import { EmptyState } from "./components";

interface ErrorStateProps {
    error: Error;
}

const ErrorState: React.FC<ErrorStateProps> = ({
    error,
}) => {

    useEffect(() => {
        console.error(error);
    }, [error])

    return (
        <EmptyState
            title="Uh oh"
            subtitle="Something went wrong"
        />
    );
}

export default ErrorState;