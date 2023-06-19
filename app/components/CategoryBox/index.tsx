"use client";
// hooks
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

// query-string tools
import qs from 'query-string';

// interfaces
import { IconType } from "react-icons";

export interface CategoryBoxProps {
    label: string;
    description: string;
    icon: IconType;
    selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
    label,
    description,
    icon: Icon,
    selected,
}) => {
    // navigation controller
    const router = useRouter();

    // get search params from router
    const params = useSearchParams();

    const handleClick = useCallback(() => {
        let currentQuery = {};

        // get current query from params
        if (params) currentQuery = qs.parse(params.toString());

        // create a query base on the current query
        const updatedQuery: any = {
            ...currentQuery,
            category: label,
        };

        // remove the label from the current query
        if (params?.get('category') === label) delete updatedQuery.category;

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery,
        }, {skipNull: true});

        router.push(url);
    }, [label, params, router]);

    return (
        <div
            onClick={handleClick}
            className={`
            flex
            flex-col
            items-center
            justify-center
            gap-2
            p-3
            border-b-2
            hover:text-neutral-800
            transition
            cursor-pointer
            ${selected ? 'border-b-neutral-800' : 'border-transparent'}
            ${selected ? 'text-neutral-800' : 'text-neutral-500'}
            `}
        >
            <Icon
                size={26}
            />
            <div
                className="font-medium text-sm"
            >
                {label}
            </div>
        </div>
    );
}

export default CategoryBox;