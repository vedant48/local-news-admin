import { Refine } from "@refinedev/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { dataProvider } from "@/services/dataProvider";
import routerProvider, { CatchAllNavigate, NavigateToResource } from "@refinedev/react-router";

import Login from "./pages/login";
import Blogs from "./pages/blogs";
import CreateBlog from "./pages/create-blog";
import { authProvider } from "./services/authProvider";
import Issues from "./pages/issues";
import CreateIssue from "./pages/issues/create";

export default function App() {
  return (
    <BrowserRouter>
      <Refine
        dataProvider={dataProvider}
        authProvider={authProvider}
        routerProvider={routerProvider}
        resources={[
          {
            name: "blogs",
            list: "/blogs",
            create: "/create",
          },
          {
            name: "issues",
            list: "/issues",
            create: "/issues/create",
          },
        ]}
      >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/create" element={<CreateBlog />} />
          <Route path="/issues" element={<Issues />} />
          <Route path="/issues/create" element={<CreateIssue />} />
        </Routes>
      </Refine>
    </BrowserRouter>
  );
}
