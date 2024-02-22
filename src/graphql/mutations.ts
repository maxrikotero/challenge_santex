import { gql } from '@apollo/client';

export const MUTATION_ORDER = gql`
  mutation setOrder($productVariantId: ID!, $quantity: Int!) {
    addItemToOrder(productVariantId: $productVariantId, quantity: $quantity) {
      __typename
    }
  }
`;
