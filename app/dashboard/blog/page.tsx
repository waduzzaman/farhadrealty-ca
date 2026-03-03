import { getBlogs } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { deleteBlogAction } from '@/app/actions';
import { format } from 'date-fns';

export default async function DashboardBlogPage() {
  const blogs = await getBlogs();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Blog Posts</h1>
          <p className="text-muted-foreground mt-2">View, edit, or add new blog articles.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/blog/new">
            <Plus className="mr-2 h-4 w-4" /> Add Post
          </Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Published Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell className="font-medium">{blog.title}</TableCell>
                <TableCell>{blog.author}</TableCell>
                <TableCell>{format(new Date(blog.publishedAt), 'MMM d, yyyy')}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/blog/${blog.id}`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <form action={async () => {
                      'use server';
                      await deleteBlogAction(blog.id);
                    }}>
                      <Button variant="ghost" size="icon" type="submit" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {blogs.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  No blog posts found. Add one to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
