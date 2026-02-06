import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useUserCars } from '@/hooks/useCars';
import { useConversations } from '@/hooks/useMessages';
import { useFavorites } from '@/hooks/useFavorites';
import { Car, MessageCircle, Heart, Eye, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { profile } = useAuth();
  const { cars } = useUserCars();
  const { conversations } = useConversations();
  const { favoriteCars } = useFavorites();

  const stats = [
    {
      label: 'My Listings',
      value: cars.length,
      icon: Car,
      color: 'bg-primary/10 text-primary',
      link: '/dashboard/my-cars',
    },
    {
      label: 'Messages',
      value: conversations.length,
      icon: MessageCircle,
      color: 'bg-accent/10 text-accent',
      link: '/dashboard/messages',
    },
    {
      label: 'Saved Cars',
      value: favoriteCars.length,
      icon: Heart,
      color: 'bg-destructive/10 text-destructive',
      link: '/dashboard/favorites',
    },
    {
      label: 'Total Views',
      value: '—',
      icon: Eye,
      color: 'bg-success/10 text-success',
      link: '#',
    },
  ];

  const unreadCount = conversations.reduce((acc, c) => acc + (c.unread_count || 0), 0);

  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-6">
        {/* Welcome */}
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-xl p-6 text-primary-foreground">
          <h2 className="text-2xl font-display font-bold">
            Welcome back, {profile?.full_name?.split(' ')[0] || 'User'}!
          </h2>
          <p className="mt-1 opacity-90">
            Manage your car listings and connect with buyers.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
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

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="font-display font-semibold text-lg mb-4">Recent Listings</h3>
            {cars.length === 0 ? (
              <div className="text-center py-8">
                <Car className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground mb-4">No listings yet</p>
                <Link to="/dashboard/add-car" className="text-primary hover:underline">
                  Add your first car →
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {cars.slice(0, 3).map((car) => (
                  <div key={car.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted">
                    <img
                      src={car.images?.[0] || '/placeholder.svg'}
                      alt={car.name}
                      className="w-16 h-12 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{car.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Intl.NumberFormat('rw-RW', { style: 'currency', currency: 'RWF', maximumFractionDigits: 0 }).format(car.price)}
                      </p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      car.status === 'available' ? 'bg-success/10 text-success' :
                      car.status === 'pending' ? 'bg-warning/10 text-warning' :
                      car.status === 'sold' ? 'bg-muted text-muted-foreground' :
                      'bg-destructive/10 text-destructive'
                    }`}>
                      {car.status}
                    </span>
                  </div>
                ))}
                {cars.length > 3 && (
                  <Link to="/dashboard/my-cars" className="block text-center text-primary hover:underline text-sm">
                    View all {cars.length} listings →
                  </Link>
                )}
              </div>
            )}
          </Card>

          <Card className="p-6">
            <h3 className="font-display font-semibold text-lg mb-4">
              Messages
              {unreadCount > 0 && (
                <span className="ml-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </h3>
            {conversations.length === 0 ? (
              <div className="text-center py-8">
                <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No messages yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {conversations.slice(0, 3).map((conv) => (
                  <Link
                    key={conv.id}
                    to={`/dashboard/messages?conversation=${conv.id}`}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-medium">
                        {(conv.buyer?.full_name || conv.seller?.full_name || 'U')[0]}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">
                        {conv.buyer?.full_name || conv.seller?.full_name || 'Unknown'}
                      </p>
                      <p className="text-sm text-muted-foreground truncate">
                        {conv.car?.name || 'Car inquiry'}
                      </p>
                    </div>
                    {conv.unread_count ? (
                      <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                        {conv.unread_count}
                      </span>
                    ) : null}
                  </Link>
                ))}
                {conversations.length > 3 && (
                  <Link to="/dashboard/messages" className="block text-center text-primary hover:underline text-sm">
                    View all messages →
                  </Link>
                )}
              </div>
            )}
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
