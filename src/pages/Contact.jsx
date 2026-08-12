import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all fields");
      return;
    }

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">

        <h2 className="mb-4">Contact Us</h2>

        {submitted && (
          <div className="alert alert-success">
            Message sent successfully!
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">Name</label>

            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>

            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Message</label>

            <textarea
              name="message"
              className="form-control"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Send Message
          </button>

        </form>

      </div>
    </div>
  );
}

export default Contact;