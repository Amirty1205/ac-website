export type ProductBoardType = "inverter" | "fixed-speed";
export type ProductCategory = "کولر گازی" | "پکیج" | "تصفیه آب";
export type ProductSortMode =
    | "default"
    | "cheapest"
    | "expensive"
    | "best-selling"
    | "most-viewed";

export interface Product {
    id: string;
    isProduct: true;
    category: ProductCategory;
    title: string;
    image: string;
    imageAlt: string;
    price: number;
    cardDesc: string;
    originalPrice: number;
    rating: number;
    brand: string;
    boardType: ProductBoardType;
    capacity: number;
    sales: number;
    views: number;
}

export interface ProductFilters {
    minPrice?: number;
    maxPrice?: number;
    brands?: string[];
    boardTypes?: ProductBoardType[];
    capacities?: number[];
    category?: ProductCategory;
}

export const PRODUCT_PAGE_SIZE = 12;

export const PRODUCT_CATEGORIES = ["کولر گازی", "پکیج", "تصفیه آب"] as const;

export const PRODUCT_PRICE_RANGE: Record<ProductCategory, { min: number; max: number }> = {
    "کولر گازی": { min: 20000000, max: 100000000 },
    پکیج: { min: 30000000, max: 180000000 },
    "تصفیه آب": { min: 5000000, max: 50000000 },
};

export const PRODUCT_BRANDS_BY_CATEGORY: Record<ProductCategory, string[]> = {
    "کولر گازی": ["گری", "ایران رادیاتور", "جنرال گلد", "هایسنس", "ال جی", "سامسونگ"],
    پکیج: ["گری", "ایران رادیاتور", "جنرال گلد", "هایسنس", "ال جی", "سامسونگ"],
    "تصفیه آب": ["آب طلایی", "آبسرد", "پارس آب", "هیراد", "نیکان", "پالایش"],
};

export const PRODUCT_CAPACITY_BY_CATEGORY: Record<ProductCategory, number[]> = {
    "کولر گازی": [12000, 18000, 24000, 30000, 36000],
    پکیج: [18000, 24000, 30000, 42000],
    "تصفیه آب": [60, 120, 180, 240],
};

export const PRODUCT_SORT_OPTIONS: Array<{ value: ProductSortMode; label: string }> = [
    { value: "default", label: "پیش‌فرض" },
    { value: "cheapest", label: "ارزان‌ترین" },
    { value: "expensive", label: "گران‌ترین" },
    { value: "best-selling", label: "پرفروش‌ترین" },
    { value: "most-viewed", label: "پربازدیدترین" },
];

function buildProduct({
    id,
    category,
    title,
    brand,
    price,
    capacity,
    boardType,
    image,
    rating,
    sales,
    views,
}: {
    id: string;
    category: ProductCategory;
    title: string;
    brand: string;
    price: number;
    capacity: number;
    boardType: ProductBoardType;
    image: string;
    rating: number;
    sales: number;
    views: number;
}): Product {
    return {
        id,
        category,
        isProduct: true,
        title,
        brand,
        price,
        cardDesc:
            category === "تصفیه آب"
                ? `${brand} ${title} با ظرفیت ${capacity} لیتری و عملکرد تصفیه سریع، مناسب خانه و محیط‌های اداری.`
                : `${title} با ظرفیت ${capacity} و عملکرد ${boardType === "inverter" ? "اینورتر" : "دور ثابت"} مناسب برای استفاده روزمره و مصرف انرژی بهینه.`,
        image,
        imageAlt: title,
        originalPrice: Math.round(price * 1.09),
        rating,
        boardType,
        capacity,
        sales,
        views,
    };
}

const airConditionerBrands = ["گری", "ایران رادیاتور", "جنرال گلد", "هایسنس", "ال جی", "سامسونگ"];
const packageBrands = ["گری", "ایران رادیاتور", "جنرال گلد", "هایسنس", "ال جی", "سامسونگ"];
const purifierBrands = ["آب طلایی", "آبسرد", "پارس آب", "هیراد", "نیکان", "پالایش"];

const airConditionerCapacities = [12000, 18000, 24000, 30000, 36000];
const packageCapacities = [18000, 24000, 30000, 42000];
const purifierCapacities = [60, 120, 180, 240];

const airConditioners: Product[] = airConditionerBrands.flatMap((brand, brandIndex) =>
    airConditionerCapacities.map((capacity, capacityIndex) => {
        const price =
            capacity === 12000 ? 29000000 :
                capacity === 18000 ? 39000000 :
                    capacity === 24000 ? 52000000 :
                        capacity === 30000 ? 72000000 : 90000000;

        const productPrice = price + brandIndex * 2500000 + capacityIndex * 1800000;

        return buildProduct({
            id: `ac-${brandIndex + 1}-${capacity}`,
            category: "کولر گازی",
            title: `کولر گازی اسپلیت ${capacity} ${brand}`,
            brand,
            price: productPrice,
            capacity,
            boardType: capacityIndex % 2 === 0 ? "inverter" : "fixed-speed",
            image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=400&fit=crop",
            rating: 4 + ((brandIndex + capacityIndex) % 5) / 10,
            sales: 120 + brandIndex * 18 + capacityIndex * 15,
            views: 700 + brandIndex * 140 + capacityIndex * 105,
        });
    }),
);

const packages: Product[] = packageBrands.flatMap((brand, brandIndex) =>
    packageCapacities.map((capacity, capacityIndex) => {
        const basePrice =
            capacity === 18000 ? 56000000 :
                capacity === 24000 ? 76000000 :
                    capacity === 30000 ? 98000000 : 138000000;

        const productPrice = basePrice + brandIndex * 3300000 + capacityIndex * 2600000;

        return buildProduct({
            id: `pkg-${brandIndex + 1}-${capacity}`,
            category: "پکیج",
            title: `پکیج ${capacity} ${brand}`,
            brand,
            price: productPrice,
            capacity,
            boardType: capacityIndex % 2 === 0 ? "inverter" : "fixed-speed",
            image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop",
            rating: 4.1 + ((brandIndex + capacityIndex) % 5) / 10,
            sales: 100 + brandIndex * 22 + capacityIndex * 18,
            views: 650 + brandIndex * 150 + capacityIndex * 110,
        });
    }),
);

const waterPurifiers: Product[] = purifierBrands.flatMap((brand, brandIndex) =>
    purifierCapacities.map((capacity, capacityIndex) => {
        const basePrice =
            capacity === 60 ? 12000000 :
                capacity === 120 ? 20000000 :
                    capacity === 180 ? 29000000 : 39000000;

        const productPrice = basePrice + brandIndex * 1800000 + capacityIndex * 2200000;

        return buildProduct({
            id: `water-${brandIndex + 1}-${capacity}`,
            category: "تصفیه آب",
            title: `تصفیه آب ${capacity} لیتری ${brand}`,
            brand,
            price: productPrice,
            capacity,
            boardType: capacityIndex % 2 === 0 ? "inverter" : "fixed-speed",
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
            rating: 4.2 + ((brandIndex + capacityIndex) % 4) / 10,
            sales: 90 + brandIndex * 20 + capacityIndex * 17,
            views: 540 + brandIndex * 130 + capacityIndex * 100,
        });
    }),
);

const products: Product[] = [...airConditioners, ...packages, ...waterPurifiers];

export const PRODUCT_BRANDS = [...new Set(products.map((product) => product.brand))];
export const PRODUCT_CAPACITIES = [...new Set(products.map((product) => product.capacity))].sort(
    (a, b) => a - b,
);

export function getFeaturedProducts(limit = 8): Product[] {
    return [...products].sort((a, b) => b.sales - a.sales).slice(0, limit);
}

export function getProductsPage({
    page = 1,
    pageSize = PRODUCT_PAGE_SIZE,
    category = "کولر گازی",
    filters = {},
    sort = "default",
}: {
    page?: number;
    pageSize?: number;
    category?: ProductCategory;
    filters?: ProductFilters;
    sort?: ProductSortMode;
} = {}) {
    const normalizedFilters: Required<ProductFilters> = {
        minPrice: filters.minPrice ?? PRODUCT_PRICE_RANGE[category].min,
        maxPrice: filters.maxPrice ?? PRODUCT_PRICE_RANGE[category].max,
        brands: filters.brands ?? [],
        boardTypes: filters.boardTypes ?? [],
        capacities: filters.capacities ?? [],
        category,
    };

    const filteredProducts = [...products].filter((product) => {
        if (product.category !== normalizedFilters.category) return false;
        if (product.price < normalizedFilters.minPrice) return false;
        if (product.price > normalizedFilters.maxPrice) return false;
        if (normalizedFilters.brands.length > 0 && !normalizedFilters.brands.includes(product.brand)) {
            return false;
        }
        if (
            normalizedFilters.boardTypes.length > 0 &&
            !normalizedFilters.boardTypes.includes(product.boardType)
        ) {
            return false;
        }
        if (
            normalizedFilters.capacities.length > 0 &&
            !normalizedFilters.capacities.includes(product.capacity)
        ) {
            return false;
        }

        return true;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sort) {
            case "cheapest":
                return a.price - b.price;
            case "expensive":
                return b.price - a.price;
            case "best-selling":
                return b.sales - a.sales;
            case "most-viewed":
                return b.views - a.views;
            case "default":
            default:
                return Number(a.id.replace(/\D/g, "")) - Number(b.id.replace(/\D/g, ""));
        }
    });

    const start = (page - 1) * pageSize;
    const items = sortedProducts.slice(start, start + pageSize);

    return {
        items,
        total: sortedProducts.length,
        page,
        pageSize,
        hasMore: start + pageSize < sortedProducts.length,
        category,
    };
}

export const fetchProducts = getProductsPage;

export default products;
