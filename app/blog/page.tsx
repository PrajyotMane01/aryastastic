import { getPosts } from '../lib/contentful';
import Link from 'next/link';
import Image from 'next/image';

export const revalidate = 3600; // Revalidate at most once per hour

export default async function BlogPage() {
  const posts = await getPosts();
  
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative flex flex-col pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-left">
          <div className="mb-6 mt-8">
            <span className="inline-block px-4 py-2 bg-teal-50 rounded-full text-teal-700 text-sm font-medium tracking-wide">
              RESEARCH & INSIGHTS
            </span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-light text-slate-800 mb-8 tracking-tight leading-tight">
            THE STATISTICS<br />
            BLOG
          </h1>
          <p className="text-base lg:text-lg text-slate-600 max-w-2xl font-light">
            Research insights, statistical techniques, and methodology discussions from Dr. Dashrath R Basannar
          </p>
        </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


          {/* Blog posts grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any) => {
              const { title, slug, excerpt, publishDate, featuredImage } = post.fields;
              const formattedDate = new Date(publishDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              });
              
              return (
                <div key={slug} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-slate-100">
                  {featuredImage && (
                    <div className="relative w-full h-48">
                      <Image 
                        src={`https:${featuredImage.fields.file.url}`}
                        alt={featuredImage.fields.title || title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="text-xs text-teal-600 font-medium mb-2">
                      {formattedDate}
                    </div>
                    <h2 className="text-xl font-medium text-slate-800 mb-3 line-clamp-2">
                      <Link href={`/blog/${slug}`} className="hover:text-teal-700 transition-colors">
                        {title}
                      </Link>
                    </h2>
                    <p className="text-slate-600 font-light text-sm line-clamp-3 mb-4">
                      {excerpt}
                    </p>
                    <Link 
                      href={`/blog/${slug}`}
                      className="text-teal-600 text-sm font-medium hover:text-teal-800 transition-colors flex items-center"
                    >
                      Read More
                      <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          
          {posts.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-xl font-medium text-slate-800">No posts found</h3>
              <p className="text-slate-600 mt-2">Check back soon for new content!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
