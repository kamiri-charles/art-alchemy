import React from 'react'
import LogoImg from '../../assets/logo/brand-logo.jpg'
import './styles.scss'
import { MetroSpinner } from 'react-spinners-kit'

const PageLoader:React.FC = () => {
  return (
    <div className='page-loader'>
        <img src={LogoImg} alt="" />
        <div className="spinner">
            <MetroSpinner color="white" size={30} />
        </div>
    </div>
  )
}

export default PageLoader