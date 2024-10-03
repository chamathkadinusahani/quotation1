import * as React from "react";
import { useState } from 'react';
import axios from 'axios'; // Import Axios for making API requests
import styles from './MyComponent.module.css';
import Footer from './Footer';
import './Footer.css';
import Header1 from './Header1';

export default function MyComponent() {
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous error messages

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    // Validate description length
    if (description.length < 10) {
      setErrorMessage("Description must be at least 10 characters long.");
      return;
    }

    setLoading(true);

    try {
      // Use axios to send the POST request to the backend
      const response = await axios.post('http://localhost:5000/request-email', {
        email,
        description,
      });

      if (response.status === 200) {
        alert("Quotation request sent successfully!");
        setEmail(""); // Clear the input fields
        setDescription("");
      } else {
        alert("Failed to send quotation request. Please try again.");
      }
    } catch (error) {
      console.error("Error sending request:", error.response ? error.response.data : error.message);
      setErrorMessage("There was an error submitting your request. Please try again.");
    }

    setLoading(false); // End the loading state
  };

  return (
    <>
      <div className={styles.login}>
        <div className={styles.div}>
          <Header1 />
          <div className={styles.div3}>
            <div className={styles.div4}>
              <div className={styles.column}>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/d7f99b99893dd9e06a74c7e501dccb2770bfbdb8de8253938cbd597b350b83a7"
                  className={styles.img}
                  alt="Quotation image"
                />
              </div>
              <div className={styles.column2}>
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/fb0f4408458057004673e69632b769a14759e57120a7e7f5f72d67e709448500"
                  className={styles.img2}
                  alt="Quotation image 2"
                />
              </div>
              <div className={styles.column3}>
                <div className={styles.div5}>
                  <div className={styles.requestQuotation}>REQUEST A QUOTATION</div>
                  {errorMessage && <div className={styles.error}>{errorMessage}</div>} {/* Display error message */}
                  <div className={styles.inputFieldWithLabel}>
                    <div className={styles.label}>Email</div>
                    <input
                      type="email"
                      className={styles.inputField}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <div className={styles.wrapper} />
                  </div>
                  <div className={styles.inputFieldWithLabel2}>
                    <div className={styles.label2}>Description</div>
                  </div>
                  <input
                    type="text"
                    className={styles.inputField2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                  <div className={styles.wrapper2} />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.div6}>
            <div className={styles.gloriusTextileHasBeenTheGoToCompanySinceThe80S}>
              GLORIUS TEXTILE HAS BEEN THE GO-TO COMPANY SINCE THE 80'S.
            </div>
            <button type="submit" className={styles.button} onClick={handleSubmit} disabled={loading}>
              {loading ? "Sending..." : "Request a Quotation"}
            </button>
          </div>
          <div className={styles.realizeYourVision}>REALIZE YOUR VISION</div>
        </div>
        <Footer />
      </div>
    </>
  );
}
