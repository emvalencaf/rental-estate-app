"use client";

// hooks
import { useEffect, useState } from "react"

// interfaces
interface ClientOnlyProps {
    children: React.ReactNode;
}

// This component prevent hidration problems with clientside components. Just wrap up the component.

const ClientOnly: React.FC<ClientOnlyProps> = ({
    children,
}) => {
    
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) return null;

    return (
        <>
            {children}
        </>
    );
}

export default ClientOnly;