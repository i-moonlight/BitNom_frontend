import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function LazyImage({ image, style }) {
    return (
        <div>
            <div>
                <LazyLoadImage
                    style={style}
                    alt={image.alt}
                    height={image.height}
                    src={image.src} // use normal <img> attributes as props
                    width={image.width}
                />
                <span>{image.caption}</span>
            </div>
        </div>
    );
}
