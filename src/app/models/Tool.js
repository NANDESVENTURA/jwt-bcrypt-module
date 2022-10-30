import { Model, Sequelize } from 'sequelize';


class Tools extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
    }, {
      sequelize,
    })

    return this;
  }
}

export default Tools;