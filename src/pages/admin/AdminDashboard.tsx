import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Car, Users, CheckCircle, MessageCircle, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalCars: 0,
    pendingCars: 0,
    totalUsers: 0,
    totalMessages: 0,
  });
  const [recentCars, setRecentCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      // Total cars
      const { count: totalCars } = await supabase
        .from('cars')
        .select('*', { count: 'exact', head: true });

      // Pending cars
      const { count: pendingCars } = await supabase
        .from('cars')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      // Total users
      const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Total messages
      const { count: totalMessages } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true });

      // Recent pending cars
      const { data: recent } = await supabase
        .from('cars')
        .select('*, profiles!cars_user_id_fkey(full_name)')
        .eq('status', 'pending')
        .order('created_at', { ascending: false })
        .limit(5);

      setStats({
        totalCars: totalCars || 0,
        pendingCars: pendingCars || 0,
        totalUsers: totalUsers || 0,
        totalMessages: totalMessages || 0,
      });
      setRecentCars(recent || []);
      setLoading(false);
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      label: 'Total Listings',
      value: stats.totalCars,
      icon: Car,
      color: 'bg-primary/10 text-primary',
      link: '/admin/listings',
    },
    {
      label: 'Pending Approval',
      value: stats.pendingCars,
      icon: CheckCircle,
      color: 'bg-warning/10 text-warning',
      link: '/admin/approvals',
    },
    {
      label: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-accent/10 text-accent',
      link: '/admin/users',
    },
    {
      label: 'Total Messages',
      value: stats.totalMessages,
      icon: MessageCircle,
      color: 'bg-success/10 text-success',
      link: '/admin/messages',
    },
  ];

  return (
    <AdminLayout title="Admin Dashboard">
      <div className="space-y-6">
        {/* Welcome */}
        <div className="bg-gradient-to-r from-destructive to-destructive/80 rounded-xl p-6 text-destructive-foreground">
          <h2 className="text-2xl font-display font-bold">Admin Dashboard</h2>
          <p className="mt-1 opacity-90">Manage listings, users, and platform settings.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat) => (
            <Link key={stat.label} to={stat.link}>
              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${stat.color}`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Pending Approvals */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-lg">Pending Approvals</h3>
            <Link to="/admin/approvals" className="text-primary hover:underline text-sm">
              View all →
            </Link>
          </div>
          
          {recentCars.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <CheckCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No pending approvals</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentCars.map((car) => (
                <div key={car.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                  <img
                    src={car.images?.[0] || '/placeholder.svg'}
                    alt={car.name}
                    className="w-16 h-12 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{car.name}</p>
                    <p className="text-sm text-muted-foreground">
                      by {car.profiles?.full_name || 'Unknown'}
                    </p>
                  </div>
                  <Link
                    to={`/admin/approvals`}
                    className="text-primary hover:underline text-sm"
                  >
                    Review
                  </Link>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
