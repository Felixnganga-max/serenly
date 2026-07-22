// src/pages/BlogPost.jsx
import React from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { ALL_POSTS } from "../data/blogPosts";
import BlogPostView from "../components/BlogPostView";

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = ALL_POSTS.find((p) => p.slug === slug);

  if (!post) return <Navigate to="/blogs" replace />;

  return <BlogPostView post={post} onBack={() => navigate("/blogs")} />;
}
