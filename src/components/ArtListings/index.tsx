import React from 'react'
import TestImage1 from '../../assets/testing/images/cold_light_of_the_night_by_istoma_dggxhlv-350t.jpg'
import TestImage2 from '../../assets/testing/images/flying_on_the_roads_by_aerroscape_dghc2cz-350t.jpg'
import TestImage3 from '../../assets/testing/images/poison_ivy__by_enysguerrero_dglr4o1-400t.jpg'
import TestImage4 from '../../assets/testing/images/schmetterling_by_damirherak_dgpj3gm-375w.jpg'
import TestImage5 from '../../assets/testing/images/serenity_by_peacegroover_dgpjrig-300w.jpg'
import './styles.scss'

const ArtListings:React.FC = () => {

  return (
    <div className='art-listings'>

      {/* To be replaced with the art piece component */}

      <div className="placeholder-art-piece">
        <img src={TestImage1} alt="" />

        <div className="piece-meta">
          <div className="piece-title">Cold light of the night</div>
          <div className="piece-owner">Istoma</div>

          <div className="piece-stats">
            <div className="piece-stat">
              <i className="bx bx-star"></i>
              <span>Stars: 12.2k</span>
            </div>
            <div className="piece-stat"></div>
          </div>

          <div className="buy-piece">
            <span className="price"></span>
            <button className="add-to-cart"></button>
          </div>
        </div>
      </div>

      <div className="placeholder-art-piece">
        <img src={TestImage2} alt="" />
      </div>

      <div className="placeholder-art-piece">
        <img src={TestImage3} alt="" />
      </div>

      <div className="placeholder-art-piece">
        <img src={TestImage4} alt="" />
      </div>

      <div className="placeholder-art-piece">
        <img src={TestImage5} alt="" />
      </div>

      <div className="placeholder-art-piece">
        <img src={TestImage1} alt="" />
      </div>

    </div>
  )
}

export default ArtListings;