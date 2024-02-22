import { Header } from './components/Header';
import ProductList from './components/ProductList';
import { Box } from '@mui/material';
import SalesProvider from './contexts/SalesProvider';

const App = () => {
  return (
    <SalesProvider>
      <Header />
      <Box>
        <ProductList />
      </Box>
    </SalesProvider>
  );
};

export default App;
