import { Suspense, lazy } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './componentes/Layout';
import Notificacao from './componentes/Notificacao';
import ProtectedRoute from './componentes/ProtectedRoute';
import { AppProvider } from './contextos/AppContext';
import { AuthProvider } from './contextos/AuthContext';
import { ThemeProvider } from './contextos/ThemeContext';

const Login = lazy(() => import('./paginas/Login'));
const Inicio = lazy(() => import('./paginas/Inicio'));
const Chat = lazy(() => import('./paginas/Chat'));

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppProvider>
          <Router>
            <Suspense fallback={<div>Carregando...</div>}>
              <Notificacao />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                  <Route index element={<Inicio />} />
                </Route>
                <Route path="/chat" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                  <Route index element={<Chat />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </Router>
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;