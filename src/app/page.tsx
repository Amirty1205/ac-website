import Hero from "../components/sections/Hero"
import Services from "../components/sections/Services";
import Products from "../components/sections/Products";
import Blog from "../components/sections/Blog";

export default function Home() {
  return (
    <div className="sm:px-5 md:px-10 lg:px-25">
      <Hero />
      <Services />
      <Products />
      <Blog />
    </div>
  );
}
