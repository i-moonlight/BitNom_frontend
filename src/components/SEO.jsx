//import { helmetJsonLdProp } from 'react-schemaorg';
import { format } from 'date-fns';
import React from 'react';
import { Helmet } from 'react-helmet';

function SEO(data) {
    const { title, description, url, image, resource } = data;

    return (
        <Helmet
            //script={[helmetJsonLdProp(SchemaFactory(data))]}
            htmlAttributes={{ lang: `en` }}
        >
            <script type="application/ld+json">{SchemaFactory(data)}</script>
            {/* General tags */}
            <title>{title || 'BitNorm Website'}</title>

            {/*  <meta charSet="utf-8" /> */}
            <meta name="description" content={description} />
            <meta name="image" content={image || null} />
            <link rel="canonical" href={url || window.location.origin} />

            {/* OpenGraph tags */}
            {resource ? <meta property="og:type" content="article" /> : null}
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta
                property="og:description"
                content={
                    description || 'BitNorm | The ultimate Cryptocurrency suite'
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
                    description || 'BitNorm | The ultimate Cryptocurrency suite'
                }
            />
            <meta name="twitter:image" content={image || null} />
        </Helmet>
    );
}

export default SEO;

const SchemaFactory = (props) => {
    let schema;
    if (!props?.resource) {
        schema = {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            headline: props?.title,
            url: props?.url,
            author: {
                '@type': 'Organization',
                name: 'Bitnorm',
                url: props?.url,
            },
        };
    }
    if (props?.resource?.__typename === 'OPost') {
        schema = {
            '@context': 'https://schema.org',
            '@type': 'SocialMediaPosting',
            '@id': props?.url,
            datePublished: format(
                new Date(props?.resource?.createdAt),
                'yyyy-MM-dd'
            ),
            author: {
                '@type': 'Person',
                name: props?.resource?.author?.displayName,
                url: `https://${location.origin}/users/${props?.resource?.author?._id}/`,
            },
            publisher: {
                '@type': 'Organization',
                name: 'Bitnorm',
                url: location.origin,
            },
            image: {
                '@type': 'ImageObject',
                url: props?.image || null,
            },
            text: props?.resource?.content,
            headline: props?.resource?.content?.substring(0, 15),
            sharedContent: props?.resource?.shared_resource?._id
                ? {
                      '@type': 'WebPage',
                      headline:
                          props?.resource?.shared_resource?.type === 'post'
                              ? props?.resource?.shared_resource?._id?.content?.substring(
                                    0,
                                    15
                                )
                              : props?.resource?.shared_resource?._id?.title,
                      url:
                          props?.resource?.shared_resource?.type === 'post'
                              ? `https://${location.origin}/post/${props?.resource?.shared_resource?._id?._id}`
                              : `https://${location.origin}/events/${props?.resource?.shared_resource?._id?._id}`,
                      author: {
                          '@type': 'Person',
                          name:
                              props?.resource?.shared_resource?.type === 'post'
                                  ? props?.resource?.shared_resource?._id
                                        ?.author?.displayName
                                  : props?.resource?.shared_resource?._id?.host
                                        ?.displayName,
                          url:
                              props?.resource?.shared_resource?.type === 'post'
                                  ? `https://${location.origin}/users/${props?.resource?.shared_resource?._id?.author?._id}/`
                                  : `https://${location.origin}/users/${props?.resource?.shared_resource?._id?.host?._id}/`,
                      },
                  }
                : null,
        };
    }
    if (props?.resource?.__typename === 'OEvent') {
        if (props?.resource?.location?.type === 'physical') {
            schema = {
                '@context': 'https://schema.org',
                '@type': 'Event',
                name: props?.resource?.title,

                startDate: format(
                    new Date(props?.resource?.startDate),
                    'yyyy-MM-dd'
                ),
                endDate: format(
                    new Date(props?.resource?.endDate),
                    'yyyy-MM-dd'
                ),
                eventAttendanceMode:
                    'https://schema.org/OfflineEventAttendanceMode',
                eventStatus: 'https://schema.org/EventScheduled',
                image: {
                    '@type': 'ImageObject',
                    url: props?.image,
                },
                location: {
                    '@type': 'Place',
                    name: props?.resource?.location?.address,
                },
                description: props?.description,
                publisher: {
                    '@type': 'Organization',
                    name: 'Bitnorm',
                    url: location.origin,
                },
            };
        } else {
            schema = {
                '@context': 'https://schema.org',
                '@type': 'Event',
                name: props?.resource?.title,
                startDate: format(
                    new Date(props?.resource?.startDate),
                    'yyyy-MM-dd'
                ),
                endDate: format(
                    new Date(props?.resource?.endDate),
                    'yyyy-MM-dd'
                ),
                eventAttendanceMode:
                    'https://schema.org/OnlineEventAttendanceMode',
                eventStatus: 'https://schema.org/EventScheduled',
                location: {
                    '@type': 'VirtualLocation',
                    url: props?.resource?.link,
                },
                image: {
                    '@type': 'ImageObject',
                    url: props?.image,
                },
                description: props?.description,
                publisher: {
                    '@type': 'Organization',
                    name: 'Bitnorm',
                    url: location.origin,
                },
            };
        }
    }
    return JSON.stringify(schema);
};
