import { Outlet } from "react-router-dom";

export const App = () => {
  return (
    <main>
      <Outlet /> {/* Nested routes render here */}
    </main>
  );
};
