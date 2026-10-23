
import dummyProducts from "./products";

export interface ApiProduct {
    id: number;
    name: string;
    brand: string;
    category: string;
    price: number;
    originalPrice: number | null;
    description: string | null;
    imageUrl: string | null;
    capacity: number | null;
    boardType: string | null;
    rating: number | null;
    sales: number | null;
    views: number | null;
    stock: number;
    active: boolean;
}

function getFallbackProducts(): ApiProduct[] {
    return dummyProducts.map((product, index) => ({
        id: index + 1,
        name: product.title,
        brand: product.brand,
        category: product.category,
        price: product.price,
        originalPrice: product.originalPrice,
        description: product.cardDesc,
        imageUrl: product.image,
        capacity: product.capacity,
        boardType: product.boardType,
        rating: product.rating,
        sales: product.sales,
        views: product.views,
        stock: 10,
        active: true,
    }));
}

export async function getProductsFromApi(): Promise<ApiProduct[]> {
    const baseUrl = process.env.DARAB_API_URL;

    // No backend URL configured: use demo products.
    if (!baseUrl) {
        console.warn("DARAB_API_URL is not configured. Using dummy products.");
        return getFallbackProducts();
    }

    try {
        const response = await fetch(`${baseUrl}/api/products`, {
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch products: ${response.status}`);
        }

        return await response.json() as ApiProduct[];
    } catch (error) {
        console.warn(
            "Darab backend unavailable. Using dummy products instead.",
            error,
        );

        return getFallbackProducts();
    }
}
