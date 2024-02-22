import { MockedProvider } from '@apollo/client/testing';
import {
  fireEvent,
  getAllByRole,
  getByAltText,
  getByRole,
  getByText,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import App from './App';
import ProductList from './components/ProductList';
import { GET_PRODUCTS } from './graphql/queries';
import SalesProvider from './contexts/SalesProvider';
import { MUTATION_ORDER } from './graphql/mutations';

const mocks = [
  {
    request: {
      query: GET_PRODUCTS,
      variables: {
        limitProduct: 5,
        limitVariant: 1,
      },
    },
    result: {
      data: {
        products: {
          items: [
            {
              variantList: {
                items: [
                  {
                    productId: '1',
                    price: 129900,
                    stockLevel: 'IN_STOCK',
                    product: {
                      id: '1',
                      name: 'Laptop mocked',
                      description:
                        'Now equipped with seventh-generation Intel Core processors, Laptop is snappier than ever. From daily tasks like launching apps and opening files to more advanced computing, you can power through your day thanks to faster SSDs and Turbo Boost processing up to 3.6GHz.',
                      slug: 'laptop',
                      featuredAsset: {
                        preview:
                          'https://demo.vendure.io/assets/preview/71/derick-david-409858-unsplash__preview.jpg',
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    },
  },
  {
    request: {
      query: MUTATION_ORDER,
      variables: {
        productVariantId: '1',
        quantity: 1,
      },
    },
    result: {
      data: {
        __typename: 'Order',
      },
    },
  },
];

const renderComponent = async () => {
  const result = render(
    <MockedProvider
      mocks={mocks}
      addTypename={false}
      defaultOptions={{
        watchQuery: { fetchPolicy: 'no-cache' },
        query: { fetchPolicy: 'no-cache' },
      }}
    >
      <SalesProvider>
        <App />
      </SalesProvider>
    </MockedProvider>
  );
  await new Promise((resolve) => setTimeout(resolve));
  return result;
};

const renderComponentList = async () => {
  const result = render(
    <MockedProvider
      mocks={mocks}
      addTypename={false}
      defaultOptions={{
        watchQuery: { fetchPolicy: 'no-cache' },
        query: { fetchPolicy: 'no-cache' },
      }}
    >
      <SalesProvider>
        <App />
      </SalesProvider>
    </MockedProvider>
  );
  await new Promise((resolve) => setTimeout(resolve));
  return result;
};

describe('ProductList', () => {
  it('renders render columns', async () => {
    await renderComponentList();

    expect(screen.getByText('Description')).toBeVisible();
    expect(screen.getByText('Image')).toBeVisible();
    expect(screen.getByText('Action')).toBeVisible();
  });

  it('render data mocked', async () => {
    await renderComponentList();
    expect(screen.getByText('Laptop mocked')).toBeVisible();
  });

  it('should render skeleton', async () => {
    await renderComponentList();
    const button = screen.getByText('Buy');

    fireEvent.click(button);

    const container = document.querySelector('.MuiSkeleton-root');

    expect(container).not.toBe(null);
  });

  it('should increase total', async () => {
    await renderComponent();
    const button = screen.getByText('Buy');

    fireEvent.click(button);

    await new Promise((resolve) => setTimeout(resolve));

    expect(screen.getByText('$129,900.00')).toBeVisible();
  });
});
