import Link from "next/link";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const linkColumns = [
    {
        title: "دسترسی سریع",
        links: [
            { label: "صفحه اصلی", href: "/" },
            { label: "محصولات", href: "/products" },
            { label: "خدمات", href: "/services" },
            { label: "درباره ما", href: "/About" },
        ],
    },
    {
        title: "خدمات مشتریان",
        links: [
            { label: "انتخاب هوشمند", href: "/recommendations" },
            { label: "پیگیری سفارش", href: "/#" },
            { label: "گارانتی و خدمات پس از فروش", href: "/#" },
            { label: "سوالات متداول", href: "/#" },
        ],
    },
];

const socials = [
    { label: "اینستاگرام", href: "https://instagram.com", Icon: InstagramIcon },
    { label: "تلگرام", href: "https://telegram.org", Icon: TelegramIcon },
    { label: "واتساپ", href: "https://whatsapp.com", Icon: WhatsAppIcon },
];

const contactItems = [
    { Icon: LocationOnOutlinedIcon, text: "تهران، خیابان ولیعصر، پلاک ۱۲۳۴" },
    { Icon: CallOutlinedIcon, text: "۰۲۱ - ۱۲۳۴ ۵۶۷۸", dir: "ltr" as const },
    { Icon: EmailOutlinedIcon, text: "info@darab.ir", dir: "ltr" as const },
];

export default function Footer() {
    return (
        <footer className="bg-brand-300 text-offwhite-100">
            <div className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:py-16">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
                    {/* Brand + newsletter */}
                    <div className="flex flex-col gap-5 lg:col-span-4">
                        <div className="flex items-center gap-2">
                            <span className="text-3xl font-bold text-white">داراب</span>
                            <span className="text-lg font-medium text-offwhite-50">Darab</span>
                        </div>
                        <p className="max-w-sm text-sm leading-7 text-offwhite-50">
                            ارائه‌دهنده انواع کولر گازی و سیستم‌های سرمایش و گرمایش با گارانتی معتبر
                            و خدمات پس از فروش سراسری. انتخاب مطمئن برای خانه و کسب‌وکار شما.
                        </p>

                        <form className="mt-2 w-full max-w-sm" onSubmit={(e) => e.preventDefault()}>
                            <label htmlFor="newsletter" className="mb-2 block text-sm font-medium text-white">
                                عضویت در خبرنامه
                            </label>
                            <div className="flex items-stretch gap-2 rounded-2xl bg-brand-200 p-1.5">
                                <input
                                    id="newsletter"
                                    type="email"
                                    placeholder="ایمیل خود را وارد کنید"
                                    className="min-w-0 flex-1 bg-transparent px-3 text-sm text-white placeholder:text-offwhite-50/70 focus:outline-none"
                                />
                                <button
                                    type="submit"
                                    className="shrink-0 rounded-xl bg-brand-main px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-main/80"
                                >
                                    عضویت
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Link columns */}
                    {linkColumns.map((col) => (
                        <nav key={col.title} className="flex flex-col gap-4 lg:col-span-2">
                            <h4 className="text-base font-bold text-white">{col.title}</h4>
                            <ul className="flex flex-col gap-3">
                                {col.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="group inline-flex items-center gap-1 text-sm text-offwhite-50 transition-colors hover:text-white"
                                        >
                                            <ArrowBackIcon className="!text-base opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    ))}

                    {/* Contact */}
                    <div className="flex flex-col gap-4 lg:col-span-4">
                        <h4 className="text-base font-bold text-white">تماس با ما</h4>
                        <ul className="flex flex-col gap-4">
                            {contactItems.map(({ Icon, text, dir }) => (
                                <li key={text} className="flex items-center gap-3 text-sm text-offwhite-50">
                                    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-200 text-brand-main">
                                        <Icon className="!text-lg" />
                                    </span>
                                    <span dir={dir}>{text}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-2 flex items-center gap-3">
                            {socials.map(({ label, href, Icon }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="flex size-10 items-center justify-center rounded-xl bg-brand-200 text-offwhite-50 transition-colors hover:bg-brand-main hover:text-white"
                                >
                                    <Icon />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/10">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-sm text-offwhite-50 sm:flex-row sm:px-10">
                    <p>© {new Date().getFullYear()} داراب. تمامی حقوق محفوظ است.</p>
                    <div className="flex items-center gap-6">
                        <Link href="/#" className="transition-colors hover:text-white">
                            قوانین و مقررات
                        </Link>
                        <Link href="/#" className="transition-colors hover:text-white">
                            حریم خصوصی
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
