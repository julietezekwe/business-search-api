import autoBind from 'auto-bind';
/**
   * Creates an instance of BusinessService.
   */
class BusinessService {
  private yelp: any;
  private redis: any;
  /**
   * Creates an instance of BusinessService.
   * @param {object} param
   * @memberof BusinessService
   */
  constructor({ yelp, redis }) {
    this.yelp = yelp;
    this.redis = redis;
    autoBind(this);
  }

  /**
   * Retrieves top businesses and their details
   *@returns {object} - businesses
   */
  async retrieveTopBusinesses(points, category) {
    let businesses;
    businesses = await this.redis.getObject(category, `${points.longitude}_${points.latitude}`);
    if (businesses && Object.entries(businesses).length > 0) {
      return businesses;
    }
    businesses = await this.yelp.getCoffeeRestaurant(points, category);
    await this.redis.setObject(category, `${points.longitude}_${points.latitude}`, businesses, 604800);
   
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
      let topBusinesses;
      topBusinesses = await this.redis.getObject('topBusinesses', `${points.longitude}_${points.latitude}`);
      if (topBusinesses && Object.entries(topBusinesses).length > 0) {
        return topBusinesses;
      }
      topBusinesses = await this.yelp.getBussinesses(points);
      await this.redis.setObject('topBusinesses', `${points.longitude}_${points.latitude}`, topBusinesses, 604800);

      return topBusinesses;
    } catch (error) {
      throw error;
    }
  }

}
export default BusinessService;
