import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout/AppLayout";
import Homepage from "./components/Pages/Homepage/Homepage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Homepage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
