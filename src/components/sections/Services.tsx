import { CTAButton } from "../CTAbutton"

export default function Services() {
    return (
        <section className="px-4 sm:px-8 lg:px-28 mt-16 sm:mt-24 md:mt-48">
            <div className="max-w-7xl mx-auto space-y-8">
                <h2 className="text-3xl font-medium text-center mb-8 md:mb-16">خدمات ما</h2>

                {/* Service 1: Text + Image */}
                <div className="grid md:grid-cols-[1fr_1.2fr] gap-6 md:gap-20 items-center mb-16 md:mb-40">
                    <div className="text-center md:text-right">
                        <h3 className="font-normal text-2xl sm:text-3xl">
                            نصب و راه‌اندازی
                        </h3>
                        <p className="text-gray-600 mt-4 md:mt-8 text-base md:text-lg">
                            تیم مجرب داراب با بیش از یک‌هزار نصاب متخصص در سراسر کشور
                            انواع سیستم‌های سرمایشی و گرمایشی مانند کولر گازی، پکیج، و گرمایش از کف را برعهده میگیرد.
                        </p>
                    </div>
                    <div className="w-full h-48 sm:h-60 md:h-80 bg-gray-200 rounded-2xl" />
                </div>

                {/* Service 2: Image + Text */}
                <div className="grid md:grid-cols-[1.2fr_1fr] gap-6 md:gap-20 items-center mb-16 md:mb-40">
                    <div className="w-full h-48 sm:h-60 md:h-80 bg-gray-200 rounded-2xl order-2 md:order-1" />

                    <div className="text-center md:text-right order-1 md:order-2">
                        <h3 className="font-normal text-2xl sm:text-3xl">
                            سرویس و نگهداری
                        </h3>
                        <p className="text-gray-600 mt-4 md:mt-8 text-base md:text-lg">
                            با سرویس های به‌موقع طول عمر دستگاه‌های خود را چند برابر کنید و از هزینه‌ها در دراز مدت صرفه‌جویی کنید،
                            شما میتوانید این وظایف را به داراب بسپارید تا از مناسب ترین قیمت‌ها برخوردار شوید.
                        </p>
                    </div>
                </div>

                {/* Service 3: Text + Image */}
                <div className="grid md:grid-cols-[1fr_1.2fr] gap-6 md:gap-20 items-center">
                    <div className="text-center md:text-right">
                        <h3 className="font-normal text-2xl sm:text-3xl">
                            تعمیرات تخصصی
                        </h3>
                        <p className="text-gray-600 mt-4 md:mt-8 text-base md:text-lg">
                            با سرویس های به‌موقع طول عمر دستگاه‌های خود را چند برابر کنید و از هزینه‌ها در دراز مدت صرفه‌جویی کنید،
                            شما میتوانید این وظایف را به داراب بسپارید تا از مناسب ترین قیمت‌ها برخوردار شوید.
                        </p>
                    </div>
                    <div className="w-full h-48 sm:h-60 md:h-80 bg-gray-200 rounded-2xl" />
                </div>

                {/* CTA Section */}
                <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto pt-4 md:pt-8">
                    <p className="text-gray-600 text-sm md:text-base">
                        گوش به زنگ تماس های شما جهت کسب اطلاعات بیشتر و مشاوره هستیم
                    </p>
                    <CTAButton title="" text="تماس بگیرید" />
                </div>
            </div>
        </section>
    )
}
