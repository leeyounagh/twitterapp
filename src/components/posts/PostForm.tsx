import React, { useContext, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { FiImage } from "react-icons/fi";
import { db } from "firebaseApp";
import { toast } from "react-toastify";
import AuthContext from "components/context/AuthContext";

function PostForm() {
  const [content, setContent] = useState<string>("");
  const handleFileUpload = () => {};
  const { user } = useContext(AuthContext);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "posts"), {
        content: content,
        createdAt: new Date()?.toLocaleDateString("ko", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        uid: user?.uid,
        email: user?.email,
      });
      setContent("");
      toast.success("게시글을 생성 했습니다.");
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
        <input type="submit" value="Tweet" className="post-form_submit-btn" />
      </div>
    </form>
  );
}

export default PostForm;
