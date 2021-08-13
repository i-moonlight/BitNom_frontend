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
      let link = `'https://bitnorm.com/users/${entity.url}'`;
      let replacement =
        ' ' + '<a href=' + link + '>' + '@' + entity.url + '</a>';
      let toReplace = ' ' + '@' + entity.url;
      newContent = newContent?.replace(toReplace, replacement);
    } else if (entity.type === 'hashtag') {
      let link = `'https://bitnorm.com/hashtags/${entity.url}'`;
      let replacement = ' ' + '<a href=' + link + '>' + entity.url + '</a>';
      let toReplace = ' ' + entity.url;
      newContent = newContent?.replace(toReplace, replacement);
    } else if (entity.type === 'cashtag') {
      let link = `'https://bitnorm.com/cashtags/${entity.url}'`;
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
    if (entity.type === 'resource_tag') {
      let link = `'https://bitnorm.com/users/${entity.url._id}'`;
      let replacement =
        ' ' + '<a href=' + link + '><b>' + entity.url.displayName + '</b></a>';
      let toReplace = ' @' + entity.url._id;
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
