const knex = require("../db/connection");

function averageRating() {
  // added here:
  return knex("restaurants").avg("rating as average_rating");
}

function count() {
  // updated here :
  return knex("restaurants").count("restaurant_id");
}

function create(newRestaurant) {
  return knex("restaurants")
    .insert(newRestaurant, "*")
    .then((createdRecords) => createdRecords[0]);
}

function destroy(restaurant_id) {
  return knex("restaurants").where({ restaurant_id }).del();
}

function list() {
  return knex("restaurants").select("*");
}

function read(restaurant_id) {
  return knex("restaurants").select("*").where({ restaurant_id }).first();
}

function readHighestRated() {
  return knex("restaurants")
    .max("rating as max_rating") // Use alias to rename the result
    .groupBy("rating")
    .orderBy("max_rating", "desc") // Order by the alias
    .first();
}


function update(updatedRestaurant) {
  return knex("restaurants")
    .select("*")
    .where({ restaurant_id: updatedRestaurant.restaurant_id })
    .update(updatedRestaurant, "*");
}

module.exports = {
  averageRating,
  count,
  create,
  delete: destroy,
  list,
  read,
  readHighestRated,
  update,
  count,
};