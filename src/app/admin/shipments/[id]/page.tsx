import { getShipmentById } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { TrackingTimeline } from '@/components/tracking-timeline';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Calendar, MapPin, Package, User, Mail, Phone, Home, Building, FileText, Hash, Weight } from 'lucide-react';
import { UpdateStatusForm } from './update-status-form';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default async function ShipmentDetailsPage({ params }: { params: { id: string } }) {
    const shipment = await getShipmentById(params.id);

    if (!shipment) {
        notFound();
    }

    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'Delivered': return 'default';
            case 'In Transit': return 'secondary';
            case 'On Hold': return 'destructive';
            default: return 'outline';
        }
    };

    return (
        <div className="p-4 md:p-8">
            <header className="flex items-center gap-4 mb-8">
                <SidebarTrigger className="hidden md:flex" />
                <Button variant="outline" size="icon" asChild>
                    <Link href="/admin/shipments">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back</span>
                    </Link>
                </Button>
                <div>
                    <p className="text-sm text-muted-foreground">Tracking ID</p>
                    <h1 className="text-2xl font-bold">{shipment.id}</h1>
                </div>
            </header>

            <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-8">
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <CardTitle>Shipment Details</CardTitle>
                                <Badge variant={getStatusVariant(shipment.currentStatus)} className="font-semibold">
                                    {shipment.currentStatus}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                             <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><Home className="w-5 h-5 text-primary"/> Shipper</h3>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex items-start gap-3">
                                            <User className="w-4 h-4 mt-1 text-muted-foreground" />
                                            <span>{shipment.shipper.firstName} {shipment.shipper.lastName}</span>
                                        </div>
                                         <div className="flex items-start gap-3">
                                            <MapPin className="w-4 h-4 mt-1 text-muted-foreground" />
                                            <span>{shipment.shipper.address}</span>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Phone className="w-4 h-4 mt-1 text-muted-foreground" />
                                            <span>{shipment.shipper.phone}</span>
                                        </div>
                                        {shipment.shipper.email && <div className="flex items-start gap-3">
                                            <Mail className="w-4 h-4 mt-1 text-muted-foreground" />
                                            <span>{shipment.shipper.email}</span>
                                        </div>}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><Building className="w-5 h-5 text-primary"/> Receiver</h3>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex items-start gap-3">
                                            <User className="w-4 h-4 mt-1 text-muted-foreground" />
                                            <span>{shipment.receiver.firstName} {shipment.receiver.lastName}</span>
                                        </div>
                                         <div className="flex items-start gap-3">
                                            <MapPin className="w-4 h-4 mt-1 text-muted-foreground" />
                                            <span>{shipment.receiver.address}</span>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Phone className="w-4 h-4 mt-1 text-muted-foreground" />
                                            <span>{shipment.receiver.phone}</span>
                                        </div>
                                        {shipment.receiver.email && <div className="flex items-start gap-3">
                                            <Mail className="w-4 h-4 mt-1 text-muted-foreground" />
                                            <span>{shipment.receiver.email}</span>
                                        </div>}
                                    </div>
                                </div>
                            </div>
                            <Separator/>
                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><Package className="w-5 h-5 text-primary"/> Cargo Details</h3>
                            <div className="space-y-4">
                                {shipment.parcels.map((parcel, index) => (
                                    <div key={index} className="grid sm:grid-cols-2 gap-x-6 gap-y-2 p-3 rounded-md border bg-muted/50">
                                        <p className="sm:col-span-2 text-sm font-semibold">Parcel {index + 1}</p>
                                        <div className="flex items-start gap-3">
                                            <FileText className="w-4 h-4 mt-1 text-muted-foreground" />
                                            <div>
                                                <p className="text-xs font-semibold">Items</p>
                                                <p className="text-muted-foreground">{parcel.items}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Weight className="w-4 h-4 mt-1 text-muted-foreground" />
                                            <div>
                                                <p className="text-xs font-semibold">Weight</p>
                                                <p className="text-muted-foreground">{parcel.weight}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Separator/>
                             <div className="grid sm:grid-cols-2 gap-6 pt-4">
                                <div className="flex items-start gap-3">
                                    <Calendar className="w-5 h-5 mt-1 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-semibold">Departure Date</p>
                                        <p className="text-muted-foreground">{new Date(shipment.departureDate).toUTCString()}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <FileText className="w-5 h-5 mt-1 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-semibold">Invoice Number</p>
                                        <p className="text-muted-foreground">{shipment.invoiceNumber}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Hash className="w-5 h-5 mt-1 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-semibold">Batch Number</p>
                                        <p className="text-muted-foreground">{shipment.batchNumber}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Shipment History</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <TrackingTimeline history={shipment.history} currentStatus={shipment.currentStatus} />
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Update Status</CardTitle>
                            <CardDescription>Add a new event to the shipment's history.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <UpdateStatusForm shipment={shipment} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
