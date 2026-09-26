'use client'

import Cards from "../Cards";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const dummyProducts = [
    {
        id: '1',
        isProduct: true,
        title: 'کولر گازی اسپلیت مدل A220c',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop',
        imageAlt: "",
        price: 10000000,
        cardDesc: 'بنیبیسد دنمبدن دسنمید یدنسشمید یدنسمدین یدنسشمدن ددیبن ثبهعید دبیسدنب دنبیسدنب دلدتقلق تدلتقم سلم خحدنبب دبنیمبدشبشنیدب دبین دبند پبنم',
        originalPrice: 12000000,
        rating: 3.2,
    }, {
        id: '2',
        isProduct: true,
        title: 'کولر گازی اسپلیت مدل A220c',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop',
        imageAlt: "",
        price: 10000000,
        cardDesc: 'بنیبیسد دنمبدن دسنمید یدنسشمید یدنسمدین یدنسشمدن ددیبن ثبهعید دبیسدنب دنبیسدنب دلدتقلق تدلتقم سلم خحدنبب دبنیمبدشبشنیدب دبین دبند پبنم',
        originalPrice: 12000000,
        rating: 3.2,
    }, {
        id: '3',
        isProduct: true,
        title: 'کولر گازی اسپلیت مدل A220c',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop',
        imageAlt: "",
        price: 10000000,
        cardDesc: 'بنیبیسد دنمبدن دسنمید یدنسشمید یدنسمدین یدنسشمدن ددیبن ثبهعید دبیسدنب دنبیسدنب دلدتقلق تدلتقم سلم خحدنبب دبنیمبدشبشنیدب دبین دبند پبنم',
        originalPrice: 12000000,
        rating: 3.2,
    }, {
        id: '4',
        isProduct: true,
        title: 'کولر گازی اسپلیت مدل A220c',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop',
        imageAlt: "",
        price: 10000000,
        cardDesc: 'بنیبیسد دنمبدن دسنمید یدنسشمید یدنسمدین یدنسشمدن ددیبن ثبهعید دبیسدنب دنبیسدنب دلدتقلق تدلتقم سلم خحدنبب دبنیمبدشبشنیدب دبین دبند پبنم',
        rating: 3.2,
    },
];

export default function Products() {
    return (
        <section className="px-4 sm:px-8 lg:px-28 mt-16 sm:mt-24 md:mt-48">
            <div>
                <h2 className="text-3xl font-medium text-center mb-5 md:mb-13">محصولات ما</h2>
            </div>
            <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={16}
            slidesPerView={1.5}
            centeredSlides
            navigation
            pagination={{clickable: true}}
            autoplay={{delay: 3000, disableOnInteraction: false}}
            breakpoints={{
                640: {
                    slidesPerView: 2.5
                },
                1024: {
                    slidesPerView: 3.5
                }
            }}
            dir="rtl"
            >
                {
                    dummyProducts.map((product) => (
                        <SwiperSlide className="py-3 active:scale-95 hover:cursor-pointer hover:scale-105 transition-all ease-in" key={product.id}>
                            <Cards
                                isProduct={product.isProduct}
                                imageAlt={product.imageAlt}
                                cardTitle={product.title}
                                cardDesc={product.cardDesc}
                                originalPrice={product.originalPrice}
                                price={product.price}
                            />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </section>
    )
}
