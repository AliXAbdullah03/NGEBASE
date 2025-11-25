import type { ShipmentHistory, ShipmentStatus } from '@/lib/types';
import { cn } from '@/lib/utils';
import { CheckCircle, ClipboardList, Home, PackageCheck, Truck, CircleAlert } from 'lucide-react';

const statusIcons: Record<ShipmentStatus, React.ReactNode> = {
  Processing: <ClipboardList className="h-5 w-5" />,
  'In Transit': <Truck className="h-5 w-5" />,
  'Out for Delivery': <PackageCheck className="h-5 w-5" />,
  Delivered: <Home className="h-5 w-5" />,
  'On Hold': <CircleAlert className="h-5 w-5" />,
};

type TrackingTimelineProps = {
  history: ShipmentHistory[];
  currentStatus: ShipmentStatus;
};

export function TrackingTimeline({ history, currentStatus }: TrackingTimelineProps) {
  const reversedHistory = [...history].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const latestStatusDate = reversedHistory.length > 0 ? new Date(reversedHistory[0].date) : new Date();

  return (
    <div className="space-y-8">
      {reversedHistory.map((event, index) => {
        const isCurrent = index === 0;
        const isDelivered = event.status === 'Delivered';

        return (
          <div key={index} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full',
                  isCurrent ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                )}
              >
                {isCurrent && isDelivered ? <CheckCircle className="h-5 w-5" /> : statusIcons[event.status]}
              </div>
              {index < reversedHistory.length - 1 && (
                <div className="h-full w-0.5 bg-border" />
              )}
            </div>
            <div className={cn('flex-1 pt-1.5', { 'pb-8': index < reversedHistory.length - 1 })}>
                <p className={cn('font-semibold', isCurrent ? 'text-primary' : '')}>{event.status}</p>
                <p className="text-sm text-muted-foreground">{event.location}</p>
                {event.notes && <p className="text-sm text-muted-foreground italic">"{event.notes}"</p>}
                <p className="text-xs text-muted-foreground mt-1">
                    {new Date(event.date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
