import Icon from '../components/Icon.jsx'
import SiteHeader from '../components/SiteHeader.jsx'
import './HomePage.css'

export default function AccommodationDetailsPage({ property, onNavigate }) {
  if (!property) {
    return (
      <div className="home-page">
        <SiteHeader />
        <main className="home-section missing-listing">
          <span className="home-eyebrow">ACCOMMODATION DETAILS</span>
          <h1>We couldn't find that listing.</h1>
          <p>It may have been removed or the address may be incorrect.</p>
          <button className="home-primary-button" onClick={() => onNavigate('/search')} type="button">
            Browse example listings
          </button>
        </main>
      </div>
    )
  }

  return (
    <div className="home-page">
      <SiteHeader />
      <main className="detail-page-main home-section">
        <button className="back-home-link detail-back-button" onClick={() => onNavigate('/search')} type="button">
          ← Back to listings
        </button>
        <div className="detail-layout">
          <div className="detail-image-wrap">
            <img alt={property.imageAlt} src={property.image} />
            <span className="listing-sample-label">Sample listing</span>
          </div>
          <div className="detail-content">
            <span className="home-eyebrow">ACCOMMODATION EXAMPLE</span>
            <h1>{property.name}</h1>
            <p className="detail-location"><Icon name="pin" size={18} /> {property.area}, {property.city}</p>
            <p className="detail-price">NPR {property.rent.toLocaleString('en-IN')} <span>/ month (sample)</span></p>

            <div className="detail-info-grid">
              <div><span>Room type</span><strong>{property.roomType}</strong></div>
              <div><span>Example campus area</span><strong>{property.nearbyCampus}</strong></div>
              <div><span>Campus distance</span><strong>To be confirmed with owner</strong></div>
              <div><span>Availability</span><strong>Not provided</strong></div>
            </div>

            <h2>Example facilities</h2>
            <div className="detail-amenities">
              {property.amenities.map((amenity) => (
                <span key={amenity}><Icon name="check" size={15} /> {amenity}</span>
              ))}
            </div>

            <div className="detail-contact-notice">
              <Icon name="shield" size={20} />
              <p>Owner contact details will be available after a real listing is submitted and approved. This sample listing is not live.</p>
            </div>
            <button className="home-primary-button" onClick={() => onNavigate('/search')} type="button">
              Explore more example rooms <Icon name="chevron" size={17} />
            </button>
          </div>
        </div>
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
