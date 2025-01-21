import { useState, useEffect } from "react";
import { Container, Card, Form, Button, Alert, Row, Col, Spinner } from "react-bootstrap";
import { Trash2, ImageIcon, Link as LinkIcon } from "lucide-react"; // Import Lucide icons

function BlogAdmin() {
  const [blog, setBlog] = useState({
    title: "",
    description: "",
    link: "",
    image: null,
  });
  const [blogs, setBlogs] = useState([]); // To store fetched blogs
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Fetch all blogs on component mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  // Fetch all blogs
  const fetchBlogs = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        `Bearer ${localStorage.getItem("authToken")}`
      );

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      const response = await fetch("http://localhost:3000/blog/", requestOptions);
      const result = await response.json();

      if (response.ok) {
        setBlogs(result.blogs);
      } else {
        setError(result.message || "Failed to fetch blogs.");
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setError("An error occurred. Please check your connection.");
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  // Handle image upload
  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    setBlog({ ...blog, image: file });

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    if (file) reader.readAsDataURL(file);
  };

  // Handle form submission (Create Blog)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        `Bearer ${localStorage.getItem("authToken")}`
      );

      const formdata = new FormData();
      formdata.append("title", blog.title);
      formdata.append("description", blog.description);
      formdata.append("link", blog.link);
      if (blog.image) formdata.append("image", blog.image);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      const response = await fetch("http://localhost:3000/blog/add", requestOptions);
      const result = await response.json();

      if (response.ok) {
        setMessage("Blog created successfully!");
        setBlog({ title: "", description: "", link: "", image: null });
        setPreview(null);
        fetchBlogs(); // Refresh the list of blogs
      } else {
        setError(result.message || "Failed to create blog.");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      setError("An error occurred. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  // Handle blog deletion
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        const myHeaders = new Headers();
        myHeaders.append(
          "Authorization",
          `Bearer ${localStorage.getItem("authToken")}`
        );

        const requestOptions = {
          method: "DELETE",
          headers: myHeaders,
          redirect: "follow",
        };

        const response = await fetch(`http://localhost:3000/blog/${id}`, requestOptions);
        const result = await response.json();

        if (response.ok) {
          setMessage("Blog deleted successfully!");
          fetchBlogs(); // Refresh the list of blogs
        } else {
          setError(result.message || "Failed to delete blog.");
        }
      } catch (error) {
        console.error("Error deleting blog:", error);
        setError("An error occurred. Please check your connection.");
      }
    }
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Blog Management</h2>

      {/* Display success message */}
      {message && <Alert variant="success">{message}</Alert>}

      {/* Display error message */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Create Blog Form */}
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={blog.title}
                onChange={handleChange}
                placeholder="Enter blog title"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={blog.description}
                onChange={handleChange}
                placeholder="Enter blog description"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                <LinkIcon className="me-2" size={18} />
                Link
              </Form.Label>
              <Form.Control
                type="url"
                name="link"
                value={blog.link}
                onChange={handleChange}
                placeholder="Enter blog link (optional)"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                <ImageIcon className="me-2" size={18} />
                Upload Image
              </Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handlePictureChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner as="span" size="sm" animation="border" role="status" />
                  <span className="ms-2">Creating...</span>
                </>
              ) : (
                "Create Blog"
              )}
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* Preview Section */}
      {preview && (
        <Card className="shadow-sm mb-4">
          <Card.Body>
            <h4>Preview</h4>
            <Card>
              <Card.Img variant="top" src={preview} alt="Blog Preview" />
              <Card.Body>
                <Card.Title>{blog.title}</Card.Title>
                <Card.Text>{blog.description}</Card.Text>
                {blog.link && (
                  <Button
                    href={blog.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outline-primary"
                  >
                    <LinkIcon className="me-2" size={16} />
                    Visit Link
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Card.Body>
        </Card>
      )}

      {/* List of Blogs */}
      <h3 className="mb-4">Blogs</h3>
      {blogs.length > 0 ? (
        <Row>
          {blogs.map((blog) => (
            <Col key={blog.id} md={6} className="mb-4">
              <Card className="shadow-sm h-100">
                <Card.Img
                  variant="top"
                  src={`http://localhost:3000${blog.image}`}
                  alt="Blog"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{blog.title}</Card.Title>
                  <Card.Text>{blog.description}</Card.Text>
                  {blog.link && (
                    <Button
                      href={blog.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outline-primary"
                      size="sm"
                    >
                      <LinkIcon className="me-2" size={16} />
                      Visit Link
                    </Button>
                  )}
                  <div className="mt-3">
                    <small className="text-muted">
                      Posted on: {new Date(blog.postedDate).toLocaleDateString()}
                    </small>
                  </div>
                </Card.Body>
                <Card.Footer>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(blog.id)}
                  >
                    <Trash2 className="me-2" size={16} />
                    Delete
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Alert variant="info">No blogs found.</Alert>
      )}
    </Container>
  );
}

export default BlogAdmin;