import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import createError from '../lib/error.js';
import Jwt from 'jsonwebtoken';
import dbConnect from '../lib/mongoose.js';

export const register = async (req, res, next) => {
  await dbConnect();
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    await newUser.save();
    res.status(200).send('User has been created');
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });
    if (!user)
      return next(createError(404, 'User not found!'));
    const { password, isAdmin, ...otherDetails } =
      user._doc;

    await bcrypt
      .compare(req.body.password, user.password)
      .then(correct => {
        if (correct === true) {
          const token = Jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT
          );

          res
            .cookie('access_token', token, {
              httpOnly: true,
            })
            .status(200)
            .json({
              details: { ...otherDetails },
              isAdmin,
            });
        } else {
          next(
            createError(400, 'Wrong password or username!')
          );
        }
      });
  } catch (err) {
    next(err);
  }
};
