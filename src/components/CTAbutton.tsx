'use client'

import { Tooltip } from '@mui/material';

export function CTAButton({ title, text }: { title: string; text: string }) {
    return (
        <Tooltip title={title}>
            <button className="bg-brand-main text-offwhite-100 px-6 py-3 rounded-xl hover:bg-brand-200 transition-colors max-sm:w-full">
                {text}
            </button>
        </Tooltip>
    )
}
