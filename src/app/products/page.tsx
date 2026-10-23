import ProductCatalog from '@/components/products/ProductCatalog';
import { getProductsFromApi } from '@/lib/api';
import type { Product, ProductCategory } from '@/lib/products';

export default async function ProductsPage() {
  return (
    <ProductCatalog
      initialProducts={[]}
      initialTotal={0}
      initialCategory="air-conditioner"
    />
  );
}
