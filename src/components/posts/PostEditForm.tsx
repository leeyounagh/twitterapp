import React, { useCallback, useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FiImage } from "react-icons/fi";
import { db } from "firebaseApp";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { PostProps } from "pages/home";

function PostEditForm() {
  const params = useParams();
  const [content, setContent] = useState<string>("");
  const [post, setPost] = useState<PostProps | null>(null);
  const handleFileUpload = () => {};
  const navigate = useNavigate();

  const getPost = useCallback(async () => {
    if (params.id) {
      const docRef = doc(db, "posts", params.id);
      const docSnap = await getDoc(docRef);
      setPost({ ...(docSnap?.data() as PostProps), id: docSnap.id });
      if (docSnap.exists()) {
        // docSnap의 존재 여부 확인
        const data = docSnap.data();

        if (data) {
          // data의 존재 여부 확인
          setPost({ ...(data as PostProps), id: docSnap.id });
          setContent(data.content);
        }
      }
    }
  }, [params.id]);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (post) {
        const postRef = doc(db, "posts", post?.id);
        await updateDoc(postRef, {
          content: content,
        });
        navigate(`/posts/${post?.id}`);
        toast.success("게시글이 수정 되었습니다.");
      }
    } catch (e: any) {
      console.log(e);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      currentTarget: { name, value },
    } = e;
    if (name === "content") {
      setContent(value);
    }
  };

  useEffect(() => {
    if (params.id) getPost();
  }, [getPost]);

  return (
    <form className="post-form" onSubmit={onSubmit}>
      <textarea
        className="post-form_textarea"
        required
        name="content"
        id="content"
        placeholder="what is happening?"
        onChange={onChange}
        value={content}
      />
      <div className="post-form_textarea_submit-area">
        <label htmlFor="file-input" className="post-form_file">
          <FiImage className="post-form_file-icon" />
        </label>
        <input
          type="file"
          name="file-input"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
        <input type="submit" value="수정" className="post-form_submit-btn" />
      </div>
    </form>
  );
}

export default PostEditForm;
