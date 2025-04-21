import React, { useState } from 'react';
import './MobileAddPost.css'; // Import the external CSS

const MobileAddPost = () => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mobile-addpost-container">
      <label htmlFor="mobile-addpost-input" className="mobile-addpost-button">
        Upload Image
      </label>
      <input
        type="file"
        id="mobile-addpost-input"
        accept="image/*"
        onChange={handleImageChange}
        className="mobile-addpost-input"
      />
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Preview"
          className="mobile-addpost-preview"
        />
      )}
    </div>
  );
};

export default MobileAddPost;
