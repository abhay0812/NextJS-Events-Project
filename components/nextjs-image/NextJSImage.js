import Image from 'next/image'
import React from 'react'

function NextJSImage(props) {
  const { src, alt, width, height } = props;
  return (
    <Image 
      src={src}
      alt={alt}
      width={width}
      height={height}
    />
  )
}

NextJSImage.defaultProps = {
  src: "",
  alt: "No Images Found",
  width: "",
  height: ""
}

export default NextJSImage