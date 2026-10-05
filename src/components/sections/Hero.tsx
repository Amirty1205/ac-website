'use client';

import { useState } from 'react';
import { CTAButton } from "../CTAbutton";
import SmartSelectionModal from "../SmartSelectionModal";

export default function Hero() {
    const [isSmartModalOpen, setIsSmartModalOpen] = useState(false);

    return (
        <>
            <SmartSelectionModal isOpen={isSmartModalOpen} onClose={() => setIsSmartModalOpen(false)} />
            <section className="px-4 sm:px-8 lg:px-28 pt-20 md:pt-20 sm:pt-8">
                <div className="max-w-7xl mx-auto space-y-12 md:space-y-16">
                    {/* Row 1: Text + Image */}
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="text-center md:text-right">
                            <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl">
                                آسودگی و <span className="text-brand-main">خنکی</span> خانه‌تان را به ما بسپارید
                            </h1>
                            <p className="text-gray-600 mt-4 md:mt-8 text-sm md:text-base">
                                با ترکیبی از برندهای معتبر و قابل‌اعتماد، خدمات نصب و اجرای تخصصی،
                                و قیمتی منصفانه، تلاش می‌کنیم تجربه‌ای مطمئن و رضایت‌بخش برای شما فراهم کنیم.
                            </p>
                        </div>
                        <div className="w-full h-48 sm:h-60 md:h-80 rounded-2xl overflow-hidden">
                            <img
                                src="/images/HeroAC.webp"
                                alt="کولر گازی"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Row 2: Centered CTA */}
                    <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto">
                        <p className="text-gray-600 text-sm md:text-base">
                            با <span className="text-brand-main">انتخاب هوشمند</span> دیگر لازم نیست بین مدل‌های مختلف سردرگم شوید
                            -به چند پرسش ساده پاسخ دهید
                            و ما مناسب‌ترین گزینه‌ها را به شما نمایش میدهیم <br className="hidden sm:block" /> همین حالا امتحان کنید.
                        </p>
                        <CTAButton
                            title="محصول موردنیاز خود را به آسانی و بدون دردسر انتخاب کنید."
                            text="انتخاب هوشمند"
                            onClick={() => setIsSmartModalOpen(true)}
                        />
                    </div>
                </div>
            </section>
        </>
    )
}
