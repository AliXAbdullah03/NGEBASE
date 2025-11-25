import { getShipmentById } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { TrackingTimeline } from '@/components/tracking-timeline';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AlertCircle, ArrowLeft, Calendar, MapPin, Package, User, FileText, Weight } from 'lucide-react';

export default async function TrackShipmentPage({ params }: { params: { id: string } }) {
  const shipment = await getShipmentById(params.id);

  if (!shipment) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center text-center p-4 bg-gray-50">
        <Card className="w-full max-w-md shadow-lg">
            <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                    <AlertCircle className="h-6 w-6 text-destructive" />
                </div>
                <CardTitle className="mt-4 text-2xl">Shipment Not Found</CardTitle>
                <CardDescription>
                    The tracking ID "{params.id}" is not valid. Please check the ID and try again.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button asChild className="w-full">
                    <Link href="/">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Link>
                </Button>
            </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'default';
      case 'On Hold':
        return 'destructive';
      case 'In Transit':
        return 'secondary';
      default:
        return 'outline';
    }
  }

  const totalWeight = shipment.parcels.reduce((acc, parcel) => {
    const weightValue = parseFloat(parcel.weight);
    return isNaN(weightValue) ? acc : acc + weightValue;
  }, 0);

  const weightUnit = shipment.parcels.length > 0 ? (shipment.parcels[0].weight.match(/[a-zA-Z]+/) || [''])[0] : '';


  return (
    <div className="min-h-screen bg-gray-50">
        <header className="bg-white py-4 shadow-sm">
            <div className="container mx-auto px-4 md:px-6">
                <Link href="/" className="text-2xl font-bold text-primary">NEXT GLOBAL EXPRESS</Link>
            </div>
        </header>
        <main className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <Card className="shadow-lg mb-8">
            <CardHeader>
                <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                    <div>
                        <p className="text-sm text-muted-foreground">Tracking Number</p>
                        <h1 className="text-2xl font-bold text-primary tracking-wider">{shipment.id}</h1>
                    </div>
                    <div className="text-left md:text-right">
                        <Badge variant={getStatusVariant(shipment.currentStatus)} className="text-lg font-semibold px-4 py-2">
                            {shipment.currentStatus}
                        </Badge>
                    </div>
                </div>
            </CardHeader>
            <Separator />
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pt-6">
                <div className="flex items-start gap-3">
                    <User className="w-5 h-5 mt-1 text-muted-foreground" />
                    <div>
                        <p className="text-sm font-semibold">Shipper</p>
                        <p className="text-muted-foreground">{shipment.shipper.firstName} {shipment.shipper.lastName}</p>
                    </div>
                </div>
                 <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 mt-1 text-muted-foreground" />
                    <div>
                        <p className="text-sm font-semibold">Route</p>
                        <p className="text-muted-foreground">{shipment.shipper.address} to {shipment.receiver.address}</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 mt-1 text-muted-foreground" />
                    <div>
                        <p className="text-sm font-semibold">Departure Date</p>
                        <p className="text-muted-foreground">{new Date(shipment.departureDate).toLocaleDateString()}</p>
                    </div>
                </div>
                 <div className="flex items-start gap-3">
                    <Weight className="w-5 h-5 mt-1 text-muted-foreground" />
                    <div>
                        <p className="text-sm font-semibold">Total Weight</p>
                        <p className="text-muted-foreground">{totalWeight > 0 ? `${totalWeight.toFixed(2)} ${weightUnit}`: 'N/A'}</p>
                    </div>
                </div>
            </CardContent>
            <Separator />
            <CardContent className="pt-6">
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
            </CardContent>
        </Card>

        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle>Shipment History</CardTitle>
            </CardHeader>
            <CardContent>
                <TrackingTimeline history={shipment.history} currentStatus={shipment.currentStatus} />
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
