import { getPostBySlug, getAllPostSlugs } from '../../lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return (slugs as string[]).map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    return notFound();
  }
  
  const { title, content, publishDate, tags, author, featuredImage } = post.fields;
  
  const formattedDate = new Date(publishDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Custom options for rich text rendering
  const options = {
    renderNode: {
      [BLOCKS.HEADING_2]: (node: any, children: any) => (
        <h2 className="text-2xl font-medium text-slate-800 mb-4 mt-8">{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (node: any, children: any) => (
        <h3 className="text-xl font-medium text-slate-800 mb-3 mt-6">{children}</h3>
      ),
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
        <p className="mb-4 text-slate-700 font-light leading-relaxed">{children}</p>
      ),
      [BLOCKS.UL_LIST]: (node: any, children: any) => (
        <ul className="mb-6 list-disc pl-6 space-y-2 text-slate-700">{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (node: any, children: any) => (
        <ol className="mb-6 list-decimal pl-6 space-y-2 text-slate-700">{children}</ol>
      ),
      [BLOCKS.QUOTE]: (node: any, children: any) => (
        <blockquote className="border-l-4 border-teal-400 pl-4 italic my-6 text-slate-600">{children}</blockquote>
      ),
      [INLINES.HYPERLINK]: (node: any, children: any) => (
        <a href={node.data.uri} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-800 underline">
          {children}
        </a>
      ),
    },
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative flex flex-col pt-20 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 mt-10 text-left">
            <h1 className="text-2xl lg:text-4xl font-light text-slate-800 mb-4 tracking-tight leading-tight">
              {title}
            </h1>
            <div className="flex items-center text-sm text-slate-600">
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {featuredImage && (
        <div className="relative w-full h-64 md:h-96 mb-12">
          <Image 
            src={`https:${featuredImage.fields.file.url}`}
            alt={featuredImage.fields.title || title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Blog Content */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose lg:prose-lg">
          {documentToReactComponents(content, options)}
        </div>
      </section>
    </div>
  );
}
