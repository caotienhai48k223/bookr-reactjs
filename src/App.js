import './App.css';
import { Route, Routes} from 'react-router-dom';
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
import Profile from './pages/Profile';
import Logout from './components/Logout';
import SideBar from './partials/SideBar'


function App() {
  return (
    <div className="App relative">
      <Header/>
      <div className="flex relative">
        <SideBar />
        <main className="flex-1 ml-[15vw]">
          <Routes>
            <Route path='' element={<Home />} />
            <Route path='books' element={<Books />} />
            <Route path='books/:id' element={<BookDetail />} />
            <Route path='book-search' element={<BookSearch />} />
            <Route path='profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path='register' element={<Register />} />
            <Route path='login' element={<Login />} />
            <Route path='logout' element={<Logout />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
