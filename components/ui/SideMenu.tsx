import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListSubheader,
} from '@mui/material';
import {
  AccountCircleOutlined,
  AdminPanelSettings,
  CategoryOutlined,
  ConfirmationNumberOutlined,
  EscalatorWarningOutlined,
  FemaleOutlined,
  LoginOutlined,
  MaleOutlined,
  SearchOutlined,
  VpnKeyOutlined,
} from '@mui/icons-material';
import { useContext } from 'react';
import { UiContext } from '../../context';
import { ItemMenu } from './ItemMenu';

const topListMenu = [
  { text: 'Perfil', icon: <AccountCircleOutlined /> },
  { text: 'Mis Ordenes', icon: <ConfirmationNumberOutlined /> }
];

const listCategoriesMenu = [
  { text: 'Hombres', icon: <MaleOutlined />, path: '/category/men' },
  { text: 'Mujeres', icon: <FemaleOutlined />, path: '/category/women' },
  { text: 'Niños', icon: <EscalatorWarningOutlined />, path: '/category/kid' },
];

const listAdminPanel = [
  { text: 'Productos', icon: <CategoryOutlined /> },
  { text: 'Ordenes', icon: <ConfirmationNumberOutlined /> },
  { text: 'Usuarios', icon: <AdminPanelSettings /> },
];

const listBoottomMenu = [
  { text: 'Ingresar', icon: <VpnKeyOutlined /> },
  { text: 'Salir', icon: <LoginOutlined /> },
];

export const SideMenu = () => {
  const { isMenuOpen, toggleSideMenu } = useContext(UiContext);

  return (
    <Drawer open={isMenuOpen} anchor="right" sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}>
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItem>
            <Input
              type="text"
              placeholder="Buscar..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility">
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>

          <ItemMenu lista={topListMenu} />

          <ItemMenu lista={listCategoriesMenu} />

          <ItemMenu lista={listBoottomMenu} />

          <Divider />

          <ListSubheader>Admin Panel</ListSubheader>
          <ItemMenu lista={listAdminPanel}/>

        </List>
      </Box>
    </Drawer>
  );
};

