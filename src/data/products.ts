export type Product = {
    id: string
    isProduct: true
    title: string
    image: string
    imageAlt: string
    /** Cooling capacity in BTU */
    btu: number
    /** Recommended room area in square meters (مناسب برای n متر) */
    area: number
    /** true = cooling only, false = heating + cooling */
    coolOnly: boolean
    price: number
    originalPrice?: number
    rating: number
    cardDesc: string
}

export const products: Product[] = [
    {
        id: '1',
        isProduct: true,
        title: 'کولر گازی اسنوا مدل S-24BHH',
        image: '/images/544x408.svg',
        imageAlt: 'کولر گازی اسپلیت اسنوا ۲۴۰۰۰',
        btu: 24000,
        area: 35,
        coolOnly: false,
        price: 348000000,
        originalPrice: 392000000,
        rating: 4.5,
        cardDesc: 'کولر گازی اسپلیت سرد و گرم اینورتر با کمپرسور کم مصرف',
    },
    {
        id: '2',
        isProduct: true,
        title: 'کولر گازی ال‌جی مدل NeoPlus',
        image: '/images/544x408.svg',
        imageAlt: 'کولر گازی اسپلیت ال جی ۱۸۰۰۰',
        btu: 18000,
        area: 28,
        coolOnly: false,
        price: 289000000,
        originalPrice: 315000000,
        rating: 4.7,
        cardDesc: 'اسپلیت اینورتر با فیلتر ضد باکتری و کاهش صدای عملکرد',
    },
    {
        id: '3',
        isProduct: true,
        title: 'کولر گازی گری مدل G4matic',
        image: '/images/544x408.svg',
        imageAlt: 'کولر گازی اسپلیت گری ۱۲۰۰۰',
        btu: 12000,
        area: 18,
        coolOnly: false,
        price: 214000000,
        rating: 4.2,
        cardDesc: 'مناسب اتاق خواب و فضاهای کوچک با راندمان بالا',
    },
    {
        id: '4',
        isProduct: true,
        title: 'کولر گازی سامسونگ مدل Boracay',
        image: '/images/544x408.svg',
        imageAlt: 'کولر گازی اسپلیت سامسونگ ۹۰۰۰',
        btu: 9000,
        area: 14,
        coolOnly: true,
        price: 179000000,
        originalPrice: 198000000,
        rating: 4.0,
        cardDesc: 'اسپلیت سرد کم مصرف با طراحی باریک و نصب آسان',
    },
    {
        id: '5',
        isProduct: true,
        title: 'کولر گازی آاگ مدل Arctic-30',
        image: '/images/544x408.svg',
        imageAlt: 'کولر گازی اسپلیت آاگ ۳۰۰۰۰',
        btu: 30000,
        area: 45,
        coolOnly: false,
        price: 431000000,
        originalPrice: 469000000,
        rating: 4.6,
        cardDesc: 'قدرت سرمایش بالا برای سالن و فضاهای بزرگ',
    },
    {
        id: '6',
        isProduct: true,
        title: 'کولر گازی دوو مدل DWC-24',
        image: '/images/544x408.svg',
        imageAlt: 'کولر گازی اسپلیت دوو ۲۴۰۰۰',
        btu: 24000,
        area: 36,
        coolOnly: false,
        price: 336000000,
        rating: 4.1,
        cardDesc: 'سرد و گرم با گارانتی معتبر و سرویس سراسری',
    },
    {
        id: '7',
        isProduct: true,
        title: 'کولر گازی ایسان مدل EA-18',
        image: '/images/544x408.svg',
        imageAlt: 'کولر گازی اسپلیت ایسان ۱۸۰۰۰',
        btu: 18000,
        area: 30,
        coolOnly: true,
        price: 262000000,
        originalPrice: 284000000,
        rating: 3.8,
        cardDesc: 'اسپلیت سرد اقتصادی مناسب آب و هوای گرم',
    },
    {
        id: '8',
        isProduct: true,
        title: 'کولر گازی میتسوبیشی مدل SRK-12',
        image: '/images/544x408.svg',
        imageAlt: 'کولر گازی اسپلیت میتسوبیشی ۱۲۰۰۰',
        btu: 12000,
        area: 20,
        coolOnly: false,
        price: 258000000,
        rating: 4.8,
        cardDesc: 'کیفیت ژاپنی با مصرف انرژی پایین و دوام بالا',
    },
]
