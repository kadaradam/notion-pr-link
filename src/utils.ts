export function getNotionIdsFromText(text: string): string[] | undefined {
  const regexNotionUrl =
    /(?:https?:\/\/)?(?:www\.)?notion\.so\/(?:[0-9a-zA-Z/\-?&=]+)/gm;
  const regexValidNotionId = /[0-9a-f]{32}/gm;

  const notionUrls = text.match(regexNotionUrl);
  const notionIds = notionUrls?.map(url => url.substring(url.length - 32));
  const validNotionIds = notionIds?.filter(notionId =>
    notionId.match(regexValidNotionId)
  );

  return validNotionIds;
}
