import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: "string",
      required: [true, "username is required"],
    },
    email: {
      type: "string",
      required: [true, "email is required"],
    },
    password: {
      type: "string",
      required: [true, "password is required"],
    },
    balance: [
      {
        type: Schema.Types.ObjectId,
        ref: "Balance"
      }
    ]
  },
  {
    versionKey: false,
  }
);

export default models?.User || model("User", UserSchema);
