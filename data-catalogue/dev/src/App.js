import { HashRouter, Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container'
import NavBar from './components/NavBar';
import Home from './components/Home/Home'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Configs
const pages = [
  {pageName: 'Home', slug: ''},
  {pageName: 'Domains', slug: 'Domains'},
  {pageName: 'Datasets', slug: 'Datasets'},
]

function App() {
  return (
    <HashRouter>
      <NavBar pages={pages} />
      <Container className="mt-5">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Container>
    </HashRouter>
  );
}

export default App;
