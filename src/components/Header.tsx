import { useContext } from 'react';
import { SaleOrderContext } from '../contexts/SalesProvider';
import { Context } from '../shared/types';
import { Currency, HeaderStyled } from './table/styles';

export function Header() {
  const { subtotal } = useContext(SaleOrderContext) as Context;
  const formattedCurrency = (subtotal ?? 0).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <HeaderStyled>
      <img
        src="https://santex.wpengine.com/wp-content/uploads/2019/02/logo-santex@3x.png"
        alt="logo"
      />
      <Currency>{formattedCurrency}</Currency>
    </HeaderStyled>
  );
}
