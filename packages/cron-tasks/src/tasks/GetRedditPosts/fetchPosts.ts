import { Post, PostProvider, PrismaClient } from '@prisma/client';
import { getLogger } from 'log4js';
import Parser from 'rss-parser';

const LOG = getLogger('GetRedditPostsTask');
const prisma = new PrismaClient();

const API_URL = 'https://reddit.com/.rss';

export const fetchNewPosts = async (): Promise<boolean> => {
  const parser = new Parser();

  const lastPost = await prisma.post.findFirst({
    select: {
      foreignId: true,
    },
    where: {
      provider: PostProvider.REDDIT,
    },
    orderBy: {
      id: 'desc',
    },
  });

  const foreignId = lastPost?.foreignId;

  const queryString = new URLSearchParams();
  queryString.set('limit', '20');

  if (foreignId) {
    queryString.set('after', foreignId);
  }

  try {
    const feed = await parser.parseURL(`${API_URL}?${queryString.toString()}`);

    LOG.info(
      `Got ${feed.items.length} posts from rss. Appending to the database`
    );

    const posts: Array<Omit<Post, 'createdAt' | 'updatedAt' | 'id'>> =
      feed.items.map((item) => ({
        author: String(item.author || 'Unknown'),
        title: String(item.title!),
        pubDate: new Date(item.pubDate!),
        link: item.link!,
        content: item.content!,
        contentSnippet: item.contentSnippet!,
        provider: PostProvider.REDDIT,
        foreignId: item.id,
      }));

    const res = await prisma.post.createMany({
      data: posts,
      skipDuplicates: true,
    });

    LOG.info(`Added ${res.count} posts to the DB`);
  } catch (err: any) {
    if (err.code == 'ENOTFOUND') {
      return false;
    }

    LOG.error(`Unable to add new posts. Error: ${JSON.stringify(err)}`);
    console.error(err);
    return false;
  }

  return true;
};
