const userModel = require("../model/user.model")
const bcrypt = require("bcrypt");
const { accessToken } = require("../middleware/jwt")



// API of register the new user
const registerUser = async (req, res) => {
    try {
        const { firstname, lastname, email, password, phoneNumber } = req.body;
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(200).json({ status: "400", message: "Email Already Exists"});
        }
        else {
            const hashedPassword = await bcrypt.hash(password, 9);
            const result = await userModel.create({
                firstname,
                lastname,
                email,
                password: hashedPassword,
                plainPassword: password,
                phoneNumber,
                
            });
            return res.status(200).json({ status:"200",message:"User Created Successfully", response: result });
        };
    } catch (error) {
        return res.status(500).json({ status: 500, message: error.message });
    };
};


// User Login
const userLogin = async (req, res) => {
    try {
        const { email, password, } = req.body;
        const existingUser = await userModel.findOne({ email })
       .select("+password");
        if (!existingUser) {
            return res.status(400).json({ status: 400,message: "User not found" });
        } else {
            const isPasswordValid = await bcrypt.compare(password, existingUser.password);
            if (isPasswordValid) {
                const token = await accessToken(existingUser);
                return res.status(200).json({ status: 200, message: "User logged In successfully", response: existingUser, token });
            } else {
                return res.status(400).json({ status: 400, message: "Invalid password" });
            };
        };
    } catch (error) {
        return res.status(500).json({ status: 500, message: "Something went wrong", error: error.message });
    };
};


// get the list of the users
const getUserList = async (req, res) => {
    try {
        const userList = await userModel.find().sort({ createdAt: -1 });
        const totalItems = await userModel.countDocuments( );
        return res.status(200).json({ status: 200, message: "User list", response: userList ,totalItems})
    } catch (error) {
        return res.status(500).json({ status: 500, message: "Something went wrong", error: error.message });
    };
};
module.exports =
 { registerUser,
   userLogin,
   getUserList }
