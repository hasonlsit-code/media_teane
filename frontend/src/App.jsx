import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import ChatBot from "./components/chatbot/Chatbot";
import TeaMixerFloat from "./components/game/TeaMixerFloat";
import Footer from "./components/Footer";


function App() {
  return (
    <>
    
      <Header />
      <ChatBot />
      <TeaMixerFloat />
      <Outlet />
      <Footer />
    
    </>
  );
}

export default App;
