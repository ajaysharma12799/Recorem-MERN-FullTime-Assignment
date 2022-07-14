import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AuthPage from './pages/AuthPage';
import CreateArticle from './pages/CreateArticle';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import PrivateRoute from './routes/ProtectedRoute';
import { loadUser } from './__redux__/actions/auth.action';
import Store from './__redux__/Store';
import AllArticles from './pages/AllArticles';
import SetAuthenticationToken from './utils/AuthenticationToken';

if (localStorage.getItem("token")) {
	SetAuthenticationToken(localStorage.getItem("token"));
}

const App = () => {
  useEffect(() => {
    Store.dispatch(loadUser());
  }, []);
  return (
    <div className="container mx-auto">
      <BrowserRouter>
      <Navbar />
      <ToastContainer />
        <Routes>
          <Route path="/" exact element={<AuthPage />} />
          <Route path="/CreateArticle" exact element={<PrivateRoute />}>
            <Route path="/CreateArticle" exact element={<CreateArticle />} />
          </Route>
          <Route path="/AllArticle" exact element={<PrivateRoute />}>
            <Route path="/AllArticle" exact element={<AllArticles />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App