import Cards

    from "@/components/Cards"


export default function ProductsPage() {

    const productِypes = [
        "Ac", "WaterFilteration", "Radiator"
    ]
    const dummy = [
        {
            id: '1',
            isProduct: true,
            title: "کولر گازی اسپلیت دیواری 12000 اینورتر هایسنس مدل QAS-12UW",
            images: [
                "/images/split.webp", "/images/AC.webp"
            ],
            Price: 77000000,
            originalPrice: 85000000,
            rating: '3.5',
            type: 'wall-split',
            efficiency: 'A++',
            inverter: true,
            climate: 'T1',
            power: 1100,
            capacity: 12000,
            desc: ""
        }
    ]

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


    return (
        <div className="sm:mx-5 md:mx-10 lg:mx-53 py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-sm:gap-2">
                {
                    dummyProducts.map((product) => (
                        <Cards
                            key={product.id}
                            isProduct={product.isProduct}
                            imageAlt={product.imageAlt}
                            cardTitle={product.title}
                            cardDesc={product.cardDesc}
                            originalPrice={product.originalPrice}
                            price={product.price}
                        />
                    ))
                }
            </div>
        </div>
    )
}

