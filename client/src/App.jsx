import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import ThemeProvider from "./_lib/colors/themeProvider"; // Import your ThemeProvider
import ColorMode from "./_lib/colors/colorMode"; // Import your ColorMode component



const route = createRouter({ routeTree });

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={route} />
    </ThemeProvider>
  );
}

export default App;
