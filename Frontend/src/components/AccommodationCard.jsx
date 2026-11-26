import { useState } from 'react'
import Icon from './Icon.jsx'

export default function AccommodationCard({ accommodation, onNavigate }) {
  const [isSaved, setIsSaved] = useState(false)

  return (
    <article className="listing-card">
      <div className="listing-image-wrap">
        <img
          alt={accommodation.imageAlt}
          className="listing-image"
          loading="lazy"
          src={accommodation.image}
        />
        <span className="listing-sample-label">Sample listing</span>
        <button
          aria-label={isSaved ? `Remove ${accommodation.name} from favourites` : `Save ${accommodation.name} to favourites`}
          aria-pressed={isSaved}
          className={`listing-favorite${isSaved ? ' is-saved' : ''}`}
          onClick={() => setIsSaved((saved) => !saved)}
          type="button"
        >
          <Icon name="heart" size={19} />
        </button>
      </div>

      <div className="listing-card-body">
        <div className="listing-card-heading">
          <div>
            <h3>{accommodation.name}</h3>
            <p className="listing-location">
              <Icon name="pin" size={15} />
              {accommodation.area}, {accommodation.city}
            </p>
          </div>
        </div>

        <div className="listing-price-row">
          <p className="listing-price">
            NPR {accommodation.rent.toLocaleString('en-IN')}
            <span> / month</span>
          </p>
          <span className="listing-room-type">{accommodation.roomType}</span>
        </div>

        <p className="listing-distance">
          <Icon name="graduation" size={16} />
          {accommodation.distanceNote}
        </p>

        <div className="listing-amenities" aria-label="Example facilities">
          {accommodation.amenities.map((amenity) => (
            <span key={amenity}>{amenity}</span>
          ))}
        </div>

        <button
          className="listing-details-button"
          onClick={() => onNavigate(`/accommodation/${accommodation.id}`)}
          type="button"
        >
          View details <Icon name="chevron" size={17} />
        </button>
      </div>
    </article>
  )
}
