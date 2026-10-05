import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";

export default function NotFound() {
    return (
        <main className="min-h-[70vh] flex items-center justify-center px-4 sm:px-8 lg:px-28 py-20">
            <div className="max-w-3xl mx-auto text-center">
                <div className="flex flex-col items-center">

                    {/* 404 */}
                    <h1 className="text-8xl sm:text-9xl font-bold text-brand-main tracking-tight">
                        404
                    </h1>

                    <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold">
                        این صفحه پیدا نشد
                    </h2>

                    <p className="text-gray-600 mt-5 text-base sm:text-lg max-w-xl leading-8">
                        به نظر می‌رسد صفحه‌ای که به دنبال آن هستید وجود ندارد
                        یا ممکن است جابه‌جا شده باشد.
                    </p>

                    <Link
                        href="/"
                        className="mt-8 inline-flex items-center gap-2
                                   bg-brand-main hover:bg-brand-200
                                   text-offwhite-100
                                   px-6 py-3 rounded-2xl
                                   transition-all duration-200
                                   shadow-sm hover:shadow-md"
                    >
                        <HomeIcon fontSize="small" />
                        بازگشت به صفحه اصلی
                    </Link>

                </div>
            </div>
        </main>
    );
}