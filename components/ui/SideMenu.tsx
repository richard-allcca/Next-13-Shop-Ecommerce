import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import {
  AccountCircleOutlined,
  AdminPanelSettings,
  CategoryOutlined,
  ConfirmationNumberOutlined,
  DashboardOutlined,
  EscalatorWarningOutlined,
  FemaleOutlined,
  LoginOutlined,
  MaleOutlined,
  SearchOutlined,
  VpnKeyOutlined,
} from '@mui/icons-material';
import { useContext, useState } from 'react';
import { AuthContext, UiContext } from '../../context';
import { ItemMenu } from './ItemMenu';
import { useRouter } from 'next/router';

const topListMenu = [
  { text: 'Perfil', icon: <AccountCircleOutlined /> },
  { text: 'Mis Ordenes', icon: <ConfirmationNumberOutlined />, path: '/orders/history' },
];

const listCategoriesMenu = [
  { text: 'Hombres', icon: <MaleOutlined />, path: '/category/men' },
  { text: 'Mujeres', icon: <FemaleOutlined />, path: '/category/women' },
  { text: 'Niños', icon: <EscalatorWarningOutlined />, path: '/category/kid' },
];

const listAdminPanel = [
  { text: 'Dashboard', icon: <DashboardOutlined />, path: '/admin' },
  { text: 'Productos', icon: <CategoryOutlined />, path: '/admin/products' },
  { text: 'Ordenes', icon: <ConfirmationNumberOutlined />, path: '/admin/orders' },
  { text: 'Usuarios', icon: <AdminPanelSettings />, path: '/admin/users' },
];

const listBoottomMenu = [
  { text: 'Ingresar', icon: <VpnKeyOutlined /> },
  { text: 'Salir', icon: <LoginOutlined /> },
];

export const SideMenu = () => {
  const { isMenuOpen, toggleSideMenu } = useContext(UiContext);
  const { user, isLoggedIn, logout } = useContext(AuthContext);

  const router = useRouter();

  const [search, setSearch] = useState('');

  const onSearchTerm = () => {
    if (search.trim().length === 0) return null;
    router.push(`/search/${search}`);
  };

  const navigateTo = (url: string) => {
    toggleSideMenu();
    router.push(url);
  };

  return (
    <Drawer
      open={isMenuOpen}
      onClose={toggleSideMenu}
      // onKeyDown={ (e) => e.key === 'Enter' && onSearchTerm()}
      anchor="right"
      sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItem>
            <Input
              autoFocus
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSearchTerm()}
              value={search}
              type="text"
              placeholder="Buscar..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={onSearchTerm}>
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>
          {isLoggedIn && <ItemMenu lista={topListMenu} />}

          <ItemMenu lista={listCategoriesMenu} />

          {isLoggedIn ? (
            <ListItemButton onClick={logout}>
              <ListItemIcon>
                <LoginOutlined />
              </ListItemIcon>
              <ListItemText primary={'Salir'} />
            </ListItemButton>
          ) : (
            <ListItemButton onClick={() => navigateTo(`/auth/login?p=${router.asPath}`)} >
              <ListItemIcon>
                <VpnKeyOutlined />
              </ListItemIcon>
              <ListItemText primary={'Ingresar'} />
            </ListItemButton>
          )}

          <Divider />
          {user?.role === 'admin' && (
            <>
              <ListSubheader>Admin Panel</ListSubheader>
              <ItemMenu lista={listAdminPanel} />
            </>
          )}
        </List>
      </Box>
    </Drawer>
  );
};
