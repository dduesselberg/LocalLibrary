const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

let AuthorSchema = new Schema({
  first_name: { type: String, required: true, max: 100 },
  family_name: { type: String, required: true, max: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date }
});

//Virtual for author's full name
AuthorSchema.virtual('name').get(() => {
  return this.family_name + ', ' + this.first_name;
});

//Virtual for author's lifespan
AuthorSchema.virtual('lifespan').get(() => {
  return (
    this.date_of_death.getYear() - this.date_of_birth.getYear()
  ).toString();
});

//Virtual fpr author's URL
AuthorSchema.virtual('url').get(() => {
  return '/catalog/author/' + this._id;
});

//Virtual for birth date format
AuthorSchema.virtual('birth_formatted').get(function() {
  if (this.date_of_birth) {
    return moment(this.date_of_birth).format('MMMM Do, YYYY');
  }
});

//Virtual for death date format
AuthorSchema.virtual('death_formatted').get(function() {
  if (this.date_of_death) {
    return moment(this.date_of_death).format('MMMM Do, YYYY');
  }
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);
