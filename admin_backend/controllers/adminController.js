import Admins from "../models/adminsModel.js";

//@des Admin Auth
//@route POST  /api/admin/auth
//@acess Public
const adminAuth = async (req, res) => {
    const { address } = req.body;
    console.log(address);
    const admin = await Admins.findOne({walletAddress :address });
    if (admin) {
      res.json(admin);
    } else {
      res.status(401);
      res.json({message:'Not authorized!'})
    }
  };

  export {adminAuth}