export default interface IProduct {
  id: string | number;
  name: string;
  vendorEmail: string;
  price: number;
  state: string;
  desc?: string;
  createdAt?: string;
  updatedAt: string;
  deletedAt: null;
  VendorId: number;
  BandId: number;
  ProductImages: Array<{ image: string }>;
  type: string;
  bandName: string;
  productCode?: string;
  leftIn: number;
}
export interface IProductAfterAddCart extends IProduct {
  count: number;
}
export interface IProductImage {
  id: number | string;
  image?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  ProductId: number | string;
}
