import { getProperties } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { deletePropertyAction } from '@/app/actions';

export default async function DashboardPropertiesPage() {
  const properties = await getProperties();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Properties</h1>
          <p className="text-muted-foreground mt-2">View, edit, or add new property listings.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/properties/new">
            <Plus className="mr-2 h-4 w-4" /> Add Property
          </Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties.map((property) => (
              <TableRow key={property.id}>
                <TableCell className="font-medium">{property.title}</TableCell>
                <TableCell>{property.location}</TableCell>
                <TableCell>${property.price.toLocaleString()}</TableCell>
                <TableCell>{property.type}</TableCell>
                <TableCell>
                  <Badge variant={property.status === 'Available' ? 'default' : 'secondary'}>
                    {property.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/properties/${property.id}`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <form action={async () => {
                      'use server';
                      await deletePropertyAction(property.id);
                    }}>
                      <Button variant="ghost" size="icon" type="submit" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {properties.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No properties found. Add one to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
