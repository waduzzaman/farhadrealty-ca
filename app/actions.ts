'use server';

import { revalidatePath } from 'next/cache';
import { addProperty, updateProperty, deleteProperty, addBlog, updateBlog, deleteBlog } from '@/lib/data';

export async function createPropertyAction(formData: FormData) {
  const data = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    price: Number(formData.get('price')),
    location: formData.get('location') as string,
    type: formData.get('type') as any,
    bedrooms: Number(formData.get('bedrooms')),
    bathrooms: Number(formData.get('bathrooms')),
    area: Number(formData.get('area')),
    images: (formData.get('images') as string).split(',').map(s => s.trim()),
    featured: formData.get('featured') === 'on',
    status: formData.get('status') as any,
  };

  await addProperty(data);
  revalidatePath('/dashboard/properties');
  revalidatePath('/properties');
  revalidatePath('/');
}

export async function deletePropertyAction(id: string) {
  await deleteProperty(id);
  revalidatePath('/dashboard/properties');
  revalidatePath('/properties');
  revalidatePath('/');
}

export async function createBlogAction(formData: FormData) {
  const data = {
    title: formData.get('title') as string,
    excerpt: formData.get('excerpt') as string,
    content: formData.get('content') as string,
    author: formData.get('author') as string,
    image: formData.get('image') as string,
  };

  await addBlog(data);
  revalidatePath('/dashboard/blog');
  revalidatePath('/blog');
  revalidatePath('/');
}

export async function deleteBlogAction(id: string) {
  await deleteBlog(id);
  revalidatePath('/dashboard/blog');
  revalidatePath('/blog');
  revalidatePath('/');
}
