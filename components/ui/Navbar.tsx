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
import {
  ClearOutlined, NightlightOutlined, SearchOutlined, ShoppingCartOutlined, WbSunnyOutlined
} from '@mui/icons-material';
import { ActiveLink } from './ActiveLink';
import { useContext, useState } from 'react';
import { CartContext, UiContext } from '../../context';
import { useRouter } from 'next/router';
import { ThemeContext } from './../../pages/_app';

const genderItems = [
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
  const { numberOfItems } = useContext(CartContext);
  const { toggleTheme, themeDark } = useContext(ThemeContext);

  const router = useRouter();

  const [search, setSearch] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const onSearchTerm = () => {
    if (search.trim().length === 0) return null;
    router.push(`/search/${search}`);
  };

  const countItem = numberOfItems > 9 ? '+9' : numberOfItems;

  const handleTheme = () => {
    return themeDark
      ? (
        <WbSunnyOutlined />
      )
      : (
        <NightlightOutlined />
      );
  };

  return (
    <AppBar>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }} className="richard" >

        {/* Logo shop */}
        <Link href="/" >
          <MuiLink style={{ display: 'flex', alignItems: 'center' }} underline="always" component={'span'}>
            <Typography variant="h6">Teslo |</Typography>
            <Typography variant="h6" sx={{ ml: 0.5 }}>Shop</Typography>
          </MuiLink>
        </Link>

        {/* Gender buttons */}
        <Box sx={{ display: isSearchVisible ? 'none' : { xs: 'none', md: 'block' } }}>
          {genderItems.map((item, index) => {
            return <ActiveLink key={index} path={item.path} label={`${item.label}`} />;
          })}
        </Box>

        {/* Input or Search */}
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

          {/* Search */}
          <IconButton sx={{ display: { sm: 'none' } }} onClick={toggleSideMenu}>
            <SearchOutlined />
          </IconButton>

          {/* Cart Icon */}
          <Link href="/cart">
            <MuiLink underline="always" component={'span'}>
              <IconButton>
                <Badge badgeContent={countItem} color="secondary">
                  <ShoppingCartOutlined />
                </Badge>
              </IconButton>
            </MuiLink>
          </Link>

          {/* Theme */}
          <Button onClick={toggleTheme}>
            {handleTheme()}
          </Button>

          {/* Menú */}
          <Button onClick={toggleSideMenu} sx={{ marginLeft: '4px' }} >
            <Typography color={'black'} >Menu</Typography>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
