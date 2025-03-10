import React from 'react';
import './DesktopLeftTop.css';
import DesktopLeft2image1 from "./DesktopLeft2image1.png";
import DesktopLeft2image2 from "./DesktopLeft2image2.png";

function DesktopLeftTop() {
  return (
    <div className="leftsectiontop-1">
      <h3 className="leftsectiontop-1-heading">Trends</h3>

      {/* Article 1 */}
      <div className="leftsectiontop-1-article">
        <img
          src={DesktopLeft2image1}
          alt="Article 1"
          className="leftsectiontop-1-image"
        />
        <div className="leftsectiontop-1-details">
          <p className="leftsectiontop-1-title">
            Students Association Union.....
          </p>
          <p className="leftsectiontop-1-author">
            As per the rumors it is said that the elections of this year is
            going... more{" "}
          </p>
        </div>
      </div>

      {/* Article 2 */}
      <div className="leftsectiontop-1-article">
        <img
          src={DesktopLeft2image2}
          alt="Article 2"
          className="leftsectiontop-1-image"
        />
        <div className="leftsectiontop-1-details">
          <p className="leftsectiontop-1-title">
            Students Association Union.....
          </p>
          <p className="leftsectiontop-1-author">
            As per the rumors it is said that the elections of this year is
            going... more{" "}
          </p>
        </div>
      </div>

      {/* Article 3 */}
      <div className="leftsectiontop-1-article">
        <img
          src={DesktopLeft2image2}
          alt="Article 3"
          className="leftsectiontop-1-image"
        />
        <div className="leftsectiontop-1-details">
          <p className="leftsectiontop-1-title">
            Students Association Union.....
          </p>
          <p className="leftsectiontop-1-author">
            As per the rumors it is said that the elections of this year is
            going... more{" "}
          </p>
        </div>
      </div>

      {/* Article 4 */}
      <div className="leftsectiontop-1-article">
        <img
          src={DesktopLeft2image2}
          alt="Article 4"
          className="leftsectiontop-1-image"
        />
        <div className="leftsectiontop-1-details">
          <p className="leftsectiontop-1-title">
            Students Association Union.....
          </p>
          <p className="leftsectiontop-1-author">
            As per the rumors it is said that the elections of this year is
            going... more{" "}
          </p>
        </div>
      </div>

      {/* Article 5 */}
      <div className="leftsectiontop-1-article">
        <img
          src={DesktopLeft2image2}
          alt="Article 5"
          className="leftsectiontop-1-image"
        />
        <div className="leftsectiontop-1-details">
          <p className="leftsectiontop-1-title">
            Students Association Union.....
          </p>
          <p className="leftsectiontop-1-author">
            As per the rumors it is said that the elections of this year is
            going... more{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DesktopLeftTop;
