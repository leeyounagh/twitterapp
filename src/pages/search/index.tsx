import React, { useContext, useEffect, useState } from "react";
import PostBox from "components/posts/PostBox";
import { PostProps } from "pages/home";
import AuthContext from "components/context/AuthContext";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "firebaseApp";

function SearchPage() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [tagQuery, setTagQuery] = useState<string>("");
  const { user } = useContext(AuthContext);
  const onChange = (e: any) => {
    setTagQuery(e?.target?.value?.trim());
  };

  useEffect(() => {
    if (user) {
      let postRef = collection(db, "posts");
      let postsQuery = query(
        postRef,
        where("hashTags", "array-contains-any", [tagQuery]),
        orderBy("createdAt", "desc")
      );

      const unsubscribe = onSnapshot(postsQuery, (snapShot) => {
        let dataObj = snapShot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setPosts(dataObj as PostProps[]);
      });

      // Cleanup function to avoid memory leaks
      return () => unsubscribe();
    }
  }, [tagQuery, user]);
  return (
    <div className="home">
      <div className="home_top">
        <div className="home_title">
          <div className="home_title-text">Search</div>
        </div>
        <div className="home_search-div">
          <input
            className="home_search"
            placeholder="해시태그 검색"
            onChange={onChange}
          />
        </div>
      </div>
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

export default SearchPage;
