import { useContext } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "components/context/AuthContext";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "firebaseApp";
import { PostProps } from "pages/home";
import { toast } from "react-toastify";

interface PostBoxProps {
  post?: PostProps;
}

function PostBox({ post }: PostBoxProps) {
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

  return (
    <div>
      <div className="post">
        {post ? (
          <div className="post_box" key={post.id}>
            <Link to={`/posts/${post.id}`}>
              <div className="post_box-profile">
                <div className="post_flex">
                  {post.profileUrl ? (
                    <img
                      src={post.profileUrl}
                      alt="profile"
                      className="post_box-profile-img"
                    />
                  ) : (
                    <FaRegUserCircle className="post_box-profile-icon" />
                  )}
                  <div className="post_email">{post.email}</div>
                  <div className="post_createdAt">{post.createdAt}</div>
                </div>

                <div className="post_box-content">{post.content}</div>
                <div className="post-form_hashtags-output">
                  {post.hashTags?.map((tag, index) => (
                    <span className="post-form_hashtags-tag" key={index}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
            <div className="post_box-footer">
              {user?.uid === post.uid && (
                <>
                  <button
                    type="button"
                    className="post_delete"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                  <button type="button" className="post_edit">
                    <Link to={`/posts/edit/${post.id}`}>Edit</Link>
                  </button>
                </>
              )}

              <button type="button" className="post_likes">
                <AiFillHeart />
                {post.likeCount || 0}
              </button>
              <button type="button" className="post_comments">
                <FaRegComment />
                {post.comments?.length || 0}
              </button>
            </div>
          </div>
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
