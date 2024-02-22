import { useContext } from 'react';
import { TableContainer, Table, TableHeader, TableBody } from './table/styles';
import { Colum, Context } from '../shared/types';
import { SaleOrderContext } from '../contexts/SalesProvider';
import { Box, Button, Skeleton } from '@mui/material';
import styled from 'styled-components';

const SkeletonLoading = () => (
  <>
    <Skeleton />
    <Skeleton animation="wave" />
    <Skeleton animation={false} />
  </>
);

export enum Actions {
  LOAD_DATA = 'LOAD_DATA',
  ADD_ITEM = 'ADD_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
}

const ImageStyled = styled.img`
  width: 200px;
  height: 200px;
  object-fit: fill;
`;

const ProductList = () => {
  const { state, mutateFunction, dispatch, loadingUI } = useContext(
    SaleOrderContext
  ) as Context;
  const data = state.productList;
  // the variable is gonna be an array of colum index = data key value EG: {product: Coca-Cola} {columKey: data.value}

  const columns: Colum[] = [
    { title: 'Name', key: 'name' },
    { title: 'Description', key: 'description' },
    {
      title: 'Image',
      render: (row: any) => {
        return row?.featuredAsset?.preview ? (
          <Box>
            <ImageStyled
              src={row?.featuredAsset?.preview}
              alt="image_product"
            />
          </Box>
        ) : (
          <></>
        );
      },
    },
    {
      title: 'Action',
      render: (row) => {
        return (
          <Button
            variant="contained"
            color={`${row.isSelected ? 'success' : 'primary'}`}
            onClick={() => {
              mutateFunction({
                variables: {
                  productVariantId: row.productId,
                  quantity: 1,
                },
                onCompleted: () => {
                  dispatch({
                    type: Actions.ADD_ITEM,
                    payload: {
                      id: row.id as string,
                      price: row.price as number,
                    },
                  });
                },
              });
            }}
          >
            {`${row?.isSelected ? 'bought' : 'Buy'}`}
          </Button>
        );
      },
    },
  ];
  const dataRender = data.map((item) => {
    // New Object to be rendered according to colum index
    let ojectOrderByColumnIndex = {};
    // loop columns to create the object
    for (let index = 0; index < columns.length; index++) {
      const colum: Colum = columns[index];

      if (colum.key && item[colum.key]) {
        ojectOrderByColumnIndex = {
          ...ojectOrderByColumnIndex,
          [colum.key]: item[colum.key],
        };
      } else {
        ojectOrderByColumnIndex = {
          ...ojectOrderByColumnIndex,
          [`render${colum.title}`]: colum?.render ? colum?.render(item) : null,
        };
      }
    }

    return ojectOrderByColumnIndex;
  });

  if (loadingUI) {
    return <SkeletonLoading />;
  }

  return (
    <TableContainer>
      <Table>
        <TableHeader>
          <tr>
            {columns.map((column, index) => (
              <th key={`${index}_column`}>{column.title}</th>
            ))}
          </tr>
        </TableHeader>
        <TableBody>
          {dataRender.map((data, index) => (
            <tr key={`${index}_row`}>
              {Object.values(data).map((item) => {
                if (typeof item === 'function') {
                  item(item);
                } else {
                  return <td>{item}</td>;
                }
              })}
            </tr>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductList;
