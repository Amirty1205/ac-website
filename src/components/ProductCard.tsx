'use client'

import { useState } from "react";
import Image from "next/image";
import Rating from "react-rating";
import { StarRounded, StarOutlineRounded } from "@mui/icons-material";

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

    // Convert rating to Farsi numerals
    const toFarsi = (num: number) => {
        const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        return num.toString().split('').map(d => d === '.' ? '.' : farsiDigits[parseInt(d)]).join('');
    };

    const hasDiscount = originalPrice && originalPrice > price;

    return (
        <div className="bg-offwhite-50 min-h-80 aspect-square pt-6">
            <div className="relative h-[70%] w-auto mx-6">
                <Image
                    src="/images/544x408.svg"
                    alt="Description"
                    width={544}
                    height={408}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/50 from-0% to-transparent to-20%" />
                <div className="absolute inset-0 p-6 top-[82%] flex justify-between items-center">
                    <h3 className="text-3xl">{title}</h3>
                    <div className="text-3xl flex items-center gap-2">
                        <div className="relative w-10 h-10">
                            {/* Background star (gray) */}
                            <StarRounded sx={{ fontSize: 45 }} className="absolute top-0 left-0 text-gray-300" />

                            {/* Filled portion (yellow) - clipped from left */}
                            <div
                                className="absolute top-0 left-0 h-full overflow-hidden"
                                style={{ width: `${((rating ?? 0) / 5) * 100}%` }}
                            >
                                <StarRounded
                                    sx={{ fontSize: 45 }}
                                    className="absolute top-0 left-0 text-yellow-500"
                                />
                            </div>

                            {/* Outline (yellow) */}
                            <StarOutlineRounded sx={{ fontSize: 58}} className="absolute -top-[7px] -left-[6px] text-yellow-500" />
                        </div>

                        <span className="mt-3">{toFarsi(rating ?? 0)}</span>
                    </div>

                </div>
            </div>
            <div>

            </div>
        </div>
    )
}