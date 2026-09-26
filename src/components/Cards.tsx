import { AddToCart } from './AddToCart'
import Image from "next/image";
import Link from "next/link";

const toFa = (num: number) => num.toLocaleString("fa-IR").replace(/٬/g, ",");

export default function Cards({
    isProduct,
    imageAlt,
    userName,
    postDate,
    cardTitle,
    cardDesc,
    originalPrice,
    price,
    avatar,
    btu,
    area,
    coolOnly,
}: {
    isProduct: boolean;
    imageAlt: string;
    userName?: string;
    postDate?: Date;
    cardTitle: string;
    cardDesc: string;
    originalPrice?: number;
    price?: number;
    rating?: number;
    avatar?: string;
    btu?: number;
    area?: number;
    coolOnly?: boolean;
}) {
    const hasDiscount = isProduct && originalPrice && price && originalPrice > price;
    const discountPercent = hasDiscount
        ? Math.round(((originalPrice - price) / originalPrice) * 100)
        : 0;

    return (
        <div className="group rounded-2xl bg-offwhite-50 overflow-hidden flex flex-col h-full ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-lg hover:shadow-black/5">
            {/* Image Section */}
            <div className="relative shrink-0 overflow-hidden">
                <Image
                    src="/images/544x408.svg"
                    alt={imageAlt}
                    width={544}
                    height={408}
                    className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                />
                {hasDiscount && (
                    <span className="absolute top-3 right-3 rounded-full bg-red-600 px-2.5 py-1 text-sm font-bold text-white">
                        ٪{toFa(discountPercent)}
                    </span>
                )}
            </div>
            {/* bottom section */}
            <div className="flex flex-col flex-1 px-4 py-3">
                <div className="flex-1">
                    <h3 className={`text-brand-main font-bold ${isProduct ? 'text-base sm:text-lg line-clamp-2 min-h-[3rem] sm:min-h-[3.5rem]' : 'text-lg line-clamp-2 min-h-[3.5rem]'}`}>
                        {cardTitle}
                    </h3>

                    {isProduct ? (
                        <div className="mt-3 flex flex-wrap content-start gap-1.5 sm:gap-2 min-h-[4.25rem] sm:min-h-[4.75rem]">
                            {area != null && (
                                <span className="rounded-lg bg-offwhite-100 px-2 py-1 text-xs sm:text-sm text-brand-main">
                                    مناسب برای {toFa(area)} متر
                                </span>
                            )}
                            {btu != null && (
                                <span className="rounded-lg bg-offwhite-100 px-2 py-1 text-xs sm:text-sm text-gray-600">
                                    {toFa(btu)} BTU
                                </span>
                            )}
                            <span className="rounded-lg bg-offwhite-100 px-2 py-1 text-xs sm:text-sm text-gray-600">
                                {coolOnly ? "سرد" : "سرد و گرم"}
                            </span>
                        </div>
                    ) : (
                        <p className="mt-2 text-gray-500 text-sm leading-7 line-clamp-3 min-h-[5.25rem]">
                            {cardDesc}
                        </p>
                    )}
                </div>

                {!isProduct && (
                    <div className="mt-4 flex items-center justify-between gap-2 border-t border-black/5 pt-3">
                        <div className="flex items-center gap-2 min-w-0">
                            <div className="relative w-9 h-9 shrink-0">
                                <Image
                                    src={avatar || ""}
                                    alt={userName || ""}
                                    fill
                                    className="rounded-full object-cover bg-amber-500"
                                />
                            </div>
                            <div className="min-w-0 leading-tight">
                                <p className="text-sm font-medium text-brand-main truncate">{userName}</p>
                                <p className="text-xs text-gray-500">{postDate?.toLocaleDateString("fa-IR")}</p>
                            </div>
                        </div>
                        <Link
                            className="shrink-0 rounded-lg bg-offwhite-100 px-3 py-1.5 text-sm font-medium text-brand-main transition-colors hover:bg-brand-main hover:text-white"
                            href="/"
                        >
                            بیشتر بخوانید
                        </Link>
                    </div>
                )}

                {isProduct && (
                    <div className="mt-4 flex items-end justify-between gap-2 pb-1">
                        <AddToCart />
                        <div className="flex min-w-0 flex-col items-end">
                            <p className={`line-through text-xs sm:text-sm ${originalPrice ? "text-gray-500" : "invisible"}`}>
                                {toFa(originalPrice ?? price ?? 0)} ریال
                            </p>
                            <p className="text-brand-main font-bold text-sm sm:text-base whitespace-nowrap">
                                {price != null ? toFa(price) : ""} ریال
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
