import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer"
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Contactus from "./pages/ContactUs";
import Terms_and_conditions from "./pages/Terms_and_conditions";
import { Toaster } from "react-hot-toast";
import UsearDashboard from "./pages/dashboard/UsearDashboard"
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
          <Route path={"/user/dashboard"} element={<UsearDashboard />} />

        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
};

export default App;
