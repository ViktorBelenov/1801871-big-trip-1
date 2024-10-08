import { mockOffers } from '../mock/mock-offers';

export default class OffersModel {
  #offers = mockOffers;

  get offers () {
    const convertedOffers = {};
    this.#offers.forEach((offer)=>{
      convertedOffers[offer.type] = offer.offers;

    });
    return convertedOffers;
  }
}

