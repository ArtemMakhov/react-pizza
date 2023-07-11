import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getCartFromLocalStorage } from "../../utils/getCartFromLocalStorage";
import { calcTotalPrice } from "../../utils/calcTotalPrice";

export type CartItemType = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};

interface CartSliceState {
  totalPrice: number;
  items: CartItemType[];
}

const { items, totalPrice } = getCartFromLocalStorage();

const initialState: CartSliceState = {
  totalPrice: totalPrice,
  items: items,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<CartItemType>) {
      const findProduct = state.items.find(
        (obj) => obj.id === action.payload.id
      );
      if (findProduct) {
        findProduct.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = calcTotalPrice(state.items);
    },
    minusProduct(state, action: PayloadAction<string>) {
      const findProduct = state.items.find((obj) => obj.id === action.payload);
      if (findProduct) {
        findProduct.count--;
      }
    },
    removeProduct(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearProducts(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addProduct, removeProduct, clearProducts, minusProduct } =
  cartSlice.actions;

export default cartSlice.reducer;
