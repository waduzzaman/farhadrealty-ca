import { getBlogs } from '@/lib/data';
import { BlogCard } from '@/components/blog-card';

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Real Estate Insights</h1>
        <p className="text-lg text-muted-foreground">
          Stay informed with our latest articles, market trends, and expert advice on buying, selling, and renting properties.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map(blog => (
          <BlogCard key={blog.id} post={blog} />
        ))}
      </div>
    </div>
  );
}
