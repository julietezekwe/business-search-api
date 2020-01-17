import axios from 'axios';
import autoBind from 'auto-bind';
import { get } from 'lodash';

class YelpClient {
  yelp_api_key: any;
  yelp_base_url: any;
  web_client: any;
  radius: number;
  request: any;

  constructor({ config }) {
    this.yelp_api_key = config.api_key;
    this.yelp_base_url = config.base_url;
    this.web_client = axios;
    this.radius = config.radius;
    this.request = axios.create({
        baseURL:  this.yelp_api_key,
        headers: {
          'AUTHORIZATION': `Bearer ${this.yelp_api_key}`
        },
      });
      autoBind(this);
  }

  /**
   * Retrieves top businesses and their details
   * @param {object} params
   *@returns {object} - query data
   */
  async _query (params) {
    try {
      return await this.request.get(`${this.yelp_base_url}?${params}`);;
    } catch (error) {
      // handle query error
      // console.log(error)
      console.log({
        error: error.response.statusText,
        data: error.response.data
      });     
    }
  }

  async getCoffeeRestaurant(body, category) {

    const query = `latitude=${get(body, 'points.latitude', 0)}&longitude=${get(body, 'points.longitude', 0)}&radius=${this.radius}&categories=${category}&limit=3&sort_by=rating`;
    const businesses = await this._query(query);

    const payload =get(businesses, 'data.businesses', []).map(async data => {
        const { coordinates } = data;

        let myDistance: any = await this.calculateDistance([body.points, coordinates]);
        myDistance =  myDistance.toFixed(1);
        let distance = (data.distance  / 1000).toFixed(1);
        distance = myDistance === distance ? distance+ 'km' : distance + 'km !'
        let payload = {
            name: data.name + ' ' + distance,
            image_url: data.image_url,
            rating: data.rating,
            categories: data.categories,
        }
        return payload
    })
    return(Promise.all(payload))
  }

  /**
   * Retrieves top businesses and their details
   * @param {object} location
   *@returns {object} - businesses
   */
  async getBussinesses({longitude, latitude}) {
    const MAX_BUSINESS_PER_PAGE = 50;
    let page = 0;
    let done = false;
    let report = {};
    const queryString = `longitude=${longitude}&latitude=${latitude}&radius=${this.radius}&limit=${MAX_BUSINESS_PER_PAGE}&sort_by=rating`;
    
    const _classifyBusinesses = (data, report) => {

      console.log({start: data[0].rating, end: data[data.length - 1].rating});

      return data.reduce((acc, business) => {
        let rating = get(business, 'rating', '');
        switch (true) {
          case rating >= 4.5:
            acc['45'] ? acc['45']++ : acc['45'] = 1;
            break;
          case rating >= 3.5:
            acc['34'] ? acc['34']++ : acc['34'] = 1;
            break;
          case rating >= 2.5:
            acc['23'] ? acc['23']++ : acc['23'] = 1;
            break;
          case rating >= 1.5:
            acc['12'] ? acc['12']++ : acc['12'] = 1;
            break;
          default:
            acc['01'] ? acc['01']++ : acc['01'] = 1;                  
        }
  
        return acc;
      }, report);
    }

    try {
      while(!done) { 
        const batch = await this._query(queryString + `&offset=${page}`);
        if (batch.error) throw new Error(batch.error);
        if(page >= 200/*page * MAX_BUSINESS_PER_PAGE >= data.total*/) done = true;
        page++;
        report = {...report, ..._classifyBusinesses(batch.data.businesses, report)};
        
        console.log({page, total: batch.data.total, report});
      }
    } catch (error) {
      // Handle fetch error
      console.log({ error })
    }
    
    return report;
  }

    
  /**
   * calculates distance between points
   *@returns {Number} - distance
   */
  async calculateDistance(points: Array<object>) {
    try {
      const point1 = points[0];
      const point2: object = points[1];
  
  
        const Radius = 6371;
        const dLat = await this._deg2rad(get(point2, 'latitude') - get(point1, 'latitude'));
        const dLon = await this._deg2rad(get(point2, 'longitude') - get(point1, 'longitude')); 
        const a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(await this._deg2rad(get(point1, 'latitude'))) * Math.cos(await this._deg2rad(get(point2, 'latitude'))) * 
          Math.sin(dLon/2) * Math.sin(dLon/2)
          ; 
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        const distance = Radius * c; // Distance in km
        return distance;
    } catch (error) {
      throw error;
    }
  }

    
   /**
   * conver degree to radian
   *@returns {Number} - distance
   */
  async _deg2rad(deg) {
    return deg * (Math.PI/180)
  }
}

export default YelpClient;
