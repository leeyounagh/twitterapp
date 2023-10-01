import React, { useContext, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { FiImage } from "react-icons/fi";
import { db } from "firebaseApp";
import { toast } from "react-toastify";
import AuthContext from "components/context/AuthContext";

function PostForm() {
  const [content, setContent] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [hashTag, setHashTag] = useState<string>("");
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
        hashTags: tags,
      });
      setContent("");
      setHashTag("");
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
  const onChangeHashTag = (e: any) => {
    setHashTag(e?.target?.value?.trim());
  };
  const removeTag = (tag: string) => {
    setTags(tags?.filter((val) => val !== tag));
  };
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value.trim();

    if (e.code === "Space" && value !== "") {
      if (tags.includes(value)) {
        toast.error("같은 태그가 있습니다.");
      } else {
        setTags((prev) => [...prev, value]);
        setHashTag(""); // 입력 필드를 비우는 코드
      }
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
      <div className="post-form_hashtags">
        <span className="post-form_hashtags-outputs">
          {tags?.map((tag, index) => (
            <span
              className="post-form_hashtags-tag"
              key={index}
              onClick={() => removeTag(tag)}
            >
              #{tag}
            </span>
          ))}
        </span>

        <input
          className="post-form_input"
          name="hashtag"
          id="hashtag"
          placeholder="해시태그 + 스페이스바 입력"
          onChange={onChangeHashTag}
          onKeyUp={handleKeyUp}
          value={hashTag}
        />
      </div>
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
