import React from 'react';
import { Helmet } from 'react-helmet';

export default function SEO({ title, description, url, image }) {
    return (
        <Helmet htmlAttributes={{ lang: `en` }}>
            {/* General tags */}
            <title>{title || 'BitNorm Website'}</title>
            <meta name="image" content={image || null} />
            <meta
                name="description"
                content={description || 'BitNorm Website'}
            />
            <link rel="canonical" href={url || window.location.origin} />
            <meta charSet="utf-8" />
            {/* OpenGraph tags */}
            <meta property="og:url" content={url || window.location.origin} />
            <meta property="og:title" content={title || 'BitNorm'} />
            <meta
                property="og:description"
                content={
                    description || 'BitNorm | The ultimate Cryptocurrence suite'
                }
            />
            <meta property="og:image" content={image || null} />
            {/* Twitter Card tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:creator" content="@BitNorm" />
            <meta name="twitter:title" content={title || 'BitNorm Website'} />
            <meta
                name="twitter:description"
                content={
                    description || 'BitNorm | The ultimate Cryptocurrence suite'
                }
            />
            <meta name="twitter:image" content={image || null} />
        </Helmet>
    );
}
