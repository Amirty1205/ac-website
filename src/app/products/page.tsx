import ProductCatalog from '@/components/products/ProductCatalog';
import {
  PRODUCT_CATEGORIES,
  PRODUCT_PAGE_SIZE,
  fetchProducts,
  type ProductCategory,
} from '@/lib/products';

type ProductSearchParams = Record<string, string | string[] | undefined>;

function normalizeCategory(value: string | string[] | undefined): ProductCategory {
  const rawValue = Array.isArray(value) ? value[0] : value;

  return rawValue && PRODUCT_CATEGORIES.includes(rawValue as ProductCategory)
    ? (rawValue as ProductCategory)
    : 'کولر گازی';
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: ProductSearchParams | Promise<ProductSearchParams>;
}) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const category = normalizeCategory(resolvedSearchParams.category);
  const pageResult = fetchProducts({ page: 1, pageSize: PRODUCT_PAGE_SIZE, category });

  return (
    <ProductCatalog
      initialProducts={pageResult.items}
      initialTotal={pageResult.total}
      initialCategory={category}
    />
  );
}

