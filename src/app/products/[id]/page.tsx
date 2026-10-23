
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductByIdFromApi, getProductsFromApi } from '@/lib/api';
import type { ApiProduct } from '@/lib/api';

const categoryLabels: Record<string, string> = {
    'air-conditioner': 'کولر گازی',
    boiler: 'پکیج',
    'water-purifier': 'تصفیه آب',
};

const boardTypeLabels: Record<string, string> = {
    inverter: 'اینورتر',
    'fixed-speed': 'دور ثابت',
};

function formatPrice(price: number) {
    return `${price.toLocaleString('fa-IR')} ریال`;
}

function ProductImage({
    src,
    alt,
}: {
    src: string | null;
    alt: string;
}) {
    return (
        <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-slate-50 p-6">
            {src ? (
                <Image
                    src={src}
                    alt={alt}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain p-6"
                />
            ) : (
                <div className="text-center text-slate-400">
                    <span className="text-5xl">◇</span>
                    <p className="mt-3 text-sm">تصویر محصول</p>
                </div>
            )}
        </div>
    );
}

function ProductCard({ product }: { product: ApiProduct }) {
    return (
        <Link
            href={`/products/${product.id}`}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:border-brand-main hover:shadow-lg"
        >
            <ProductImage src={product.imageUrl} alt={product.name} />

            <div className="space-y-3 p-4 text-right">
                <p className="text-xs text-slate-500">{product.brand}</p>

                <h3 className="line-clamp-2 min-h-12 font-semibold text-slate-800 transition group-hover:text-brand-main">
                    {product.name}
                </h3>

                <p className="text-sm font-bold text-brand-main">
                    {formatPrice(product.price)}
                </p>

                <span className="inline-flex text-sm text-brand-main">
                    مشاهده محصول ←
                </span>
            </div>
        </Link>
    );
}

export default async function ProductDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    if (!/^\d+$/.test(id)) {
        notFound();
    }

    let product: ApiProduct;

    try {
        product = await getProductByIdFromApi(Number(id));
    } catch (error) {
        const err = error as Error & { status?: number };

        if (err?.status === 404) {
            notFound();
        }

        throw new Error(
            'دریافت اطلاعات محصول ناموفق بود. اتصال بک‌اند را بررسی کنید.',
        );
    }

    if (!product.active) {
        notFound();
    }

    let relatedProducts: ApiProduct[] = [];

    try {
        const relatedResponse = await getProductsFromApi({
            category: product.category,
            page: 1,
            pageSize: 4,
            sort: 'default',
        });

        relatedProducts = relatedResponse.items
            .filter((item) => item.id !== product.id && item.active)
            .slice(0, 4);
    } catch {
        relatedProducts = [];
    }

    const categoryLabel =
        categoryLabels[product.category] ?? product.category;

    return (
        <main
            dir="rtl"
            className="min-h-screen bg-white px-4 pb-16 pt-10 sm:px-8 md:pt-16 lg:px-28"
        >
            <div className="mx-auto max-w-7xl">
                <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                    <Link href="/" className="transition hover:text-brand-main">
                        خانه
                    </Link>
                    <span>/</span>
                    <Link
                        href={`/products?category=${encodeURIComponent(product.category)}`}
                        className="transition hover:text-brand-main"
                    >
                        {categoryLabel}
                    </Link>
                    <span>/</span>
                    <span className="text-slate-800">{product.name}</span>
                </nav>

                {/* Product overview */}
                <section className="grid items-start gap-8 md:grid-cols-2 lg:gap-14">
                    <ProductImage
                        src={product.imageUrl}
                        alt={product.name}
                    />

                    <div className="space-y-6">
                        <div>
                            <p className="mb-3 text-sm font-medium text-brand-main">
                                {product.brand}
                            </p>

                            <h1 className="text-2xl font-bold leading-relaxed text-slate-900 sm:text-3xl">
                                {product.name}
                            </h1>

                            <p className="mt-3 text-sm text-slate-500">
                                دسته‌بندی: {categoryLabel}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {product.capacity !== null && (
                                <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">
                                    ظرفیت: {product.capacity.toLocaleString('fa-IR')} BTU
                                </span>
                            )}

                            {product.boardType && (
                                <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">
                                    {boardTypeLabels[product.boardType] ?? product.boardType}
                                </span>
                            )}

                            {product.rating !== null && product.rating > 0 && (
                                <span className="rounded-full bg-amber-50 px-4 py-2 text-sm text-amber-700">
                                    ★ {product.rating.toLocaleString('fa-IR')}
                                </span>
                            )}
                        </div>

                        {product.description && (
                            <p className="leading-8 text-slate-600">
                                {product.description}
                            </p>
                        )}

                        {/* Purchase panel */}
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                            <div className="flex items-center justify-between gap-3">
                                <span className="text-sm text-slate-600">
                                    وضعیت موجودی
                                </span>

                                <span
                                    className={`text-sm font-medium ${product.stock > 0
                                            ? 'text-emerald-700'
                                            : 'text-red-600'
                                        }`}
                                >
                                    {product.stock > 0
                                        ? `موجود (${product.stock.toLocaleString('fa-IR')} عدد)`
                                        : 'ناموجود'}
                                </span>
                            </div>

                            <div className="my-5 border-t border-slate-200" />

                            <div className="space-y-2">
                                {product.originalPrice !== null &&
                                    product.originalPrice > product.price && (
                                        <p className="text-sm text-slate-400 line-through">
                                            {formatPrice(product.originalPrice)}
                                        </p>
                                    )}

                                <p className="text-2xl font-bold text-brand-main sm:text-3xl">
                                    {formatPrice(product.price)}
                                </p>
                            </div>

                            <a
                                href="#purchase-help"
                                className="mt-6 flex w-full items-center justify-center rounded-xl bg-brand-main px-5 py-3.5 font-semibold text-white transition hover:opacity-90"
                            >
                                راهنمای خرید و مشاوره
                            </a>

                            <p className="mt-3 text-center text-xs leading-6 text-slate-500">
                                برای اطلاع از شرایط خرید و نصب با کارشناسان ما در ارتباط باشید.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Specifications */}
                <section className="mt-16">
                    <h2 className="mb-6 text-xl font-bold text-slate-900">
                        مشخصات فنی محصول
                    </h2>

                    <div className="overflow-hidden rounded-2xl border border-slate-200">
                        {[
                            ['نام محصول', product.name],
                            ['برند', product.brand],
                            ['دسته‌بندی', categoryLabel],
                            [
                                'ظرفیت',
                                product.capacity !== null
                                    ? `${product.capacity.toLocaleString('fa-IR')} BTU`
                                    : 'ثبت نشده',
                            ],
                            [
                                'نوع بورد',
                                product.boardType
                                    ? boardTypeLabels[product.boardType] ?? product.boardType
                                    : 'ثبت نشده',
                            ],
                            [
                                'امتیاز',
                                product.rating !== null && product.rating > 0
                                    ? product.rating.toLocaleString('fa-IR')
                                    : 'ثبت نشده',
                            ],
                        ].map(([label, value], index) => (
                            <div
                                key={label}
                                className={`grid grid-cols-2 gap-4 px-4 py-4 text-sm sm:px-6 ${index % 2 === 0 ? 'bg-slate-50' : 'bg-white'
                                    }`}
                            >
                                <span className="text-slate-500">{label}</span>
                                <span className="font-medium text-slate-800">{value}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Purchase information */}
                <section
                    id="purchase-help"
                    className="mt-12 rounded-2xl bg-slate-50 p-6 sm:p-8"
                >
                    <h2 className="text-xl font-bold text-slate-900">
                        برای خرید این محصول راهنمایی می‌خواهید؟
                    </h2>
                    <p className="mt-3 max-w-2xl leading-8 text-slate-600">
                        برای انتخاب ظرفیت مناسب، بررسی شرایط نصب و دریافت اطلاعات بیشتر،
                        با کارشناسان داراب تماس بگیرید.
                    </p>
                    {/* Add the official store phone number or contact link here. */}
                </section>

                {/* Related products */}
                {relatedProducts.length > 0 && (
                    <section className="mt-16">
                        <div className="mb-6 flex items-center justify-between gap-4">
                            <h2 className="text-xl font-bold text-slate-900">
                                محصولات مرتبط
                            </h2>

                            <Link
                                href={`/products?category=${encodeURIComponent(product.category)}`}
                                className="shrink-0 text-sm text-brand-main hover:underline"
                            >
                                مشاهده همه
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {relatedProducts.map((related) => (
                                <ProductCard key={related.id} product={related} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </main>
    );
}
