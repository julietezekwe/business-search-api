import axios from 'axios';
import autoBind from 'auto-bind';
import { get } from 'lodash';
import { delay } from 'bluebird';

interface Points{
  latitude: number;
  longitude: number,
}

interface GroupInterface{
  '45': number,
  '34': number,
  '23': number,
  '12': number,
  '01': number
}

interface YelpClientInterface{
  getCoffeeRestaurant(points: Points, category: string): Promise<any>;
  getBussinesses(points: Points): Promise<Array<string>>;
}
class YelpClient implements YelpClientInterface{
  private yelp_api_key: any;
  private yelp_base_url: any;
  private radius: number;
  private request: any;

  constructor({ config }) {
    this.yelp_api_key = config.yelpClient.api_key;
    this.yelp_base_url = config.yelpClient.base_url;
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
   * conver degree to radian
   *@returns {Number} - distance
   */
  private deg2rad(deg: number): number {
    return deg * (Math.PI/180)
  }

  /**
   * Query helper 
   * @param {object} params
   *@returns {object} - query data
   */
 private async query (queryString: string): Promise<any> {
    
    try {
      const businesses: any = await this.request.get(`${this.yelp_base_url}?${queryString}`);
      return businesses.data;
    } catch (error) {
      console.error({
        error: error.response.statusText,
        data: error.response.data
      });     
    }
  }
 
  /**
   * Retrieves top businesses and their details
   * @param {object} params
   *@returns {object} - query data
   */

  private getGroupBusinesses (businessGroups: any): GroupInterface {
    const groups: GroupInterface = {
      '45': 0,
      '34': 0,
      '23': 0,
      '12': 0,
      '01': 0,
    }
    try {
     businessGroups.forEach(businessGroup => {
    
        let len: number = businessGroup.businesses.length - 1;

        if(businessGroup.businesses[len].rating > 4.0){
          groups['45'] += businessGroup.businesses.length;
        } else if(businessGroup.businesses[0].rating <= 4.0 && businessGroup.businesses[len].rating > 3.0) {
          groups['34'] += businessGroup.businesses.length;
        }
        else if(businessGroup.businesses[0].rating <= 3.0 && businessGroup.businesses[len].rating > 2.0) {
          groups['23'] += businessGroup.businesses.length;
        }
        else if(businessGroup.businesses[0].rating <= 2.0 && businessGroup.businesses[len].rating > 1.0) {
          groups['12'] += businessGroup.businesses.length;
        }
        else if(businessGroup.businesses[0].rating <= 1.0) {
          groups['01'] += businessGroup.businesses.length;
        }
        else {
          businessGroup.businesses.forEach(business =>{
           if(business.rating > 4.0) groups['45'] ++;
           else if(business.rating > 3.0) groups['34'] ++;
           else if(business.rating > 2.0) groups['23'] ++;
           else if(business.rating > 1.0) groups['12'] ++;
           else  groups['01'] ++;
        })
      }
      })
      
      return groups;
    } catch (error) {
      console.error({
        error: error.response.statusText,
        data: error.response.data
      });     
    }
  }

 /**
   * calculates distance between points
   *@returns {Number} - distance
   */
 private async calculateDistance(points: Array<Points>) {
  try {
    const point1: Points = points[0];
    const point2: Points = points[1];
      const Radius: number = 6371;
      const dLat = this.deg2rad(get(point2, 'latitude') - get(point1, 'latitude'));
      const dLon = this.deg2rad(get(point2, 'longitude') - get(point1, 'longitude')); 
      const lat1 = this.deg2rad(get(point1, 'latitude'));
      const lat2 = this.deg2rad(get(point2, 'latitude'));
      const a = 
        Math.pow(Math.sin(dLat/2), 2) +
        Math.pow(Math.sin(dLon/2), 2) *
        Math.cos(lat1) * Math.cos(lat2);

      const distance = 2 * Radius * Math.asin(Math.sqrt(a)); 
      return distance;
  } catch (error) {
    console.error({
      error: error.response.statusText,
      data: error.response.data
    }); 
  }
}
  /**
   * Retrieves top businesses and their details
   * @param {object} params
   *@returns {object} - query data
   */

  async getCoffeeRestaurant(points: Points, category: string) {
    try {
    
          const query: string = `latitude=${get(points, 'latitude', 0)}&longitude=${get(points, 'longitude', 0)}&radius=${this.radius}&categories=${category}&limit=3&sort_by=rating`;
          const businesses: any = await this.query(query);
      
          const payload: any =get(businesses, 'businesses', []).map(async data => {
              const { coordinates } = data;
      
              let myDistance: any = await this.calculateDistance([points, coordinates]);
              myDistance =  myDistance.toFixed(1);
              let distance: any = (data.distance  / 1000).toFixed(1);
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
      
    } catch (error) {
      console.error({
        error: error.response.statusText,
        data: error.response.data
      });  
    }
  }

  /**
   * Retrieves top businesses and their details
   * @param {object} location
   *@returns {object} - businesses
   */
  async getBussinesses(points: Points){
   try {
    const {longitude, latitude } = points;
    const MAX_BUSINESS_PER_PAGE: number = 50;
    const result = [];
    const queryString = (offset = 0) => `longitude=${longitude}&latitude=${latitude}&radius=${this.radius}&limit=${MAX_BUSINESS_PER_PAGE}&sort_by=rating&offset=${offset}`;
    const data = await this.query(queryString());
    result.push(data);
    const { total } = data;
    let requestCount = Math.ceil(total / MAX_BUSINESS_PER_PAGE);
    let remainingRequestCount = requestCount - 1;
    let maximumLoop;
    let offset = 50;
    
    while(remainingRequestCount > 0){
      remainingRequestCount > 5 ? maximumLoop = 5 : maximumLoop = remainingRequestCount
      let promise = [];
      for(let index = 0; index < maximumLoop; index++){
        if(offset > 950) break;
        const request = queryString(offset);
        offset+=50;
        promise.push(request);
      }
      if(!promise.length) break;
      const resolved = await Promise.all(promise.map(p => {
        return this.query(p);
        
      }))
      remainingRequestCount -= 5;
      delay(500)
     
      result.push(...resolved);
    }

    let groupBusinesses: any = this.getGroupBusinesses(result);
    const businessGroups = [];
    for (let [key, value] of Object.entries(groupBusinesses)) {
     if(value) businessGroups.push(`${value} businesses between ${key.split('')[0]} and ${key.split('')[1]}`)
    }
    return businessGroups;
   
   } catch (error) {
    console.error({
      error: error.response.statusText,
      data: error.response.data
    });  
   } 
  }

}

export default YelpClient;
