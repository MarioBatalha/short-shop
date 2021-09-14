import React, { useState, useContext, useReducer, useEffect } from 'react';
import cartItems from './data/data';
import reducer from './components/reducer';

// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext();

const initialState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0,
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer,initialState);

  const handleClearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  };

  const handleRemove = (id) => {
    dispatch({ type: 'REMOVE', payload: id })
  };

  const handleDecrease = (id) => {
    dispatch({ type: 'DECREASE', payload: id })
  };

  const handleIncrease = (id) => {
    dispatch({ type: 'INCREASE', payload: id })
  };

  const handleFetchData = async () => {
    dispatch({type: 'LOADING'});
    const response = await fetch(url);
    const cart = await response.json();
    dispatch({ type: 'DISPLAY_ITEMS', payload: cart})
  }

  useEffect(() => {
    handleFetchData();
  }, [])

  useEffect(() => {
    dispatch({ type: 'GET_TOTALS' })
  }, [state.cart])
  return (
    <AppContext.Provider
      value={{
        ...state,
        handleClearCart,
        handleRemove,
        handleDecrease,
        handleIncrease
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
