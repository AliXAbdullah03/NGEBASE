
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export function TrackingSearch() {
  const [trackingId, setTrackingId] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingId.trim()) {
      router.push(`/track/${trackingId.trim()}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full items-center">
      <Input
        type="text"
        value={trackingId}
        onChange={(e) => setTrackingId(e.target.value)}
        placeholder="Type your tracking code"
        className="flex-grow border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent h-11"
        aria-label="Tracking ID"
      />
      <Button type="submit" size="lg" className="px-6 rounded-l-none -mr-2">
        <Search className="h-5 w-5 sm:hidden" />
        <span className="ml-2 hidden sm:inline">Search</span>
      </Button>
    </form>
  );
}
