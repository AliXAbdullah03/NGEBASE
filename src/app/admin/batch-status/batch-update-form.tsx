'use client';

import React, { useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { updateBatchStatus } from '@/lib/actions';
import { shipmentStatuses, type ShipmentStatus } from '@/lib/types';
import { Loader2 } from 'lucide-react';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} className="w-full">
            {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Update Batch
        </Button>
    );
}

interface BatchUpdateFormProps {
    batchNumber: string;
    currentStatus: ShipmentStatus;
}

export function BatchUpdateForm({ batchNumber, currentStatus }: BatchUpdateFormProps) {
    const initialState = { message: '', errors: {} as Record<string, string[]> };
    // @ts-ignore - useFormState type inference issue with union return types
    const [state, dispatch] = useFormState(updateBatchStatus, initialState);
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state.success) {
            toast({
                title: 'Success',
                description: state.message,
            });
            formRef.current?.reset();
        } else if (state.message && !state.success) {
            toast({
                title: 'Error',
                description: state.message,
                variant: 'destructive',
            });
        }
    }, [state, toast]);

    return (
        <form ref={formRef} action={dispatch} className="space-y-4 p-4 border rounded-md bg-muted/40">
            <input type="hidden" name="batchNumber" value={batchNumber} />
            
            <div>
                <Label htmlFor={`status-${batchNumber}`}>New Status</Label>
                <Select name="status" defaultValue={currentStatus}>
                    <SelectTrigger id={`status-${batchNumber}`}>
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
                <Label htmlFor={`location-${batchNumber}`}>Location</Label>
                <Input id={`location-${batchNumber}`} name="location" placeholder="e.g., London Heathrow Airport" />
                {state.errors?.location && <p className="text-sm font-medium text-destructive mt-1">{state.errors.location[0]}</p>}
            </div>

            <div>
                <Label htmlFor={`notes-${batchNumber}`}>Notes (Optional)</Label>
                <Textarea id={`notes-${batchNumber}`} name="notes" placeholder="e.g., Cleared customs inspection." />
            </div>

            <SubmitButton />
        </form>
    );
}
