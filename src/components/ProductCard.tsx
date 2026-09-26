'use client'

import { useState } from "react";
import Image from "next/image";
import Rating from "react-rating";
import { StarRounded, StarOutlineRounded, LocalMallOutlined } from "@mui/icons-material";


interface ProductCardProps {
    id: string;
    title: string;
    image?: string;
    price: number;
    originalPrice?: number; // For showing discount
    rating: number;
}

export function ProductCard({
    id,
    title,
    image,
    price,
    originalPrice,
    rating,
}: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    const toFarsi = (num: number) => {
        return num.toLocaleString('en-US')
            .replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
    };
    const hasDiscount = originalPrice && originalPrice > price;

    return (
        <div className="bg-offwhite-50 relative min-h-64 sm:min-h-80 aspect-square pt-4 sm:pt-6">
            <div className="relative h-[70%] w-auto mx-4 sm:mx-6">
                <Image
                    src="/images/544x408.svg"
                    alt="Description"
                    width={544}
                    height={408}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/50 from-0% to-transparent to-20%" />
                <div className="absolute inset-0 p-3 sm:p-6 top-[82%] flex justify-between items-center">
                    <h3 className="text-lg sm:text-2xl lg:text-3xl line-clamp-1">{title}</h3>
                    <div className="text-lg sm:text-2xl lg:text-3xl flex items-center gap-1 sm:gap-2">
                        <div className="relative w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10">
                            {/* Background star (gray) */}
                            <StarRounded sx={{ fontSize: 'inherit' }} className="absolute top-0 left-0 text-gray-300 text-[28px] sm:text-[36px] lg:text-[45px]" />

                            {/* Filled portion (yellow) - clipped from left */}
                            <div
                                className="absolute top-0 left-0 h-full overflow-hidden"
                                style={{ width: `${((rating ?? 0) / 5) * 100}%` }}
                            >
                                <StarRounded
                                    sx={{ fontSize: 'inherit' }}
                                    className="absolute top-0 left-0 text-yellow-500 text-[28px] sm:text-[36px] lg:text-[45px]"
                                />
                            </div>

                            {/* Outline (yellow) */}
                            <StarOutlineRounded sx={{ fontSize: 'inherit' }} className="absolute top-0 left-0 text-yellow-500 text-[28px] sm:text-[36px] lg:text-[45px]" />
                        </div>

                        <span className="mt-2 sm:mt-3">{toFarsi(rating ?? 0)}</span>
                    </div>

                </div>
            </div>
            <div className="bg-offwhite-100 p-2 sm:p-3 rounded-lg absolute bottom-6 sm:bottom-10 right-4 sm:right-6">
                <LocalMallOutlined sx={{ fontSize: 'inherit' }} className="text-[35px] sm:text-[45px] lg:text-[55px]" />
            </div>
            <div className="text-left absolute bottom-6 sm:bottom-10 left-4 sm:left-6" >
                {originalPrice && <p className="text-gray-600 line-through text-lg sm:text-2xl lg:text-3xl">
                    {toFarsi(originalPrice)} ریال
                </p>}
                <p className="text-brand-main text-lg sm:text-2xl lg:text-3xl">
                    {toFarsi(price)} ریال
                </p>
            </div>
        </div>
    )
}
