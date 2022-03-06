import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="product/:id" element={<ProductScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
