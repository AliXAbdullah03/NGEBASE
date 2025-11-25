import { getShipments } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default async function ShipmentsPage({ searchParams }: { searchParams?: { query?: string } }) {
    const query = searchParams?.query || '';
    const allShipments = await getShipments();

    const filteredShipments = allShipments.filter(shipment =>
        shipment.id.toLowerCase().includes(query.toLowerCase()) ||
        `${shipment.shipper.firstName} ${shipment.shipper.lastName}`.toLowerCase().includes(query.toLowerCase()) ||
        shipment.receiver.address.toLowerCase().includes(query.toLowerCase())
    );

    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'Delivered': return 'default';
            case 'In Transit': return 'secondary';
            case 'Processing': return 'outline';
            case 'On Hold': return 'destructive';
            default: return 'secondary';
        }
    };

    return (
        <div className="p-4 md:p-8">
            <header className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                    <SidebarTrigger className="hidden md:flex" />
                    <h1 className="text-3xl font-bold tracking-tight">NGE Shipments</h1>
                </div>
                <Button asChild>
                    <Link href="/admin/shipments/new">Create Shipment</Link>
                </Button>
            </header>

            <Card>
                <CardHeader>
                    <CardTitle>All Shipments</CardTitle>
                    <div className="mt-4">
                        <form>
                            <div className="relative">
                                <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    name="query"
                                    placeholder="Search by ID, client, destination..."
                                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                                    defaultValue={query}
                                />
                            </div>
                        </form>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Tracking ID</TableHead>
                                <TableHead>Shipper</TableHead>
                                <TableHead>Destination</TableHead>
                                <TableHead>Departure Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredShipments.map(shipment => (
                                <TableRow key={shipment.id}>
                                    <TableCell className="font-medium">{shipment.id}</TableCell>
                                    <TableCell>{shipment.shipper.firstName} {shipment.shipper.lastName}</TableCell>
                                    <TableCell>{shipment.receiver.address}</TableCell>
                                    <TableCell>{new Date(shipment.departureDate).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Badge variant={getStatusVariant(shipment.currentStatus)}>{shipment.currentStatus}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button asChild variant="ghost" size="icon">
                                            <Link href={`/admin/shipments/${shipment.id}`}>
                                                <ArrowRight className="h-4 w-4" />
                                                <span className="sr-only">View Details</span>
                                            </Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {filteredShipments.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center h-24">
                                        No shipments found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
