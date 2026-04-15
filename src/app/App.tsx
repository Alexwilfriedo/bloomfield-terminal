import { RouterProvider } from "react-router";
import { ThemeProvider } from "@figma/astraui";
import { router } from "./routes";
import { AuthProvider } from "./auth/AuthContext";
import { TerminalProvider } from "./context/TerminalContext";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TerminalProvider>
          <RouterProvider router={router} />
        </TerminalProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
