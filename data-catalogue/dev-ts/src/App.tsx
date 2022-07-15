import { HashRouter, Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container'
import { NavBar } from './components/NavBar/NavBar';
import { Home } from './components/Home/Home';
import { DomainView } from './components/DomainView/DomainView';
import { DatasetView } from './components/DatasetView/DatasetView';
import { QueryClient, QueryClientProvider } from 'react-query';
import { TableView } from './components/TableView/TableView';
import { BusinessGlossaryView } from './components/BusinessGlossaryView/BusinessGlossaryView';
import { BusinessTermView } from './components/BusinessTermView/BusinessTermView';
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
    <Route path={`/${dataDomain.toLowerCase()}`} key={dataDomain} element={<DomainView dataDomain={dataDomain} />} />
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
            <Route path="/dataset/:id" element={<DatasetView />} />
            <Route path="/table/:id" element={<TableView />} />
            <Route path="/business-glossary" element={<BusinessGlossaryView />} />
            <Route path="/term/:id" element={<BusinessTermView />} />
          </Routes>
        </Container>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </HashRouter>
  );
}

export default App;
