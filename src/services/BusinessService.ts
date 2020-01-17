import autoBind from 'auto-bind';
import { get, isEmpty } from 'lodash';
import axios from 'axios';
/**
   * Creates an instance of BusinessService.
   */
class BusinessService {
  redis: any;
  yelp: any;
  /**
   * Creates an instance of BusinessService.
   * @param {object} param
   * @memberof BusinessService
   */
  constructor({ yelp, config }) {
    this.yelp = yelp;
    autoBind(this);
  }

  /**
   * Retrieves top businesses and their details
   *@returns {object} - businesses
   */
  async retrieveTopBusinesses(body, category) {
    const businesses = await this.yelp.getCoffeeRestaurant(body, category)
   
    try {
      return {...businesses}
    } catch (error) {
      throw error;
    }
  }


  /**
   * Retrieves all businesses in groups
   *@returns {object} - group in counts
   */
  async retrieveAllBusinesse(body) {
    try {
      const topBusinesses = await this.yelp.getBussinesses(body.points);
      return topBusinesses;
    } catch (error) {
      throw error;
    }
  }

}
export default BusinessService;
