// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { Provider } from "react-redux";
// import store from "./appStore";
// import SignUp from "./pages/SignUp";
// import Login from "./pages/Login";
// import ForgotPassword from "./pages/ForgotPassword";
// import "./App.css";
// import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/PageNotFound";
import ProtectedRoute from "./ProtectedRoute";
// import Admin from "./components/Redux/Admin/Admin";
// import User from "./components/Redux/User/User";
// function App() {
//   return (
//     <Provider store={store}>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Dashboard />}/>
//           <Route path="/dashboard" element={<Dashboard />}/>
//           <Route path="/signup" element={<SignUp />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="*" element={<PageNotFound />} />
//           {/* <Route path="/admin1" element={<Admin />}/> */}
//           {/* Admin Profile */}
//           <Route path="dashboard/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>}/>
//           {/* User Profile */}
//           <Route path="dashboard/user" element={<ProtectedRoute><User /></ProtectedRoute>}/>
//         </Routes>
//       </Router>
//     </Provider>
//   );
// }

// export default App;

// export default App;
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import './App.css';
import { Provider } from "react-redux";
import store from './components/Redux/store';
import Tasks from './pages/Tasks';

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Routes>
          <Route exact path="/" element={<Tasks />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route path="*" element={<PageNotFound />} />
            {/* User Profile */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        </Routes>
      </Provider>
    </Router>
  );
}

export default App;