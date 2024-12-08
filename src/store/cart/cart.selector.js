import { createSelector } from "reselect";


const selectCartReducder = state => state.cart;

export const selectCartItems = createSelector(
    [selectCartReducder],
    (cart) => cart.cartItems
)
 

export const selectIsCartOpen = createSelector(
    [selectCartReducder],
    (cart) => cart.isCartOpen
)


export const selectCartCount = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce(
        (total, cartItem) => total + cartItem.quantity, 
        0
    )
)


export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce(
        (total, cartItem) => total + cartItem.quantity * cartItem.price,
         0
        )
)