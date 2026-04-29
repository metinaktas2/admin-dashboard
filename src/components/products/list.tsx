import { getProducts } from "@/utils/service";
import Cart from "./cart";
import { FC } from "react";

const List: FC = async () => {
  const products = await getProducts();
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
      {products.map((product) => (
        <Cart product={product} key={product.id} />
      ))}
    </div>
  );
};

export default List;
