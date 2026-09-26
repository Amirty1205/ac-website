'use client'

import Cards from "../Cards";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const dummyBlogs = [
    {
        id: '1',
        isProduct: false,
        userName: "Amir H. Teymuri",
        avatar:"/vercel.svg",
        postDate: new Date(2026135),
        title: 'کولر گازی اسپلیت مدل A220c',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop',
        imageAlt: "",
        cardDesc: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی...",
    },
    {
        id: '2',
        isProduct: false,
        userName: "Amir H. Teymuri",
        avatar:"/vercel.svg",
        postDate: new Date(2026135),
        title: 'کولر گازی اسپلیت مدل A220c',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop',
        imageAlt: "",
        cardDesc: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی...",
    },
    {
        id: '3',
        isProduct: false,
        userName: "Amir H. Teymuri",
        avatar:"/vercel.svg",
        postDate: new Date(2026135),
        title: 'کولر گازی اسپلیت مدل A220c',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop',
        imageAlt: "",
        cardDesc: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی...",
    },
    {
        id: '4',
        isProduct: false,
        userName: "Amir H. Teymuri",
        avatar:"/vercel.svg",
        postDate: new Date(2026135),
        title: 'کولر گازی اسپلیت مدل A220c',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop',
        imageAlt: "",
        cardDesc: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی...",
    },
];

export default function Blog() {
    return (
        <section className="px-4 mb-16 sm:px-8 lg:px-28 mt-16 sm:mt-24 md:mt-48">
            <div>
                <h2 className="text-3xl font-medium text-center mb-5 md:mb-13">مجله داراب</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    dummyBlogs.map((blog) => (
                        <Cards
                            key={blog.id}
                            isProduct={blog.isProduct}
                            imageAlt={blog.imageAlt}
                            cardTitle={blog.title}
                            cardDesc={blog.cardDesc}
                            avatar={blog.avatar}
                            userName={blog.userName}
                            postDate={blog.postDate}
                        />
                    ))
                }
            </div>
        </section>
    )
}



{/*  */ }