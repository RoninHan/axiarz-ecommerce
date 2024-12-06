
import Product, { ProductProps } from "./product";

interface ProductListProps {
    title: string;
    products: ProductProps[];
}
export default function ProductList(props: ProductListProps) {
    return (
        <div>
            <div className="flex gap-6 flex-wrap justify-between">
                {props.products.map((product) => (
                    <Product {...product} key={product.id} />
                ))}
            </div>
        </div>

    )

}