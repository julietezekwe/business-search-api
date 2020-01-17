import autoBind from 'auto-bind';
import NodeGeocoder from 'node-geocoder';
/**
   * Creates an instance of Converter.
   */
  class Converter {
      options: any;
      geocoder: any;
    constructor(){
        this.options = {
            provider: 'google',
            apiKey: 'AIzaSyBb9SjmLyHoIv15i5igN5AaFM0JPuhidns'
        }
        this.geocoder = NodeGeocoder(this.options);
        autoBind(this);
    }
        /**
     * converts a physical address to points
     *@returns {Function} - next()
     */
    async addressToPoints(req, res, next) {
       
      try {
          const payload = await this.geocoder.geocode(req.body.address);

          
          req.body.points = {
            latitude: payload[0].latitude,
            longitude: payload[0].longitude,
          }
          return next();
      } catch (error) {
          res.json({success: false, message: 'there was an error'});
        throw error;
      }
    }
  
  }
  export default Converter;
  