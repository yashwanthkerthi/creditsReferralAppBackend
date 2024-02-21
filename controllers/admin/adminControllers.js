const sequelize = require("../../config/config");
const Users = sequelize.db.Users;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer")
const generateReferralCode = require("../../generateReferralCode")

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "kerthiyashwanthrao@gmail.com",
        pass: "jwrp barz vlhd hsyh"
    }
});

const adminSignup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const user = await Users.findOne({
      where: {
        email: email,
      },
    });

    if (user) {
      res.status(403);
      return res.status(400).send({ status: "failed", message: "email-already-exists" });
    } else if (firstName && email && password) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const user = await Users.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashPassword,
        role: "admin",
        referralCode:generateReferralCode(8)
      });

      res.status(200).json({
        message: "Admin registered successfully",
      });
    } else {
      console.log("error");
      res.send({ status: "failed", message: "All fields are required" });
    }
  } catch (error) {
    console.log("error", error);
  }
};

const adminSignin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({
      where: {
        email: email,
      },
    });
    if (user !== null) {
      const isMatch =await bcrypt.compare(password, user.password);
      console.log(isMatch);
      if (user.email === email && isMatch) {
        const jwtToken = jwt.sign(
          { user: user },
          process.env.JWTSECRETKEY,
          {
            expiresIn: "1h",
          }
        );
        res.status(200).send({
          message: "signin successful",
          jwtToken: jwtToken,
          id:user.id
        });
      } else {
        res.status(400).send({
          message:
            "email or password is incorrect , please enter correct email and passsword",
        });
      }
    } else {
      res.status(400).send({
        message: "Please register first",
      });
    }
  } catch (error) {
    console.log("error", error);
  }
};

const addUserDetails = async (req, res) => {
  try {
    const { email, } = req.body;
    const referralCode = req.user.user.referralCode
    console.log(referralCode);
    const user = await Users.findOne({
      where: {
        email: email,
      },
    });
    if (user) {
      res.status(403);
      return res.send({ status: "failed", message: "email-already-exits" });
    } else if (email) {
      const createUser = await Users.create({
        email,
        role: "user",
      });
      const info = await transporter.sendMail({
        from: "kerthiyashwanthrao@gmail.com", // sender address
        to: email , 
        subject: "Register with below link to creditsTask ", 
        text: "You have been added by admin,Signup with referral code below ", 
        html: `Referral Code : ${referralCode} <br/> <a href=http://localhost:3000/user/register?code=${referralCode} target=_blank>Click here to signup to credits task</a>`,
      });
      res.status(200).send({status: "success",message:"user has been added"})
    }
  } catch (error) {
    console.log("error", error);
  }
};

const getAdminDetails = async (req,res) =>{
    const id = req.user.user.id
    const user = await Users.findOne({
        where:{
            id:id
        }
    })

    res.status(200).send({data:user})

}

module.exports = {
  adminSignup,
  adminSignin,
  addUserDetails,
  getAdminDetails
};
