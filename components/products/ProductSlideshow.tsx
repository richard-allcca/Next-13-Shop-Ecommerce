
import { FC } from 'react';
import { Slide } from 'react-slideshow-image';

import 'react-slideshow-image/dist/styles.css';
import Style from './ProductSlidesshow.module.css';

interface Props {
  images: string[];
}

export const ProductSlideshow: FC<Props> = ({ images }) => {

  return (
    <Slide
      easing="ease"
      duration={700}
      indicators
    >
      {
        images.map((image,index) => {
          const url = image.startsWith('http') ? image : `${process.env.NEXT_PUBLIC_HOST_NAME}/products/${image}`;
          return (
            <div className={Style.eachSlide } key={index}>
              <div style={{
                backgroundImage: `url(${url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }} >

              </div>
            </div>
          );
        })
      }
    </Slide>
  );
};
