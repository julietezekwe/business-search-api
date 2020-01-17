import autoBind from 'auto-bind';
/**
   * Creates an instance of BusinessService.
   */
class BusinessService {
  private yelp: any;
  /**
   * Creates an instance of BusinessService.
   * @param {object} param
   * @memberof BusinessService
   */
  constructor({ yelp }) {
    this.yelp = yelp;
    autoBind(this);
  }

  /**
   * Retrieves top businesses and their details
   *@returns {object} - businesses
   */
  async retrieveTopBusinesses(points, category) {
    const businesses = await this.yelp.getCoffeeRestaurant(points, category)
   
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
  async retrieveAllBusinesse(points) {
    try {
      const topBusinesses = await this.yelp.getBussinesses(points);
      return topBusinesses;
    } catch (error) {
      throw error;
    }
  }

}
export default BusinessService;
