"use client";

// hooks
import { useRouter } from "next/navigation";
import { CustomButton, Heading } from "../";

// interfaces
export interface EmpetyStateProps {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
}

const EmpetyState: React.FC<EmpetyStateProps> = ({
    title = "No exact matches",
    subtitle = "Try changing or removing some of your filters",
    showReset,
}) => {

    // navigator controller
    const router = useRouter();


    
    return (
        <div
            className="
            h-[60vh]
            flex
            flex-col
            gap-2
            justify-center
            items-center
            "
        >
            <Heading
                center
                title={title}
                subtitle={subtitle}
            />
            <div
                className="w-40 mt-4"
            >
                {
                    showReset && (
                        <CustomButton 
                            outline
                            label="remove all filters"
                            onClick={() => router.push('/')}
                        />
                    )
                }
            </div>
        </div>
    );
}

export default EmpetyState;