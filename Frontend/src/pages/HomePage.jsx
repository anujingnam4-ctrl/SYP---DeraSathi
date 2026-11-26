import { useEffect } from 'react'
import AccommodationCard from '../components/AccommodationCard.jsx'
import Icon from '../components/Icon.jsx'
import SiteHeader from '../components/SiteHeader.jsx'
import { accommodations, campusAreas } from '../data/accommodations.js'
import './HomePage.css'

const steps = [
  {
    icon: 'search',
    number: '01',
    title: 'Search for a place',
    description: 'Choose a campus area and budget to start exploring accommodation examples.',
  },
  {
    icon: 'building',
    number: '02',
    title: 'Compare the details',
    description: 'Review room types, example rent, facilities, and the details to confirm.',
  },
  {
    icon: 'people',
    number: '03',
    title: 'Connect with an owner',
    description: 'Once a listing is reviewed, use its owner contact details to ask questions.',
  },
]

const benefits = [
  {
    icon: 'shield',
    title: 'Owner verification process',
    description: 'Property owners submit an application for admin review before publishing.',
  },
  {
    icon: 'wallet',
    title: 'Student-minded budgets',
    description: 'Compare example monthly rents and choose a budget that works for you.',
  },
  {
    icon: 'pin',
    title: 'Search around campuses',
    description: 'Browse locations by college area and check the distance with the owner.',
  },
  {
    icon: 'check',
    title: 'Clear listing information',
    description: 'See room type, facilities, rent, and which details still need confirmation.',
  },
  {
    icon: 'building',
    title: 'Compare in one place',
    description: 'Review example rooms and key details side by side before you enquire.',
  },
  {
    icon: 'people',
    title: 'Convenient enquiries',
    description: 'Contact options can be provided on listings after owners are verified.',
  },
]

function SearchForm({ onNavigate }) {
  function submitSearch(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const params = new URLSearchParams()
    const query = formData.get('query')?.toString().trim()
    const budget = formData.get('budget')?.toString()

    if (query) params.set('query', query)
    if (budget) params.set('budget', budget)

    const searchPath = `/search${params.size ? `?${params.toString()}` : ''}`
    onNavigate(searchPath)
  }

  return (
    <form className="hero-search" onSubmit={submitSearch}>
      <label className="hero-search-location">
        <span className="hero-search-icon"><Icon name="pin" size={19} /></span>
        <span className="hero-search-field">
          <span>College, university or area</span>
          <input
            autoComplete="off"
            name="query"
            placeholder="e.g. Kirtipur, Kathmandu"
          />
        </span>
      </label>

      <label className="hero-search-budget">
        <span className="hero-search-field">
          <span>Monthly budget</span>
          <select defaultValue="" name="budget">
            <option value="">Any budget</option>
            <option value="8000">Up to NPR 8,000</option>
            <option value="12000">Up to NPR 12,000</option>
            <option value="16000">Up to NPR 16,000</option>
          </select>
        </span>
      </label>

      <button className="hero-search-button" type="submit">
        <Icon name="search" size={18} />
        <span>Search accommodation</span>
      </button>
    </form>
  )
}

function HomePage({ onNavigate }) {
  useEffect(() => {
    const sectionId = window.location.hash.slice(1)
    if (!sectionId || sectionId.startsWith('/')) return

    requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView()
    })
  }, [])

  return (
    <div className="home-page">
      <SiteHeader />

      <main>
        <section className="home-hero">
          <div className="home-hero-inner">
            <div className="home-hero-copy">
              <span className="home-eyebrow"><Icon name="sparkle" size={16} /> MADE FOR STUDENT LIVING</span>
              <h1>Find a Place to <span>Feel at Home.</span></h1>
              <p className="home-hero-description">
                Discover affordable and comfortable student accommodation near your college or university.
              </p>

              <SearchForm onNavigate={onNavigate} />

              <div className="home-trust-row">
                <span><Icon name="shield" size={16} /> Owner checks before publishing</span>
                <span><Icon name="bed" size={17} /> Student-friendly search</span>
              </div>
            </div>

            <div className="home-hero-image-wrap">
              <img
                alt="Bright, comfortable apartment living space"
                className="home-hero-image"
                fetchPriority="high"
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=90"
              />
              <div className="hero-image-note">
                <span className="hero-note-icon"><Icon name="pin" size={18} /></span>
                <span><strong>Find your study spot</strong><small>Explore example campus areas</small></span>
              </div>
              <span className="hero-image-accent" aria-hidden="true" />
            </div>
          </div>
          <div className="home-hero-bottom" aria-hidden="true" />
        </section>

        <section className="home-section featured-section" id="featured">
          <div className="home-section-heading">
            <div>
              <span className="home-eyebrow">A PLACE FOR EVERY STUDENT</span>
              <h2>Explore Student Accommodation</h2>
              <p>Browse sample rooms in Kathmandu and compare the details that matter.</p>
            </div>
            <button
              className="home-text-link"
              onClick={() => onNavigate('/search')}
              type="button"
            >
              Explore all rooms <Icon name="chevron" size={17} />
            </button>
          </div>

          <div className="listing-grid">
            {accommodations.map((accommodation) => (
              <AccommodationCard
                accommodation={accommodation}
                key={accommodation.id}
                onNavigate={onNavigate}
              />
            ))}
          </div>
          <p className="sample-data-note">
            These are illustrative sample listings, not live availability. Confirm rent, facilities, and campus distance with the property owner.
          </p>
        </section>

        <section className="steps-section" id="how-it-works">
          <div className="home-section home-section-heading centered-heading">
            <div>
              <span className="home-eyebrow">SIMPLE FROM THE START</span>
              <h2>How DeraSathi Works</h2>
              <p>Three clear steps to help you find a place that feels right.</p>
            </div>
          </div>
          <div className="home-section steps-grid">
            {steps.map((step) => (
              <article className="step-card" key={step.number}>
                <div className="step-card-top">
                  <span className="step-icon"><Icon name={step.icon} size={23} /></span>
                  <span className="step-number">{step.number}</span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="home-section benefits-section" id="about-us">
          <div className="home-section-heading">
            <div>
              <span className="home-eyebrow">A BETTER WAY TO FIND A ROOM</span>
              <h2>Why Choose DeraSathi?</h2>
              <p>Useful information and student-first tools, with clear checks at every step.</p>
            </div>
          </div>
          <div className="benefits-grid">
            {benefits.map((benefit) => (
              <article className="benefit-item" key={benefit.title}>
                <span className="benefit-icon"><Icon name={benefit.icon} size={21} /></span>
                <div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="campus-section" id="campuses">
          <div className="home-section">
            <div className="home-section-heading">
              <div>
                <span className="home-eyebrow">CLOSE TO CAMPUS LIFE</span>
                <h2>Explore Popular Campus Areas</h2>
                <p>Example locations to help you begin your search around Nepal.</p>
              </div>
            </div>
            <div className="campus-grid">
              {campusAreas.map((campus) => {
                const sampleListings = accommodations.filter((accommodation) =>
                  `${accommodation.area} ${accommodation.nearbyCampus}`
                    .toLowerCase()
                    .includes(campus.searchTerm.toLowerCase()),
                )

                return (
                  <article className="campus-card" key={campus.name}>
                    <img alt={campus.imageAlt} loading="lazy" src={campus.image} />
                    <div className="campus-card-content">
                      <span className="campus-card-location"><Icon name="pin" size={14} /> {campus.location}</span>
                      <h3>{campus.name}</h3>
                      <p>{campus.description}</p>
                      <p className="campus-sample-options">
                        Sample options:{' '}
                        {sampleListings.length
                          ? sampleListings.map((item) => `${item.name} (${item.roomType}, NPR ${item.rent.toLocaleString('en-IN')}/month)`).join(', ')
                          : 'None in this demo data yet.'}
                      </p>
                      <button
                        className="campus-search-link"
                        onClick={() => onNavigate(`/search?query=${encodeURIComponent(campus.searchTerm)}`)}
                        type="button"
                      >
                        Explore this area <Icon name="arrow" size={16} />
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>
            <p className="sample-data-note">
              Campus areas are examples only. DeraSathi does not currently have verified live listings or confirmed distance information.
            </p>
          </div>
        </section>

        <section className="owner-section" id="property-owners">
          <div className="owner-section-inner">
            <div className="owner-icon"><Icon name="building" size={24} /></div>
            <div className="owner-copy">
              <span className="home-eyebrow">FOR PROPERTY OWNERS</span>
              <h2>Have a Property for Students?</h2>
              <p>List your property on DeraSathi and connect with students looking for accommodation.</p>
              <small>Property owners must submit an application for admin verification before publishing listings.</small>
            </div>
            <a className="owner-cta" href="#/register">
              Become a Property Owner <Icon name="arrow" size={17} />
            </a>
          </div>
        </section>
      </main>

      <footer className="home-footer" id="contact">
        <div className="home-footer-main">
          <div className="footer-brand-column">
            <a aria-label="DeraSathi home" className="home-brand footer-brand" href="#/">
              <span className="home-brand-mark" aria-hidden="true">⌂</span>
              <span>Dera<span>Sathi</span></span>
            </a>
            <p>Helping students find a comfortable place to call home while they study.</p>
          </div>

          <div className="footer-link-column">
            <h3>Quick links</h3>
            <a href="#featured">Find accommodation</a>
            <a href="#how-it-works">How it works</a>
            <a href="#about-us">About us</a>
            <a href="#campuses">Campus areas</a>
          </div>

          <div className="footer-link-column">
            <h3>For students</h3>
            <a href="#/search">Search rooms</a>
            <a href="#/login">Log in</a>
            <a href="#/register">Create account</a>
          </div>

          <div className="footer-link-column">
            <h3>For property owners</h3>
            <a href="#property-owners">List a property</a>
            <a href="#property-owners">Verification process</a>
            <h3 className="footer-contact-title">Contact</h3>
            <span><Icon name="mail" size={15} /> Contact details coming soon</span>
          </div>
        </div>

        <div className="home-footer-bottom">
          <p>© DeraSathi. Student accommodation finder project.</p>
          <div><a href="#privacy">Privacy Policy</a><a href="#terms">Terms and Conditions</a></div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
