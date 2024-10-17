import { model, Schema } from 'mongoose';

const MenuItemSchema = new Schema({
  recipeName: { type: String},
  category: { type: String, unique: true, required: true },
  price: { type: String },
  recipeDetails: { type: String },
  image: { type: String },
});

const MenuItem = model('MenuItem', MenuItemSchema);

export default MenuItem;
