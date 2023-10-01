import { useContext, useEffect, useState } from "react";
import PostForm from "components/posts/PostForm";
import AuthContext from "components/context/AuthContext";
import PostBox from "components/posts/PostBox";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "firebaseApp";

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
  hashTags?: string[];
}

export default function HomePage() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const { user } = useContext(AuthContext);
  console.log("테스트", user);

  useEffect(() => {
    if (user) {
      let postsRef = collection(db, "posts");
      let postQuery = query(postsRef, orderBy("createdAt", "desc"));

      const unsubscribe = onSnapshot(postQuery, (snapShot) => {
        let dataObj = snapShot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setPosts(dataObj as PostProps[]);
      });

      // Cleanup function to unsubscribe from the snapshot when the component is unmounted
      return () => unsubscribe();
    }
  }, [user?.uid]);
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
      <div className="post">
        {posts?.length > 0 ? (
          posts.map((post) => <PostBox key={post.id} post={post} />)
        ) : (
          <div className="post_no-posts">
            <div className="post_text">게시글이 없습니다.</div>
          </div>
        )}
      </div>
    </div>
  );
}
