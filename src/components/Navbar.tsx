'use client';

import Link from "next/link";
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import SmartSelectionModal from './SmartSelectionModal';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isOpen, setIsOpen] = useState<string | null>(null);
    const [isSmartModalOpen, setIsSmartModalOpen] = useState(false);

    const toggleDropdown = (name: string) => {
        setIsOpen(isOpen === name ? null : name);
    };

    const navItemClass = "hover:bg-gray-300 transition-colors rounded-2xl flex items-center gap-0.5 py-2 px-4";

    return (
        <>
            <SmartSelectionModal isOpen={isSmartModalOpen} onClose={() => setIsSmartModalOpen(false)} />
            <nav className="sticky top-6 max-lg:top-0 w-full z-50 px-4 sm:px-0 max-lg:px-0">
                <div className="bg-offwhite-50 mx-28 max-lg:mx-0 shadow-xl rounded-2xl max-lg:rounded-none h-16 py-4 px-4 sm:px-6 flex items-center justify-between">
                    {/* Hamburger - Mobile Only */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="max-lg:block lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                    </button>

                    <div className="flex items-center gap-4 sm:gap-8">
                        <Link href="/" className="flex items-center gap-2">
                            <p className="text-2xl sm:text-3xl font-bold text-brand-main">Darab</p>
                        </Link>
                    </div>

                    {/* Desktop NavLinks */}
                    <div className="max-lg:hidden lg:block">
                        <div className="flex items-start gap-6 text-sm font-medium text-gray-700">
                            {/* Services */}
                            <div className="relative group">
                                <button onClick={() => toggleDropdown('services')} className={navItemClass}>
                                    خدمات
                                    <span className="text-xs text-brand-main">▼</span>
                                </button>
                                <div className="absolute top-full right-0 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                    <div className="bg-offwhite-50 rounded-2xl shadow-xl py-4 px-6 w-56 space-y-3 text-sm">
                                        <Link href="/services" className="block hover:text-blue-600 py-1">All Services</Link>
                                    </div>
                                </div>
                            </div>

                            {/* Products */}
                            <div className="relative group">
                                <button onClick={() => toggleDropdown('products')} className={navItemClass}>
                                    محصولات
                                    <span className="text-xs text-brand-main">▼</span>
                                </button>
                                <div className="absolute top-full right-0 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                    <div className="bg-offwhite-50 rounded-2xl shadow-xl py-4 px-6 w-56 space-y-3 text-sm">
                                        <Link href="/products?category=کولر+گازی" className="block hover:text-blue-600 py-1">
                                            کولر گازی
                                        </Link>
                                        <Link href="/products?category=پکیج" className="block hover:text-blue-600 py-1">
                                            پکیج
                                        </Link>
                                        <Link href="/products?category=تصفیه+آب" className="block hover:text-blue-600 py-1">
                                            تصفیه آب
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <Link href="/#" className={navItemClass}>
                                مجله
                            </Link>

                            <Link href="/About" className={navItemClass}>
                                درباره ما
                            </Link>

                            <button
                                type="button"
                                onClick={() => setIsSmartModalOpen(true)}

                                className={`${navItemClass} text-brand-main font-bold`}
                            >
                                انتخاب هوشمند
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Mobile: Search Icon Only */}
                        <button
                            className="max-lg:block lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                            aria-label="Search"
                        >
                            <SearchIcon />
                        </button>

                        {/* Desktop: SearchButton & AuthButton */}
                        <div className="max-lg:hidden lg:flex items-center gap-2">
                            <div className="bg-offwhite-100 hover:bg-gray-300 px-3 py-3 rounded-2xl transition-all">
                                <SearchIcon />
                            </div>
                            <Link
                                href="/auth/login"
                                className="bg-brand-main hover:bg-brand-200 text-offwhite-100 px-6 py-3 rounded-2xl transition-all"
                            >
                                <span className="max-[1092px]:hidden">ورود / ثبت نام</span>
                                <span className="min-[1092px]:hidden">ورود</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Mobile Dropdown */}
                {isMenuOpen && (
                    <div className="max-lg:block lg:hidden bg-offwhite-50 shadow-xl">
                        <div className="flex flex-col gap-2 p-4">
                            <div className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                                {/* Services */}
                                <div>
                                    <button onClick={() => toggleDropdown('services')} className={navItemClass}>
                                        خدمات
                                        <span className="text-xs text-brand-main">▼</span>
                                    </button>
                                    {isOpen === 'services' && (
                                        <div className=" border-b-1 py-2 mx-[-16px] px-12 mt-2 text-sm">
                                            <Link href="/services" className="block hover:text-blue-600 py-1">All Services</Link>
                                        </div>
                                    )}
                                </div>

                                {/* Products */}
                                <div>
                                    <button onClick={() => toggleDropdown('products')} className={navItemClass}>
                                        محصولات
                                        <span className="text-xs text-brand-main">▼</span>
                                    </button>
                                    {isOpen === 'products' && (
                                        <div className=" border-b-1 py-2 mx-[-16px] px-12 mt-2 text-sm">
                                            <Link href="/products?category=کولر+گازی" className="block hover:text-blue-600 py-1">
                                                کولر گازی
                                            </Link>
                                            <Link href="/products?category=پکیج" className="block hover:text-blue-600 py-1">
                                                پکیج                                            </Link>
                                            <Link href="/products?category=تصفیه+آب" className="block hover:text-blue-600 py-1">
                                                تصفیه آب
                                            </Link>
                                        </div>
                                    )}
                                </div>

                                <Link href="/#" className={navItemClass}>
                                    مجله
                                </Link>

                                <Link href="/About" className={navItemClass}>
                                    درباره ما
                                </Link>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsSmartModalOpen(true);
                                        setIsMenuOpen(false);
                                    }}
                                    className={`${navItemClass} text-brand-main font-bold`}
                                >
                                    انتخاب هوشمند
                                </button>
                            </div>
                            <div className="mt-2">
                                <Link
                                    href="/auth/login"
                                    className="bg-brand-main hover:bg-brand-200 text-offwhite-100 px-6 py-3 rounded-2xl transition-all block text-center"
                                >
                                    ورود / ثبت نام
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
}
