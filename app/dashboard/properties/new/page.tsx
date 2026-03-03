import { createPropertyAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewPropertyPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/properties">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add New Property</h1>
          <p className="text-muted-foreground mt-2">Fill in the details to create a new property listing.</p>
        </div>
      </div>

      <form action={createPropertyAction} className="space-y-8 bg-card p-8 rounded-xl border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="title">Property Title</Label>
            <Input id="title" name="title" placeholder="e.g. Modern Luxury Villa" required />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" placeholder="Describe the property..." rows={4} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price ($)</Label>
            <Input id="price" name="price" type="number" placeholder="e.g. 500000" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" name="location" placeholder="e.g. Beverly Hills, CA" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Property Type</Label>
            <Select name="type" defaultValue="Sale">
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Buy">Buy</SelectItem>
                <SelectItem value="Rent">Rent</SelectItem>
                <SelectItem value="Sale">Sale</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select name="status" defaultValue="Available">
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="Sold">Sold</SelectItem>
                <SelectItem value="Rented">Rented</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bedrooms">Bedrooms</Label>
            <Input id="bedrooms" name="bedrooms" type="number" placeholder="e.g. 3" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bathrooms">Bathrooms</Label>
            <Input id="bathrooms" name="bathrooms" type="number" step="0.5" placeholder="e.g. 2.5" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="area">Area (sqft)</Label>
            <Input id="area" name="area" type="number" placeholder="e.g. 2000" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="images">Image URLs (comma separated)</Label>
            <Input id="images" name="images" placeholder="https://image1.jpg, https://image2.jpg" required />
          </div>

          <div className="space-y-2 md:col-span-2 flex items-center gap-2">
            <input type="checkbox" id="featured" name="featured" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
            <Label htmlFor="featured" className="font-normal cursor-pointer">Feature this property on the home page</Label>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline" asChild>
            <Link href="/dashboard/properties">Cancel</Link>
          </Button>
          <Button type="submit">Create Property</Button>
        </div>
      </form>
    </div>
  );
}
