import initKnex from "knex";
import configuration from "../knexfile.js";
import { readUsers } from "../utils/helpers.js";
import calculateScore from "../utils/SecurityCalculator.js";

const knex = initKnex(configuration);

const fetchUsers = async (_req, res) => {
  const userList = await readUsers();
  try {
    res.status(200).json(userList);
  } catch (err) {
    res.status(400).send(`Error retrieving user: ${err}`);
  }
};

const fetchIndividualUser = async (req, res) => {
  const userList = await readUsers();
  const selectedUser = userList.find((user) => {
    return user.id == req.params.id;
  });

  if (!selectedUser) {
    return res.status(404).json({ message: "User with this ID not found" });
  }

  res.status(200).json(selectedUser);
};

const editUser = async (req, res) => {
  const userList = await readUsers();
  const selectedUser = userList.find((user) => {
    return user.id == req.params.id;
  });

  if (!selectedUser) {
    return res.status(404).json({ message: "User with this ID not found" });
  }
  let userSecurityScore = await calculateScore(req.body);
  console.log(userSecurityScore);
  const data = await knex("users").where("id", req.params.id).update({
    twoFactorIsSet: req.body.twoFactorIsSet,
    biometricsIsSet: req.body.biometricsIsSet,
    notificationsActive: req.body.notificationsActive,
    modules_completed: req.body.modules_completed,
    security_score: userSecurityScore,
  });
  res.status(200).json(data);
};

export { fetchUsers, fetchIndividualUser, editUser };
