import express from "express";
import cors from "cors";
import {
  addUser, deleteUser, getUsers, updateUser
} from "./modules/firebase";
import { getIp, log } from "./modules/utils";
import config from "./config.json";

const app = express();
const address = getIp();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/users", async (req, res, next) => {
  try {
    const data = await getUsers();

    log.success("User list loaded.");
    res.json(data);
  } catch (e) {
    log.error(e.message);
    next(e);
  }
});

app.post("/users/add", async (req, res, next) => {
  try {
    addUser(req.body);

    log.success("User saved.");
    res.json(req.body);
  } catch (e) {
    log.error(e.message);
    next(e);
  }
});

app.post("/users/update", async (req, res, next) => {
  try {
    updateUser(req.body);

    log.success("User updated.");
    res.json(req.body);
  } catch (e) {
    log.error(e.message);
    next(e);
  }
});

app.get("/users/delete/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const data = await deleteUser(id);

    log.success(`User deleted: ${id}`);
    res.json(data);
  } catch (e) {
    log.error(e.message);
    next(e);
  }
});

app.listen(config.port, () => {
  log.success(`User app listening at http://${address}:${config.port}`);
});
