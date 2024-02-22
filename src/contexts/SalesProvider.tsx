import React, { ReactNode, useEffect, useReducer } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ActionTypes, Context, State } from '../shared/types';
import useStateWithStorage from '../hooks/useStateWithStorage';
import { GET_PRODUCTS } from '../graphql/queries';
import { MUTATION_ORDER } from '../graphql/mutations';

export const SaleOrderContext = React.createContext<Context | null>(null);

export enum Actions {
  LOAD_DATA = 'LOAD_DATA',
  ADD_ITEM = 'ADD_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
}

function reducer(state: State, action: ActionTypes) {
  switch (action.type) {
    case Actions.LOAD_DATA:
      return {
        ...state,
        productList: action.payload,
      };
    case Actions.ADD_ITEM:
      return {
        productList: state.productList.map((item) =>
          item.id === action.payload.id ? { ...item, isSelected: true } : item
        ),
        total: state.total + action.payload.price,
      };
    case Actions.REMOVE_ITEM:
      return {
        productList: state.productList.map((item) =>
          item.id === action.payload.id ? { ...item, isSelected: false } : item
        ),
        total: state.total - action.payload.price,
      };
    default:
      return state;
  }
}

const initialState = {
  total: 0,
  productList: [],
};

type Props = {
  children: ReactNode;
};

const SalesProvider: React.FC<Props> = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [subtotal, updateStorageTotal] = useStateWithStorage(
    'subTotalOrder',
    0
  );

  useEffect(() => {
    // Update local storage and set custom hook state
    updateStorageTotal(state.total);
  }, [state.total]);

  const { loading } = useQuery(GET_PRODUCTS, {
    variables: {
      limitProduct: 5,
      limitVariant: 1,
    },
    onCompleted: (response) => {
      dispatch({
        type: Actions.LOAD_DATA,
        payload: response.products.items
          .reduce(
            (acc: any, item: any) => [...acc, ...item.variantList.items],
            []
          )
          .map((item: any) => ({
            ...item,
            ...item.product,
            priceFormatted: item.price.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            }),
          })),
      });
    },
  });

  const [mutateFunction, { loading: loadingMutation }] = useMutation(
    MUTATION_ORDER,
    {
      onCompleted: () => {
        updateStorageTotal(state.total);
      },
    }
  );

  return (
    <SaleOrderContext.Provider
      value={{
        mutateFunction,
        subtotal,
        loadingUI: loadingMutation || loading,
        state,
        dispatch,
      }}
    >
      {children}
    </SaleOrderContext.Provider>
  );
};

export default SalesProvider;
