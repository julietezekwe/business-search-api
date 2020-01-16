import { get, isEmpty } from 'lodash';
/**
   * Creates an instance of Validator.
   */
  class Validator {

    /**
     * Validates an input
     *@returns {Function} - next()
     */
    async addressValidator(req, res, next) {
      try {
        if(isEmpty(get(req, 'body.address', '').trim())){
              return res.status(400).json({
                  success: false,
                  message: 'Invalid address type',
              })
          }
       if(typeof req.body.address.trim() === 'string') return next();
      } catch (error) {
        throw error;
      }
    }
  
  }
  export default Validator;
  