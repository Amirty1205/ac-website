import { ProductCard } from "../ProductCard";

export default function Products() {
    return(
        <div className="w-xl py-28">
            <ProductCard id="1" title="کولر گازی اسپلیت مدل A220" price={1000000000} rating={4} />
        </div>
    )
}