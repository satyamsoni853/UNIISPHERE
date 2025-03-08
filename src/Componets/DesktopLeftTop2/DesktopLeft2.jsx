import React from 'react';
import './DesktopLeft2.css';
import DesktopLeft2image1 from './DesktopLeft2image1.png';
import DesktopLeft2image2 from './DesktopLeft2image2.png';

function DesktopLeft2() {
  return (
    <div className="leftsectionbottom">
      <h3 className="leftsectionbottom-heading">Top News</h3>

      {/* Article 1 */}
      <div className="leftsectionbottom-article">
        <img src={DesktopLeft2image1} alt="Article 1" className="leftsectionbottom-image" />
        <div className="leftsectionbottom-details">
          <p className="leftsectionbottom-title">Students Association Union.....</p>
          <p className="leftsectionbottom-author">As per the rumors it is said that the elections of this year is going... more </p>
        </div>
        <a href="#" className="leftsectionbottom-link">Read More</a>
      </div>

      {/* Article 2 */}
      <div className="leftsectionbottom-article">
        <img src={DesktopLeft2image2} alt="Article 2" className="leftsectionbottom-image" />
        <div className="leftsectionbottom-details">
        <p className="leftsectionbottom-title">Students Association Union.....</p>
        <p className="leftsectionbottom-author">As per the rumors it is said that the elections of this year is going... more </p>
        </div>
        <a href="#" className="leftsectionbottom-link">Read More</a>
      </div>
      {/* Article 3 */}
      <div className="leftsectionbottom-article">
        <img src={DesktopLeft2image2} alt="Article 2" className="leftsectionbottom-image" />
        <div className="leftsectionbottom-details">
        <p className="leftsectionbottom-title">Students Association Union.....</p>
        <p className="leftsectionbottom-author">As per the rumors it is said that the elections of this year is going... more </p>
        </div>
        <a href="#" className="leftsectionbottom-link">Read More</a>
      </div>
      {/* Article 4 */}
      <div className="leftsectionbottom-article">
        <img src={DesktopLeft2image2} alt="Article 2" className="leftsectionbottom-image" />
        <div className="leftsectionbottom-details">
        <p className="leftsectionbottom-title">Students Association Union.....</p>
        <p className="leftsectionbottom-author">As per the rumors it is said that the elections of this year is going... more </p>
        </div>
        <a href="#" className="leftsectionbottom-link">Read More</a>
      </div>
      {/* Article 5 */}
      <div className="leftsectionbottom-article">
        <img src={DesktopLeft2image2} alt="Article 2" className="leftsectionbottom-image" />
        <div className="leftsectionbottom-details">
        <p className="leftsectionbottom-title">Students Association Union.....</p>
        <p className="leftsectionbottom-author">As per the rumors it is said that the elections of this year is going... more </p>
        </div>
        <a href="#" className="leftsectionbottom-link">Read More</a>
      </div>

      
    </div>
  );
}

export default DesktopLeft2;
