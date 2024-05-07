const initialState = {
  currencies: [],
  expenses: [],
  total: 0,
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case 'CURRENCIES':
    return { ...state, currencies: action.payload };
  case 'ADD_EXPENSES': {
    const { value, currency, exchangeRates } = action.payload;
    const moeda = Object.values(exchangeRates).find((coin) => coin.code === currency);
    const add = value * moeda.ask;
    return {
      ...state,
      expenses: [...state.expenses, { ...action.payload, id: state.expenses.length }],
      total: state.total + add,
    };
  }
  default:
    return state;
  }
};

export default wallet;
