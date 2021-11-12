import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function LazyImage({ image: image1, style, imageAlt }) {
    const image = image1 || imageAlt;

    return (
        <div>
            <LazyLoadImage
                style={style}
                alt={image?.alt}
                height={image?.height}
                src={image?.src} // use normal <img> attributes as props
                width={image?.width}
            />
            <span>{image?.caption}</span>
        </div>
    );
}
