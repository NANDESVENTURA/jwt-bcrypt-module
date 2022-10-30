import Sequelize from "sequelize";
import Employee from "../app/models/Employee";
import Tools from "../app/models/Tool";
import databaseConfig from '../config/database';

const models = [Employee, Tools];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}
export default new Database();

