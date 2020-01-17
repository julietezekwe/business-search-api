"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const auto_bind_1 = __importDefault(require("auto-bind"));
const lodash_1 = require("lodash");
class YelpClient {
    constructor({ config }) {
        this.yelp_api_key = config.api_key;
        this.yelp_base_url = config.base_url;
        this.web_client = axios_1.default;
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
     * Retrieves top businesses and their details
     * @param {object} params
     *@returns {object} - query data
     */
    _query(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.request.get(`${this.yelp_base_url}?${params}`);
                ;
            }
            catch (error) {
                // handle query error
                // console.log(error)
                console.log({
                    error: error.response.statusText,
                    data: error.response.data
                });
            }
        });
    }
    getCoffeeRestaurant(body, category) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `latitude=${lodash_1.get(body, 'points.latitude', 0)}&longitude=${lodash_1.get(body, 'points.longitude', 0)}&radius=${this.radius}&categories=${category}&limit=3&sort_by=rating`;
            const businesses = yield this._query(query);
            const payload = lodash_1.get(businesses, 'data.businesses', []).map((data) => __awaiter(this, void 0, void 0, function* () {
                const { coordinates } = data;
                let myDistance = yield this.calculateDistance([body.points, coordinates]);
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
            }));
            return (Promise.all(payload));
        });
    }
    /**
     * Retrieves top businesses and their details
     * @param {object} location
     *@returns {object} - businesses
     */
    getBussinesses({ longitude, latitude }) {
        return __awaiter(this, void 0, void 0, function* () {
            const MAX_BUSINESS_PER_PAGE = 50;
            let page = 0;
            let done = false;
            let report = {};
            const queryString = `longitude=${longitude}&latitude=${latitude}&radius=${this.radius}&limit=${MAX_BUSINESS_PER_PAGE}&sort_by=rating`;
            const _classifyBusinesses = (data, report) => {
                console.log({ start: data[0].rating, end: data[data.length - 1].rating });
                return data.reduce((acc, business) => {
                    let rating = lodash_1.get(business, 'rating', '');
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
            };
            try {
                while (!done) {
                    const batch = yield this._query(queryString + `&offset=${page}`);
                    if (batch.error)
                        throw new Error(batch.error);
                    if (page >= 200 /*page * MAX_BUSINESS_PER_PAGE >= data.total*/)
                        done = true;
                    page++;
                    report = Object.assign(Object.assign({}, report), _classifyBusinesses(batch.data.businesses, report));
                    console.log({ page, total: batch.data.total, report });
                }
            }
            catch (error) {
                // Handle fetch error
                console.log({ error });
            }
            return report;
        });
    }
    /**
     * calculates distance between points
     *@returns {Number} - distance
     */
    calculateDistance(points) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const point1 = points[0];
                const point2 = points[1];
                const Radius = 6371;
                const dLat = yield this._deg2rad(lodash_1.get(point2, 'latitude') - lodash_1.get(point1, 'latitude'));
                const dLon = yield this._deg2rad(lodash_1.get(point2, 'longitude') - lodash_1.get(point1, 'longitude'));
                const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos(yield this._deg2rad(lodash_1.get(point1, 'latitude'))) * Math.cos(yield this._deg2rad(lodash_1.get(point2, 'latitude'))) *
                        Math.sin(dLon / 2) * Math.sin(dLon / 2);
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                const distance = Radius * c; // Distance in km
                return distance;
            }
            catch (error) {
                throw error;
            }
        });
    }
    /**
    * conver degree to radian
    *@returns {Number} - distance
    */
    _deg2rad(deg) {
        return __awaiter(this, void 0, void 0, function* () {
            return deg * (Math.PI / 180);
        });
    }
}
exports.default = YelpClient;
//# sourceMappingURL=Yelp.js.map