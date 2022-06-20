import { CSSProperties } from "react";

// Banner
export interface IArrowProps {
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

// ProductList
export interface IProduct {
  id: number;
  images: Images[];
  name: string;
  variants: Variants[];
}

export interface Images {
  id: number;
  product_id: number;
  src: string;
}

export interface Variants {
  price: string;
}

// ProductItem
export interface IProductItemProps {
  item: ItemType;
}

export interface ItemType {
  id: number;
  images: Images[];
  name: string;
  variants: Variants[];
}

export interface Images {
  id: number;
  product_id: number;
  src: string;
}

export interface Variants {
  price: string;
}
