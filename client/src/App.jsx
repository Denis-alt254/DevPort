import Login from "./components/Login";
import { Routes, Route } from "react-router-dom"
import LayoutShell from "./layout/LayoutShell";
import {Dashboard, UpdateUser} from "./pages/Dashboard";
import Register from "./components/Register";
import PrivateRoute from "./routes/PrivateRoute";
import { AuthProvider } from "./context/AuthContext"

function App(){
  return(
    <AuthProvider>
      <LayoutShell>
        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}></Route>
          <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/update" element={<PrivateRoute><UpdateUser /></PrivateRoute>} />
        </Routes>
      </LayoutShell>
    </AuthProvider>
  )
}

export default App;