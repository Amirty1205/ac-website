import ProductCatalog from '@/components/products/ProductCatalog';
import { PRODUCT_PAGE_SIZE, fetchProducts } from '@/lib/products';

export default async function ProductsPage() {
  const pageResult = fetchProducts({ page: 1, pageSize: PRODUCT_PAGE_SIZE });

  return (
    <ProductCatalog
      initialProducts={pageResult.items}
      initialTotal={pageResult.total}
    />
  );
}

