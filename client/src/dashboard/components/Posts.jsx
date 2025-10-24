// client/src/dashboard/components/Posts.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Posts = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem("posts");
    if (saved) return JSON.parse(saved);
    return [
      {
        id: "1",
        author: "John Doe",
        avatar:
          "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint possimus corporis sunt necessitatibus!",
        date: "04/16/2019",
        likes: 4,
        dislikes: 0,
        comments: 2, // old format: number
      },
      {
        id: "2",
        author: "John Doe",
        avatar:
          "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint possimus corporis sunt necessitatibus!",
        date: "04/16/2019",
        likes: 4,
        dislikes: 0,
        comments: 3,
      },
    ];
  });

  // persist posts
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  // on mount: if a pending post exists and profile flag is set, post it
  useEffect(() => {
    const pending = sessionStorage.getItem("pendingPost");
    const hasProfile = localStorage.getItem("hasProfile") === "true";
    if (pending && hasProfile) {
      try {
        const { text: pendingText } = JSON.parse(pending);
        if (pendingText && pendingText.trim()) {
          const newPost = makePostObject(pendingText.trim());
          setPosts((p) => [...p, newPost]);
        }
      } catch (e) {
        // ignore malformed pending
      }
      sessionStorage.removeItem("pendingPost");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const makePostObject = (textValue) => ({
    id: String(Date.now()), // timestamp id like "1698123456789"
    author: "Community",
    avatar:
      "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
    text: textValue,
    date: new Date().toLocaleDateString(),
    likes: 0,
    dislikes: 0,
    comments: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const hasProfile = localStorage.getItem("hasProfile") === "true";
    if (!hasProfile) {
      sessionStorage.setItem(
        "pendingPost",
        JSON.stringify({ text: text.trim() })
      );
      navigate("/profile/create-profile");
      return;
    }
    const newPost = makePostObject(text.trim());
    setPosts((p) => [...p, newPost]);
    setText("");
  };

  const handleLike = (id) =>
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
    );

  const handleDislike = (id) =>
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, dislikes: p.dislikes + 1 } : p))
    );

  const handleDelete = (id) =>
    setPosts((prev) => prev.filter((p) => p.id !== id));

  // render comment count safely whether comments is a number (old) or array (new)
  const commentCount = (post) =>
    Array.isArray(post.comments) ? post.comments.length : post.comments || 0;

  return (
    <>
      <section className="container">
        <h1 className="large text-primary">Posts</h1>
        <p className="lead">
          <i className="fas fa-user" /> Welcome to the community!
        </p>

        <div className="post-form">
          <div className="bg-primary p">
            <h3>Say Something...</h3>
          </div>
          <form className="form my-1" onSubmit={handleSubmit}>
            <textarea
              name="text"
              cols="30"
              rows="5"
              placeholder="Create a post"
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <input type="submit" className="btn btn-dark my-1" value="Submit" />
          </form>
        </div>

        <div className="posts">
          {posts.map((post) => (
            <div key={post.id} className="post bg-white p-1 my-1">
              <div>
                <a href="#profile">
                  <img className="round-img" src={post.avatar} alt="" />
                </a>
              </div>
              <div>
                <p className="my-1">{post.text}</p>
                <p className="post-date">Posted on {post.date}</p>

                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => handleLike(post.id)}
                >
                  <i className="fas fa-thumbs-up" /> <span>{post.likes}</span>
                </button>

                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => handleDislike(post.id)}
                >
                  <i className="fas fa-thumbs-down" />{" "}
                  <span>{post.dislikes}</span>
                </button>

                {/* Use an absolute Link and encode the id so the router always navigates to /post/:id */}
                <Link
                  to={`/post/${encodeURIComponent(post.id)}`}
                  className="btn btn-primary"
                >
                  Discussion{" "}
                  <span className="comment-count">{commentCount(post)}</span>
                </Link>

                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDelete(post.id)}
                >
                  <i className="fas fa-times" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Posts;
