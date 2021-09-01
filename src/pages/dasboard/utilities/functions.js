export const contentBodyFactory = (resource) => {
  let newContent = resource?.content;
  resource?.content_entities?.forEach((entity) => {
    if (entity.type === 'url') {
      let link = `'${entity.url}'`;
      let replacement = ' ' + '<a href=' + link + '>' + entity.url + '</a>';
      let toReplace = ' ' + entity.url;
      //let starting = newContent?.substr(0, entity.offset);
      //let ending = newContent?.substr(entity.offset + entity.length);
      newContent = newContent?.replace(toReplace, replacement);
    } else if (entity.type === 'resource_tag') {
      let link = `${process.env.REACT_APP_BACKEND_URL}/users/${entity.url}'`;
      let replacement =
        ' ' + '<a href=' + link + '>' + '@' + entity.url + '</a>';
      let toReplace = ' ' + '@' + entity.url;
      newContent = newContent?.replace(toReplace, replacement);
    } else if (entity.type === 'hashtag') {
      let link = `${process.env.REACT_APP_BACKEND_URL}/hashtags/${entity.url}'`;
      let replacement = ' ' + '<a href=' + link + '>' + entity.url + '</a>';
      let toReplace = ' ' + entity.url;
      newContent = newContent?.replace(toReplace, replacement);
    } else if (entity.type === 'cashtag') {
      let link = `${process.env.REACT_APP_BACKEND_URL}/cashtags/${entity.url}'`;
      let replacement = ' ' + '<a href=' + link + '>' + entity.url + '</a>';
      let toReplace = ' ' + entity.url;
      newContent = newContent?.replace(toReplace, replacement);
    } else if (entity.type === 'email') {
      let link = `'mailto:${entity.url}'`;
      let replacement = ' ' + '<a href=' + link + '>' + entity.url + '</a>';
      let toReplace = ' ' + entity.url;
      newContent = newContent?.replace(toReplace, replacement);
    }
  });

  return newContent;
};

export const notificationBodyFactory = (notification) => {
  let newContent = notification?.content;
  notification?.content_entities?.forEach((entity) => {
    if (entity?.type === 'resource_tag') {
      let link = `${process.env.REACT_APP_BACKEND_URL}/users/${entity?.url?._id}'`;
      let replacement =
        ' ' +
        '<a href=' +
        link +
        '><b>' +
        entity?.url?.displayName +
        '</b></a>';
      let toReplace = ' @' + entity?.url?._id;
      //let starting = newContent?.substr(0, entity.offset);
      //let ending = newContent?.substr(entity.offset + entity.length);
      newContent = newContent?.replace(toReplace, replacement);
      console.log(newContent);
    }
  });

  return newContent;
};

export const truncateText = (str, n) => {
  if (str.length <= n) {
    return str;
  }
  let useWordBoundary = true;
  const subString = str.substr(0, n - 1); // the original check
  return (
    (useWordBoundary
      ? subString.substr(0, subString.lastIndexOf(' '))
      : subString) + '&hellip;'
  );
};

export const getFeed = (profileData) => {
  let ids = [];
  profileData?.following?.forEach((element) => {
    ids.push(element.userId);
  });
  ids.push(profileData?._id);
  return ids;
};

export const getCreationTime = (time) => {
  let ms = new Date().getTime() - time;
  let seconds = Math.round(ms / 1000);
  let minutes = Math.round(ms / (1000 * 60));
  let hours = Math.round(ms / (1000 * 60 * 60));
  let days = Math.round(ms / (1000 * 60 * 60 * 24));
  if (seconds < 60) return 'a few seconds ago';
  else if (minutes < 60) return minutes + ' minutes';
  else if (hours < 24) return hours + ' hours';
  else return days + ' days';
};
