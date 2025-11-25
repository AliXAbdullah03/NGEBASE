import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { AdminNav } from '@/components/admin-nav';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar>
        <AdminNav />
      </Sidebar>
      <SidebarInset>
        <div className="min-h-screen bg-background">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
