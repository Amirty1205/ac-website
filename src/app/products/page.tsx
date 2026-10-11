import ProductCatalog from '@/components/products/ProductCatalog';
import { getProductsFromApi } from '@/lib/api';
import type { Product, ProductCategory } from '@/lib/products';

export default async function ProductsPage() {
  const apiProducts = await getProductsFromApi();

  const products: Product[] = apiProducts
    .filter((product) => product.active)
    .map((product) => ({
      id: String(product.id),
      isProduct: true,
      category: product.category as ProductCategory,
      title: product.name,
      image: product.imageUrl || '',
      imageAlt: product.name,
      price: product.price,
      cardDesc: product.description || `${product.brand} — ${product.name}`,
      originalPrice: product.originalPrice ?? product.price,
      rating: product.rating ?? 0,
      brand: product.brand,
      boardType:
        product.boardType === 'fixed-speed' ? 'fixed-speed' : 'inverter',
      capacity: product.capacity ?? 12000,
      sales: product.sales ?? 0,
      views: product.views ?? 0,
    }));


  return (
    <ProductCatalog
      initialProducts={products}
      initialTotal={products.length}
      initialCategory="air-conditioner"
    />
  );
}
