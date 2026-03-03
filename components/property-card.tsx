import Image from 'next/image';
import Link from 'next/link';
import { Bed, Bath, Square, MapPin } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Property } from '@/lib/data';

export function PropertyCard({ property }: { property: Property }) {
  return (
    <Card className="overflow-hidden group flex flex-col h-full hover:shadow-lg transition-shadow">
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={property.images[0] || 'https://picsum.photos/seed/placeholder/800/600'}
          alt={property.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge variant="default" className="bg-primary/90 hover:bg-primary">
            For {property.type}
          </Badge>
          {property.status !== 'Available' && (
            <Badge variant="destructive" className="bg-red-500/90 hover:bg-red-500">
              {property.status}
            </Badge>
          )}
        </div>
        <div className="absolute bottom-4 left-4">
          <Badge variant="secondary" className="bg-background/90 backdrop-blur font-semibold text-lg">
            ${property.price.toLocaleString()}
            {property.type === 'Rent' && <span className="text-sm font-normal text-muted-foreground">/mo</span>}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="p-4 pb-2">
        <h3 className="text-xl font-bold line-clamp-1">{property.title}</h3>
        <div className="flex items-center text-muted-foreground text-sm mt-1">
          <MapPin className="h-4 w-4 mr-1 shrink-0" />
          <span className="line-clamp-1">{property.location}</span>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-0 flex-1">
        <p className="text-muted-foreground text-sm line-clamp-2 mt-2">
          {property.description}
        </p>
      </CardContent>
      
      <CardFooter className="p-4 border-t bg-muted/20 flex justify-between items-center text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Bed className="h-4 w-4" />
          <span>{property.bedrooms}</span>
        </div>
        <div className="flex items-center gap-1">
          <Bath className="h-4 w-4" />
          <span>{property.bathrooms}</span>
        </div>
        <div className="flex items-center gap-1">
          <Square className="h-4 w-4" />
          <span>{property.area} sqft</span>
        </div>
      </CardFooter>
      <Link href={`/properties/${property.id}`} className="absolute inset-0 z-10">
        <span className="sr-only">View Property</span>
      </Link>
    </Card>
  );
}
