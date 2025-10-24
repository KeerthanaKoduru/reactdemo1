// client/src/posts/components/pages/PostDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PostDetail = () => {
  const { id } = useParams();
  const decodedId = decodeURIComponent(id || "");
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("posts") || "[]");
    setAllPosts(saved);
    const found = saved.find((p) => p.id === decodedId);
    setPost(found || null);
  }, [decodedId]);

  useEffect(() => {
    console.log("PostDetail mount id=", decodedId, "found=", !!post, post);
  }, [decodedId, post]);

  if (!post) {
    return (
      <section className="container">
        <h2>Post not found</h2>
        <button className="btn btn-light" onClick={() => navigate("/posts")}>
          Back to posts
        </button>
      </section>
    );
  }

  const getCommentsArray = (p) => (Array.isArray(p.comments) ? p.comments : []);

  const handleAddComment = (e) => {
    e.preventDefault();
    const trimmed = commentText.trim();
    if (!trimmed) return;
    const updatedPosts = [...allPosts];
    const idx = updatedPosts.findIndex((p) => p.id === post.id);
    if (idx === -1) return;

    // Ensure comments is an array
    const existing = Array.isArray(updatedPosts[idx].comments)
      ? updatedPosts[idx].comments
      : [];
    const newComment = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      text: trimmed,
      date: new Date().toLocaleString(),
    };
    const updatedComments = [...existing, newComment];
    updatedPosts[idx] = { ...updatedPosts[idx], comments: updatedComments };

    // persist
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setAllPosts(updatedPosts);
    setPost(updatedPosts[idx]);
    setCommentText("");
  };
  const makePostObject = (textValue) => ({
    id: String(Date.now()), // numeric timestamp id
    author: "Community",
    text: textValue,
    date: new Date().toLocaleDateString(),
    likes: 0,
    dislikes: 0,
    comments: [],
  });
  const comments = getCommentsArray(post);

  return (
    <section className="container">
      <h1 className="large text-primary">Discussion</h1>

      <div className="post bg-white p-1 my-1">
        <div>
          <img className="round-img" src={post.avatar} alt="" />
        </div>
        <div>
          <p className="my-1">{post.text}</p>
          <p className="post-date">Posted on {post.date}</p>
          <div>
            <button className="btn btn-light">
              <i className="fas fa-thumbs-up" /> <span>{post.likes}</span>
            </button>
            <button className="btn btn-light">
              <i className="fas fa-thumbs-down" /> <span>{post.dislikes}</span>
            </button>
          </div>
        </div>
      </div>

      <section className="comments">
        <h2>Comments ({comments.length})</h2>

        <form className="form my-1" onSubmit={handleAddComment}>
          <textarea
            name="comment"
            cols="30"
            rows="3"
            placeholder="Add a comment"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            required
          />
          <input
            type="submit"
            className="btn btn-primary my-1"
            value="Add Comment"
          />
        </form>

        <div className="comment-list">
          {comments.length === 0 && <p>No comments yet — be the first!</p>}
          {comments.map((c) => (
            <div key={c.id} className="post bg-white p-1 my-1">
              <div>
                <p className="my-1">{c.text}</p>
                <p className="post-date">{c.date}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <button className="btn btn-light" onClick={() => navigate("/posts")}>
        Back to posts
      </button>
    </section>
  );
};

export default PostDetail;
