import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import ThemeProvider from "./_lib/colors/themeProvider"; // Import your ThemeProvider
import ColorMode from "./_lib/colors/colorMode"; // Import your ColorMode component


import Error404 from "./_lib/views/Error404";

const route = createRouter({ routeTree, defaultNotFoundComponent: () => <Error404 />});

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={route} />
    </ThemeProvider>
  );
}

export default App;
