// store.js
import { createStore } from 'redux';

// Define the initial state
const initialState = {
  cartItems: [],
};

// Define the reducer function
// Define the reducer function
const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_CART_ITEMS':
        return { ...state, cartItems: action.payload };
      case 'ADD_TO_CART':
        // Implement logic to add item to the cart
        const newItemToAdd = action.payload;
        const existingItem = state.cartItems.find(item => item.id === newItemToAdd.id);
  
        if (existingItem) {
          // If the item already exists in the cart, increment its count
          const updatedCartItems = state.cartItems.map(item =>
            item.id === newItemToAdd.id ? { ...item, count: item.count + 1 } : item
          );
  
          return { ...state, cartItems: updatedCartItems };
        } else {
          // If the item doesn't exist, add it to the cart
          return { ...state, cartItems: [...state.cartItems, { ...newItemToAdd, count: 1 }] };
        }
  
      case 'REMOVE_FROM_CART':
        // Implement logic to remove item from the cart
        const itemIdToRemove = action.payload;
        const updatedCartItems = state.cartItems.filter(item => item.id !== itemIdToRemove);
  
        return { ...state, cartItems: updatedCartItems };
  
      default:
        return state;
    }
  };
  
  

// Create the Redux store
const store = createStore(cartReducer);

export default store;
