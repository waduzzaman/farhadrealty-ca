import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getBlog } from '@/lib/data';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';

export default async function BlogDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blog = await getBlog(id);

  if (!blog) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 md:px-6 py-12 max-w-4xl">
      <Link href="/blog" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Blog
      </Link>

      <header className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
          {blog.title}
        </h1>
        <div className="flex items-center justify-center gap-6 text-muted-foreground">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5" />
            <span className="font-medium">{blog.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <time dateTime={blog.publishedAt}>
              {format(new Date(blog.publishedAt), 'MMMM d, yyyy')}
            </time>
          </div>
        </div>
      </header>

      <div className="relative h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden mb-12 shadow-xl">
        <Image
          src={blog.image || 'https://picsum.photos/seed/blog/1200/600'}
          alt={blog.title}
          fill
          className="object-cover"
          priority
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="prose prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80">
        <p className="lead text-xl md:text-2xl text-muted-foreground mb-8 font-medium">
          {blog.excerpt}
        </p>
        <div dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br/>') }} />
        
        {/* Placeholder for more content to make it look like a full article */}
        <h2 className="mt-12 mb-6">The Importance of Location</h2>
        <p>
          As the old adage goes, &quot;location, location, location.&quot; This remains the golden rule of real estate. A property&apos;s location determines its value, its potential for appreciation, and its desirability. When considering a purchase, look beyond the property lines. Evaluate the neighborhood, the quality of local schools, proximity to amenities, and future development plans.
        </p>
        <h2 className="mt-12 mb-6">Understanding Market Dynamics</h2>
        <p>
          Real estate markets are cyclical. Understanding whether you are in a buyer&apos;s or seller&apos;s market can significantly impact your strategy. In a seller&apos;s market, inventory is low, and competition is fierce, often leading to bidding wars. Conversely, a buyer&apos;s market offers more choices and negotiating power. Stay informed about local trends to make the best decisions.
        </p>
      </div>
    </article>
  );
}
