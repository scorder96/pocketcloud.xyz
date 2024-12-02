import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Dashboard from "./Dashboard";
import { ThemeProvider } from "./components/theme-provider";
import Pricing from "./Pricing";
import Tutorials from "./Tutorials/Tutorials";
import NoMatch from "./NoMatch";
import Support from "./Support";
import SettingUp from "./Tutorials/Setting Up Your Project With PocketCloud";
import HostPocketBase from "./Tutorials/How to host PocketBase";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dashboard/:id" element={<Dashboard />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="support" element={<Support />} />
          <Route path="tutorials" element={<Tutorials />} />
          <Route path="tutorials/setting-up" element={<SettingUp />} />
          <Route
            path="tutorials/host-pocketbase"
            element={<HostPocketBase />}
          />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
