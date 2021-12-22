import locale from 'date-fns/locale/en-US';
import { formatDistanceToNowStrict } from 'date-fns';

export const getDistanceToNow = (datems) => {
    return formatDistanceToNowStrict(datems, {
        addSuffix: false,
        locale: {
            ...locale,
            formatDistance,
        },
    });
};

export const getDistanceToNowWithSuffix = (datems) => {
    return formatDistanceToNowStrict(datems, {
        addSuffix: true,
        locale: {
            ...locale,
            formatDistance,
        },
    });
};

const formatDistanceLocale = {
    lessThanXSeconds: '{{count}}s',
    xSeconds: '{{count}}s',
    halfAMinute: '30s',
    lessThanXMinutes: '{{count}}m',
    xMinutes: '{{count}}m',
    aboutXHours: '{{count}}h',
    xHours: '{{count}}h',
    xDays: '{{count}}d',
    aboutXWeeks: '{{count}}w',
    xWeeks: '{{count}}w',
    aboutXMonths: '{{count}}m',
    xMonths: '{{count}}m',
    aboutXYears: '{{count}}y',
    xYears: '{{count}}y',
    overXYears: '{{count}}y',
    almostXYears: '{{count}}y',
};

function formatDistance(token, count, options) {
    options = options || {};

    const result = formatDistanceLocale[token].replace('{{count}}', count);

    if (options.addSuffix) {
        if (options.comparison > 0) {
            return 'in ' + result;
        } else {
            return result + ' ago';
        }
    }

    return result;
}
