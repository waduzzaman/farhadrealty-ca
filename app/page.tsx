import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getProperties, getBlogs } from "@/lib/data";
import { PropertyCard } from "@/components/property-card";
import { BlogCard } from "@/components/blog-card";
import { ArrowRight, Building, Users, Award, ShieldCheck } from "lucide-react";
import { auth } from "@/auth";
import { ComingSoon } from "@/components/coming-soon";

export default async function Home() {
  const session = await auth();
  const isLoggedIn = !!session?.user;

  if (!isLoggedIn) {
    return <ComingSoon />;
  }

  const allProperties = await getProperties();
  const featuredProperties = allProperties.filter(p => p.featured).slice(0, 3);
  
  const allBlogs = await getBlogs();
  const recentBlogs = allBlogs.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center">
        <Image
          src="https://picsum.photos/seed/hero/1920/1080"
          alt="Luxury Home"
          fill
          className="object-cover brightness-[0.6]"
          priority
          referrerPolicy="no-referrer"
        />
        <div className="container relative z-10 px-4 md:px-6 text-center text-white">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Find Your Dream Home
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-gray-200">
            Discover premium properties in the most exclusive neighborhoods. Your journey to luxury living starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="text-lg h-14 px-8">
              <Link href="/properties">View Properties</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg h-14 px-8 bg-white/10 hover:bg-white/20 border-white text-white">
              <Link href="/contact">Contact an Agent</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Listings</h2>
              <p className="text-muted-foreground">Explore our handpicked selection of premium properties.</p>
            </div>
            <Button variant="ghost" asChild className="hidden sm:flex">
              <Link href="/properties">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Button variant="outline" asChild>
              <Link href="/properties">
                View All Properties <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="https://picsum.photos/seed/about/800/1000"
                alt="About Us"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Why Choose FarhadRealy?</h2>
              <p className="text-lg text-muted-foreground">
                With over 20 years of experience in the luxury real estate market, we provide unparalleled service and expertise to help you find the perfect property.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="flex gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg h-fit">
                    <Building className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Premium Properties</h3>
                    <p className="text-sm text-muted-foreground">Access to exclusive off-market listings.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg h-fit">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Expert Agents</h3>
                    <p className="text-sm text-muted-foreground">Dedicated professionals at your service.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg h-fit">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Award Winning</h3>
                    <p className="text-sm text-muted-foreground">Recognized for excellence in real estate.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg h-fit">
                    <ShieldCheck className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Trusted Service</h3>
                    <p className="text-sm text-muted-foreground">Transparent and secure transactions.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Previews */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Latest from Our Blog</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest real estate trends, market insights, and home improvement tips.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentBlogs.map(blog => (
              <BlogCard key={blog.id} post={blog} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button variant="outline" asChild>
              <Link href="/blog">
                Read More Articles
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Ready to Find Your Dream Home?</h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-primary-foreground/80">
            Contact our team of experts today and let us help you navigate the real estate market with confidence.
          </p>
          <Button size="lg" variant="secondary" asChild className="text-lg h-14 px-8">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
