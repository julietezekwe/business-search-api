"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const auto_bind_1 = __importDefault(require("auto-bind"));
const lodash_1 = require("lodash");
const bluebird_1 = require("bluebird");
class YelpClient {
    constructor({ config }) {
        this.yelp_api_key = config.api_key;
        this.yelp_base_url = config.base_url;
        this.radius = config.radius;
        this.request = axios_1.default.create({
            baseURL: this.yelp_api_key,
            headers: {
                'AUTHORIZATION': `Bearer ${this.yelp_api_key}`
            },
        });
        auto_bind_1.default(this);
    }
    /**
     * conver degree to radian
     *@returns {Number} - distance
     */
    deg2rad(deg) {
        return deg * (Math.PI / 180);
    }
    /**
     * Query helper
     * @param {object} params
     *@returns {object} - query data
     */
    async query(queryString) {
        try {
            const businesses = await this.request.get(`${this.yelp_base_url}?${queryString}`);
            return businesses.data;
        }
        catch (error) {
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
    getGroupBusinesses(businessGroups) {
        const groups = {
            '45': 0,
            '34': 0,
            '23': 0,
            '12': 0,
            '01': 0,
        };
        try {
            businessGroups.forEach(businessGroup => {
                let len = businessGroup.businesses.length - 1;
                if (businessGroup.businesses[len].rating > 4.0) {
                    groups['45'] += businessGroup.businesses.length;
                }
                else if (businessGroup.businesses[0].rating <= 4.0 && businessGroup.businesses[len].rating > 3.0) {
                    groups['34'] += businessGroup.businesses.length;
                }
                else if (businessGroup.businesses[0].rating <= 3.0 && businessGroup.businesses[len].rating > 2.0) {
                    groups['23'] += businessGroup.businesses.length;
                }
                else if (businessGroup.businesses[0].rating <= 2.0 && businessGroup.businesses[len].rating > 1.0) {
                    groups['12'] += businessGroup.businesses.length;
                }
                else if (businessGroup.businesses[0].rating <= 1.0) {
                    groups['01'] += businessGroup.businesses.length;
                }
                else {
                    businessGroup.businesses.forEach(business => {
                        if (business.rating > 4.0)
                            groups['45']++;
                        else if (business.rating > 3.0)
                            groups['34']++;
                        else if (business.rating > 2.0)
                            groups['23']++;
                        else if (business.rating > 1.0)
                            groups['12']++;
                        else
                            groups['01']++;
                    });
                }
            });
            return groups;
        }
        catch (error) {
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
    async calculateDistance(points) {
        try {
            const point1 = points[0];
            const point2 = points[1];
            const Radius = 6371;
            const dLat = this.deg2rad(lodash_1.get(point2, 'latitude') - lodash_1.get(point1, 'latitude'));
            const dLon = this.deg2rad(lodash_1.get(point2, 'longitude') - lodash_1.get(point1, 'longitude'));
            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(this.deg2rad(lodash_1.get(point1, 'latitude'))) * Math.cos(this.deg2rad(lodash_1.get(point2, 'latitude'))) *
                    Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distance = Radius * c;
            return distance;
        }
        catch (error) {
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
    async getCoffeeRestaurant(points, category) {
        try {
            const query = `latitude=${lodash_1.get(points, 'latitude', 0)}&longitude=${lodash_1.get(points, 'longitude', 0)}&radius=${this.radius}&categories=${category}&limit=3&sort_by=rating`;
            const businesses = await this.query(query);
            const payload = lodash_1.get(businesses, 'businesses', []).map(async (data) => {
                const { coordinates } = data;
                let myDistance = await this.calculateDistance([points, coordinates]);
                myDistance = myDistance.toFixed(1);
                let distance = (data.distance / 1000).toFixed(1);
                distance = myDistance === distance ? distance + 'km' : distance + 'km !';
                let payload = {
                    name: data.name + ' ' + distance,
                    image_url: data.image_url,
                    rating: data.rating,
                    categories: data.categories,
                };
                return payload;
            });
            return (Promise.all(payload));
        }
        catch (error) {
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
    async getBussinesses(points) {
        try {
            const { longitude, latitude } = points;
            const MAX_BUSINESS_PER_PAGE = 50;
            const result = [];
            const queryString = (offset = 0) => `longitude=${longitude}&latitude=${latitude}&radius=${this.radius}&limit=${MAX_BUSINESS_PER_PAGE}&sort_by=rating&offset=${offset}`;
            const data = await this.query(queryString());
            result.push(data);
            const { total } = data;
            let requestCount = Math.ceil(total / MAX_BUSINESS_PER_PAGE);
            let remainingRequestCount = requestCount - 1;
            let maximumLoop;
            let offset = 50;
            while (remainingRequestCount > 0) {
                remainingRequestCount > 5 ? maximumLoop = 5 : maximumLoop = remainingRequestCount;
                let promise = [];
                for (let index = 0; index < maximumLoop; index++) {
                    if (offset > 950)
                        break;
                    const request = queryString(offset);
                    offset += 50;
                    promise.push(request);
                }
                if (!promise.length)
                    break;
                const resolved = await Promise.all(promise.map(p => {
                    return this.query(p);
                }));
                remainingRequestCount -= 5;
                bluebird_1.delay(500);
                result.push(...resolved);
            }
            let groupBusinesses = this.getGroupBusinesses(result);
            const businessGroups = [];
            for (let [key, value] of Object.entries(groupBusinesses)) {
                if (value)
                    businessGroups.push(`${value} businesses between ${key.split('')[0]} and ${key.split('')[1]}`);
            }
            return businessGroups;
        }
        catch (error) {
            console.error({
                error: error.response.statusText,
                data: error.response.data
            });
        }
    }
}
exports.default = YelpClient;
//# sourceMappingURL=Yelp.js.map