import { AuthProvider } from './src/contexts/Auth';
import { Router } from './src/routes/Router';
import app  from './src/config/firebaseconfig';

export default function App() {
  app;
  return (
    <AuthProvider>
      <Router></Router>
    </AuthProvider>
  );
}