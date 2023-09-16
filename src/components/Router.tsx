import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "pages/home";
import PostPage from "pages/posts";
import PostNew from "pages/posts/new";
import PostEdit from "pages/posts/edit";
import ProfilePage from "pages/profile";
import ProfileEdit from "pages/profile/edit";
import SearchPage from "pages/search";
import NotificationPage from "pages/notification";
import Login from "pages/users/login";
import Signup from "pages/users/signup";
export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/posts" element={<PostPage />} />
      <Route path="/posts/:id" element={<PostPage />} />
      <Route path="/posts/new" element={<PostNew />} />
      <Route path="/posts/edit/:id" element={<PostEdit />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profile/edit" element={<ProfileEdit />} />
      <Route path="/notification" element={<NotificationPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/users/login" element={<Login />} />
      <Route path="/users/signup" element={<Signup />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}
