import { createBlogAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewBlogPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/blog">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add New Blog Post</h1>
          <p className="text-muted-foreground mt-2">Create a new article for your readers.</p>
        </div>
      </div>

      <form action={createBlogAction} className="space-y-8 bg-card p-8 rounded-xl border">
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <Label htmlFor="title">Post Title</Label>
            <Input id="title" name="title" placeholder="e.g. Top 10 Tips for First-Time Home Buyers" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="author">Author Name</Label>
            <Input id="author" name="author" placeholder="e.g. Jane Doe" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Cover Image URL</Label>
            <Input id="image" name="image" placeholder="https://example.com/image.jpg" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Short Excerpt</Label>
            <Textarea id="excerpt" name="excerpt" placeholder="A brief summary of the post..." rows={3} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Full Content (HTML allowed)</Label>
            <Textarea id="content" name="content" placeholder="Write your full article here..." rows={12} required />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline" asChild>
            <Link href="/dashboard/blog">Cancel</Link>
          </Button>
          <Button type="submit">Publish Post</Button>
        </div>
      </form>
    </div>
  );
}
