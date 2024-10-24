import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Books from './components/pages/Books';
import BookDetail from './components/pages/BookDetail';
import Header from './components/partials/Header';
import Footer from './components/partials/Footer';

function App() {
  return (
    <div className="App relative">
      <Header/>
      <Routes>
        <Route path='' element={<Home/>}/>
        <Route path='books' element={<Books/>}/>
        <Route path='books/:id' element={<BookDetail/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
