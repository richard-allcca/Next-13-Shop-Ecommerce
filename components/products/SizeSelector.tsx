import { FC } from "react";
import { ISize } from "../../interface";
import { Box, Button } from "@mui/material";

interface Props {
  selectexSize?: ISize;
  sizes: ISize[];
}

export const SizeSelector: FC<Props> = ({ selectexSize, sizes }) => {
  return (
    <Box>
      {
        sizes.map((size, index) => (
          <Button
            key={index}
            size="small"
            color={selectexSize === size ? 'primary' : 'info'}
          >
            {size}
          </Button>
        ))
      }
    </Box>
  );
};
