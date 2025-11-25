import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShipmentForm } from './shipment-form';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function NewShipmentPage() {
    return (
        <div className="p-4 md:p-8">
            <header className="flex items-center gap-4 mb-8">
                <SidebarTrigger className="hidden md:flex"/>
                <h1 className="text-3xl font-bold tracking-tight">Create New Shipment</h1>
            </header>

            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle>Shipment Details</CardTitle>
                    <CardDescription>Fill out the form below to create a new shipment record.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ShipmentForm />
                </CardContent>
            </Card>
        </div>
    );
}
