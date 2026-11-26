import { useState } from 'react'
import Icon from './Icon.jsx'

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header className="home-header">
      <div className="home-header-inner">
        <a
          aria-label="DeraSathi home"
          className="home-brand"
          href="#/"
          onClick={closeMenu}
        >
          <span className="home-brand-mark" aria-hidden="true">⌂</span>
          <span>Dera<span>Sathi</span></span>
        </a>

        <button
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="mobile-menu-button"
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          <Icon name={menuOpen ? 'close' : 'menu'} size={22} />
        </button>

        <nav aria-label="Main navigation" className={`home-nav${menuOpen ? ' is-open' : ''}`}>
          <a className="home-nav-link active" href="#/" onClick={closeMenu}>Home</a>
          <a className="home-nav-link" href="#featured" onClick={closeMenu}>Find Accommodation</a>
          <a className="home-nav-link" href="#how-it-works" onClick={closeMenu}>How It Works</a>
          <a className="home-nav-link" href="#about-us" onClick={closeMenu}>About Us</a>
          <a className="home-nav-link" href="#contact" onClick={closeMenu}>Contact</a>
        </nav>

        <div className="home-header-actions">
          <a className="home-login-link" href="#/login">Log in</a>
          <a className="home-signup-button" href="#/register">Sign up</a>
        </div>
      </div>
    </header>
  )
}
