import { AsyncAddToCart } from "../thunks/orderThunk";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ProductCartType = {
  productName: string;
  productImage: string;
  productPrice: number;
  productCost: number;
  productURL: string;
  product: string;
  quantity: number;
  price: number;
  cost: number;
  stock:number;
};

type CartType = {
  [x: string]: any;
  products: ProductCartType[];
  totalPrice: number;
};

type CartFormType = {
  products: ProductCartType;
};

type CartState = {
  [x: string]: any;
  length: any;
  carts: CartType;
};

const initialState: CartState = {
  carts: {
    products: [],
    totalPrice: 0,
  },
  length: undefined
};

const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    userAddCart: (state: any, action: PayloadAction<CartFormType>) => {
      let itemIndex: any = state.carts.products?.findIndex(
        (item: any) => item.product === action.payload.products.product
      );
      if (itemIndex! > -1) {
        let productItem = state.carts.products[itemIndex];
        productItem.quantity += action.payload.products.quantity;
        productItem.cost = productItem.quantity * productItem.productCost;
        productItem.price = productItem.quantity * productItem.productPrice;
        state.carts.products[itemIndex] = productItem;
      } else {
        state.carts.products?.push({ ...action.payload.products });
      }

      let cartTotal = 0;
      state.carts.products?.forEach((item: { cost: number; price: number }) => {
        if (item.cost > 0) {
          cartTotal += item.cost;
        } else {
          cartTotal += item.price;
        }

        state.carts.totalPrice = cartTotal;
      });
    },
    removeCartItem: (state: any, action: PayloadAction<CartFormType>) => {
      state.carts.products = state.carts.products.filter((_: any, index: any) => index !== action.payload);
      let cartTotal = 0;
      state.carts.products.forEach((item:any) => {
          if ((item.cost !== undefined || item.cost === null) && item.cost > 0) {
              cartTotal += item.cost;
          } else {
              cartTotal += item.price;
          }
      });
      state.carts.totalPrice = cartTotal;
    },
    changeCartQuantity: (state: any, action: PayloadAction<{ quantity: any; index: any }>) => {
      state.carts.products = state.carts.products.map((item: any, index: any) => {
        if (index === action.payload.index) {
          item.quantity = action.payload.quantity;
          item.cost = item.quantity * item.productCost;
          item.price = item.quantity * item.productPrice;
        }
        return item;
      });

      let cartTotal = 0;
      state.carts.products.forEach((item: any) => {
        if ((item.cost !== undefined || item.cost === null) && item.cost > 0) {
          cartTotal += item.cost;
        } else {
          cartTotal += item.price;
        }
      });
      state.carts.totalPrice = cartTotal;
    },
    clearCart: (state: { carts: { products: any[]; totalPrice: number; }; }) => {
      state.carts = {
          products: [],
          totalPrice: 0,
      };
  },
  },

  extraReducers(_builder) {

   },
});
export const { userAddCart, removeCartItem ,changeCartQuantity,clearCart} = cartSlice.actions;
export default cartSlice.reducer;
