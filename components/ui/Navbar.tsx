import { AppBar, Toolbar, Link as MuiLink, Typography, Box, Button, IconButton, Badge } from '@mui/material';
import Link from 'next/link';
import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';

export const Navbar = () => {
  return (
    <AppBar>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }} >
        <Link href='/' >
          <MuiLink style={{display: 'flex', alignItems:'center'}} underline='always' component={'span'}>
            <Typography variant='h6' >Teslo |</Typography>
            <Typography sx={{ ml: 0.5 }} >Shop</Typography>
          </MuiLink>
        </Link>

        {/*  TODO - flex */}

        <Box sx={{ display: { xs:'none' ,md:'block'} }} >
          <Link href='/category/men' >
            <MuiLink underline='always' component={'span'} >
              <Button>Hombres</Button>
            </MuiLink>
          </Link>

          <Link href='/category/women' >
            <MuiLink underline='always' component={'span'} >
              <Button>Mujeres</Button>
            </MuiLink>
          </Link>

          <Link href='/category/kid' >
            <MuiLink underline='always' component={'span'} >
              <Button>Niños</Button>
            </MuiLink>
          </Link>
        </Box>

        {/* TODO - box */}

        <Box>
          <IconButton>
            <SearchOutlined />
          </IconButton>

          <Link href='/cart' >
            <MuiLink underline='always' component={'span'} >
              <IconButton>
                <Badge badgeContent={2} color="secondary" >
                  <ShoppingCartOutlined />
                </Badge>
              </IconButton>
            </MuiLink>
          </Link>

          <Button>
            <Typography>Menu</Typography>
          </Button>
        </Box>

      </Toolbar>
    </AppBar>
  );
};
