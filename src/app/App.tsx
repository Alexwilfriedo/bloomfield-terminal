import { RouterProvider } from "react-router";
import { ThemeProvider } from "@figma/astraui";
import { router } from "./routes";
import { TerminalProvider } from "./context/TerminalContext";

export default function App() {
  return (
    <ThemeProvider>
      <TerminalProvider>
        <RouterProvider router={router} />
      </TerminalProvider>
    </ThemeProvider>
  );
}