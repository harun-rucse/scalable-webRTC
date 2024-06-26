import { SocketProvider } from "./context/SocketProvider";
import ChatCanvas from "./components/ChatCanvas";

function App() {
  return (
    <SocketProvider>
      <div className="container">
        <ChatCanvas />
      </div>
    </SocketProvider>
  );
}

export default App;
