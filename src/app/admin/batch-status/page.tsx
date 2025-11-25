import { getShipments } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowRight, Layers } from 'lucide-react';
import { BatchUpdateForm } from './batch-update-form';
import type { Shipment } from '@/lib/types';

export default async function BatchStatusPage() {
    const allShipments = await getShipments();

    const batches = allShipments.reduce((acc, shipment) => {
        const batchNumber = shipment.batchNumber;
        if (!acc[batchNumber]) {
            acc[batchNumber] = [];
        }
        acc[batchNumber].push(shipment);
        return acc;
    }, {} as Record<string, Shipment[]>);

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
            <header className="flex items-center gap-4 mb-8">
                <SidebarTrigger className="hidden md:flex" />
                <div className="flex items-center gap-3">
                    <Layers className="w-8 h-8" />
                    <h1 className="text-3xl font-bold tracking-tight">Batch Status Management</h1>
                </div>
            </header>

            <Card>
                <CardHeader>
                    <CardTitle>Shipment Batches</CardTitle>
                    <CardDescription>View shipments grouped by batch number and perform bulk status updates.</CardDescription>
                </CardHeader>
                <CardContent>
                    {Object.keys(batches).length === 0 ? (
                        <p className="text-muted-foreground text-center">No batches found.</p>
                    ) : (
                        <Accordion type="single" collapsible className="w-full">
                            {Object.entries(batches).map(([batchNumber, shipments]) => (
                                <AccordionItem key={batchNumber} value={batchNumber}>
                                    <AccordionTrigger className="hover:no-underline">
                                        <div className="flex justify-between items-center w-full pr-4">
                                            <div className="flex items-center gap-3">
                                                <Layers className="w-5 h-5 text-primary" />
                                                <div className="text-left">
                                                    <p className="font-semibold">{batchNumber}</p>
                                                    <p className="text-sm text-muted-foreground">{shipments.length} shipment(s)</p>
                                                </div>
                                            </div>
                                            <Badge>{shipments[0].currentStatus}</Badge>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="space-y-6">
                                        <div className="grid lg:grid-cols-3 gap-6">
                                            <div className="lg:col-span-2">
                                                <h4 className="font-semibold mb-2">Shipments in this Batch</h4>
                                                <div className="border rounded-md">
                                                    <Table>
                                                        <TableHeader>
                                                            <TableRow>
                                                                <TableHead>Tracking ID</TableHead>
                                                                <TableHead>Destination</TableHead>
                                                                <TableHead>Status</TableHead>
                                                                <TableHead><span className="sr-only">Details</span></TableHead>
                                                            </TableRow>
                                                        </TableHeader>
                                                        <TableBody>
                                                            {shipments.map(shipment => (
                                                                <TableRow key={shipment.id}>
                                                                    <TableCell className="font-medium">{shipment.id}</TableCell>
                                                                    <TableCell>{shipment.receiver.address}</TableCell>
                                                                    <TableCell>
                                                                        <Badge variant={getStatusVariant(shipment.currentStatus)}>
                                                                            {shipment.currentStatus}
                                                                        </Badge>
                                                                    </TableCell>
                                                                    <TableCell className="text-right">
                                                                        <Link href={`/admin/shipments/${shipment.id}`} className="text-primary hover:underline">
                                                                            <ArrowRight className="h-4 w-4" />
                                                                        </Link>
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold mb-2">Bulk Status Update</h4>
                                                <BatchUpdateForm batchNumber={batchNumber} currentStatus={shipments[0].currentStatus} />
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
