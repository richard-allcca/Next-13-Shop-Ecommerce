import React, { useContext, useEffect, useState } from 'react';
import { getProviders, getSession, signIn } from 'next-auth/react';

import { AuthContext } from '../../context';

import { AuthLayout } from '../../components/layouts';

import { Link as MuiLink, Box, Grid, Typography, TextField, Button, Chip, Divider } from '@mui/material';
import Link from 'next/link';

import { useForm } from 'react-hook-form';
import { isEmail } from '../../utils';
import { ErrorOutline } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { tesloApi } from '../../api';

import { GetServerSideProps } from 'next';

type IFormData = {
  email: string;
  password: string;
};

const Login = () => {

  const router = useRouter();

  // const { loginUser } = useContext(AuthContext);

  const { register, handleSubmit, formState: { errors } } = useForm<IFormData>();

  const [showError, setShowError] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [provider, setProvider] = useState<any>({}); // NextAuth

  useEffect(() => { // UI provider NextAuth
    getProviders().then(prov => {
      console.log(prov);
      setProvider(prov);
    });
  }, []);


  const destination = router.query.p?.toString() || '/';

  const onLoginUser = async ({ email, password }: IFormData) => {
    // NOTE - Método con credentials de NextAuth
    setShowError(false);
    signIn('credentials', { email, password });

    // NOTE - Método con context
    // setShowError(false);
    // setDisabled(true);

    // const isValidLogin = await loginUser(email, password);

    // if (!isValidLogin) {
    //   setShowError(true);
    //   setTimeout(() => setShowError(false), 3000);
    //   setDisabled(false);
    //   return;
    // }
    // router.replace(destination);

    // NOTE - Método sin context
    // try {
    //   const { data } = await tesloApi.post('/user/login', { email, password });
    //   const { token, user } = data;
    //   setDisabled(false);

    // } catch (error) {
    //   setShowError(true);
    //   console.log('Error en las credenciales');
    //   setTimeout(() => setShowError(false), 3000);
    //   setDisabled(false);
    // }
  };

  return (
    <AuthLayout title="Ingresar" >

      <form onSubmit={handleSubmit(onLoginUser)} noValidate>

        <Box sx={{ width: 350, padding: '10px 20px' }} >

          <Grid container spacing={2} >
            <Grid item xs={12} >
              <Typography variant="h1" component="h1" >Iniciar Seción</Typography>
              {
                showError &&
                <Chip
                  label="No reconocemos ese usuario / contraseña"
                  color="error"
                  icon={<ErrorOutline />}
                  className="fadeIn"
                />
              }
            </Grid>

            <Grid item xs={12} >
              <TextField
                type="email"
                label="Correo"
                variant="filled"
                fullWidth
                {...register('email', {
                  required: 'Este campo es requerido',
                  // validate: (val) => isEmail(val)
                  validate: isEmail // método abreviado
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>

            <Grid item xs={12} >
              <TextField
                type="password"
                label="Contraseña"
                variant="filled"
                fullWidth
                {...register('password', {
                  required: 'Este campo es requerido',
                  minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>

            <Grid item xs={12} >
              <Button
                type="submit"
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
                disabled={disabled}
              >
                Ingresar
              </Button>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="end" >
              <Link href={`/auth/register?p=${destination}`}>
                <MuiLink component="span" >
                  ¿No tienes cuenta?
                </MuiLink>
              </Link>
            </Grid>

            {/* Proveedores de NextAuth */}
            <Grid item xs={12} display={'flex'} flexDirection={'column'} justifyContent={'end'} >
              <Divider sx={{ width: '100%', mb: 2 }} />
              {
                Object.values(provider).map((provider: any, index) => {

                  if (provider.id === 'credentials') return (<div key="credentials" ></div>);// filtro

                  return (
                    <Button
                      key={index}
                      variant="outlined"
                      fullWidth
                      color="primary"
                      sx={{ mb: 1 }}
                      onClick={()=> signIn(provider.id)}
                    >
                      {provider.name}
                    </Button>
                  );
                })
              }
            </Grid>

          </Grid>

        </Box>

      </form>

    </AuthLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { req, query } = ctx;
  const sesion = await getSession({ req });

  const { p = '/' } = query;

  if (sesion) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
};

export default Login;