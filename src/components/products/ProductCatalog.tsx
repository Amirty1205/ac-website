'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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
  initialCategory?: ProductCategory;
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

type CatalogState = {
  category: ProductCategory;
  page: number;
  sort: ProductSortMode;
  priceRange: [number, number];
  brands: string[];
  boardTypes: ProductBoardType[];
  capacities: number[];
};

function getInitialCatalogState(params: URLSearchParams, fallbackCategory: ProductCategory = 'کولر گازی'): CatalogState {
  const category = parseCategoryParam(params.get('category') ?? fallbackCategory);
  const min = Number(params.get('min') ?? PRODUCT_PRICE_RANGE[category].min);
  const max = Number(params.get('max') ?? PRODUCT_PRICE_RANGE[category].max);
  const priceRange: [number, number] = [
    Number.isFinite(min) ? min : PRODUCT_PRICE_RANGE[category].min,
    Number.isFinite(max) ? max : PRODUCT_PRICE_RANGE[category].max,
  ];
  const pageValue = Number(params.get('page') ?? 1);

  return {
    category,
    page: Number.isFinite(pageValue) && pageValue > 0 ? Math.floor(pageValue) : 1,
    sort: PRODUCT_SORT_OPTIONS.some((option) => option.value === params.get('sort'))
      ? (params.get('sort') as ProductSortMode)
      : 'default',
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
  initialCategory = 'کولر گازی',
}: ProductCatalogProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const defaultCategory = initialCategory || 'کولر گازی';
  const catalogState = useMemo(
    () => getInitialCatalogState(new URLSearchParams(searchParams.toString()), defaultCategory),
    [defaultCategory, searchParams],
  );

  const selectedCategory = catalogState.category;
  const sort = catalogState.sort;
  const selectedBrands = catalogState.brands;
  const selectedBoardTypes = catalogState.boardTypes;
  const selectedCapacities = catalogState.capacities;
  const priceRange = catalogState.priceRange;
  const page = catalogState.page;
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [mobileSortOpen, setMobileSortOpen] = useState(false);
  const [draftPriceRange, setDraftPriceRange] = useState<[number, number]>(priceRange);
  const [isPriceRangeDragging, setIsPriceRangeDragging] = useState(false);
  const priceRangeDebounceRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (priceRangeDebounceRef.current !== null) {
        window.clearTimeout(priceRangeDebounceRef.current);
      }
    };
  }, []);

  const displayedPriceRange =
    isPriceRangeDragging ||
    draftPriceRange[0] !== priceRange[0] ||
    draftPriceRange[1] !== priceRange[1]
      ? draftPriceRange
      : priceRange;

  const syncUrl = (nextState: Partial<CatalogState> = catalogState) => {
    const mergedState: CatalogState = {
      ...catalogState,
      ...nextState,
    };

    const params = new URLSearchParams();

    params.set('category', mergedState.category);

    if (mergedState.page > 1) {
      params.set('page', String(mergedState.page));
    }

    if (mergedState.sort !== 'default') {
      params.set('sort', mergedState.sort);
    }

    const defaultMin = PRODUCT_PRICE_RANGE[mergedState.category].min;
    const defaultMax = PRODUCT_PRICE_RANGE[mergedState.category].max;

    if (mergedState.priceRange[0] !== defaultMin) {
      params.set('min', String(mergedState.priceRange[0]));
    }

    if (mergedState.priceRange[1] !== defaultMax) {
      params.set('max', String(mergedState.priceRange[1]));
    }

    if (mergedState.brands.length > 0) {
      params.set('brand', mergedState.brands.join(','));
    }

    if (mergedState.boardTypes.length > 0) {
      params.set('board', mergedState.boardTypes.join(','));
    }

    if (mergedState.capacities.length > 0) {
      params.set('capacity', mergedState.capacities.join(','));
    }

    const queryString = params.toString();
    const targetUrl = `${window.location.pathname}${queryString ? `?${queryString}` : ''}`;

    router.replace(targetUrl, { scroll: false });
  };

  const isDefaultCatalogState =
    selectedCategory === defaultCategory &&
    sort === 'default' &&
    selectedBrands.length === 0 &&
    selectedBoardTypes.length === 0 &&
    selectedCapacities.length === 0 &&
    page === 1 &&
    priceRange[0] === PRODUCT_PRICE_RANGE[defaultCategory].min &&
    priceRange[1] === PRODUCT_PRICE_RANGE[defaultCategory].max;

  const productResult = useMemo(() => {
    if (isDefaultCatalogState) {
      return {
        items: initialProducts,
        total: initialTotal,
        page,
      };
    }

    const filters: ProductFilters = {
      category: selectedCategory,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      brands: selectedBrands,
      boardTypes: selectedBoardTypes,
      capacities: selectedCapacities,
    };

    return fetchProducts({
      category: selectedCategory,
      page,
      pageSize: 12,
      filters,
      sort,
    });
  }, [initialProducts, initialTotal, isDefaultCatalogState, page, priceRange, selectedBoardTypes, selectedBrands, selectedCapacities, selectedCategory, sort]);

  const products = productResult.items;
  const total = productResult.total;

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
    Number(selectedCategory !== defaultCategory) +
    Number(selectedBrands.length > 0) +
    Number(selectedBoardTypes.length > 0) +
    Number(selectedCapacities.length > 0) +
    Number(priceRange[0] !== PRODUCT_PRICE_RANGE[selectedCategory].min || priceRange[1] !== PRODUCT_PRICE_RANGE[selectedCategory].max);

  const changeCategory = (category: ProductCategory) => {
    const nextRange: [number, number] = [
      PRODUCT_PRICE_RANGE[category].min,
      PRODUCT_PRICE_RANGE[category].max,
    ];

    setMobileFilterOpen(false);
    setMobileSortOpen(false);
    setDraftPriceRange(nextRange);
    setIsPriceRangeDragging(false);
    syncUrl({
      category,
      page: 1,
      sort: 'default',
      priceRange: nextRange,
      brands: [],
      boardTypes: [],
      capacities: [],
    });
  };

  const toggleBrand = (brand: string) => {
    const next = selectedBrands.includes(brand)
      ? selectedBrands.filter((item) => item !== brand)
      : [...selectedBrands, brand];

    syncUrl({ brands: next, page: 1 });
  };

  const toggleBoardType = (boardType: ProductBoardType) => {
    const next = selectedBoardTypes.includes(boardType)
      ? selectedBoardTypes.filter((item) => item !== boardType)
      : [...selectedBoardTypes, boardType];

    syncUrl({ boardTypes: next, page: 1 });
  };

  const toggleCapacity = (capacity: number) => {
    const next = selectedCapacities.includes(capacity)
      ? selectedCapacities.filter((item) => item !== capacity)
      : [...selectedCapacities, capacity];

    syncUrl({ capacities: next, page: 1 });
  };

  const handleSortChange = (value: ProductSortMode) => {
    setMobileSortOpen(false);
    syncUrl({ sort: value, page: 1 });
  };

  const handlePageChange = (nextPage: number) => {
    syncUrl({ page: nextPage });
  };

  const handlePriceRangeChange = (nextRange: [number, number]) => {
    setDraftPriceRange(nextRange);
    setIsPriceRangeDragging(true);

    if (priceRangeDebounceRef.current !== null) {
      window.clearTimeout(priceRangeDebounceRef.current);
    }

    priceRangeDebounceRef.current = window.setTimeout(() => {
      setIsPriceRangeDragging(false);
      syncUrl({ priceRange: nextRange, page: 1 });
    }, 200);
  };

  const resetFilters = () => {
    const defaultRange: [number, number] = [
      PRODUCT_PRICE_RANGE[selectedCategory].min,
      PRODUCT_PRICE_RANGE[selectedCategory].max,
    ];

    setMobileFilterOpen(false);
    setDraftPriceRange(defaultRange);
    setIsPriceRangeDragging(false);
    syncUrl({
      sort: 'default',
      page: 1,
      priceRange: defaultRange,
      brands: [],
      boardTypes: [],
      capacities: [],
    });
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
          value={displayedPriceRange}
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
