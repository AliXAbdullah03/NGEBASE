'use client';

import React, { useActionState, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { createShipment } from '@/lib/actions';
import { CalendarIcon, Loader2, PlusCircle, Trash2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

function SubmitButton() {
    const { pending } = useActionState(createShipment, { message: null, errors: {}, success: false });
    return (
        <Button type="submit" disabled={pending} size="lg" className="w-full mt-6">
            {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Shipment
        </Button>
    );
}

export function ShipmentForm() {
    const initialState = { message: null, errors: {}, success: false, shipmentId: null };
    const [state, dispatch] = useActionState(createShipment, initialState);
    const { toast } = useToast();
    const router = useRouter();
    const [date, setDate] = useState<Date>();
    const [parcels, setParcels] = useState([{ id: 1, items: '', weight: '' }]);

    const addParcel = () => {
        setParcels([...parcels, { id: Date.now(), items: '', weight: '' }]);
    };

    const removeParcel = (id: number) => {
        setParcels(parcels.filter(p => p.id !== id));
    };

    const handleParcelChange = (id: number, field: 'items' | 'weight', value: string) => {
        setParcels(parcels.map(p => p.id === id ? { ...p, [field]: value } : p));
    };

    useEffect(() => {
        if (state.success && state.shipmentId) {
            toast({
                title: 'Success!',
                description: state.message,
            });
            setTimeout(() => {
                router.push(`/admin/shipments/${state.shipmentId}`);
            }, 1000);
        } else if (state.message && !state.success) {
            toast({
                title: 'Error creating shipment',
                description: state.message,
                variant: 'destructive',
            });
        }
    }, [state, toast, router]);

    return (
        <form action={dispatch} className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Shipper Information</CardTitle>
                    <CardDescription>Details of the person sending the shipment.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="shipperFirstName">First Name</Label>
                            <Input id="shipperFirstName" name="shipperFirstName" placeholder="John" />
                            {state.errors?.['shipper.firstName'] && <p className="text-sm font-medium text-destructive">{state.errors['shipper.firstName'][0]}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="shipperLastName">Last Name</Label>
                            <Input id="shipperLastName" name="shipperLastName" placeholder="Doe" />
                             {state.errors?.['shipper.lastName'] && <p className="text-sm font-medium text-destructive">{state.errors['shipper.lastName'][0]}</p>}
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="shipperAddress">Address</Label>
                        <Input id="shipperAddress" name="shipperAddress" placeholder="123 Main St, New York, NY 10001" />
                        {state.errors?.['shipper.address'] && <p className="text-sm font-medium text-destructive">{state.errors['shipper.address'][0]}</p>}
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="shipperPhone">Phone Number</Label>
                            <Input id="shipperPhone" name="shipperPhone" placeholder="+1 212-555-0123" />
                            {state.errors?.['shipper.phone'] && <p className="text-sm font-medium text-destructive">{state.errors['shipper.phone'][0]}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="shipperEmail">Email Address (Optional)</Label>
                            <Input id="shipperEmail" name="shipperEmail" type="email" placeholder="shipper@example.com" />
                            {state.errors?.['shipper.email'] && <p className="text-sm font-medium text-destructive">{state.errors['shipper.email'][0]}</p>}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Receiver Information</CardTitle>
                    <CardDescription>Details of the person receiving the shipment.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="receiverFirstName">First Name</Label>
                            <Input id="receiverFirstName" name="receiverFirstName" placeholder="Jane" />
                            {state.errors?.['receiver.firstName'] && <p className="text-sm font-medium text-destructive">{state.errors['receiver.firstName'][0]}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="receiverLastName">Last Name</Label>
                            <Input id="receiverLastName" name="receiverLastName" placeholder="Smith" />
                            {state.errors?.['receiver.lastName'] && <p className="text-sm font-medium text-destructive">{state.errors['receiver.lastName'][0]}</p>}
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="receiverAddress">Address</Label>
                        <Input id="receiverAddress" name="receiverAddress" placeholder="456 Park Ave, London, W1K 1BE" />
                        {state.errors?.['receiver.address'] && <p className="text-sm font-medium text-destructive">{state.errors['receiver.address'][0]}</p>}
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="receiverPhone">Phone Number</Label>
                            <Input id="receiverPhone" name="receiverPhone" placeholder="+44 20 7946 0958" />
                            {state.errors?.['receiver.phone'] && <p className="text-sm font-medium text-destructive">{state.errors['receiver.phone'][0]}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="receiverEmail">Email Address (Optional)</Label>
                            <Input id="receiverEmail" name="receiverEmail" type="email" placeholder="receiver@example.com" />
                            {state.errors?.['receiver.email'] && <p className="text-sm font-medium text-destructive">{state.errors['receiver.email'][0]}</p>}
                        </div>
                    </div>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>Shipment & Cargo Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="invoiceNumber">Invoice Number</Label>
                            <Input id="invoiceNumber" name="invoiceNumber" placeholder="INV-2024-123" />
                            {state.errors?.invoiceNumber && <p className="text-sm font-medium text-destructive">{state.errors.invoiceNumber[0]}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="batchNumber">Batch Number</Label>
                            <Input id="batchNumber" name="batchNumber" placeholder="BATCH-007" />
                            {state.errors?.batchNumber && <p className="text-sm font-medium text-destructive">{state.errors.batchNumber[0]}</p>}
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <Label>Parcels</Label>
                        {parcels.map((parcel, index) => (
                            <div key={parcel.id} className="grid grid-cols-12 gap-2 items-center">
                                <div className="col-span-6 space-y-1">
                                    <Label htmlFor={`parcelItems-${parcel.id}`} className="text-xs">Box {index + 1} Items</Label>
                                    <Input 
                                        id={`parcelItems-${parcel.id}`} 
                                        name="parcelItems[]" 
                                        placeholder="e.g., T-shirts, Jeans"
                                        value={parcel.items}
                                        onChange={(e) => handleParcelChange(parcel.id, 'items', e.target.value)}
                                    />
                                </div>
                                <div className="col-span-4 space-y-1">
                                     <Label htmlFor={`parcelWeights-${parcel.id}`} className="text-xs">Weight</Label>
                                    <Input 
                                        id={`parcelWeights-${parcel.id}`} 
                                        name="parcelWeights[]" 
                                        placeholder="e.g., 5kg"
                                        value={parcel.weight}
                                        onChange={(e) => handleParcelChange(parcel.id, 'weight', e.target.value)}
                                    />
                                </div>
                                <div className="col-span-2 flex justify-end items-end h-full">
                                    {parcels.length > 1 && (
                                        <Button type="button" variant="destructive" size="icon" onClick={() => removeParcel(parcel.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                                {state.errors?.parcels?.[index] && <p className="col-span-12 text-sm font-medium text-destructive">{JSON.stringify(state.errors.parcels[index])}</p>}
                            </div>
                        ))}
                        <Button type="button" variant="outline" size="sm" onClick={addParcel}>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add another parcel
                        </Button>
                        {state.errors?.parcels && typeof state.errors.parcels === 'string' && <p className="text-sm font-medium text-destructive">{state.errors.parcels}</p>}
                    </div>

                     <div className="space-y-2">
                        <Label htmlFor="departureDate">Departure Date</Label>
                        <Input type="hidden" name="departureDate" value={date?.toISOString()}/>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                )}
                                >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        {state.errors?.departureDate && <p className="text-sm font-medium text-destructive">{state.errors.departureDate[0]}</p>}
                    </div>
                </CardContent>
            </Card>

            <SubmitButton />
        </form>
    );
}
