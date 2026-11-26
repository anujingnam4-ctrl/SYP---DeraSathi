import { useMemo, useState } from 'react'
import AccommodationCard from '../components/AccommodationCard.jsx'
import Icon from '../components/Icon.jsx'
import SiteHeader from '../components/SiteHeader.jsx'
import { accommodations } from '../data/accommodations.js'
import './HomePage.css'

function getInitialFilters() {
  const search = window.location.hash.split('?')[1] || ''
  const params = new URLSearchParams(search)
  return {
    query: params.get('query') || '',
    budget: params.get('budget') || '',
  }
}

export default function AccommodationSearchPage({ onNavigate }) {
  const [initialFilters] = useState(getInitialFilters)
  const [query, setQuery] = useState(initialFilters.query)
  const [budget, setBudget] = useState(initialFilters.budget)

  const results = useMemo(() => {
    const searchTerm = query.trim().toLowerCase()
    const maxBudget = Number(budget)

    return accommodations.filter((accommodation) => {
      const searchableText = [
        accommodation.name,
        accommodation.area,
        accommodation.city,
        accommodation.roomType,
        accommodation.nearbyCampus,
      ].join(' ').toLowerCase()
      const matchesQuery = !searchTerm || searchableText.includes(searchTerm)
      const matchesBudget = !maxBudget || accommodation.rent <= maxBudget
      return matchesQuery && matchesBudget
    })
  }, [budget, query])

  return (
    <div className="home-page">
      <SiteHeader />
      <main className="search-page-main">
        <section className="search-page-heading">
          <div className="home-section">
            <a className="back-home-link" href="#/">← Back to home</a>
            <span className="home-eyebrow">FIND A PLACE NEAR YOUR CAMPUS</span>
            <h1>Explore accommodation</h1>
            <p>Filter example listings by location and monthly budget.</p>

            <form className="results-filters" onSubmit={(event) => event.preventDefault()}>
              <label className="results-query-field">
                <Icon name="search" size={19} />
                <span className="sr-only">College, university or area</span>
                <input
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="College, university or area"
                  value={query}
                />
              </label>
              <label className="results-budget-field">
                <span className="sr-only">Maximum monthly rent</span>
                <select onChange={(event) => setBudget(event.target.value)} value={budget}>
                  <option value="">Any budget</option>
                  <option value="8000">Up to NPR 8,000</option>
                  <option value="12000">Up to NPR 12,000</option>
                  <option value="16000">Up to NPR 16,000</option>
                </select>
              </label>
              <button className="results-search-button" type="submit">
                <Icon name="search" size={17} /> Search
              </button>
            </form>
          </div>
        </section>

        <section className="home-section search-results-section">
          <div className="results-title-row">
            <div>
              <h2>{results.length} example {results.length === 1 ? 'listing' : 'listings'}</h2>
              <p>All listings are sample data; details and availability are not verified.</p>
            </div>
            <span className="demo-listing-key"><span /> Sample listing</span>
          </div>

          {results.length ? (
            <div className="listing-grid">
              {results.map((accommodation) => (
                <AccommodationCard
                  accommodation={accommodation}
                  key={accommodation.id}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          ) : (
            <div className="empty-search-state">
              <span><Icon name="search" size={25} /></span>
              <h3>No matching sample listings</h3>
              <p>Try a different area or increase your monthly budget.</p>
              <button
                className="empty-search-reset"
                onClick={() => {
                  setQuery('')
                  setBudget('')
                }}
                type="button"
              >
                Clear filters
              </button>
            </div>
          )}

          <p className="sample-data-note">
            DeraSathi is a student accommodation finder project. Confirm rent, facilities, owner details, availability, and campus distance directly before making any decisions.
          </p>
        </section>
      </main>
      <footer className="search-page-footer">
        <a className="home-brand" href="#/">
          <span className="home-brand-mark" aria-hidden="true">⌂</span>
          <span>Dera<span>Sathi</span></span>
        </a>
        <a href="#contact">Contact</a>
      </footer>
    </div>
  )
}
