import React, { useState } from 'react'
import './Hero.css'

const Hero = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <section className='hero'>
      {/* Deux seuls points interactifs, dans les coins */}
      <button
        type='button'
        className='hero__dot hero__dot--menu'
        aria-label='Ouvrir le menu'
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <svg viewBox='0 0 24 24' width='22' height='22' aria-hidden='true'>
          <path d='M4 8h16M4 12h16M4 16h16' fill='none' stroke='#fff8f6' strokeWidth='2' strokeLinecap='round' />
        </svg>
      </button>

      <a className='hero__dot hero__dot--brand' href='/' aria-label='Agence Foudre, accueil'>
        <svg viewBox='0 0 24 24' width='22' height='22' aria-hidden='true'>
          <path d='M13.5 2 5 13.5h6L10 22l9-12h-6z' fill='#000' />
        </svg>
      </a>

      <div className='hero__content'>
        <span className='hero__badge'>Agence créative indépendante</span>

        <h1 className='hero__title'>
          <span className='hero__line hero__line--loud'>Des idées</span>
          <span className='hero__line hero__line--mid'>qui font</span>
          <span className='hero__line hero__line--loud'>foudre.</span>
        </h1>

        <p className='hero__text'>
          Nous concevons des marques, des sites et des campagnes qui se
          remarquent dès la première seconde, puis se retiennent.
        </p>

        <a className='hero__link' href='#projets'>
          Voir nos projets
        </a>
      </div>

      {/* Écho pâle de la phrase, en contrepoint */}
      <span className='hero__echo' aria-hidden='true'>
        Foudre.
      </span>
    </section>
  )
}

export default Hero
