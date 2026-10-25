import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { ProductList } from './components/Products/ProductList';
import { CategoryList } from './components/Categories/CategoryList';
import { SupplierList } from './components/Suppliers/SupplierList';
import { StockMovements } from './components/Stock/StockMovements';
import { StockAlerts } from './components/Alerts/StockAlerts';
import { ReportsExport } from './components/Reports/ReportsExport';
import { UserManagement } from './components/Users/UserManagement';
import { Toaster } from './components/ui/sonner';
import { Button } from './components/ui/button';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Truck,
  ArrowLeftRight,
  AlertTriangle,
  FileText,
  Users,
  LogOut,
  Menu
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './components/ui/sheet';
import type { View } from './types';

function AppContent() {
  const { user, logout, isAdmin } = useAuth();
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!user) {
    return <Login />;
  }

  const handleNavigation = (view: View) => {
    setCurrentView(view);
    setIsMenuOpen(false);
  };

  const menuItems = [
    { id: 'dashboard' as View, icon: LayoutDashboard, label: 'Tableau de bord', adminOnly: false },
    { id: 'products' as View, icon: Package, label: 'Produits', adminOnly: false },
    { id: 'categories' as View, icon: FolderTree, label: 'Catégories', adminOnly: false },
    { id: 'suppliers' as View, icon: Truck, label: 'Fournisseurs', adminOnly: false },
    { id: 'stock' as View, icon: ArrowLeftRight, label: 'Mouvements stock', adminOnly: false },
    { id: 'alerts' as View, icon: AlertTriangle, label: 'Alertes', adminOnly: false },
    { id: 'reports' as View, icon: FileText, label: 'Rapports', adminOnly: false },
    { id: 'users' as View, icon: Users, label: 'Utilisateurs', adminOnly: true },
  ];

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentView} />;
      case 'products':
        return <ProductList />;
      case 'categories':
        return <CategoryList />;
      case 'suppliers':
        return <SupplierList />;
      case 'stock':
        return <StockMovements />;
      case 'alerts':
        return <StockAlerts onNavigate={setCurrentView} />;
      case 'reports':
        return <ReportsExport />;
      case 'users':
        return isAdmin ? <UserManagement /> : <Dashboard onNavigate={setCurrentView} />;
      default:
        return <Dashboard onNavigate={setCurrentView} />;
    }
  };

  const NavigationMenu = () => (
    <nav className="space-y-1">
      {menuItems
        .filter(item => !item.adminOnly || isAdmin)
        .map(item => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={currentView === item.id ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => handleNavigation(item.id)}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.label}
            </Button>
          );
        })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64">
                  <div className="mt-6">
                    <NavigationMenu />
                  </div>
                </SheetContent>
              </Sheet>
              <Package className="h-6 w-6 text-primary" />
              <h1 className="text-primary">GestiStock Pro</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm">{user.name}</p>
                <p className="text-xs text-gray-500">
                  {user.role === 'admin' ? 'Administrateur' : 'Employé'}
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg p-4 shadow-sm sticky top-24">
              <NavigationMenu />
            </div>
          </aside>
          <main className="flex-1 min-w-0">
            {renderView()}
          </main>
        </div>
      </div>

      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
