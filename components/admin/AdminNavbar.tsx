import { useContext } from 'react';
import {
  AppBar,
  Toolbar,
  Link as MuiLink,
  Typography,
  Button,
} from '@mui/material';
import Link from 'next/link';
import { UiContext } from '../../context';
import { NightlightOutlined, WbSunnyOutlined } from '@mui/icons-material';
import { ThemeContext } from '../../pages/_app';


export const AdminNavbar = () => {
  const { toggleSideMenu } = useContext(UiContext);
  const { toggleTheme, themeDark } = useContext(ThemeContext);

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
      <Toolbar
        sx={{ display: 'flex', justifyContent: 'space-between' }} className="richard"
      >

        <Link href="/" >
          <MuiLink style={{ display: 'flex', alignItems: 'center' }} underline="always" component={'span'}>
            <Typography variant="h6">Teslo |</Typography>
            <Typography sx={{ ml: 0.5 }}>Shop</Typography>
          </MuiLink>
        </Link>

        {/* Theme */}
        <Button onClick={toggleTheme}>
          {handleTheme()}
        </Button>

        {/* Menú */}
        <Button onClick={toggleSideMenu}>
          <Typography color={'black'} >Menu</Typography>
        </Button>

      </Toolbar>
    </AppBar>
  );
};
