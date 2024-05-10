import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// Contexts
import AuthContextProvider from './Contexts/AuthContextProvider';
import Router from './Router/Router';


function App() {
  const queryClient = new QueryClient();
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
            <Router />
        </AuthContextProvider>
      </QueryClientProvider>
    </div>
  );
}
export default App;