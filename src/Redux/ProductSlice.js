import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
  },
  reducers: {
    setproducts(state, action) {
      state.data = action.payload;
    },
  },
});

export const { setproducts, setStatus } = productSlice.actions;
export default productSlice.reducer;

export function fetchproducts(offset) {
  return async function fetchproductThunk(dispatch) {
    try {
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/products?offset=0&limit=${offset}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      dispatch(setproducts(data));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
}
