'use client';

import { useActionState, useFormStatus } from 'react-dom';
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { updateShipmentStatus } from '@/lib/actions';
import { type Shipment, shipmentStatuses } from '@/lib/types';
import { Loader2 } from 'lucide-react';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} className="w-full">
            {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Update Status
        </Button>
    );
}

export function UpdateStatusForm({ shipment }: { shipment: Shipment }) {
    const initialState = { message: null, errors: {} };
    const [state, dispatch] = React.useActionState(updateShipmentStatus, initialState);
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state.success) {
            toast({
                title: 'Success',
                description: state.message,
            });
            formRef.current?.reset();
        } else if (state.message) {
            toast({
                title: 'Error',
                description: state.message,
                variant: 'destructive',
            });
        }
    }, [state, toast]);

    return (
        <form ref={formRef} action={dispatch} className="space-y-4">
            <input type="hidden" name="shipmentId" value={shipment.id} />
            
            <div>
                <Label htmlFor="status">New Status</Label>
                <Select name="status" defaultValue={shipment.currentStatus}>
                    <SelectTrigger id="status">
                        <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                        {shipmentStatuses.map(status => (
                            <SelectItem key={status} value={status}>
                                {status}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                 {state.errors?.status && <p className="text-sm font-medium text-destructive mt-1">{state.errors.status[0]}</p>}
            </div>

            <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" placeholder="e.g., London Heathrow Airport" />
                {state.errors?.location && <p className="text-sm font-medium text-destructive mt-1">{state.errors.location[0]}</p>}
            </div>

            <div>
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea id="notes" name="notes" placeholder="e.g., Cleared customs inspection." />
            </div>

            <SubmitButton />
        </form>
    );
}
