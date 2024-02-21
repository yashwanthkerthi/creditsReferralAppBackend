const sequelize = require("../../config/config");
const Users = sequelize.db.Users;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSignup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, referralCode } = req.body;

    const user = await Users.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      res.status(403);
      return res.send({
        status: "failed",
        message: "You are not eligible to register",
      });
    } else if (firstName && email && password && !user.password && referralCode) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      const initialAdminCredits = await Users.findOne({
        where:{
            referralCode:referralCode
        }
      })

      await Users.update(
        {
          firstName,
          lastName,
          password: hashPassword,
          credits: 50,
        },
        {
          where: {
            email: email,
          },
        }
      );

      await Users.update(
        {
          credits: initialAdminCredits.credits + 10,
        },
        {
          where: {
            email: initialAdminCredits.email,
          },
        }
      );

      res.status(200).json({
        message: "user registered successfully",
      });
    } else {
      res.send({ status: "failed", message: "Cannot register again" });
    }
  } catch (error) {
    console.log("error", error);
  }
};

const userSignin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({
      where: {
        email: email,
      },
    });
    if (user !== null) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (user.email == email && isMatch) {
        const jwtToken = jwt.sign({ user: user }, process.env.JWTSECRETKEY, {
          expiresIn: "1h",
        });
        res.status(200).send({
          message: "User signin successful",
          jwtToken,
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

const getUserDetails = async (req,res) =>{
    const id = req.user.user.id
    const user = await Users.findOne({
        where:{
            id:id
        }
    })

    res.status(200).send({data:user})

}

module.exports = {
  userSignup,
  userSignin,
  getUserDetails
};
