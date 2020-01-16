/* eslint-disable no-useless-constructor */
import autoBind from 'auto-bind';

/**
   * Creates an instance of BusinessesController.
   */
class BusinessesController {
    businessService: any
  /**
   * Creates an instance of BusinessesController.
   * @param {object} param
   * @memberof BusinessesController
   */
  constructor({ businessService }) {
    this.businessService = businessService;
    autoBind(this);
  }

  /**
   * Retrieves top three businesses within set proximity
   * @param {object} req
   * @param {object} res
   *@returns {object} - businesses
   */
  async getTopBusinesses(req: any, res: any) {
    try {
      const businesses = await this.businessService.retrieveTopBusinesses(req.location);
      return res.status(200).json(businesses);
    } catch (error) {
      return res.json(error);
    }
  }

  /**
   * Retrieves all businesses details in gropus
   * @param {object} req
   * @param {object} res
   *@returns {object} - count in groups
   */
  async getAllBusinessesGroups(req: any, res: any) {
    try {
      const businessGroups = await this.businessService.retrieveAllBusinesse();
      return res.status(200).json(businessGroups);
    } catch (error) {
      return res.json(error);
    }
  }
}
export default BusinessesController;
