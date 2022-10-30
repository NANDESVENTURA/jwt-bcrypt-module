import { Model, Sequelize } from 'sequelize';
import bcrypt from 'bcrypt';

class Employee extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      registration: Sequelize.INTEGER,
      password: Sequelize.VIRTUAL,
      password_hash: Sequelize.STRING,
    }, {
      sequelize,
    }
    );

    this.addHook('beforeSave', async (employee) => {
      if (employee.password) {
        employee.password_hash = await bcrypt.hash(employee.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default Employee;