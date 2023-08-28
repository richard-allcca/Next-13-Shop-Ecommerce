import { FC } from 'react';
import { ISize } from '../../interface';
import { Box, Button } from '@mui/material';
import { ICartProduct } from './../../interface/cart';

interface Props {
  sizes: ISize[];
  isSelect?: string;
  onSelectedSize: (size: ISize)=>void;
}

export const SizeSelector: FC<Props> = ({ onSelectedSize, sizes, isSelect }) => {

  return (
    <Box>
      {
        sizes.map((size, index) => (
          <Button
            key={index}
            size="small"
            color={isSelect === size ? 'primary' : 'info'}
            onClick={()=>onSelectedSize(size)}
          >
            {size}
          </Button>
        ))
      }
    </Box>
  );
};
