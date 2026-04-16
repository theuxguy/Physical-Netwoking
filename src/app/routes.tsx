import { createBrowserRouter } from "react-router";
import { RealmView } from "./components/RealmView";
import { RegionView } from "./components/RegionView";
import { Dashboard } from "./components/Dashboard";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <RealmView />,
        },
        {
          path: "/region/:regionCode",
          element: <RegionView />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL }
);