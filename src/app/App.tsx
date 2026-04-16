import { RouterProvider } from "react-router";
import { ThemeProvider } from "@figma/astraui";
import { router } from "./routes";
import { AuthProvider } from "./auth/AuthContext";
import { TerminalProvider } from "./context/TerminalContext";
import { BloomfieldThemeProvider } from "./context/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <BloomfieldThemeProvider>
        <AuthProvider>
          <TerminalProvider>
            <RouterProvider router={router} />
          </TerminalProvider>
        </AuthProvider>
      </BloomfieldThemeProvider>
    </ThemeProvider>
  );
}
