import React from 'react'
import './Hero.css'

/*
  Hero dans le style "Miranda" (broadsheet / journal ancien).
  Structure : barre d'en-tête, bannière d'affichage noire, bloc d'intro en deux colonnes.
  Change le contenu via les props ou directement dans les valeurs par défaut.
*/
const Hero = ({
  location = 'Amsterdam, NL',
  brand = 'Miranda',
  banner = 'MIRANDA',
  headline = 'Creative developer based in Amsterdam, NL.',
  bio = 'Miranda conçoit et construit des sites interactifs, des illustrations et des expériences numériques pour des studios et des marques. Chaque projet est dessiné, codé et imprimé dans le même esprit : avec soin, avec du contraste, et un peu d’encre.',
  linkLabel = 'Voir tous les projets',
  linkHref = '#projets',
  onMenuClick,
}) => {
  return (
    <header className='hero'>
      {/* Éditorial Header Bar */}
      <div className='hero__bar'>
        <span className='hero__location'>{location}</span>
        <a className='hero__brand' href='/'>
          {brand}
        </a>
        <button
          type='button'
          className='hero__menu'
          aria-label='Ouvrir le menu'
          onClick={onMenuClick}
        >
          <svg viewBox='0 0 24 24' width='24' height='24' aria-hidden='true'>
            <path
              d='M3 7h18M3 12h18M3 17h18'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='square'
            />
          </svg>
        </button>
      </div>

      {/* Display Banner Block */}
      <div className='hero__banner'>
        <h1 className='hero__banner-text'>{banner}</h1>
      </div>

      {/* Drop Cap Bio Block */}
      <div className='hero__intro'>
        <div className='hero__intro-left'>
          <p className='hero__bio'>{bio}</p>
          <a className='hero__link' href={linkHref}>
            {linkLabel}
          </a>
        </div>
        <h2 className='hero__headline'>{headline}</h2>
      </div>
    </header>
  )
}

export default Hero
