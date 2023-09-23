import { useContext, useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "components/context/AuthContext";
import {
  collection,
  deleteDoc,
  onSnapshot,
  orderBy,
  query,
  doc,
} from "firebase/firestore";
import { db } from "firebaseApp";
import { PostProps } from "pages/home";
import { toast } from "react-toastify";

interface PostBoxProps {
  post?: PostProps;
}

function PostBox({ post }: PostBoxProps) {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirm = window.confirm("해당 게시글을 삭제하겠습니까?.");
    if (confirm && post?.id) {
      await deleteDoc(doc(db, "posts", post.id));
      toast.success("게시글을 삭제했습니다.");
      navigate("/");
    }
  };

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
  }, [user]);

  return (
    <div>
      <div className="post">
        {posts.length > 0 ? (
          posts?.map((post) => {
            return (
              <div className="post_box" key={post?.id}>
                <Link to={`/posts/${post?.id}`}>
                  <div className="post_box-profile">
                    <div className="post_flex">
                      {post?.profileUrl ? (
                        <img
                          src={post?.profileUrl}
                          alt="profile"
                          className="post_box-profile-img"
                        />
                      ) : (
                        <FaRegUserCircle className="post_box-profile-icon" />
                      )}
                      <div className="post_email">{post?.email}</div>
                      <div className="post_createdAt">{post?.createdAt}</div>
                    </div>

                    <div className="post_box-content">{post?.content}</div>
                  </div>
                </Link>
                <div className="post_box-footer">
                  {/* post.uid ===user.uid일때 */}
                  {user?.uid === post?.uid && (
                    <>
                      <button
                        type="button"
                        className="post_delete"
                        onClick={handleDelete}
                      >
                        Delete
                      </button>
                      <button type="button" className="post_edit">
                        <Link to={`/posts/edit/${post?.id}`}>Edit</Link>
                      </button>
                    </>
                  )}

                  <button type="button" className="post_likes">
                    <AiFillHeart />
                    {post?.likeCount || 0}
                  </button>
                  <button type="button" className="post_comments">
                    <FaRegComment />
                    {post?.comments?.length || 0}
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="post_no-posts">
            <div className="post_text">게시글이 없습니다.</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PostBox;
