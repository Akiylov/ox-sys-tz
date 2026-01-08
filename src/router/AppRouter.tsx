import { Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import NotFound from "@/pages/not-found/NotFoundPage";

const AppRouter = () => {
  const renderRoutes = (routeList: typeof routes) => {
    return routeList.map((route) => {
      if (route.children) {
        return (
          <Route key={route.path} path={route.path} element={route.element}>
            {route.children.map((child) => (
              <Route
                key={child.path}
                path={child.path}
                element={child.element}
              />
            ))}
          </Route>
        );
      }
      return (
        <Route key={route.path} path={route.path} element={route.element} />
      );
    });
  };

  return (
    <Routes>
      {renderRoutes(routes)}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
