import Image from "next/image";
import Link from "next/link";

import { AddToCart } from "./AddToCart";

interface CardsProps {
    isProduct: boolean;
    imageAlt: string;
    cardTitle: string;
    cardDesc: string;

    // Product
    price?: number;
    originalPrice?: number;

    // Blog post
    userName?: string;
    postDate?: Date;
    avatar?: string;
}

const formatPrice = (value?: number) => {
    if (value === undefined) return "";

    return `${value.toLocaleString("fa-IR").replace(/٬/g, ",")} ریال`;
};

export default function Cards({
    isProduct,
    imageAlt,
    cardTitle,
    cardDesc,
    originalPrice,
    price,
    userName,
    postDate,
    avatar,
}: CardsProps) {
    const hasDiscount =
        originalPrice !== undefined &&
        price !== undefined &&
        originalPrice > price;

    return (
        <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-offwhite-50">
            {/* Image */}
            <div className="relative shrink-0">
                <Image
                    src="/images/544x408.svg"
                    alt={imageAlt}
                    width={544}
                    height={408}
                    className="w-full"
                />

                {!isProduct && (
                    <BlogAuthor
                        userName={userName}
                        postDate={postDate}
                        avatar={avatar}
                    />
                )}
            </div>

            {/* Content */}
            <div
                className={`flex flex-1 flex-col px-4 sm:px-5 ${
                    isProduct
                        ? "py-4 sm:py-5"
                        : "px-5 py-6 sm:px-6 sm:py-8"
                }`}
            >
                <div className={isProduct ? "" : "flex-1"}>
                    <h3
                        className={
                            isProduct
                                ? "text-xl font-bold leading-relaxed text-brand-main sm:text-2xl"
                                : "text-lg font-bold leading-relaxed text-brand-main sm:text-xl"
                        }
                    >
                        {cardTitle}
                    </h3>

                    {!isProduct && (
                        <BlogContent cardDesc={cardDesc} />
                    )}
                </div>

                {isProduct && (
                    <ProductFooter
                        price={price}
                        originalPrice={originalPrice}
                        hasDiscount={hasDiscount}
                    />
                )}
            </div>
        </article>
    );
}

/* -------------------------------------------------------------------------- */
/* Blog                                                                        */
/* -------------------------------------------------------------------------- */

interface BlogAuthorProps {
    userName?: string;
    postDate?: Date;
    avatar?: string;
}

function BlogAuthor({
    userName,
    postDate,
    avatar,
}: BlogAuthorProps) {
    return (
        <>
            <div className="absolute bottom-0 left-0 h-24 w-full bg-linear-to-t from-offwhite-100/60 to-transparent" />

            <div className="absolute bottom-3 right-3 flex items-center gap-3">
                {avatar && (
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                        <Image
                            src={avatar}
                            alt={userName ?? "نویسنده"}
                            fill
                            className="object-cover"
                        />
                    </div>
                )}

                <div className="text-sm leading-relaxed text-gray-500">
                    {userName && <p>{userName}</p>}

                    {postDate && (
                        <time dateTime={postDate.toISOString()}>
                            {postDate.toLocaleDateString("fa-IR")}
                        </time>
                    )}
                </div>
            </div>
        </>
    );
}

interface BlogContentProps {
    cardDesc: string;
}

function BlogContent({ cardDesc }: BlogContentProps) {
    return (
        <div className="mt-5 space-y-5">
            <p className="line-clamp-3 text-sm leading-8 text-gray-500 sm:text-base">
                {cardDesc}
            </p>

            <Link
                href="/"
                className="inline-block text-sm text-blue-600 underline underline-offset-2 transition-colors hover:text-blue-800 sm:text-base"
            >
                بیشتر بخوانید...
            </Link>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/* Product                                                                     */
/* -------------------------------------------------------------------------- */

interface ProductFooterProps {
    price?: number;
    originalPrice?: number;
    hasDiscount: boolean;
}

function ProductFooter({
    price,
    originalPrice,
    hasDiscount,
}: ProductFooterProps) {
    return (
        <div className="mt-6 flex items-end justify-between gap-4">
            <AddToCart />

            <div className="flex flex-col items-end">
                {/* Reserved line keeps discounted and non-discounted cards aligned */}
                <p
                    className={`text-base leading-6 sm:text-lg ${
                        hasDiscount
                            ? "text-gray-500 line-through"
                            : "invisible"
                    }`}
                >
                    {hasDiscount
                        ? formatPrice(originalPrice)
                        : "\u00A0"}
                </p>

                <p className="text-base font-bold leading-6 text-brand-main sm:text-lg">
                    {formatPrice(price)}
                </p>
            </div>
        </div>
    );
}