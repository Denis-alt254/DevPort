import Login from "./components/Login";
import { Routes, Route } from "react-router-dom"
import LayoutShell from "./layout/LayoutShell";
import {Dashboard, UpdateUser} from "./pages/Dashboard";
import Register from "./components/Register";
import PrivateRoute from "./routes/PrivateRoute";
import { AuthProvider } from "./context/AuthContext"
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";

function App(){
  return(
    <AuthProvider>
      <LayoutShell>
        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}></Route>
          <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path='/explore' element={<Explore />} />
          <Route path="/update" element={<PrivateRoute><UpdateUser /></PrivateRoute>} />
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      </LayoutShell>
    </AuthProvider>
  )
}

export default App;