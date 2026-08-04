import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<div className="p-10 text-center text-3xl font-bold">China Bazar Coming Soon...</div>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
