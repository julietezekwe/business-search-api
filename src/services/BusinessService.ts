import autoBind from 'auto-bind';
/**
   * Creates an instance of BusinessService.
   */
class BusinessService {
  redis: any;
  api_key: string;
  /**
   * Creates an instance of BusinessService.
   * @param {object} param
   * @memberof BusinessService
   */
  constructor({ api_key, redis }) {
    this.redis = redis;
    this.api_key = api_key;
    autoBind(this);
  }

  /**
   * Retrieves top businesses and their details
   *@returns {object} - businesses
   */
  async retrieveTopBusinesses() {
    try {
      return {}
    } catch (error) {
      throw error;
    }
  }


  /**
   * Retrieves all businesses in groups
   *@returns {object} - group in counts
   */
  async retrieveAllBusinesse() {
    try {
      return {};
    } catch (error) {
      throw error;
    }
  }
}
export default BusinessService;
