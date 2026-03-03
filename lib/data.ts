import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

export type PropertyType = 'Buy' | 'Rent' | 'Sale';

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  type: PropertyType;
  bedrooms: number;
  bathrooms: number;
  area: number; // sqft
  images: string[];
  featured: boolean;
  status: 'Available' | 'Sold' | 'Rented';
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  image: string;
  publishedAt: string;
}

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
}

let properties: Property[] = [
  {
    id: '1',
    title: 'Modern Luxury Villa',
    description: 'A stunning modern villa with panoramic ocean views, featuring a private infinity pool, spacious open-plan living areas, and state-of-the-art smart home technology.',
    price: 2500000,
    location: 'Beverly Hills, CA',
    type: 'Sale',
    bedrooms: 5,
    bathrooms: 6,
    area: 6500,
    images: ['https://picsum.photos/seed/prop1/800/600', 'https://picsum.photos/seed/prop1b/800/600'],
    featured: true,
    status: 'Available',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Downtown Penthouse',
    description: 'Luxurious penthouse in the heart of the city with floor-to-ceiling windows, a private rooftop terrace, and premium finishes throughout.',
    price: 8500,
    location: 'Manhattan, NY',
    type: 'Rent',
    bedrooms: 3,
    bathrooms: 3,
    area: 2800,
    images: ['https://picsum.photos/seed/prop2/800/600'],
    featured: true,
    status: 'Available',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Cozy Suburban Home',
    description: 'Perfect family home in a quiet neighborhood. Features a large backyard, updated kitchen, and close proximity to top-rated schools.',
    price: 650000,
    location: 'Austin, TX',
    type: 'Buy',
    bedrooms: 4,
    bathrooms: 2.5,
    area: 2200,
    images: ['https://picsum.photos/seed/prop3/800/600'],
    featured: false,
    status: 'Available',
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Beachfront Condo',
    description: 'Wake up to the sound of waves in this beautiful beachfront condo. Includes resort-style amenities and direct beach access.',
    price: 1200000,
    location: 'Miami, FL',
    type: 'Sale',
    bedrooms: 2,
    bathrooms: 2,
    area: 1500,
    images: ['https://picsum.photos/seed/prop4/800/600'],
    featured: true,
    status: 'Available',
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Historic Townhouse',
    description: 'Charm meets modern convenience in this beautifully restored historic townhouse. Features original hardwood floors and exposed brick walls.',
    price: 950000,
    location: 'Boston, MA',
    type: 'Buy',
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    images: ['https://picsum.photos/seed/prop5/800/600'],
    featured: false,
    status: 'Sold',
    createdAt: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'Modern Studio Apartment',
    description: 'Sleek and efficient studio apartment in a vibrant neighborhood. Perfect for young professionals.',
    price: 2200,
    location: 'Seattle, WA',
    type: 'Rent',
    bedrooms: 1,
    bathrooms: 1,
    area: 600,
    images: ['https://picsum.photos/seed/prop6/800/600'],
    featured: false,
    status: 'Available',
    createdAt: new Date().toISOString(),
  }
];

let blogs: BlogPost[] = [
  {
    id: '1',
    title: 'Top 10 Tips for First-Time Home Buyers',
    excerpt: 'Navigating the real estate market can be daunting. Here are our top tips to help you find your dream home.',
    content: 'Buying your first home is an exciting milestone, but it can also be overwhelming. From saving for a down payment to understanding mortgage rates, there is a lot to consider. In this guide, we break down the top 10 tips every first-time home buyer should know to navigate the process smoothly and confidently. First, determine your budget and stick to it. Second, get pre-approved for a mortgage before you start house hunting...',
    author: 'Jane Doe',
    image: 'https://picsum.photos/seed/blog1/800/400',
    publishedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: '2',
    title: 'How to Maximize Your Property Value Before Selling',
    excerpt: 'Simple renovations and staging techniques that can significantly increase your home\'s selling price.',
    content: 'When it comes time to sell your home, you want to get the best possible price. Fortunately, there are several strategic improvements you can make to boost your property\'s value without breaking the bank. Start with curb appeal: a fresh coat of paint on the front door and some new landscaping can make a great first impression. Inside, focus on the kitchen and bathrooms, as these are the rooms buyers care about most...',
    author: 'John Smith',
    image: 'https://picsum.photos/seed/blog2/800/400',
    publishedAt: new Date(Date.now() - 86400000 * 12).toISOString(),
  },
  {
    id: '3',
    title: 'Understanding the Current Rental Market Trends',
    excerpt: 'An in-depth look at rental prices, demand, and what tenants are looking for in 2024.',
    content: 'The rental market is constantly evolving, and staying informed is crucial for both landlords and tenants. In 2024, we are seeing a shift towards properties that offer flexible living spaces, suitable for remote work. Additionally, amenities like high-speed internet and outdoor areas are more in demand than ever. Rental prices have stabilized in some urban areas while continuing to rise in suburban markets...',
    author: 'Emily Chen',
    image: 'https://picsum.photos/seed/blog3/800/400',
    publishedAt: new Date(Date.now() - 86400000 * 20).toISOString(),
  }
];

let users: User[] = [
  {
    id: '1',
    email: 'admin@FarhadRealy.com',
    passwordHash: bcrypt.hashSync('admin123', 10),
    name: 'Admin User',
  }
];

// Mock API functions
export const getProperties = async () => [...properties];
export const getProperty = async (id: string) => properties.find(p => p.id === id);
export const addProperty = async (property: Omit<Property, 'id' | 'createdAt'>) => {
  const newProp = { ...property, id: uuidv4(), createdAt: new Date().toISOString() };
  properties = [newProp, ...properties];
  return newProp;
};
export const updateProperty = async (id: string, data: Partial<Property>) => {
  properties = properties.map(p => p.id === id ? { ...p, ...data } : p);
  return properties.find(p => p.id === id);
};
export const deleteProperty = async (id: string) => {
  properties = properties.filter(p => p.id !== id);
};

export const getBlogs = async () => [...blogs];
export const getBlog = async (id: string) => blogs.find(b => b.id === id);
export const addBlog = async (blog: Omit<BlogPost, 'id' | 'publishedAt'>) => {
  const newBlog = { ...blog, id: uuidv4(), publishedAt: new Date().toISOString() };
  blogs = [newBlog, ...blogs];
  return newBlog;
};
export const updateBlog = async (id: string, data: Partial<BlogPost>) => {
  blogs = blogs.map(b => b.id === id ? { ...b, ...data } : b);
  return blogs.find(b => b.id === id);
};
export const deleteBlog = async (id: string) => {
  blogs = blogs.filter(b => b.id !== id);
};

export const getStats = async () => {
  return {
    totalListings: properties.length,
    propertiesSold: properties.filter(p => p.status === 'Sold').length,
    propertiesRented: properties.filter(p => p.status === 'Rented').length,
    totalBlogs: blogs.length,
  };
};

export const getUserByEmail = async (email: string) => users.find(u => u.email === email);
export const addUser = async (user: Omit<User, 'id'>) => {
  const newUser = { ...user, id: uuidv4() };
  users.push(newUser);
  return newUser;
};
