import { AppBar, Toolbar, Link as MuiLink, Typography, Box, Button, IconButton, Badge } from '@mui/material';
import Link from 'next/link';
import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { ActiveLink } from './ActiveLink';
import { useContext } from 'react';
import { UiContext } from '../../context';

const menuItems = [
  {
    label: 'Hombres',
    path: '/category/men'
  },
  {
    label: 'Mujeres',
    path: '/category/women'
  },
  {
    label: 'Niños',
    path: '/category/kid'
  }
];

export const Navbar = () => {

  const { toggleSideMenu } = useContext(UiContext);

  return (
    <AppBar>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }} >
        <Link href="/" >
          <MuiLink style={{ display: 'flex', alignItems: 'center' }} underline="always" component={'span'}>
            <Typography variant="h6" >Teslo |</Typography>
            <Typography sx={{ ml: 0.5 }} >Shop</Typography>
          </MuiLink>
        </Link>

        <Box sx={{ display: { xs: 'none', md: 'block' } }} >
          {
            menuItems.map((item, index) => {
              return (
                <ActiveLink key={index} path={item.path} label={`${item.label}`} />
              );
            })
          }
        </Box>

        <Box>
          <IconButton>
            <SearchOutlined />
          </IconButton>

          <Link href="/cart" >
            <MuiLink underline="always" component={'span'} >
              <IconButton>
                <Badge badgeContent={2} color="secondary" >
                  <ShoppingCartOutlined />
                </Badge>
              </IconButton>
            </MuiLink>
          </Link>

          <Button onClick={toggleSideMenu} >
            <Typography>Menu</Typography>
          </Button>
        </Box>

      </Toolbar>
    </AppBar>
  );
};
