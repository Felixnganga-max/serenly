import React from "react";

import Home from "./pages/Home";
import { Route, Routes, Outlet } from "react-router-dom";
import Solutions from "./pages/Solutions";
import Brand from "./pages/Brand";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Seo from "./pages/Seo";
import SMM from "./pages/SMM";
import About from "./pages/About";
import Blogs from "./pages/Blogs";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import EduCorePage from "./pages/EduCorePage";
import Services from "./pages/Services";
import ScrollToHash from "./components/ScrollToHash";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminContacts from "./pages/admin/AdminContacts";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminBlogList from "./pages/admin/AdminBlogList";
import AdminBlogEditor from "./pages/admin/AdminBlogEditor";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminShellLayout from "./components/admin/AdminShellLayout";

function PublicLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

function App() {
  return (
    <>
      <ScrollToHash />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/branding" element={<Brand />} />
          <Route path="/web-dev" element={<Solutions />} />
          <Route path="/our-system" element={<EduCorePage />} />
          <Route path="/smm" element={<SMM />} />
          <Route path="/seo" element={<Seo />} />
          <Route path="/about" element={<About />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Admin — no public Navbar/Footer */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminShellLayout />}>
            <Route path="/admin" element={<AdminOverview />} />
            <Route path="/admin/contacts" element={<AdminContacts />} />
            <Route path="/admin/projects" element={<AdminProjects />} />
            <Route path="/admin/blog" element={<AdminBlogList />} />
            <Route path="/admin/blog/new" element={<AdminBlogEditor />} />
            <Route path="/admin/blog/:id/edit" element={<AdminBlogEditor />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
