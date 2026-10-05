import Link from "next/link";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function Footer() {
    return (
        <footer className="bg-brand-200 w-full text-white mt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-28 py-14 sm:py-16">

                <div className="grid grid-cols-1 md:grid-cols-3">

                    {/* Right */}
                    <div className="md:justify-self-start text-center md:text-right">
                        <h3 className="text-xl font-bold mb-6">
                            دسترسی سریع
                        </h3>

                        <div className="flex flex-col gap-4 text-sm sm:text-base">
                            <Link
                                href="/"
                                className="hover:text-white/70 transition-colors"
                            >
                                صفحه اصلی
                            </Link>
                            <Link
                                href="/products"
                                className="hover:text-white/70 transition-colors"
                            >
                                محصولات
                            </Link>
                            <Link
                                href="/services"
                                className="hover:text-white/70 transition-colors"
                            >
                                خدمات
                            </Link>
                            <Link
                                href="/About"
                                className="hover:text-white/70 transition-colors"
                            >
                                درباره ما
                            </Link>
                        </div>
                    </div>

                    {/* Center */}
                    <div className="justify-self-center text-center flex flex-col items-center mt-12 md:mt-0">
                        <h2 className="text-3xl font-bold">
                            داراب <span className="font-normal">Darab</span>
                        </h2>

                        <p className="text-sm sm:text-base leading-8 mt-5 text-white/80 max-w-sm">
                            داراب همراه شما برای انتخاب، خرید، نصب و نگهداری
                            سیستم‌های سرمایشی و گرمایشی است.
                        </p>

                        <p className="text-sm text-white/70 mt-4">
                            آسودگی و خنکی خانه‌تان را به ما بسپارید.
                        </p>
                    </div>

                    {/* Left */}
                    <div className="md:justify-self-end text-center md:text-left mt-12 md:mt-0">
                        <h3 className="text-xl text-right font-bold mb-6">
                            ارتباط با ما
                        </h3>

                        <div className="flex flex-col gap-5 text-sm sm:text-base">
                            <a
                                href="tel:+982100000000"
                                className="flex items-center justify-center md:justify-start gap-2 hover:text-white/70 transition-colors"
                            >
                                <PhoneIcon fontSize="small" />
                                ۰۲۱-۰۰۰۰۰۰۰۰
                            </a>

                            <div className="flex items-center justify-center md:justify-start gap-2">
                                <LocationOnIcon fontSize="small" />
                                تهران، ایران
                            </div>

                            <a
                                href="#"
                                className="flex items-center justify-center md:justify-start gap-2 hover:text-white/70 transition-colors"
                            >
                                <InstagramIcon fontSize="small" />
                                اینستاگرام داراب
                            </a>
                        </div>
                    </div>

                </div>

                <div className="border-t border-white/20 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-white/70">
                    <p>
                        © {new Date().getFullYear()} داراب. تمامی حقوق محفوظ است.
                    </p>

                    <p>
                        طراحی و توسعه با عشق
                    </p>
                </div>

            </div>
        </footer>
    );
}