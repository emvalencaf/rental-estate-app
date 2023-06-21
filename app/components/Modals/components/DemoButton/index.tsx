"use client";

// custom components
import { CustomButton } from "../../..";

// icons
import { BsPersonBadgeFill } from "react-icons/bs";

// constants
import { demoAccount } from "../../../../constants";

// interfaces
export interface DemoButtonProps {
    onDemo: () => void;
    isLoading?: boolean;
}

const DemoButton: React.FC<DemoButtonProps> = ({
    onDemo,
    isLoading
}) => {

    return (
        <CustomButton
            outline
            label="Continue with a DEMO ACCOUNT"
            icon={BsPersonBadgeFill}
            onClick={onDemo}
            disabled={isLoading}
        />
    );
}

export default DemoButton;