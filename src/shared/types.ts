import { Dispatch, ReactElement } from 'react';
import { OperationVariables } from '@apollo/client';

enum Actions {
  LOAD_DATA = 'LOAD_DATA',
  ADD_ITEM = 'ADD_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
}

export type Data = {
  [key: string]: unknown;
};

export interface Colum {
  title?: string;
  key?: string;
  render?: (data: Data) => ReactElement;
}

export type ActionTypes =
  | { type: 'LOAD_DATA'; payload: Data[] }
  | { type: Actions.ADD_ITEM; payload: { id: string; price: number } }
  | { type: Actions.REMOVE_ITEM; payload: { id: string; price: number } };

export type State = {
  total: number;
  productList: Data[];
};

type Mutation = {};

export type Context = {
  mutateFunction: (data: OperationVariables) => void;
  subtotal: number;
  loadingUI: boolean;
  state: State;
  dispatch: Dispatch<ActionTypes>;
};
