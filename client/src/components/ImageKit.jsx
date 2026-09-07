import { Image } from '@imagekit/react';
import React from 'react'

const ImageKit = ({src,alt,w,h,className}) => {
  return (
    <Image
      urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
      src={src}
      alt={alt || "Logo"}
      width={w}
      height={h }
      loading='eager'
      className={className}
      transformation={[
        {
          width: w,
          height:h
        }
      ]}
    />
  );
}

export default ImageKit