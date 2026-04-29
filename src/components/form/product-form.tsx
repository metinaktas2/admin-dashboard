import { Product } from "@/types";
import { categories, inputs } from "@/utils/constants";
import { FC } from "react";
import Field from "./field";
import ImagePreview from "./image-preview";
import { handleProductForm } from "@/utils/actions";

interface Props {
  product: Product | null;
}

const ProductForm: FC<Props> = ({ product }) => {
  return (
    <form action={handleProductForm}>
      {/* Düzenleme modu için id inputu */}
      {product && <input value={product.id} name="id" type="hidden" />}
      <div className="grid md:grid-cols-2 gap-6">
        {/* sol */}
        <div className="space-y-6">
          {inputs.map((input, key) => (
            <Field key={key} htmlFor={input.name} label={input.label}>
              <input
                id={input.name}
                name={input.name}
                type={input.type}
                className="input"
                defaultValue={product?.[input.name as keyof Product]}
                required
              />
            </Field>
          ))}

          {/* Kategori */}
          <Field htmlFor="category" label="Kategori">
            <select
              name="category"
              id="category"
              className="input"
              defaultValue={product?.category}
            >
              {categories.map((item, key) => (
                <option value={item.value} key={key}>
                  {item.label}
                </option>
              ))}
            </select>
          </Field>
        </div>

        {/* sağ */}
        <div className="space-y-6">
          <Field htmlFor="image_url" label="Resim URL">
            <input
              type="text"
              name="image_url"
              id="image_url"
              className="input"
              defaultValue={product?.image_url}
            />
            <ImagePreview />
          </Field>
          <Field htmlFor="description" label="Açıklama">
            <textarea
              name="description"
              id="description"
              className="input sm:text-sm md:min-h-[220px]"
              rows={5}
              defaultValue={product?.description}
            ></textarea>
          </Field>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button className="px-6 py-2 rounded-md text-white transition bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 cursor-pointer disabled:cursor-not-allowed">
          {product ? "Güncelle" : "Oluştur"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
