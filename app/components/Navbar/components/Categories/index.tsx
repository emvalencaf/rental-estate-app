"use client";

// hooks
import { usePathname, useSearchParams } from "next/navigation";

// custom components
import { CategoryBox, Container } from "../../../";

// constants
import { categories } from "../../../../constants";

const Categories: React.FC = () => {

    // get search params from navigator
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();
    
    const isMainPage = pathname === "/";

    if (!isMainPage) return null;



    return (
        <Container>
            <div
                className="
                pt-4
                flex
                flex-row
                items-center
                justify-between
                overflow-x-auto
                "
            >
                {
                    categories.map((item) => (
                        <CategoryBox
                            key={item.label}
                            label={item.label}
                            description={item.description}
                            selected={category === item.label}
                            icon={item.icon}
                        />
                    ))
                }
            </div>
        </Container>
    );
}

export default Categories;