import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Personne from './pages/Personne.jsx';
import Article from './pages/Article.jsx';
import Message from './pages/Message.jsx';
import Amis from './pages/Amis.jsx';


const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Personne />} />
          <Route path="/Personne" element={<Personne />} />
          <Route path="/Article" element={<Article />} />
          <Route path="/Message" element={<Message />} />
          <Route path="/Amis" element={<Amis />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;