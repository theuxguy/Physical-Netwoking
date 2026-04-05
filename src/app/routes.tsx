import { createBrowserRouter } from "react-router";
import { RealmView } from "./components/RealmView";
import { RegionView } from "./components/RegionView";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RealmView />,
    },
    {
      path: "/region/:regionCode",
      element: <RegionView />,
    },
  ],
  { basename: import.meta.env.BASE_URL }
);