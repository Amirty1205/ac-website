import Cards from "@/components/Cards"
import { products } from "@/data/products"

export default function ProductsPage() {
    return (
        <div className="px-4 sm:px-8 lg:px-28 py-16 sm:py-20">
            <h1 className="text-2xl sm:text-3xl font-medium text-center mb-8 sm:mb-12">محصولات ما</h1>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {products.map((product) => (
                    <Cards
                        key={product.id}
                        isProduct={product.isProduct}
                        imageAlt={product.imageAlt}
                        cardTitle={product.title}
                        cardDesc={product.cardDesc}
                        originalPrice={product.originalPrice}
                        price={product.price}
                        btu={product.btu}
                        area={product.area}
                        coolOnly={product.coolOnly}
                    />
                ))}
            </div>
        </div>
    )
}
