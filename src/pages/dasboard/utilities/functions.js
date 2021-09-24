export const contentBodyFactory = resource => {
  let newContent = resource?.content;

  resource?.content_entities?.forEach(entity => {
    if (entity.type === 'url') {
      const link = `${entity.url}`;
      const replacement = '<a href=' + link + '>' + entity.url + '</a>';
      const toReplace = entity.url;
      newContent = newContent?.replace(toReplace, replacement);
    } else if (entity.type === 'resource_tag' && entity.mentioned !== null) {
      const link = `${location.origin}/users/${entity.url}`;
      const replacement =
        '<a href=' + link + '>' + entity.mentioned?.displayName + '</a>';
      const toReplace = '@' + entity.url;
      newContent = newContent?.replace(toReplace, replacement);
    } else if (entity.type === 'hashtag') {
      const link = `${location.origin}/hashtags/${entity.url}`;
      const replacement = '<a href=' + link + '>' + entity.url + '</a>';
      const toReplace = entity.url;
      newContent = newContent?.replace(toReplace, replacement);
    } else if (entity.type === 'cashtag') {
      const link = `${location.origin}/cashtags/${entity.url}`;
      const replacement = '<a href=' + link + '>' + entity.url + '</a>';
      const toReplace = entity.url;
      newContent = newContent?.replace(toReplace, replacement);
    } else if (entity.type === 'email') {
      const link = `'mailto:${entity.url}`;
      const replacement = '<a href=' + link + '>' + entity.url + '</a>';
      const toReplace = entity.url;
      newContent = newContent?.replace(toReplace, replacement);
    }
  });

  return newContent;
};

export const notificationBodyFactory = notification => {
  let newContent = notification?.content;
  notification?.content_entities?.forEach(entity => {
    if (entity?.type === 'resource_tag') {
      const link = `${process.env.REACT_APP_BACKEND_URL}/users/${entity?.url?._id}`;
      const replacement =
        '<a href=' + link + '><b>' + entity?.url?.displayName + '</b></a>';
      const toReplace = '@' + entity?.url?._id;
      //let starting = newContent?.substr(0, entity.offset);
      //let ending = newContent?.substr(entity.offset + entity.length);
      newContent = newContent?.replace(toReplace, replacement);
    }
  });

  return newContent;
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

export const getReactionsSum = resource => {
  return (
    resource?.reactions?.likes +
    resource?.reactions?.dislikes +
    resource?.reactions?.loves +
    resource?.reactions?.celebrations
  );
};

export const getFeed = profileData => {
  const ids = [];
  profileData?.following?.forEach(element => {
    ids.push(element.userId?._id);
  });
  ids.push(profileData?._id);
  return ids;
};

export const getCreationTime = time => {
  const ms = new Date().getTime() - time;
  const seconds = Math.round(ms / 1000);
  const minutes = Math.round(ms / (1000 * 60));
  const hours = Math.round(ms / (1000 * 60 * 60));
  const days = Math.round(ms / (1000 * 60 * 60 * 24));
  if (seconds < 60) return 'a few seconds ago';
  else if (minutes < 60) return minutes + ' minutes';
  else if (hours < 24) return hours + ' hours';
  else return days + ' days';
};

export function generateRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
