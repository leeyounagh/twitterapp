import React from "react";
import { FiImage } from "react-icons/fi";

function PostForm() {
  const handleFileUpload = () => {};

  return (
    <form className="post-form">
      <textarea
        className="post-form_textarea"
        required
        name="content"
        id="content"
        placeholder="what is happening?"
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
