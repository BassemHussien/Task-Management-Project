import React from 'react';
import PageNotFound from "./pages/PageNotFound";
import ProtectedRoute from "./ProtectedRoute";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import ToDo from './pages/ToDo';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import './App.css';

import { Provider } from "react-redux";
import store from './components/Redux/store';
import Tasks from './pages/Tasks';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Default route */}
          <Route exact path="/" element={<Tasks />} />
          
          {/* Other routes */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path='/todo' element={<ToDo/>}/>
          {/* Protected route for dashboard */}
          <Route path="/dashboard/current-user" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          
          {/* Catch-all route for undefined paths */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
