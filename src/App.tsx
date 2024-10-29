import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import './App.css';
import CartList from './Pages/CartList';
import HomePage from './Pages/HomePage';
import ProductPage from './Pages/ProductPage';
import NotFoundPage from './Pages/NotFoundPage';

const router =  createBrowserRouter([
  {path: '/', element: <HomePage />, errorElement: <NotFoundPage />},
  {path: '/CartList', element: <CartList />},
  {path: '/ProductPage', element: <ProductPage />, errorElement: <NotFoundPage />, children: [  {path: '/ProductPage/:id', element: <ProductPage />}]},
]); 

const App = () => {
  return <RouterProvider router={router} />
}

export default App;
