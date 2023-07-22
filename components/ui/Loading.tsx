import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

// NOTE - thickness, width and height properties

export const Loading = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="calc(100vh - 200px)"
      // sx={{ flexDirection: { xs: 'column', md: 'row' } }}
    >
      <Typography marginBottom={2} variant="h2" fontWeight="200" > Cargando... </Typography>
      <CircularProgress thickness={2} />
    </Box>

  );
};
