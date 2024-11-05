const LRNModel = require('../model/lrn');
exports.Login = async (req, res, next) => {
    try {
      if (req.method === 'POST' && req.url === '/login') {
        let LRN_POST = req.body.lrn;
        let PASS_POST = req.body.password;
  
        console.log('LRN:', LRN_POST);
        console.log('Password:', PASS_POST);
  
        let checkLRN = await LRNModel.findOne({
          where: {
            valid_lrn: LRN_POST
          }
        });
  
        if (checkLRN) {
          console.log('Yes');
          res.status(200).json({ message: 'Login successful' });
        } else {
          console.log('No');
          res.status(401).json({ message: 'Incorrect username or password' });
        }
      } else {
        res.status(405).json({ message: 'Method not allowed' });
      }
    } catch (error) {
      console.log('Error occurred:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
};