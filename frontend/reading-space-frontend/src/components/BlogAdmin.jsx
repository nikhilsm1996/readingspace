import React, { useState } from "react";

function BlogAdmin() {
  const [blog, setBlog] = useState({
    name: "",
    date: "",
    picture: null,
    content: "",
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    setBlog({ ...blog, picture: file });

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Blog Submitted:", blog);
    alert("Blog created successfully!");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Create a Blog</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={blog.name}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={blog.date}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>
            Picture:
            <input
              type="file"
              accept="image/*"
              onChange={handlePictureChange}
              required
              style={{ marginTop: "5px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>
            Content:
            <textarea
              name="content"
              value={blog.content}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                height: "100px",
                padding: "8px",
                marginTop: "5px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </label>
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "#007BFF",
            color: "#fff",
            padding: "10px 15px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Create Blog
        </button>
      </form>

      {preview && (
        <div style={{ marginTop: "30px" }}>
          <h3>Preview</h3>
          <div style={{ border: "1px solid #ccc", padding: "15px" }}>
            <h4>{blog.name}</h4>
            <p>Date: {blog.date}</p>
            {preview && (
              <img
                src={preview}
                alt="Blog Preview"
                style={{ maxWidth: "100%", height: "auto", marginBottom: "15px" }}
              />
            )}
            <p>{blog.content}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default BlogAdmin;
