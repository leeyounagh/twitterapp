import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { Link } from "react-router-dom";

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

const posts: PostProps[] = [
  {
    id: "1",
    email: "test@example.com",
    content: "내용입니다.",
    createdAt: "2023-08-30",
    uid: "123123",
  },
  {
    id: "2",
    email: "test@example.com",
    content: "내용입니다.",
    createdAt: "2023-08-30",
    uid: "123123",
  },
  {
    id: "3",
    email: "test@example.com",
    content: "내용입니다.",
    createdAt: "2023-08-30",
    uid: "123123",
  },
  {
    id: "4",
    email: "test@example.com",
    content: "내용입니다.",
    createdAt: "2023-08-30",
    uid: "123123",
  },
  {
    id: "5",
    email: "test@example.com",
    content: "내용입니다.",
    createdAt: "2023-08-30",
    uid: "123123",
  },
  {
    id: "6",
    email: "test@example.com",
    content: "내용입니다.",
    createdAt: "2023-08-30",
    uid: "123123",
  },
  {
    id: "7",
    email: "test@example.com",
    content: "내용입니다.",
    createdAt: "2023-08-30",
    uid: "123123",
  },
  {
    id: "8",
    email: "test@example.com",
    content: "내용입니다.",
    createdAt: "2023-08-30",
    uid: "123123",
  },
];

function PostBox() {
  const handleDelete = () => {};
  return (
    <div>
      <div className="post">
        {posts?.map((post) => {
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
                  <button type="button" className="post_likes">
                    <AiFillHeart />
                    {post?.likeCount || 0}
                  </button>
                  <button type="button" className="post_comments">
                    <FaRegComment />
                    {post?.comments?.length || 0}
                  </button>
                </>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PostBox;
