'use client'

import { Tooltip } from '@mui/material';

export function CTAButton({
    title,
    text,
    onClick,
}: {
    title: string;
    text: string;
    onClick?: () => void;
}) {
    return (
        <Tooltip title={title}>
            <button
                type="button"
                onClick={onClick}
                className="bg-brand-main text-offwhite-100 px-6 py-3 rounded-xl hover:bg-brand-200 transition-colors max-sm:w-full"
            >
                {text}
            </button>
        </Tooltip>
    )
}
