import React, { useState, useEffect } from 'react'
import TestImage from '../../assets/testing/images/cold_light_of_the_night_by_istoma_dggxhlv-350t.jpg'
import './styles.scss'
import ArtPiece from '../ArtPiece'

const ArtListings:React.FC = () => {
  const [imageData, setImageData] = useState<ArrayBuffer | null>(null)

  useEffect(() => {
    fetch(TestImage)
      .then(res => res.blob())
      .then(blob => {
        const reader = new FileReader()
        reader.readAsArrayBuffer(blob)
        reader.onload = () => {
          const arrayBuffer = reader.result
          setImageData(arrayBuffer as ArrayBuffer)
        }
      })
  }, []);

  return (
    <div className='art-listings'>
      <ArtPiece imageData={imageData} />
    </div>
  )
}

export default ArtListings;