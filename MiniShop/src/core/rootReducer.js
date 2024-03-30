export const initialSate = {
  onLogin: true,
  card: [],
};
export const rootReducer = (state, action) => {
  switch (action.type) {
    case "onLogin": {
      return { ...state, onLogin: action.payload };
    }
    case "card/add": {
      const existingProduct = state.card.find(
        (product) => product.id === action.payload.id
      );
      if (existingProduct) {
        const updatedCard = state.card.map((product) => {
          if (product.id === action.payload.id) {
            const newQuantum = product.quantum + 1;
            const newTotal = product.price * newQuantum;
            return { ...product, quantum: newQuantum, total: newTotal };
          } else {
            return product;
          }
        });
        return { ...state, card: updatedCard };
      } else {
        return {
          ...state,
          card: [
            ...state.card,
            { ...action.payload, quantum: 1, total: action.payload.price },
          ],
        };
      }
    }
    case "card/reset": {
      return { ...state, card: [] };
    }

    default: {
      return state;
    }
  }
};
