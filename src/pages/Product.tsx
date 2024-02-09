import React from 'react'
import Header from '../components/Header'
import '../styles/product.scss'

const Product: React.FC = () => {
  return (
    <div className='product'>
        <Header />

        <div className="main">
          <div className="art-image">
            <img src="https://source.unsplash.com/400x400/?art" alt="art" />
          </div>

          <div className="product-btns">

            <div className="product-btn">
              <i className="bx bx-star"></i>
              <span>Star</span>
            </div>

            <div className="product-btn">
              <i className="bx bx-comment"></i>
              <span>Comment</span>
            </div>

            <div className="product-btn add-to-cart">
              <i className="bx bx-cart"></i>
              <span>Add to cart</span>
            </div>
          </div>

          <div className="art-meta">

            <div className="art-title">
              <div className="owner-image"></div>

              <div className="art-name">
                <h2>Art name</h2>
                <p>by <span>Artist</span></p>
              </div>
            </div>

            <div className="stats">
              <div className="stat">
                <i className="bx bx-star"></i>
                <p>0</p>
              </div>

              <div className="stat">
                <i className="bx bx-message"></i>
                <p>0</p>
              </div>
            </div>

            <div className="publ-date">Date</div>

          </div>

          <div className="tags">
            <div className="tag">Sample</div>
            <div className="tag">Sample</div>
            <div className="tag">Sample</div>
            <div className="tag">Sample</div>
          </div>

          <div className="art-desc">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem, quo.
          </div>


        </div>

        <div className="more">

          <div className="more-by-artist">
            <div className="more-title">More by artist</div>
            <div className="more-art">
              <div className="more-art-image"></div>
              <div className="more-art-image"></div>
              <div className="more-art-image"></div>
            </div>
          </div>

          <div className="suggested">
            <div className="more-title">Suggested</div>
            <div className="more-art">
              <div className="more-art-image"></div>
              <div className="more-art-image"></div>
              <div className="more-art-image"></div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Product