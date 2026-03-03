import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { BlogPost } from '@/lib/data';
import { format } from 'date-fns';

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Card className="overflow-hidden group flex flex-col h-full hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={post.image || 'https://picsum.photos/seed/blog/800/400'}
          alt={post.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
      </div>
      
      <CardHeader className="p-6 pb-2">
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{format(new Date(post.publishedAt), 'MMM d, yyyy')}</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span>{post.author}</span>
          </div>
        </div>
        <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
          {post.title}
        </h3>
      </CardHeader>
      
      <CardContent className="p-6 pt-2 flex-1 flex flex-col justify-between">
        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
          {post.excerpt}
        </p>
        <Link 
          href={`/blog/${post.id}`} 
          className="text-sm font-semibold text-primary hover:underline mt-auto inline-flex items-center"
        >
          Read More &rarr;
        </Link>
      </CardContent>
    </Card>
  );
}
