export interface IProductItem {
  id: number;
  images: IImages[];
  name: string;
  variants: IVariants[];
}

export interface IImages {
  id: number;
  product_id: number;
  src: string;
}

export interface IVariants {
  price: string;
}
