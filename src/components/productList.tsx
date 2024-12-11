
import { useRouter } from "next/navigation";
import Product, { ProductProps } from "./product";

interface ProductListProps {
    title: string;
    products: ProductProps[];
    link: string
}
export default function ProductList(props: ProductListProps) {
    const { title, products, link } = props;
    const router = useRouter();

    const handleGoLink = () => {
        router.push(link);
    }
    return (
        <div>
            <div className="h-[64px]">
                <h2 className="float-left text-2xl text-gray-500  leading-[64px]"><a href="#" onClick={handleGoLink}>{title}</a></h2>
                <a href="#" className="text-gray-500 text-base float-right h-[64px] leading-[64px]">更多 ></a>
            </div>

            <div className="flex gap-[10px] flex-wrap justify-between">
                {products.map((product) => (
                    <Product {...product} key={product.id} />
                ))}
            </div>
        </div>

    )

}