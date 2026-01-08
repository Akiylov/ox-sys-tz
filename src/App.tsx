import { BrowserRouter } from "react-router-dom";
import ProviderIndex from "./provider/ProviderIndex.tsx";
import AppRouter from "./router/AppRouter.tsx";

const App = () => {
  return (
    <ProviderIndex>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </ProviderIndex>
  );
};

export default App;
