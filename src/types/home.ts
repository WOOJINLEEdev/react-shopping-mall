// ListGroup
export interface Product {
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

// ListItem
export interface ListItemProps {
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
