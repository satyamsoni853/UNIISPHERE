import React from 'react';
import './Background.css';

import SmallImage1 from './SmallImage1.png';
import SmallImage2 from './SmallImage2.png';
import SmallImage3 from './SmallImage3.png';
import SmallImage4 from './SmallImage4.png';
import SmallImage5 from './SmallImage5.png';
import SmallImage6 from './SmallImage6.png';
import SmallImage7 from './SmallImage7.png';
import SmallImage8 from './SmallImage8.png';
import SmallImage9 from './SmallImage9.png';
import SmallImage10 from './SmallImage10.png';
import SmallImage11 from './SmallImage11.png';
import SmallImage12 from './SmallImage12.png';
import SmallImage13 from './SmallImage13.png';
import SmallImage14 from './SmallImage14.png';

const images = [
  SmallImage1, SmallImage2, SmallImage3, SmallImage4, SmallImage5, SmallImage6,
  SmallImage7, SmallImage8, SmallImage9, SmallImage10, SmallImage11, SmallImage12,
  SmallImage13, SmallImage14, SmallImage1, SmallImage2, SmallImage3, SmallImage4,
  SmallImage5, SmallImage6
];

function Background() {
  return (
    <div className="background-container">
      {images.map((image, index) => (
        <img key={index} src={image} alt="Small Image" className={`bg-img img-${index}`} />
      ))}
    </div>
  );
}

export default Background;