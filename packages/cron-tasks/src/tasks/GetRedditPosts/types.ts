export interface RssResponse<T = unknown> {
  items: T[];
  link: string;
  feedUrl: string;
  title: string;
  lastBuildDate: string;
}

export interface IRedditPost {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  author: string;
  content: string;
  contentSnippet: string;
  isoDate: string;
}
