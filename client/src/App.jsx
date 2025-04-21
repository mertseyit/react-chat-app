import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import Container from './components/layout/Container';
import Navbar from './components/layout/Navbar';
import { UserContext, UserProvider } from './contexts/UserContext';
import { Loader } from 'rsuite';

const App = () => {
  const { pageLoading } = useContext(UserContext);
  return (
    <>
      {pageLoading && (
        <div id="loader">
          <Loader />
        </div>
      )}
      <Router>
        <Container>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Container>
      </Router>
    </>
  );
};

export default App;
