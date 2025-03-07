import { BrowserRouter, Routes, Route } from "react-router";
import Home from "../pages/Home";
import BasicLayout from "../layout/BasicLayout";
export default function Router() {
  return (
   <BrowserRouter>
    <Routes>
        <Route element={<BasicLayout/>}>
          <Route path="/" element={<Home/>} />
        </Route>
    </Routes>
  </BrowserRouter>
  )
}
