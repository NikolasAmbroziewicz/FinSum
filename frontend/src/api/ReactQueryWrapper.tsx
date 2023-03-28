import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

interface IReactQueryWrapper {
  children: React.ReactNode;
}

const ReactQueryWrapper: React.FC<IReactQueryWrapper> = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools />
    {children}
  </QueryClientProvider>
);

export default ReactQueryWrapper;
