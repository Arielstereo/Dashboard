import {Schema, model, models } from 'mongoose'

const BalanceSchema = new Schema({
  description: String,
  amount: Number,
  date: Date,
  type: {
    type: String,
    enum: ['income', 'expense']
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
},
{
  versionKey: false
}
)

export default models.Balance || model('Balance', BalanceSchema)