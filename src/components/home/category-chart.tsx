import { FC } from "react";
import DoughnutGraph from "../graphics/doughnut-graph";
import { getProducts } from "@/utils/service";
import { Graphdata } from "@/types";

const CategoryChart: FC = async () => {
  const products = await getProducts();

  //kategori başına ürün hesapla
  const countObj: Record<string, number> = {};

  products.forEach((product) => {
    countObj[product.category] = (countObj[product.category] || 0) + 1;
  });

  //grafik verisini hazırla
  const data: Graphdata = {
    labels: Object.keys(countObj),
    datasets: [
      {
        label: "Ürün Sayısı",
        data: Object.values(countObj),
        backgroundColor: [
          "#3666f1",
          "#8b5cf6",
          "#ec4899",
          "#14b8a6",
          "#f59e0b",
          "#06b6d4",
        ],
        borderColor: "#ffffff",
        borderWidth: 3,
        hoverOffset: 8,
      },
    ],
  };

  return (
    <div className="bg-white rounded-lg p-5 shadow-md size-full pb-16">
      <h2 className="subtitle">Kategori Grafiği</h2>

      <div className="size-full pt-5">
        <DoughnutGraph data={data} />
      </div>
    </div>
  );
};

export default CategoryChart;
