import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

const previewClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN!,
  host: 'preview.contentful.com',
});

const getClient = (preview: boolean) => (preview ? previewClient : client);

type GetPostsParams = {
  preview?: boolean;
  limit?: number;
  tag?: string;
};

export async function getPosts({ preview = false, limit = 10 }: GetPostsParams = {}) {
  const client = getClient(preview);
  const query: any = {
    content_type: 'blogPost',
    order: '-fields.publishDate',
    limit,
  };
  const response = await client.getEntries(query);
  return response.items;
}

export async function getPostBySlug(slug: string, preview = false) {
  const client = getClient(preview);
  
  const response = await client.getEntries({
    content_type: 'blogPost',
    'fields.slug': slug,
    limit: 1,
  });
  
  return response.items[0];
}

export async function getAllPostSlugs() {
  const client = getClient(false);
  const response = await client.getEntries({
    content_type: 'blogPost',
    select: ['fields.slug'],
  });
  return response.items.map((item: any) => item.fields.slug);
}


