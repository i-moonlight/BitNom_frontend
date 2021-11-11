import React from 'react';
import { Helmet } from 'react-helmet';
import { helmetJsonLdProp } from 'react-schemaorg';
import moment from 'moment';

function SEO(props) {
    const { title, description, url, image, resource } = props;
    return (
        <Helmet
            script={[helmetJsonLdProp(SchemaFactory(props))]}
            htmlAttributes={{ lang: `en` }}
        >
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
        schema = JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            headline: props?.title,
            url: props?.url,
            author: {
                '@type': 'Organization',
                name: 'Bitnorm',
                url: props?.url,
            },
        });
    }
    if (props?.resource?.__typename === 'OPost') {
        schema = JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SocialMediaPosting',
            '@id': props?.url,
            datePublished: moment(props?.resource?.createdAt).format(
                'YYYY-MM-dd'
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
                              ? `https://${location.origin}/posts/${props?.resource?.shared_resource?._id?._id}`
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
        });
    }
    if (props?.resource?.__typename === 'OEvent') {
        if (props?.resource?.location?.type === 'physical') {
            schema = JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Event',
                name: props?.resource?.title,
                startDate: moment(props?.resource?.startDate).toISOString(),
                endDate: moment(props?.resource?.endDate).toISOString(),
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
                organizer: {
                    '@type': 'Person',
                    name: props?.resource?.organizers[0].displayName,
                    url: `https://${location.origin}/users/${props?.resource?.organizers[0]._id}/`,
                },
                publisher: {
                    '@type': 'Organization',
                    name: 'Bitnorm',
                    url: location.origin,
                },
            });
        } else {
            schema = JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Event',
                name: props?.resource?.title,
                startDate: moment(props?.resource?.startDate).toISOString(),
                endDate: moment(props?.resource?.endDate).toISOString(),
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
                organizer: {
                    '@type': 'Person',
                    name: props?.resource?.organizers[0].displayName,
                    url: `https://${location.origin}/users/${props?.resource?.organizers[0]._id}/`,
                },
                publisher: {
                    '@type': 'Organization',
                    name: 'Bitnorm',
                    url: location.origin,
                },
            });
        }
    }
    return schema;
};
