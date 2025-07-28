import { AdminLogin } from '@/components/trilhurna/AdminLogin';
import { AdminDashboard } from '@/components/trilhurna/AdminDashboard';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        <AdminLogin />
        <div className="mt-8">
          <AdminDashboard />
        </div>
      </div>
    </div>
  );
} 