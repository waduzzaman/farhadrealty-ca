'use client';

import { useState, useEffect } from 'react';
import { Property, PropertyType, getProperties } from '@/lib/data';
import { PropertyCard } from '@/components/property-card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [searchTerm, setSearchTerm] = useState('');
  const [type, setType] = useState<PropertyType | 'All'>('All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [bedrooms, setBedrooms] = useState('All');

  useEffect(() => {
    const fetchProperties = async () => {
      const data = await getProperties();
      setProperties(data);
      setLoading(false);
    };
    fetchProperties();
  }, []);

  const filteredProperties = properties.filter(p => {
    if (searchTerm && !p.title.toLowerCase().includes(searchTerm.toLowerCase()) && !p.location.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (type !== 'All' && p.type !== type) return false;
    if (minPrice && p.price < parseInt(minPrice)) return false;
    if (maxPrice && p.price > parseInt(maxPrice)) return false;
    if (bedrooms !== 'All' && p.bedrooms < parseInt(bedrooms)) return false;
    return true;
  });

  const renderFilters = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Property Type</Label>
        <Select value={type} onValueChange={(v: any) => setType(v)}>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Types</SelectItem>
            <SelectItem value="Buy">Buy</SelectItem>
            <SelectItem value="Rent">Rent</SelectItem>
            <SelectItem value="Sale">Sale</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Price Range</Label>
        <div className="flex items-center gap-2">
          <Input 
            type="number" 
            placeholder="Min" 
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <span>-</span>
          <Input 
            type="number" 
            placeholder="Max" 
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Bedrooms</Label>
        <Select value={bedrooms} onValueChange={setBedrooms}>
          <SelectTrigger>
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">Any</SelectItem>
            <SelectItem value="1">1+</SelectItem>
            <SelectItem value="2">2+</SelectItem>
            <SelectItem value="3">3+</SelectItem>
            <SelectItem value="4">4+</SelectItem>
            <SelectItem value="5">5+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button 
        variant="outline" 
        className="w-full"
        onClick={() => {
          setType('All');
          setMinPrice('');
          setMaxPrice('');
          setBedrooms('All');
          setSearchTerm('');
        }}
      >
        Reset Filters
      </Button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Properties</h1>
          <p className="text-muted-foreground mt-1">Find your perfect property from our extensive catalog.</p>
        </div>
        
        <div className="flex w-full md:w-auto gap-2">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by location or title..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader className="mb-6">
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              {renderFilters()}
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden md:block w-64 shrink-0">
          <div className="sticky top-24 border rounded-xl p-6 bg-card">
            <h2 className="font-semibold mb-6 flex items-center">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </h2>
            {renderFilters()}
          </div>
        </aside>

        {/* Property Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-[400px] rounded-xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border rounded-xl bg-muted/20">
              <h3 className="text-xl font-semibold mb-2">No properties found</h3>
              <p className="text-muted-foreground">Try adjusting your filters to see more results.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
