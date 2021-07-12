var isLock = false;

const initialStore = {
  tax_rates: [],
};

export const isReactNative = () => {
  if (typeof document != 'undefined') {
    // I'm on the web!
    return false;
  }
  else return typeof navigator != 'undefined' && navigator.product == 'ReactNative';
}

export const calculateGST = (order, store = initialStore) => {
  return !!store.tax_rates &&
  store.tax_rates.length > 0 &&
  store.tax_rates[0].included_in_price === false
      ? Number(order) * Number(store.tax_rates[0].amount)
      : 0;
};
export const calculateTotalOrderPrice = (order, store) => {
  const { tax_rates = [] } = store;
  if (
      !!tax_rates &&
      tax_rates.length > 0 &&
      tax_rates[0].included_in_price === false
  ) {
    return Number(order) + Number(order) * Number(tax_rates[0].amount);
  } else {
    return Number(order);
  }
};
export const calculateLineItemGST = (order, store) => {
  const { tax_rates = [] } = store;
  if (
      !!tax_rates &&
      tax_rates.length > 0 &&
      tax_rates[0].included_in_price === true
  ) {
    return Number(order) + Number(order) * Number(tax_rates[0].amount);
  } else {
    return Number(order);
  }
};

export const setLock = () => {
  if (!isLock) {
    isLock = true;
    setTimeout(() => {
      isLock = false;
    }, 1000);
  }
};

export const isLocked = () => isLock;

