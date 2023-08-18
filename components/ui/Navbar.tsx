import {
  AppBar,
  Toolbar,
  Link as MuiLink,
  Typography,
  Box,
  Button,
  IconButton,
  Badge,
  Input,
  InputAdornment,
} from '@mui/material';
import Link from 'next/link';
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { ActiveLink } from './ActiveLink';
import { useContext, useState } from 'react';
import { UiContext } from '../../context';
import { useRouter } from 'next/router';

const menuItems = [
  {
    label: 'Hombres',
    path: '/category/men',
  },

  {
    label: 'Mujeres',
    path: '/category/women',
  },
  {
    label: 'Niños',
    path: '/category/kid',
  },
];

export const Navbar = () => {
  const { toggleSideMenu } = useContext(UiContext);

  const router = useRouter();

  const [search, setSearch] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const onSearchTerm = () => {
    if (search.trim().length === 0) return null;
    router.push(`/search/${search}`);
  };

  return (
    <AppBar>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }} className="richard" >
        <Link href="/" >
          <MuiLink style={{ display: 'flex', alignItems: 'center' }} underline="always" component={'span'}>
            <Typography variant="h6">Teslo |</Typography>
            <Typography sx={{ ml: 0.5 }}>Shop</Typography>
          </MuiLink>
        </Link>

        <Box sx={{ display: isSearchVisible ? 'none' : { xs: 'none', md: 'block' } }}>
          {menuItems.map((item, index) => {
            return <ActiveLink key={index} path={item.path} label={`${item.label}`} />;
          })}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }} >
          {isSearchVisible ? (
            <Input
              className="fadeIn"
              sx={{ display: { xs: 'none', sm: 'inherit' } }}
              autoFocus
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => (e.key === 'Enter' ? onSearchTerm() : null)}
              value={search}
              type="text"
              placeholder="Buscar..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={() => setIsSearchVisible(false)}>
                    <ClearOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          ) : (
            <IconButton
              sx={{ display: { xs: 'none', sm: 'flex' } }}
              className="fadeIn"
              onClick={() => setIsSearchVisible(true)}
            >
              <SearchOutlined />
            </IconButton>
          )}

          <IconButton sx={{ display: { sm: 'none' } }} onClick={toggleSideMenu}>
            <SearchOutlined />
          </IconButton>

          <Link href="/cart">
            <MuiLink underline="always" component={'span'}>
              <IconButton>
                <Badge badgeContent={2} color="secondary">
                  <ShoppingCartOutlined />
                </Badge>
              </IconButton>
            </MuiLink>
          </Link>

          <Button onClick={toggleSideMenu}>
            <Typography>Menu</Typography>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
