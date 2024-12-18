import Observable from '../framework/observable';
import { FilterType } from '../const';

export default class FilterModel extends Observable {
  #filter = FilterType.EVERYTHING;

  getFilter () {
    return this.#filter;
  }

  setFilter (filter, updateType) {
    this.#filter = filter;
    this._notify(filter, updateType);
  }

  reset () {
    this.#filter = FilterType.EVERYTHING;
  }

}
