export const contentBodyFactory = (resource) => {
    let newContent = resource?.content || resource?.description;

    resource?.content_entities?.forEach((entity) => {
        if (entity.type === 'url') {
            const link = `${entity.url}`;
            const replacement =
                '<a style={{zIndex: 2}} target="_blank" href=' +
                link +
                '>' +
                entity.url +
                '</a>';
            const toReplace = entity.url;
            newContent = newContent?.replace(toReplace, replacement);
        } else if (
            entity.type === 'resource_tag' &&
            entity.mentioned !== null
        ) {
            const link = `/users/${entity?.mentioned?._id}`;
            const replacement =
                '<a style={{zIndex: 2}} href=' +
                link +
                '>' +
                entity.mentioned?.displayName +
                '</a>';
            const toReplace = '@' + entity.url;
            newContent = newContent?.replace(toReplace, replacement);
        } else if (entity.type === 'hashtag') {
            const link = `/hashtags/${entity.url.substring(1)}`;
            const replacement =
                '<a style={{zIndex: 2}} href=' +
                link +
                '>' +
                entity.url +
                '</a>';
            const toReplace = entity.url;
            newContent = newContent?.replace(toReplace, replacement);
        } else if (entity.type === 'cashtag') {
            const link = `/cashtags/${entity.url}`;
            const replacement =
                '<a style={{zIndex: 2}} href=' +
                link +
                '>' +
                entity.url +
                '</a>';
            const toReplace = entity.url;
            newContent = newContent?.replace(toReplace, replacement);
        } else if (entity.type === 'email') {
            const link = `'mailto:${entity.url}`;
            const replacement =
                '<a style={{zIndex: 2}} href=' +
                link +
                '>' +
                entity.url +
                '</a>';
            const toReplace = entity.url;
            newContent = newContent?.replace(toReplace, replacement);
        }
    });
    return newContent;
};

export const notificationBodyFactory = (notification) => {
    let newContent = notification?.content;
    notification?.content_entities?.forEach((entity) => {
        if (entity?.type === 'resource_tag') {
            const link = `/users/${entity?.url?._id}`;
            const replacement =
                '<a style={{zIndex: 2}} href=' +
                link +
                '><b>' +
                entity?.url?.displayName +
                '</b></a>';
            const toReplace = '@' + entity?.url?._id;
            //let starting = newContent?.substr(0, entity.offset);
            //let ending = newContent?.substr(entity.offset + entity.length);
            newContent = newContent?.replace(toReplace, replacement);
        }
    });

    return newContent;
};

export const mentionsFinder = (content) => {
    const mentionsRegex = /\/\*.+?-.+?\*\//g;
    const mentions = content.match(mentionsRegex);
    const contentEntities = [];
    let newContent = content;

    if (mentions) {
        mentions.map((match) => {
            const parts = match
                .substring(2, match.length - 2)
                .split(/\s*-\s*/g);
            const link = `/users/${parts[0].substring(1)}`;
            const replacement =
                '<a style={{zIndex: 2}} href=' + link + '>' + parts[1] + '</a>';
            newContent = newContent?.replace(match, replacement);
            const type = 'resource_tag';
            const url = parts[0].substring(1);
            const offset = content.indexOf(parts[0]);
            const length = parts[0].length;
            contentEntities.push({
                type,
                offset,
                length,
                url,
            });
        });
    }
    return { contentEntities: contentEntities, content: newContent };
};

export const mentionsUpdate = (content) => {
    const mentionsRegex =
        /<a style={{zIndex: 2}} href=\/users\/.+?>(.*?)<\/a>/g;
    const mentions = content.match(mentionsRegex);
    let displayContent = content;

    if (mentions) {
        mentions.map((match) => {
            const mention = match
                .replace(/<a style={{zIndex: 2}} href=\/users\//, '')
                .replace(/>.+?<\/a>/, '');
            displayContent = displayContent?.replace(match, '@' + mention);
        });
    }
    return displayContent;
};

export const truncateText = (str, n) => {
    if (str.length <= n) {
        return str;
    }
    const useWordBoundary = true;
    const subString = str.substr(0, n - 1); // the original check
    return (
        (useWordBoundary
            ? subString.substr(0, subString.lastIndexOf(' '))
            : subString) + '&hellip;'
    );
};

export const getReactionsSum = (resource) => {
    return (
        resource?.reactions?.likes +
        resource?.reactions?.dislikes +
        resource?.reactions?.loves +
        resource?.reactions?.celebrations
    );
};

export const getTopComments = (resource) => {
    return (
        resource?.reactions?.likes +
        resource?.reactions?.dislikes +
        resource?.reactions?.loves +
        resource?.reactions?.celebrations +
        resource?.replies
    );
};

export const getFeed = (profileData) => {
    const ids = [];
    profileData?.following?.forEach((element) => {
        ids.push(element.userId?._id);
    });
    ids.push(profileData?._id);
    return ids;
};

export const getCreationTime = (time) => {
    const ms = new Date().getTime() - time;
    const seconds = Math.round(ms / 1000);
    const minutes = Math.round(ms / (1000 * 60));
    const hours = Math.round(ms / (1000 * 60 * 60));
    const days = Math.round(ms / (1000 * 60 * 60 * 24));
    if (seconds < 60) return seconds + ' s';
    else if (minutes < 60) return minutes + ' m';
    else if (hours < 24) return hours + ' h';
    else return days + ' d';
};

export function generateRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

//date of the month
export function getDateOrdinal(dom) {
    if (dom == 31 || dom == 21 || dom == 1) return dom + 'st';
    else if (dom == 22 || dom == 2) return dom + 'nd';
    else if (dom == 23 || dom == 3) return dom + 'rd';
    else return dom + 'th';
}
