import { useCallback, useContext, useEffect, useState } from "react";
import PostForm from "components/posts/PostForm";
import PostBox from "components/posts/PostBox";

export interface PostProps {
  id: string;
  email: string;
  content: string;
  createdAt: string;
  uid: string;
  profileUrl?: string;
  likes?: string[];
  likeCount?: number;
  comments?: any;
}

export default function HomePage() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  return (
    <div className="home">
      <div className="home_top">
        <div className="home_title">Home</div>
        <div className="home_tabs">
          <div className="home_tab home_tab--active">For You</div>
          <div className="home_tab">Following</div>
        </div>
      </div>

      <PostForm />

      {/* tweet post */}
      <PostBox />
    </div>
  );
}
