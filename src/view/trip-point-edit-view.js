import { formatDate } from '../utils.js';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';


const createOffesTemplate = (point, offers) =>
  `
  ${offers[point.type].map((offer) =>
    `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.title}-1" type="checkbox" name="event-offer-${offer.title}" data-offer-id="${offer.id}"
           ${point.offers.includes(offer.id) ? 'checked' : ''}>
        <label class="event__offer-label" for="event-offer-${offer.title}-1">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`).join('')}
`;

const createGaleryTemplate = (destinaion) =>
  `<div class="event__photos-container">
    <div class="event__photos-tape">
    ${destinaion.pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">
      `).join('')}
    </div>
  </div>


`;


const createTripEditTemplate = ({point, offers, destinations, isNewPoint}) =>
  `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${point.type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>

              <div class="event__type-item">
                <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
                <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
              </div>
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
          ${point.type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinations[point.destination].name}" list="destination-list-1">
          <datalist id="destination-list-1">
          ${Object.values(destinations).map((destinaion)=>`<option value="${destinaion.name}" '></option>`
  ).join('')}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatDate(point.date_from,'DD/MM/YY HH:mm')}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatDate(point.date_to,'DD/MM/YY HH:mm')}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${point.base_price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${createOffesTemplate(point, offers)}
        </div>

        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${destinations[point.destination].description}</p>
          ${isNewPoint ? createGaleryTemplate(destinations[point.destination]) : ''}
        </section>
      </section>
    </form>
  </li>
  `;

export default class TripPointEditView extends AbstractStatefulView {

  #onCloseClick = null;
  #onSubmitPoint = null;

  #point = null;

  #dateFromFaltpicker = null;
  #dateToFaltpicker = null;

  constructor (
    {point, offers, destinations, onCloseClick, onSubmitPoint, isNewPoint = false}
  ) {
    super();
    this.#point = point;


    this.#onCloseClick = onCloseClick;
    this.#onSubmitPoint = onSubmitPoint;

    this._setState(TripPointEditView.convertDataToState(point, offers, destinations, isNewPoint));

    this._restoreHandlers();
  }

  #setDatePickers() {
    this.#dateFromFaltpicker = flatpickr(this.element.querySelector('#event-start-time-1'), {
      enableTime: true,
      dateFormat: 'd/m/y H:i',
      altFormat: 'Y-m-d',
      defaultDate: this._state.point.date_from,
      maxDate: this._state.point.date_to,
      onClose: this.#updateSelecteDataFromInState
    });
    this.#dateToFaltpicker = flatpickr(this.element.querySelector('#event-end-time-1'), {
      enableTime: true,
      dateFormat: 'd/m/y H:i',
      altFormat: 'Y-m-d',
      defaultDate: this._state.point.date_to,
      minDate: this._state.point.date_from,
      onClose: this.#updateSelecteDataToInState
    });

  }

  #updateSelecteDataToInState = ([date]) => {
    const updateDate = new Date(date).toISOString();
    this._setState({
      point: {
        ...this._state.point,
        // eslint-disable-next-line camelcase
        date_to:updateDate
      }
    });
    this.updateElement(this._state);
  };

  #updateSelecteDataFromInState = ([date]) => {
    const updateDate = new Date(date).toISOString();
    this._setState({
      point: {
        ...this._state.point,
        // eslint-disable-next-line camelcase
        date_from:updateDate
      }
    });
    this.updateElement(this._state);
  };


  removeElement() {
    super.removeElement();

    if (this.#dateToFaltpicker) {
      this.#dateToFaltpicker.destroy();
      this.#dateToFaltpicker = null;
    }

    if (this.#dateFromFaltpicker) {
      this.#dateFromFaltpicker.destroy();
      this.#dateFromFaltpicker = null;
    }
  }

  static convertDataToState = (point, offers, destinations, isNewPoint) => ({
    point: {
      id:point[0],
      ...point[1]
    },
    offers: {
      ...offers
    },
    destinations: {
      ...destinations
    },
    isNewPoint: isNewPoint
  });

  static convertStateToDate = (state) => {
    const point = state.point;
    const id = point.id;
    delete point.id;
    return [id, point];
  };

  #clickHandler = () => {
    this.#onCloseClick(this.#point);
  };

  #submitHandler = (evt) => {
    evt.preventDefault();
    this.#updateSelectedOffersInState();
    this.#onSubmitPoint(TripPointEditView.convertStateToDate(this._state));
  };

  #updateSelectedOffersInState = () => {
    const offers = [];
    this.element.querySelectorAll('.event__offer-checkbox:checked').forEach((offer)=>offers.push(offer.dataset.offerId));
    this._setState({
      point: {
        ...this._state.point,
        offers: offers

      }
    });
  };

  #onDestinationChange = (evt) => {
    const destinationId = Object.entries(this._state.destinations).find((destinaion)=>destinaion[1].name === evt.target.value)[0];
    this._setState({
      point: {
        ...this._state.point,
        destination:destinationId

      }
    });
    this.updateElement(this._state);
  };

  #onTypeChange = (evt) => {
    this._setState({
      point: {
        ...this._state.point,
        offers:'',
        type:evt.target.value
      }
    });
    this.updateElement(this._state);
  };

  _restoreHandlers() {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickHandler);
    this.element.querySelector('.event--edit').addEventListener('submit', this.#submitHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#onDestinationChange);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#onTypeChange);
    this.#setDatePickers();
  }

  get template() {
    return createTripEditTemplate(this._state);

  }

}
