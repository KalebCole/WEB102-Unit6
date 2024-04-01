import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from './routes/Layout.jsx';
import DetailView from './routes/DetailView';

// we put the routing here beacuse it cannot go in the App component because you cannot put presentation with routing in the same component
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index path="/" element={<App />} /> {/* Index = this is the default route in the layout nest*/}
          <Route index={false} path="/coinDetails/:symbol" element={<DetailView />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
