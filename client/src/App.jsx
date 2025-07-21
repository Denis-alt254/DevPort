import Login from "./components/Login";
import { Routes, Route } from "react-router-dom"
import LayoutShell from "./layout/LayoutShell";
import Dashboard from "./pages/Dashboard";
import Register from "./components/Register";

function App(){
  return(
    <LayoutShell>
        <Routes>
          <Route path="login" element={<Login />}/>
          <Route path="register" element={<Register />}></Route>
          <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </LayoutShell>
  )
}

export default App;