import PostForm from "components/posts/PostForm";
import PostBox from "components/posts/PostBox";

export default function HomePage() {
  return (
    <div className="home">
      <div className="home_title">home</div>
      <div className="home_tabs">
        <div className="home_tab home_tab--active">For You</div>
        <div className="home_tab">Following</div>
      </div>
      <PostForm />

      {/* tweet post */}
      <PostBox />
    </div>
  );
}
