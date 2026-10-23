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

export interface ApiProductListResponse {
    items: ApiProduct[];
    page: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    hasNext: boolean;
}

export interface ApiFilterOption {
    value: string;
    label: string;
}

export interface ApiPriceRange {
    min: number;
    max: number;
}

export interface ApiProductFilterMetadata {
    categories: ApiFilterOption[];
    priceRangeByCategory: Record<string, ApiPriceRange>;
    brandsByCategory: Record<string, string[]>;
    capacitiesByCategory: Record<string, number[]>;
    boardTypesByCategory: Record<string, string[]>;
}

export type ApiProductListQuery = Partial<{
    page: number;
    pageSize: number;
    category: string;
    sort: string;
    min: number;
    max: number;
    brand: string;
    board: string;
    capacity: string;
}>;

function getApiBaseUrl(): string {
    const baseUrl = process.env.NEXT_PUBLIC_DARAB_API_URL ?? process.env.DARAB_API_URL;

    if (!baseUrl) {
        throw new Error("DARAB_API_URL is not configured.");
    }

    return baseUrl;
}

export async function getProductsFromApi(
    params: ApiProductListQuery = {},
): Promise<ApiProductListResponse> {
    const baseUrl = getApiBaseUrl();

    const url = new URL(`${baseUrl.replace(/\/$/, "")}/api/products`);

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            url.searchParams.set(key, String(value));
        }
    });

    const response = await fetch(url.toString(), {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`);
    }

    const payload: unknown = await response.json();

    if (
        !payload ||
        typeof payload !== "object" ||
        !Array.isArray((payload as { items?: unknown }).items)
    ) {
        throw new Error("Unexpected products response format from backend.");
    }

    return payload as ApiProductListResponse;
}

export async function getProductFilterOptionsFromApi(): Promise<ApiProductFilterMetadata> {
    const baseUrl = getApiBaseUrl();

    const response = await fetch(`${baseUrl.replace(/\/$/, "")}/api/products/filter-options`, {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch product filters: ${response.status}`);
    }

    const payload: unknown = await response.json();

    if (!payload || typeof payload !== "object") {
        throw new Error("Unexpected product filter response format from backend.");
    }

    return payload as ApiProductFilterMetadata;
}

export async function getProductByIdFromApi(productId: number): Promise<ApiProduct> {
    const baseUrl = getApiBaseUrl();

    const response = await fetch(`${baseUrl.replace(/\/$/, "")}/api/products/${productId}`, {
        cache: "no-store",
    });

    if (!response.ok) {
        if (response.status === 404) {
            const error = new Error("Product not found") as Error & { status?: number };
            error.status = 404;
            throw error;
        }

        throw new Error(`Failed to fetch product: ${response.status}`);
    }

    const product: unknown = await response.json();

    if (!product || typeof product !== "object") {
        throw new Error("Unexpected product response format from backend.");
    }

    return product as ApiProduct;
}
