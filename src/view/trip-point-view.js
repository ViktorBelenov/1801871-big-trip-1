import { createElement } from '../render.js';
import { getDateDiff } from '../utils.js';

import dayjs from 'dayjs';


const createTripPointTemplate = (point, offers, destination,) =>
  `         <li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${dayjs(new Date(point.date_from)).format('YYYY-MM-DD')}">${dayjs(new Date(point.date_from)).format('MMM DD')}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${point.type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${point.type} ${destination.name}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${point.date_from}">${dayjs(new Date(point.date_from)).format('HH:mm')}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${point.date_to}">${dayjs(new Date(point.date_to)).format('HH:mm')}</time>
                  </p>
                  <p class="event__duration">${getDateDiff(point.date_from, point.date_to)}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${point.base_price}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                ${ offers.filter((offer)=> point.offers.includes(offer.id)).map((offer) => `<li class="event__offer">
                  <span class="event__offer-title">${offer.title}</span>
                  &plus;&euro;&nbsp;
                  <span class="event__offer-price">${offer.price}</span>
                </li>`).join('')}
                </ul>
                <button class="event__favorite-btn  ${point.is_favorite ? 'event__favorite-btn--active' : ''}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>
  `;

export default class TripPointView {
  constructor (
    {point, offers, destination}
  ) {
    this.point = point;
    this.offers = offers;
    this.destinaion = destination;
  }

  getTemplate() {
    return createTripPointTemplate(this.point, this.offers[this.point.type], this.destinaion);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}