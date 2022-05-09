import logo from "./logo.svg";
import "./App.css";

import Routes from "./routes/routes";
import SebedimContextProvider from "./context/Sebedim";
function App() {
  return(
        <SebedimContextProvider>
           <Routes />
        </SebedimContextProvider>);
}

export default App;
