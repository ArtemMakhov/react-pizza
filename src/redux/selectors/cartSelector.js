export const cartSelector = (state) => state.cart;

export const cartItemByIdSelector = (id) => (state) =>
  state.cart.items.find((obj) => obj.id === id);
