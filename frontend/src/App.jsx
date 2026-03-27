import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import ChatBot from "./components/chatbot/ChatBot";
import TeaMixerFloat from "./components/game/TeaMixerFloat";
import Footer from "./components/Footer";
import ScrollToTop from "./components/about-us/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <ChatBot />
      <TeaMixerFloat />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
