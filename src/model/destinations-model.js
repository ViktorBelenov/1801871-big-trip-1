import Observable from '../framework/observable';
import { UpdateType } from '../const';

export default class DestinationsModel extends Observable {
  #destinationsApiService = null;
  #convertedDestinations = {};
  #isReady = false;

  constructor({
    destinationsApiService,
  }) {
    super();
    this.#destinationsApiService = destinationsApiService;
  }

  getDestinations () {
    return this.#convertedDestinations;
  }

  async init () {
    try {
      const destinations = await this.#destinationsApiService.destinations;
      destinations.forEach((destination)=>{
        this.#convertedDestinations[destination.id] = {
          'description': destination.description,
          'name': destination.name,
          'pictures': destination.pictures
        };
      });
      this.#isReady = true;
      this._notify('', UpdateType.INIT);

    } catch(err){
      throw new Error('Can\'t download destinations');
    }

  }

  isReady() {
    return this.#isReady;
  }
}
