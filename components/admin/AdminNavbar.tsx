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


export const AdminNavbar = () => {
  const { toggleSideMenu } = useContext(UiContext);

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

        <Button onClick={toggleSideMenu}>
          <Typography>Menu</Typography>
        </Button>

      </Toolbar>
    </AppBar>
  );
};
