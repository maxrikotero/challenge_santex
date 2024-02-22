// Here we put queries. Remove next line

import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  fragment ProductItem on Product {
    id
    name
    description
    slug
    featuredAsset {
      preview
    }
  }

  query GetProducts($limitProduct: Int!, $limitVariant: Int!) {
    products(options: { take: $limitProduct }) {
      items {
        variantList(options: { take: $limitVariant }) {
          items {
            productId
            price
            stockLevel
            product {
              ...ProductItem
            }
          }
        }
      }
    }
  }
`;
