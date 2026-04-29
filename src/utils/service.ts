import { Order, Product, User } from "@/types";

// Varsayılan development API adresi
const DEFAULT_API = "http://localhost:5001";
const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? process.env.API_URL ?? DEFAULT_API;

if (!process.env.NEXT_PUBLIC_API_URL && !process.env.API_URL) {
  // build sırasında konsola yazmak zararsızdır; prod için env tanımlayın
  // Next.js tarafından sunucu/istemci arasında farklı davranış olabilir, bu yüzden
  // ortam değişkenini NEXT_PUBLIC_ ile açıkça ayarlamak iyi pratiktir.
  // eslint-disable-next-line no-console
  console.warn(
    `[service] API_URL yok, fallback olarak ${DEFAULT_API} kullanılıyor. Prod için NEXT_PUBLIC_API_URL ayarlayın.`,
  );
}

async function fetchJson<T>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<T> {
  try {
    const res = await fetch(input, init);
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(
        `Request failed: ${res.status} ${res.statusText} - ${String(input)} - ${body}`,
      );
    }
    return res.json();
  } catch (err: any) {
    // Ağ bağlanamama durumunu daha açıklayıcı hale getir
    const msg = err?.message ?? String(err);
    if (
      msg.includes("fetch failed") ||
      msg.includes("ECONNREFUSED") ||
      msg.includes("connect")
    ) {
      throw new Error(
        `${msg}. API'ye ulaşılamıyor: ${String(input)}. Lokal JSON API'yi çalıştırın: "npm run server" ve ${API_URL} adresini kontrol edin.`,
      );
    }
    throw err;
  }
}

//bütün siparişleri getir
export const getOrders = async (): Promise<Order[]> => {
  return fetchJson<Order[]>(`${API_URL}/orders`);
};

//bütün ürünleri getir
export const getProducts = async (): Promise<Product[]> => {
  return fetchJson<Product[]>(`${API_URL}/products`);
};

//bir ürünü getir
export const getProduct = async (id: string): Promise<Product> => {
  return fetchJson<Product>(`${API_URL}/products/${id}`);
};

//bir ürünü sil
export const deleteProduct = async (id: string): Promise<void> => {
  await fetchJson<void>(`${API_URL}/products/${id}`, { method: "DELETE" });
};

//bir ürün oluştur
export const createProduct = async (
  productData: Omit<Product, "id">,
): Promise<Product> => {
  return fetchJson<Product>(`${API_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productData),
  });
};

//bir ürünü güncelle
export const updateProduct = async (
  id: string,
  productData: Omit<Product, "id">,
) => {
  return fetchJson<Product>(`${API_URL}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productData),
  });
};

//kullanıcı verilerini al
export const getUsers = async (): Promise<User[]> => {
  return fetchJson<User[]>(`${API_URL}/users`);
};

//kullanıcı kaldır
export const deleteUser = async (id: string): Promise<void> => {
  await fetchJson<void>(`${API_URL}/users/${id}`, { method: "DELETE" });
};

//bir kullanıcıyı al
export const getUser = async (id: string): Promise<User> => {
  return fetchJson<User>(`${API_URL}/users/${id}`);
};
