import React from 'react';
import { Helmet } from 'react-helmet';

function SEO({ title, description, url, image }) {
    return (
        <Helmet htmlAttributes={{ lang: `en` }}>
            {/* General tags */}
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta name="description" content={description} />
            <meta name="image" content={image} />
            <link rel="canonical" href={url} />
            {/* OpenGraph tags */}
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            {/* Twitter Card tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:creator" content="@BitNorm" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Helmet>
    );
}

export default SEO;
