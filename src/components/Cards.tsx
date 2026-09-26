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
        <div className="rounded-2xl bg-offwhite-50 overflow-hidden flex flex-col h-full">
            {/* Image Section */}
            <div className="relative shrink-0">
                <Image
                    src="/images/544x408.svg"
                    alt={imageAlt}
                    width={544}
                    height={408}
                    className="w-full h-auto"
                />
                {hasDiscount && (
                    <span className="absolute top-3 right-3 rounded-full bg-red-600 px-2.5 py-1 text-sm font-bold text-white">
                        ٪{toFa(discountPercent)}
                    </span>
                )}
                {!isProduct && (
                    <>
                        <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-offwhite-100/50 from-0% to-transparent to-100%" />
                        <div className="absolute bottom-3 right-3 w-11 h-11">
                            <Image
                                src={avatar || ""}
                                alt={userName || ""}
                                fill
                                className="rounded-full object-cover bg-amber-500"
                            />
                        </div>
                        <div className="absolute text-gray-500 text-base bottom-2 right-16">
                            <p>{postDate?.toLocaleDateString("fa-IR")}</p>
                            <p>{userName}</p>
                        </div>
                    </>
                )}
            </div>
            {/* bottom section */}
            <div className="flex flex-col flex-1 px-4 py-3">
                <div className="flex-1">
                    <h3 className={`${isProduct ? 'text-base sm:text-lg line-clamp-2 ' : ''}text-brand-main font-bold`}>
                        {cardTitle}
                    </h3>

                    {isProduct ? (
                        <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
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
                        <>
                            <p className="text-gray-500">{cardDesc}</p>
                            <Link
                                className="text-blue-600 hover:text-blue-800 visited:text-purple-600 underline"
                                href="/"
                            >
                                بیشتر بخوانید...
                            </Link>
                        </>
                    )}
                </div>

                {isProduct && (
                    <div className="flex items-center justify-between pt-4 pb-1">
                        <AddToCart />
                        <div className="flex flex-col items-end">
                            {originalPrice && (
                                <p className="text-gray-500 line-through text-sm sm:text-base">
                                    {toFa(originalPrice)} ریال
                                </p>
                            )}
                            <p className="text-brand-main font-bold text-base sm:text-lg">
                                {price != null ? toFa(price) : ""} ریال
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
