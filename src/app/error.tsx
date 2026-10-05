"use client";

import { useEffect } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import HomeIcon from "@mui/icons-material/Home";
import Link from "next/link";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main className="min-h-[70vh] flex items-center justify-center px-4 sm:px-8 lg:px-28 py-20">
            <div className="max-w-3xl mx-auto text-center">
                <div className="flex flex-col items-center">

                    {/* Error symbol */}
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-brand-main/10 flex items-center justify-center">
                        <span className="text-brand-main text-4xl sm:text-5xl font-bold">
                            !
                        </span>
                    </div>

                    <h1 className="mt-8 text-3xl sm:text-4xl lg:text-5xl font-bold">
                        مشکلی پیش آمده
                    </h1>

                    <p className="text-gray-600 mt-5 text-base sm:text-lg max-w-xl leading-8">
                        متأسفانه در پردازش این صفحه مشکلی پیش آمد.
                        می‌توانید دوباره تلاش کنید یا به صفحه اصلی برگردید.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-3 mt-8">

                        <button
                            onClick={() => reset()}
                            className="inline-flex items-center justify-center gap-2
                                       bg-brand-main hover:bg-brand-200
                                       text-offwhite-100
                                       px-6 py-3 rounded-2xl
                                       transition-all duration-200
                                       shadow-sm hover:shadow-md"
                        >
                            <RefreshIcon fontSize="small" />
                            تلاش دوباره
                        </button>

                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-2
                                       bg-offwhite-100 hover:bg-gray-200
                                       text-gray-700
                                       px-6 py-3 rounded-2xl
                                       transition-all duration-200"
                        >
                            <HomeIcon fontSize="small" />
                            صفحه اصلی
                        </Link>

                    </div>

                </div>
            </div>
        </main>
    );
}