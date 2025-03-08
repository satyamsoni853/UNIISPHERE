import React from 'react';
import './Background.css';

import Smallimage1 from './small-image1.png';
import Smallimage2 from './small-image2.png';
import Smallimage3 from './small-image3.png';
import Smallimage4 from './small-image4.png';
import Smallimage5 from './small-image5.png';
import Smallimage6 from './small-image6.png';
import Smallimage7 from './small-image7.png';
import Smallimage8 from './small-image8.png';
import Smallimage9 from './small-image9.png';
import Smallimage10 from './small-image10.png';
import Smallimage11 from './small-image11.png';
import Smallimage12 from './small-image12.png';
import Smallimage13 from './small-image13.png';
import Smallimage14 from './small-image14.png';

const images = [
  Smallimage1, Smallimage2, Smallimage3, Smallimage4, Smallimage5, Smallimage6,
  Smallimage7, Smallimage8, Smallimage9, Smallimage10, Smallimage11, Smallimage12,
  Smallimage13, Smallimage14, Smallimage1, Smallimage2, Smallimage3, Smallimage4,
  Smallimage5, Smallimage6
]; // 20 images

function Background() {
  return (
    <div className="background-container">
      {images.map((img, index) => (
        <img key={index} src={img} alt="Small bg" className={`bg-img img-${index}`} />
      ))}
    </div>
  );
}

export default Background;
