import { FC } from 'react';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';

interface Props {
  quantity: number;
  stock: number;
  setQuantity: (newQuantity: number) => void;
}

export const ItemCounter: FC<Props> = ({ quantity, setQuantity, stock }) => {

  const decrement = () => {
    if (quantity === 1) return;
    setQuantity(quantity - 1);
  };

  const increment = () => {
    if (quantity <= 10 || quantity <= stock) {
      setQuantity(quantity + 1);
    };
  };

  return (
    <Box display={'flex'} alignItems={'center'} >

      <IconButton onClick={decrement} >
        <RemoveCircleOutline />
      </IconButton>

      <Typography sx={{ width: 40, textAlign: 'center' }} >{quantity}</Typography>

      <IconButton onClick={increment} >
        <AddCircleOutline />
      </IconButton>
    </Box>
  );
};
