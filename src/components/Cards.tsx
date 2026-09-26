import {AddToCart} from './AddToCart'
import Image from "next/image";
import Link from "next/link";

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
    avatar? : string;
}) {
    return (
        <div className="rounded-2xl bg-offwhite-50 overflow-hidden flex flex-col h-full">
            {/* Image Section */}
            <div className="relative shrink-0">
                <Image
                    src="/images/544x408.svg"
                    alt={imageAlt}
                    width={544}
                    height={408}
                />
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
            <div className="flex flex-col flex-1 px-4 py-2">
                <div className="flex-1">
                    <h3 className={`${isProduct && 'text-2xl '}text-brand-main  font-bold`}>{cardTitle}</h3>
                    {!isProduct && (
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
                    <div className="flex items-center justify-between pt-4 pb-2">
                        <AddToCart />
                        <div className="flex flex-col items-end">
                            {originalPrice && (<p className="text-gray-500 line-through text-lg">
                                {originalPrice.toLocaleString("fa-IR").replace(/٬/g, ",")} ریال
                            </p>)}
                            <p className="text-brand-main font-bold text-lg">
                                {price?.toLocaleString("fa-IR").replace(/٬/g, ",")} ریال
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
