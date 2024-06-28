import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const readUsers = async (_req, res) => {
  try {
    const data = await knex
      .from("users")
      .select(
        "users.id",
        "users.first_name",
        "users.last_name",
        "users.phone",
        "users.email",
        "users.address",
        "users.city",
        "users.twoFactoreIsSet",
        "users.biometricsIsSet",
        "users.notificationsActive",
        "users.modules_completed",
        "users.security_score"
      );
    return data;
  } catch (error) {
    console.log("Error reading from file ", error);
  }
};

export { readUsers };
