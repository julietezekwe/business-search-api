import autoBind from 'auto-bind';
import NodeGeocoder from 'node-geocoder';

/**
   * Creates an instance of Converter.
   */
  class Converter {
     private options: any;
     private geocoder: any;
     private redis: any;

    constructor({ redis, config }){
        this.redis = redis;
        this.options = {
            provider: config.geocoder.provider,
            apiKey: config.geocoder.api_key,
        }
        this.geocoder = NodeGeocoder(this.options);
        autoBind(this);
    }
        /**
     * converts a physical address to points
     *@returns {Function} - next()
     */
    async addressToPoints(req, res, next) {
       const { address } = req.body;
       const key = address.replace(' ', '').toLowerCase();
      try {
          let payload = await this.redis.getObject('Converter', key);

          if(!Object.entries(payload).length){
            const data = await this.geocoder.geocode(address);
            if(!data.length){
                return res.status(404).json({success: false, message: 'Address not found'});
            }
            let { longitude, latitude } = data[0];
            
            payload =  { longitude, latitude };
            await this.redis.setObject('Converter', key,  payload);
          }

          req.body.points = payload;
          return next();
      } catch (error) {
          res.status(500).json({success: false, message: 'there was an error'});
        throw error;
      }
    }
  
  }
  export default Converter;
  