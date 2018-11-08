// Jo PageData
export interface Sku {
  PRODUCT_SIZE: string;
  formattedPrice: string;
}
export interface Product {
  PRODUCT_ID: string;
  FRAGRANCE_FAMILY: string;
  PROD_RGN_NAME: string;
  skus?: Sku[];
}
export interface Category {
  CATEGORY_ID: string;
  CATEGORY_NAME: string;
  products: Product[];
  children: Category[];
}
export interface Catalog {
  categories: Category[];
}
export interface JoData {
  catalog: Catalog;
}
