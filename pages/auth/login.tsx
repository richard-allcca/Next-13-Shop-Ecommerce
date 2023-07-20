import React from 'react';
import { AuthLayout } from '../../components/layouts';
import { Link as MuiLink, Box, Grid, Typography, TextField, Button } from '@mui/material';
import Link from 'next/link';

const login = () => {
  return (
    <AuthLayout title='Ingresar' >
      <Box sx={{ width: 350, padding: '10px 20px' }} >

        <Grid container spacing={2} >
          <Grid item xs={12} >
            <Typography variant='h1' component='h1' >Iniciar Seción</Typography>
          </Grid>

          <Grid item xs={12} >
            <TextField label='Correo' variant='filled' fullWidth />
          </Grid>

          <Grid item xs={12} >
            <TextField label='Contraseña' variant='filled' fullWidth />
          </Grid>

          <Grid item xs={12} >
            <Button color='secondary' className='circular-btn' size='large' fullWidth>
              Ingresar
            </Button>
          </Grid>

          <Grid item xs={12} display='flex' justifyContent='end' >
            <Link href='/auth/register' >
              <MuiLink component='span' >
                ¿No tienes cuenta? 
              </MuiLink>
            </Link>
          </Grid>
        </Grid>

      </Box>
    </AuthLayout>
  );
};

export default login;