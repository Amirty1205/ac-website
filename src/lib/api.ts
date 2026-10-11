
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

export async function getProductsFromApi(): Promise<ApiProduct[]> {
    const baseUrl = process.env.DARAB_API_URL;

    if (!baseUrl) {
        throw new Error('DARAB_API_URL is not configured');
    }

    const response = await fetch(`${baseUrl}/api/products`, {
        cache: 'no-store',
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`);
    }

    return response.json();
}
