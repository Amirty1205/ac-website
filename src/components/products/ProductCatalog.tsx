'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cards from '@/components/Cards';
import {
  PRODUCT_CAPACITY_BY_CATEGORY,
  PRODUCT_CATEGORIES,
  PRODUCT_PRICE_RANGE,
  PRODUCT_SORT_OPTIONS,
  PRODUCT_BRANDS_BY_CATEGORY,
  fetchProducts,
  type Product,
  type ProductBoardType,
  type ProductCategory,
  type ProductFilters,
  type ProductSortMode,
} from '@/lib/products';

const boardTypeLabels: Record<ProductBoardType, string> = {
  inverter: 'اینورتر',
  'fixed-speed': 'دور ثابت',
};

interface ProductCatalogProps {
  initialProducts: Product[];
  initialTotal: number;
}

function formatPrice(value: number) {
  return `${value.toLocaleString('fa-IR')} ریال`;
}

function parseListParam(value: string | null): string[] {
  return value ? value.split(',').map((item) => item.trim()).filter(Boolean) : [];
}

function parseCategoryParam(value: string | null): ProductCategory {
  return PRODUCT_CATEGORIES.includes(value as ProductCategory)
    ? (value as ProductCategory)
    : 'کولر گازی';
}

function getInitialCatalogState() {
  const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const category = parseCategoryParam(params.get('category'));
  const min = Number(params.get('min') ?? PRODUCT_PRICE_RANGE[category].min);
  const max = Number(params.get('max') ?? PRODUCT_PRICE_RANGE[category].max);
  const priceRange: [number, number] = [
    Number.isFinite(min) ? min : PRODUCT_PRICE_RANGE[category].min,
    Number.isFinite(max) ? max : PRODUCT_PRICE_RANGE[category].max,
  ];

  return {
    category,
    sort: (params.get('sort') as ProductSortMode) ?? 'default',
    priceRange,
    brands: parseListParam(params.get('brand')),
    boardTypes: parseListParam(params.get('board')) as ProductBoardType[],
    capacities: parseListParam(params.get('capacity')).map(Number).filter((item) => Number.isFinite(item)),
  };
}

function PriceRangeSlider({
  min,
  max,
  value,
  onChange,
}: {
  min: number;
  max: number;
  value: [number, number];
  onChange: (next: [number, number]) => void;
}) {
  const [start, end] = value;
  const lowerValue = Math.min(start, end);
  const upperValue = Math.max(start, end);
  const lowerPercent = ((lowerValue - min) / (max - min)) * 100;
  const upperPercent = ((upperValue - min) / (max - min)) * 100;

  const handleMinChange = (nextValue: number) => {
    const safeValue = Math.min(nextValue, upperValue);
    onChange([safeValue, upperValue]);
  };

  const handleMaxChange = (nextValue: number) => {
    const safeValue = Math.max(nextValue, lowerValue);
    onChange([lowerValue, safeValue]);
  };

  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <div className="mb-3 flex items-center justify-between text-[11px] text-slate-600" dir="ltr" style={{ direction: 'ltr' }}>
        <span>{formatPrice(lowerValue)}</span>
        <span>{formatPrice(upperValue)}</span>
      </div>
      <div className="relative h-6" dir="ltr" style={{ direction: 'ltr' }}>
        <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-slate-200" />
        <div
          className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-brand-main"
          style={{ left: `${lowerPercent}%`, right: `${100 - upperPercent}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={1000000}
          value={lowerValue}
          onChange={(event) => handleMinChange(Number(event.target.value))}
          className="pointer-events-none absolute inset-0 h-6 w-full appearance-none bg-transparent accent-brand-main [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-brand-main [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-brand-main [&::-moz-range-thumb]:shadow-md"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={1000000}
          value={upperValue}
          onChange={(event) => handleMaxChange(Number(event.target.value))}
          className="pointer-events-none absolute inset-0 h-6 w-full appearance-none bg-transparent accent-brand-main [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-brand-main [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-brand-main [&::-moz-range-thumb]:shadow-md"
        />
      </div>
    </div>
  );
}

export default function ProductCatalog({
  initialProducts,
  initialTotal,
}: ProductCatalogProps) {
  const router = useRouter();
  const initialCatalogState = useMemo(() => getInitialCatalogState(), []);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(initialCatalogState.category);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [total, setTotal] = useState(initialTotal);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<ProductSortMode>(initialCatalogState.sort);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(initialCatalogState.brands);
  const [selectedBoardTypes, setSelectedBoardTypes] = useState<ProductBoardType[]>(initialCatalogState.boardTypes);
  const [selectedCapacities, setSelectedCapacities] = useState<number[]>(initialCatalogState.capacities);
  const [priceRange, setPriceRange] = useState<[number, number]>(initialCatalogState.priceRange);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [mobileSortOpen, setMobileSortOpen] = useState(false);

  const syncUrl = (
    nextCategory: ProductCategory = selectedCategory,
    nextSort: ProductSortMode = sort,
    nextPriceRange: [number, number] = priceRange,
    nextBrands: string[] = selectedBrands,
    nextBoardTypes: ProductBoardType[] = selectedBoardTypes,
    nextCapacities: number[] = selectedCapacities,
  ) => {
    const params = new URLSearchParams();

    params.set('category', nextCategory);

    if (nextSort !== 'default') {
      params.set('sort', nextSort);
    }

    const defaultMin = PRODUCT_PRICE_RANGE[nextCategory].min;
    const defaultMax = PRODUCT_PRICE_RANGE[nextCategory].max;

    if (nextPriceRange[0] !== defaultMin) {
      params.set('min', String(nextPriceRange[0]));
    }

    if (nextPriceRange[1] !== defaultMax) {
      params.set('max', String(nextPriceRange[1]));
    }

    if (nextBrands.length > 0) {
      params.set('brand', nextBrands.join(','));
    }

    if (nextBoardTypes.length > 0) {
      params.set('board', nextBoardTypes.join(','));
    }

    if (nextCapacities.length > 0) {
      params.set('capacity', nextCapacities.join(','));
    }

    const queryString = params.toString();
    const targetUrl = `${window.location.pathname}${queryString ? `?${queryString}` : ''}`;

    router.replace(targetUrl, { scroll: false });
  };

  useEffect(() => {
    const hasQueryValues = Boolean(
      initialCatalogState.category !== 'کولر گازی' ||
        initialCatalogState.sort !== 'default' ||
        initialCatalogState.brands.length > 0 ||
        initialCatalogState.boardTypes.length > 0 ||
        initialCatalogState.capacities.length > 0 ||
        initialCatalogState.priceRange[0] !== PRODUCT_PRICE_RANGE[initialCatalogState.category].min ||
        initialCatalogState.priceRange[1] !== PRODUCT_PRICE_RANGE[initialCatalogState.category].max,
    );

    if (hasQueryValues) {
      applyQuery(
        initialCatalogState.category,
        1,
        initialCatalogState.sort,
        initialCatalogState.priceRange,
        initialCatalogState.brands,
        initialCatalogState.boardTypes,
        initialCatalogState.capacities,
      );
    }
  }, []);

  const availableBrands = useMemo(
    () => PRODUCT_BRANDS_BY_CATEGORY[selectedCategory],
    [selectedCategory],
  );

  const availableCapacities = useMemo(
    () => PRODUCT_CAPACITY_BY_CATEGORY[selectedCategory],
    [selectedCategory],
  );

  const isWaterCategory = selectedCategory === 'تصفیه آب';
  const hasBoardTypeFilter = !isWaterCategory;
  const hasCapacityFilter = !isWaterCategory;

  const activeFilterCount =
    Number(selectedCategory !== 'کولر گازی') +
    Number(selectedBrands.length > 0) +
    Number(selectedBoardTypes.length > 0) +
    Number(selectedCapacities.length > 0) +
    Number(priceRange[0] !== PRODUCT_PRICE_RANGE[selectedCategory].min || priceRange[1] !== PRODUCT_PRICE_RANGE[selectedCategory].max);

  const applyQuery = (
    nextCategory: ProductCategory = selectedCategory,
    nextPage = 1,
    nextSort = sort,
    nextPriceRange = priceRange,
    nextBrands = selectedBrands,
    nextBoardTypes = selectedBoardTypes,
    nextCapacities = selectedCapacities,
  ) => {
    const filters: ProductFilters = {
      category: nextCategory,
      minPrice: nextPriceRange[0],
      maxPrice: nextPriceRange[1],
      brands: nextBrands,
      boardTypes: nextBoardTypes,
      capacities: nextCapacities,
    };

    const result = fetchProducts({
      category: nextCategory,
      page: nextPage,
      pageSize: 12,
      filters,
      sort: nextSort,
    });

    setProducts(result.items);
    setTotal(result.total);
    setPage(result.page);
  };

  const changeCategory = (category: ProductCategory) => {
    const nextRange: [number, number] = [
      PRODUCT_PRICE_RANGE[category].min,
      PRODUCT_PRICE_RANGE[category].max,
    ];

    setSelectedCategory(category);
    setSelectedBrands([]);
    setSelectedBoardTypes([]);
    setSelectedCapacities([]);
    setPriceRange(nextRange);
    setSort('default');
    setMobileFilterOpen(false);
    setMobileSortOpen(false);
    syncUrl(category, 'default', nextRange, [], [], []);
    applyQuery(category, 1, 'default', nextRange, [], [], []);
  };

  const toggleBrand = (brand: string) => {
    const next = selectedBrands.includes(brand)
      ? selectedBrands.filter((item) => item !== brand)
      : [...selectedBrands, brand];

    setSelectedBrands(next);
    syncUrl(selectedCategory, sort, priceRange, next, selectedBoardTypes, selectedCapacities);
    applyQuery(selectedCategory, 1, sort, priceRange, next, selectedBoardTypes, selectedCapacities);
  };

  const toggleBoardType = (boardType: ProductBoardType) => {
    const next = selectedBoardTypes.includes(boardType)
      ? selectedBoardTypes.filter((item) => item !== boardType)
      : [...selectedBoardTypes, boardType];

    setSelectedBoardTypes(next);
    syncUrl(selectedCategory, sort, priceRange, selectedBrands, next, selectedCapacities);
    applyQuery(selectedCategory, 1, sort, priceRange, selectedBrands, next, selectedCapacities);
  };

  const toggleCapacity = (capacity: number) => {
    const next = selectedCapacities.includes(capacity)
      ? selectedCapacities.filter((item) => item !== capacity)
      : [...selectedCapacities, capacity];

    setSelectedCapacities(next);
    syncUrl(selectedCategory, sort, priceRange, selectedBrands, selectedBoardTypes, next);
    applyQuery(selectedCategory, 1, sort, priceRange, selectedBrands, selectedBoardTypes, next);
  };

  const handleSortChange = (value: ProductSortMode) => {
    setSort(value);
    setMobileSortOpen(false);
    syncUrl(selectedCategory, value, priceRange, selectedBrands, selectedBoardTypes, selectedCapacities);
    applyQuery(selectedCategory, 1, value, priceRange, selectedBrands, selectedBoardTypes, selectedCapacities);
  };

  const handlePageChange = (nextPage: number) => {
    syncUrl(selectedCategory, sort, priceRange, selectedBrands, selectedBoardTypes, selectedCapacities);
    applyQuery(selectedCategory, nextPage, sort, priceRange, selectedBrands, selectedBoardTypes, selectedCapacities);
  };

  const handlePriceRangeChange = (nextRange: [number, number]) => {
    setPriceRange(nextRange);
    syncUrl(selectedCategory, sort, nextRange, selectedBrands, selectedBoardTypes, selectedCapacities);
    applyQuery(selectedCategory, 1, sort, nextRange, selectedBrands, selectedBoardTypes, selectedCapacities);
  };

  const resetFilters = () => {
    const defaultRange: [number, number] = [
      PRODUCT_PRICE_RANGE[selectedCategory].min,
      PRODUCT_PRICE_RANGE[selectedCategory].max,
    ];

    setSelectedBrands([]);
    setSelectedBoardTypes([]);
    setSelectedCapacities([]);
    setSort('default');
    setPriceRange(defaultRange);
    setMobileFilterOpen(false);
    syncUrl(selectedCategory, 'default', defaultRange, [], [], []);
    applyQuery(selectedCategory, 1, 'default', defaultRange, [], [], []);
  };

  const totalPages = Math.max(1, Math.ceil(total / 12));
  const pageTitle = `همه ${selectedCategory} ها`;

  const renderFilterPanel = () => (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-700">فیلترها</p>
        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={resetFilters}
            className="text-xs text-brand-main underline underline-offset-2"
          >
            پاک کردن
          </button>
        )}
      </div>

      <div className="mb-6">
        <p className="mb-3 text-sm font-semibold text-slate-700">دسته‌بندی</p>
        <div className="flex flex-wrap gap-2">
          {PRODUCT_CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => changeCategory(category)}
              className={`rounded-full border px-3 py-2 text-xs transition ${
                selectedCategory === category
                  ? 'border-brand-main bg-brand-main text-white'
                  : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-brand-main hover:text-brand-main'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <p className="mb-3 text-sm font-semibold text-slate-700">قیمت</p>
        <PriceRangeSlider
          min={PRODUCT_PRICE_RANGE[selectedCategory].min}
          max={PRODUCT_PRICE_RANGE[selectedCategory].max}
          value={priceRange}
          onChange={handlePriceRangeChange}
        />
      </div>

      {availableBrands.length > 0 && (
        <div className="mb-6">
          <p className="mb-3 text-sm font-semibold text-slate-700">برند</p>
          <div className="flex flex-wrap gap-2">
            {availableBrands.map((brand) => {
              const isSelected = selectedBrands.includes(brand);
              return (
                <button
                  key={brand}
                  type="button"
                  onClick={() => toggleBrand(brand)}
                  className={`rounded-full border px-3 py-2 text-xs transition ${
                    isSelected
                      ? 'border-brand-main bg-brand-main text-white'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-brand-main hover:text-brand-main'
                  }`}
                >
                  {brand}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {hasBoardTypeFilter && (
        <div className="mb-6">
          <p className="mb-3 text-sm font-semibold text-slate-700">نوع بورد</p>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(boardTypeLabels) as ProductBoardType[]).map((boardType) => {
              const isSelected = selectedBoardTypes.includes(boardType);
              return (
                <button
                  key={boardType}
                  type="button"
                  onClick={() => toggleBoardType(boardType)}
                  className={`rounded-full border px-3 py-2 text-xs transition ${
                    isSelected
                      ? 'border-brand-main bg-brand-main text-white'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-brand-main hover:text-brand-main'
                  }`}
                >
                  {boardTypeLabels[boardType]}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {hasCapacityFilter && availableCapacities.length > 0 && (
        <div>
          <p className="mb-3 text-sm font-semibold text-slate-700">
            {isWaterCategory ? 'ظرفیت (لیتر)' : 'ظرفیت (BTU)'}
          </p>
          <div className="flex flex-wrap gap-2">
            {availableCapacities.map((capacity) => {
              const isSelected = selectedCapacities.includes(capacity);
              return (
                <button
                  key={capacity}
                  type="button"
                  onClick={() => toggleCapacity(capacity)}
                  className={`rounded-full border px-3 py-2 text-xs transition ${
                    isSelected
                      ? 'border-brand-main bg-brand-main text-white'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-brand-main hover:text-brand-main'
                  }`}
                >
                  {capacity.toLocaleString('fa-IR')}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="px-4 pb-8 pt-12 sm:px-6 md:px-10 md:pt-16 lg:px-20 xl:px-28 xl:pt-20">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-brand-main">{pageTitle}</h1>
        <div className="hidden items-center gap-2 md:flex">
          <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-600">
            {total} محصول
          </span>
        </div>
      </div>

      <div className="mb-5 flex flex-wrap gap-2 md:hidden">
        <button
          type="button"
          onClick={() => setMobileSortOpen((open) => !open)}
          className="rounded-full bg-brand-main px-4 py-2 text-sm font-medium text-white shadow-sm"
        >
          مرتب‌سازی
        </button>
        <button
          type="button"
          onClick={() => setMobileFilterOpen(true)}
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
        >
          فیلترها {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}
        </button>
      </div>

      {mobileSortOpen && (
        <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm md:hidden">
          <div className="flex flex-col gap-2">
            {PRODUCT_SORT_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSortChange(option.value)}
                className={`rounded-full px-3 py-2 text-right text-sm ${
                  sort === option.value ? 'bg-brand-main text-white' : 'bg-slate-50 text-slate-700'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <aside className="hidden w-full shrink-0 lg:block lg:w-72">
          {renderFilterPanel()}
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-5 hidden flex-wrap gap-2 md:flex">
            {PRODUCT_SORT_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSortChange(option.value)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  sort === option.value
                    ? 'border-brand-main bg-brand-main text-white'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-brand-main hover:text-brand-main'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <Cards
                key={product.id}
                isProduct={product.isProduct}
                imageAlt={product.imageAlt}
                cardTitle={product.title}
                cardDesc={product.cardDesc}
                originalPrice={product.originalPrice}
                price={product.price}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => handlePageChange(Math.max(1, page - 1))}
                disabled={page === 1}
                className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                قبلی
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => handlePageChange(pageNumber)}
                  className={`rounded-full px-3 py-2 text-sm ${
                    pageNumber === page
                      ? 'bg-brand-main text-white'
                      : 'border border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  {pageNumber}
                </button>
              ))}

              <button
                type="button"
                onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                بعدی
              </button>
            </div>
          )}
        </div>
      </div>

      {mobileFilterOpen && (
        <div className="fixed inset-0 z-40 bg-slate-950/40 md:hidden" onClick={() => setMobileFilterOpen(false)}>
          <div
            className="absolute inset-x-4 bottom-4 rounded-3xl bg-white p-4 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="text-base font-semibold text-slate-800">فیلترها</p>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="text-sm text-slate-500"
              >
                بستن
              </button>
            </div>
            <div className="max-h-[70vh] overflow-y-auto">{renderFilterPanel()}</div>
          </div>
        </div>
      )}
    </div>
  );
}
