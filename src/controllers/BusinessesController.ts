/* eslint-disable no-useless-constructor */
import autoBind from 'auto-bind';
import axios from 'axios'

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
      const payload = {
          points: req.body.points
      }
    try {
      const topCoffeeShops = await this.businessService.retrieveTopBusinesses(payload, 'coffee');
      const topResturants = await this.businessService.retrieveTopBusinesses(payload, 'resturant');
      return res.status(200).json({topCoffeeShops, topResturants});
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

      const businessGroups = await this.businessService.retrieveAllBusinesse(req.body);
      return res.status(200).json({businessGroups});

    } catch (error) {
      return res.json(error);
    }
  }
}
export default BusinessesController;
