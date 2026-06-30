import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Contactus from "./pages/ContactUs";
import Terms_and_conditions from "./pages/Terms_and_conditions";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Toaster/>
        <Header />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/about"} element={<About />} />
          <Route path={"/contact-us"} element={<Contactus />} />

          <Route
            path={"/terms_and_conditions"}
            element={<Terms_and_conditions />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
