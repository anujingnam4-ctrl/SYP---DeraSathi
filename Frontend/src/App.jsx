import { useEffect, useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage.jsx'
import AccommodationSearchPage from './pages/AccommodationSearchPage.jsx'
import AccommodationDetailsPage from './pages/AccommodationDetailsPage.jsx'
import { accommodations } from './data/accommodations.js'

function AuthPage({ initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode)
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('info')
  const isRegistering = mode === 'register'

  function changeMode(nextMode) {
    setMode(nextMode)
    setMessage('')
    setMessageType('info')
    window.location.hash = nextMode === 'register' ? '/register' : '/login'
  }

  function handleSubmit(event) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    if (isRegistering && formData.get('password') !== formData.get('confirmPassword')) {
      setMessageType('error')
      setMessage('Your passwords do not match. Please try again.')
      return
    }

    setMessageType('info')
    setMessage(
      'Your form is ready. Connect an authentication backend to create or access an account.',
    )
  }

  return (
    <main className="auth-page">
      <section className="welcome-panel" aria-label="About DeraSathi">
        <a className="brand" href="#/" aria-label="DeraSathi home">
          <span className="brand-icon" aria-hidden="true">⌂</span>
          <span>Dera<span className="brand-accent">Sathi</span></span>
        </a>

        <div className="welcome-copy">
          <span className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</span>
          <h1>A place to belong<br />is closer than you think.</h1>
          <p>Find a comfortable room, meet good people, and feel at home in your new city.</p>
        </div>

        <div className="welcome-art" aria-hidden="true">
          <div className="sun" />
          <div className="art-window"><span /><span /></div>
          <div className="art-plant"><i /><i /><i /></div>
          <div className="art-room">
            <div className="art-bed"><span /><span /></div>
            <div className="art-table" />
          </div>
          <div className="art-rug" />
        </div>

        <p className="welcome-note">A little help finding your next home.</p>
      </section>

      <section className="form-panel">
        <div className="mobile-brand">
          <a className="brand" href="#/" aria-label="DeraSathi home">
            <span className="brand-icon" aria-hidden="true">⌂</span>
            <span>Dera<span className="brand-accent">Sathi</span></span>
          </a>
        </div>

        <div className="auth-card">
          <div className="card-heading">
            <span className="eyebrow">{isRegistering ? 'JOIN DERASATHI' : 'WELCOME BACK'}</span>
            <h2>{isRegistering ? 'Create your account' : 'Log in to your account'}</h2>
            <p>
              {isRegistering
                ? 'Start finding a space that feels like yours.'
                : 'We’re glad you’re here. Enter your details to continue.'}
            </p>
          </div>

          <div className="mode-tabs" role="tablist" aria-label="Account options">
            <button
              aria-selected={!isRegistering}
              className={!isRegistering ? 'mode-tab active' : 'mode-tab'}
              onClick={() => changeMode('login')}
              role="tab"
              type="button"
            >
              Log in
            </button>
            <button
              aria-selected={isRegistering}
              className={isRegistering ? 'mode-tab active' : 'mode-tab'}
              onClick={() => changeMode('register')}
              role="tab"
              type="button"
            >
              Create account
            </button>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {isRegistering && (
              <label className="field">
                <span>Full name</span>
                <input
                  autoComplete="name"
                  name="name"
                  placeholder="Your name"
                  required
                />
              </label>
            )}

            <label className="field">
              <span>Email address</span>
              <input
                autoComplete="email"
                name="email"
                placeholder="you@example.com"
                required
                type="email"
              />
            </label>

            <label className="field">
              <span>Password</span>
              <span className="password-input">
                <input
                  autoComplete={isRegistering ? 'new-password' : 'current-password'}
                  minLength={8}
                  name="password"
                  placeholder="At least 8 characters"
                  required
                  type={showPassword ? 'text' : 'password'}
                />
                <button
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="password-toggle"
                  onClick={() => setShowPassword((visible) => !visible)}
                  type="button"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </span>
            </label>

            {isRegistering && (
              <label className="field">
                <span>Confirm password</span>
                <input
                  autoComplete="new-password"
                  minLength={8}
                  name="confirmPassword"
                  placeholder="Re-enter your password"
                  required
                  type={showPassword ? 'text' : 'password'}
                />
              </label>
            )}

            {!isRegistering && (
              <div className="form-options">
                <label className="check-label">
                  <input name="remember" type="checkbox" />
                  <span>Remember me</span>
                </label>
                <button
                  className="text-link"
                  onClick={() => {
                    setMessageType('info')
                    setMessage('Password reset will be available when authentication is connected.')
                  }}
                  type="button"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {isRegistering && (
              <label className="check-label terms-label">
                <input name="terms" required type="checkbox" />
                <span>I agree to the <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a>.</span>
              </label>
            )}

            <button className="submit-button" type="submit">
              {isRegistering ? 'Create account' : 'Log in'}
              <span aria-hidden="true">→</span>
            </button>

            <p
              aria-live={messageType === 'error' ? 'assertive' : 'polite'}
              className={message ? `form-message visible ${messageType}` : 'form-message'}
            >
              {message}
            </p>
          </form>

          <p className="switch-mode">
            {isRegistering ? 'Already have an account?' : 'New to DeraSathi?'}
            <button onClick={() => changeMode(isRegistering ? 'login' : 'register')} type="button">
              {isRegistering ? 'Log in' : 'Create an account'}
            </button>
          </p>
        </div>

        <p className="footer-note">By continuing, you agree to our <a href="#terms">Terms</a> and <a href="#privacy">Privacy Policy</a>.</p>
      </section>
    </main>
  )
}

function getRoute() {
  const hash = window.location.hash
  if (!hash.startsWith('#/')) return '/'
  return hash.slice(1).split('?')[0] || '/'
}

function App() {
  const [route, setRoute] = useState(getRoute)

  useEffect(() => {
    const updateRoute = () => setRoute(getRoute())
    window.addEventListener('hashchange', updateRoute)
    return () => window.removeEventListener('hashchange', updateRoute)
  }, [])

  function navigate(path) {
    window.location.hash = path
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (route === '/login') return <AuthPage key="login" initialMode="login" />
  if (route === '/register') return <AuthPage key="register" initialMode="register" />
  if (route === '/search') {
    return <AccommodationSearchPage onNavigate={navigate} />
  }

  const detailsMatch = route.match(/^\/accommodation\/([^/]+)$/)
  if (detailsMatch) {
    const property = accommodations.find((item) => item.id === detailsMatch[1])
    return <AccommodationDetailsPage property={property} onNavigate={navigate} />
  }

  return <HomePage onNavigate={navigate} />
}

export default App
