import { Routes,Route } from 'react-router-dom';
import './App.css';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LoginPage />} />
          <Route path='/task3_4-smartserv/dashboard' element={<Dashboard />} />
      </Routes>
      {/* /<LoginPage /> */}
    </div>
  );
}

export default App;
