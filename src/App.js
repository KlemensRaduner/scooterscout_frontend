import ContextProvider from "./components/contexts";
import Router from "./components/router/router";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
      <ContextProvider>
        <Router />
      </ContextProvider>
  );
}

export default App;
