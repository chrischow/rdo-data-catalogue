import { HashRouter, Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container'
import { NavBar } from './NavBar';
import { Home } from './Home';
import { Domain } from './Domain';
import { Dataset } from './Dataset';
import { QueryClient, QueryClientProvider } from 'react-query';
import { DcTable } from './DcTable';
import { BusinessGlossary } from './BusinessGlossary';
import { BusinessTerm } from './BusinessTerm';
import { ReactQueryDevtools } from 'react-query/devtools';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Configs
const dataDomains: string[] = [
  'Ops', 'Manpower', 'Intel', 'Engineering', 'Training', 'Safety'
];

// Create views for domains
const domainRoutes = dataDomains.map(dataDomain => {
  return (
    <Route path={`/${dataDomain.toLowerCase()}`} key={dataDomain} element={<Domain dataDomain={dataDomain} />} />
  );
});

// Create query client
const queryClient = new QueryClient();

function App() {
  return (
    <HashRouter>
      <QueryClientProvider client={queryClient}>
        <NavBar dataDomains={dataDomains} />
        <Container className="mt-5">
          <Routes>
            <Route path="/" element={<Home dataDomains={dataDomains} />} />
            {domainRoutes}
            <Route path="/dataset/:id" element={<Dataset />} />
            <Route path="/table/:id" element={<DcTable />} />
            <Route path="/business-glossary" element={<BusinessGlossary />} />
            <Route path="/term/:id" element={<BusinessTerm />} />
          </Routes>
        </Container>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </HashRouter>
  );
}

export default App;
