import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
//2 types of users, consumer and support
export const USER_TYPES = {
  CONSUMER: "consumer",
  SUPPORT: "support",
};

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4().replace(/\-/g, ""),
    },
    firstName: String,
    lastName: String,
    type: String,
  },
  {
    timestamps: true,    //Setting timestamps to true will add 2 things to my schema: a createdAt and a updatedAt date value
    collection: "users", //My collection name will be users inside my database
  }
);
userSchema.statics.createUser = async function (
	firstName, 
    	lastName, 
    	type
) {
  try {
    const user = await this.create({ firstName, lastName, type });
    return user;
  } catch (error) {
    throw error;
  }
}

//we are doing here is adding a static method to our userSchema called createUser that takes in 3 parameters: firstName, lastName, type.

userSchema.statics.getUserById = async function (id) {
    try {
      const user = await this.findOne({ _id: id });
      if (!user) throw ({ error: 'No user with this id found' });
      return user;
    } catch (error) {
      throw error;
    }
  }

  userSchema.statics.getUsers = async function () {
    try {
      const users = await this.find();
      return users;
    } catch (error) {
      throw error;
    }
  }

  userSchema.statics.deleteByUserById = async function (id) {
    try {
      const result = await this.remove({ _id: id });
      return result;
    } catch (error) {
      throw error;
    }
  }

  userSchema.statics.getUserByIds = async function (ids) {
    try {
      const users = await this.find({ _id: { $in: ids } });
      return users;
    } catch (error) {
      throw error;
    }
  }
  

export default mongoose.model("User", userSchema);