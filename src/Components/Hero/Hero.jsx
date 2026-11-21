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
  image = '',
  imageAlt = 'Portrait',
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

      {/* Image avec cadre doré */}
      <div className='hero__intro'>
        <div className='hero__intro-left'>
          <figure className='hero__frame'>
            {image ? (
              <img className='hero__image' src={image} alt={imageAlt} />
            ) : (
              <div className='hero__image hero__image--empty' role='img' aria-label={imageAlt} />
            )}
          </figure>
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
