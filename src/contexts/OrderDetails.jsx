import { createContext, useContext, useState } from 'react';
import { pricePerItem } from '../constants';
const OrderDetails = createContext();

// custom hook to check if we are withing a provider
export function useOrderDetails() {
  const contextValue = useContext(OrderDetails);

  if (!contextValue) {
    throw new Error(
      'useOrderDetails must be called from within an OrderDetailsProvider'
    );
  }
  return contextValue;
}

export function OrderDetailsProvider(props) {
  // getter and setter
  const [optionCounts, setOptionCounts] = useState({
    scoops: {}, // {Chocolate: 1, Vanilla: 2}
    toppings: {}, // {Cherries: 1, "Gummy Bears": 3 }
  });

  function updateItemCount(itemName, newItemCount, optionType) {
    // make a copy of existing state
    const newOptionCounts = { ...optionCounts };

    // update the copy with the new information
    newOptionCounts[optionType][itemName] = newItemCount;

    // update the state with the updated copy
    setOptionCounts(newOptionCounts);
  }

  function resetOrder() {
    setOptionCounts({ scoops: {}, toppings: {} });
  }

  //   utility function to derive totals from optionCounts state value

  function calculateTotal(optionType) {
    // get an array of the optionType values
    const countsArray = Object.values(optionCounts[optionType]);

    // total the value in the array of counts for the number of items
    const totalCount = countsArray.reduce((total, value) => total + value, 0);

    // need to multiply the total of items by the price for this item type
    return totalCount * pricePerItem[optionType];
  }

  const totals = {
    scoops: calculateTotal('scoops'),
    toppings: calculateTotal('toppings'),
  };

  const value = { optionCounts, totals, updateItemCount, resetOrder };
  return <OrderDetails.Provider value={value} {...props} />;
}
