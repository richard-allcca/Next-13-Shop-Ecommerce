import { Link as MuiLink, Box, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { RemoveShoppingCartOutlined } from '@mui/icons-material';
import Link from 'next/link';

const empty = () => {
  return (
    <ShopLayout title="Carrito vació" pageDescription="No hay artículos en el carrito" >

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 200px)"
        sx={{ flexDirection: { xs: 'column', md: 'row' } }}
      >
        <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />

        <Box display="flex" flexDirection="column" alignItems="center" >
          <Typography>Su carrito esta vació</Typography>
          <Link href="/" >
            <MuiLink component="span" typography="h4" color="secondary" >
              Regresar
            </MuiLink>
          </Link>
        </Box>
      </Box>

    </ShopLayout>
  );
};

export default empty;