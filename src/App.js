import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Books from './pages/Books';
import BookDetail from './pages/BookDetail';
import Header from './partials/Header';
import Footer from './partials/Footer';
import BookSearch from './pages/BookSearch';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtecedRoute';
import NotFound from './pages/NotFound';
import Register from './pages/Register';


function Logout() {
  localStorage.clear()
  return <Navigate to="/"/>
}

function App() {
  return (
    <div className="App relative">
      <Header/>
      <Routes>
        <Route path='' element={<Home/>}/>
        <Route path='books' element={<ProtectedRoute><Books/></ProtectedRoute>}/>
        <Route path='books/:id' element={<ProtectedRoute><BookDetail/></ProtectedRoute>}/>
        <Route path='book-search' element={<ProtectedRoute><BookSearch/></ProtectedRoute>}/>
        <Route path='register' element={<Register/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='logout' element={<Logout/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
