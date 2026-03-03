import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProperty } from '@/lib/data';
import { Bed, Bath, Square, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default async function PropertyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = await getProperty(id);

  if (!property) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="default" className="bg-primary/90 hover:bg-primary">
              For {property.type}
            </Badge>
            {property.status !== 'Available' && (
              <Badge variant="destructive" className="bg-red-500/90 hover:bg-red-500">
                {property.status}
              </Badge>
            )}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-2">{property.title}</h1>
          <div className="flex items-center text-muted-foreground text-lg">
            <MapPin className="h-5 w-5 mr-1 shrink-0" />
            <span>{property.location}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-4xl font-bold text-primary">
            ${property.price.toLocaleString()}
            {property.type === 'Rent' && <span className="text-xl font-normal text-muted-foreground">/mo</span>}
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 h-[400px] md:h-[600px]">
        <div className="md:col-span-2 relative h-full rounded-2xl overflow-hidden">
          <Image
            src={property.images[0] || 'https://picsum.photos/seed/placeholder/1200/800'}
            alt={property.title}
            fill
            className="object-cover"
            priority
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="hidden md:flex flex-col gap-4 h-full">
          <div className="relative flex-1 rounded-2xl overflow-hidden">
            <Image
              src={property.images[1] || 'https://picsum.photos/seed/placeholder2/800/600'}
              alt={`${property.title} interior`}
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="relative flex-1 rounded-2xl overflow-hidden">
            <Image
              src={property.images[2] || 'https://picsum.photos/seed/placeholder3/800/600'}
              alt={`${property.title} exterior`}
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer hover:bg-black/50 transition-colors">
              <span className="text-white font-semibold text-lg">+ View All Photos</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-10">
          {/* Key Features */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-muted/30 rounded-2xl">
            <div className="flex flex-col items-center justify-center p-4 bg-background rounded-xl shadow-sm">
              <Bed className="h-8 w-8 text-primary mb-2" />
              <span className="font-semibold text-lg">{property.bedrooms}</span>
              <span className="text-sm text-muted-foreground">Bedrooms</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-background rounded-xl shadow-sm">
              <Bath className="h-8 w-8 text-primary mb-2" />
              <span className="font-semibold text-lg">{property.bathrooms}</span>
              <span className="text-sm text-muted-foreground">Bathrooms</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-background rounded-xl shadow-sm">
              <Square className="h-8 w-8 text-primary mb-2" />
              <span className="font-semibold text-lg">{property.area}</span>
              <span className="text-sm text-muted-foreground">Square Feet</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-background rounded-xl shadow-sm">
              <Calendar className="h-8 w-8 text-primary mb-2" />
              <span className="font-semibold text-lg">{new Date(property.createdAt).getFullYear()}</span>
              <span className="text-sm text-muted-foreground">Listed Year</span>
            </div>
          </section>

          {/* Description */}
          <section>
            <h2 className="text-2xl font-bold mb-4">About this Property</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p>{property.description}</p>
              <p>
                This magnificent property offers an unparalleled living experience. Featuring high-end finishes, spacious rooms, and breathtaking views, it is designed for those who appreciate the finer things in life. The open-concept layout seamlessly connects the living, dining, and kitchen areas, making it perfect for entertaining guests or enjoying quiet family evenings.
              </p>
              <p>
                The master suite is a true retreat, complete with a spa-like en-suite bathroom and a walk-in closet. Additional bedrooms are generously sized and offer ample natural light. Outside, you&apos;ll find a beautifully landscaped yard, providing a private oasis for relaxation.
              </p>
            </div>
          </section>

          {/* Amenities */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {['Air Conditioning', 'Heating', 'Internet', 'Parking', 'Pool', 'Gym', 'Security System', 'Balcony', 'Garden'].map((amenity, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <Card className="border-2 border-primary/10 shadow-lg">
              <CardHeader className="bg-muted/30 pb-6">
                <CardTitle className="text-2xl">Contact Agent</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  Interested in this property? Fill out the form below and our agent will get back to you shortly.
                </p>
              </CardHeader>
              <CardContent className="pt-6">
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="(555) 123-4567" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="I am interested in this property..." 
                      rows={4}
                      defaultValue={`Hi, I am interested in ${property.title} located at ${property.location}. Please contact me.`}
                    />
                  </div>
                  <Button type="submit" className="w-full h-12 text-lg mt-4">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
