import { Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthContext';
import LoginPage from './components/LoginPage';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import NewList from './components/NewList';
import ListView from './components/ListView';
import ListHistory from './components/ListHistory';
import ItemLibrary from './components/ItemLibrary';
import SharedList from './components/SharedList';

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-10 h-10 border-3 border-green-600 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-stone-500 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/share/:token" element={<SharedList />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/share/:token" element={<SharedList />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/new" element={<NewList />} />
        <Route path="/list/:id" element={<ListView />} />
        <Route path="/list/:id/edit" element={<NewList />} />
        <Route path="/history" element={<ListHistory />} />
        <Route path="/items" element={<ItemLibrary />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
