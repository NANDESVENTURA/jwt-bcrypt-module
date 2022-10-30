import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import bcrypt from 'bcrypt';

import authConfig from '../../config/auth';

import Employee from '../models/Employee';

class LoginController {
  async login(req, res) {
    try {

      const schema = Yup.object().shape({
        registration: Yup.number().required(),
        password: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails' });
      };

      const { registration, password } = req.body;

      const employee = await Employee.findOne({ where: { registration } });

      if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
      }

      if (!await bcrypt.compare(password, employee.password_hash)) {
        return res.status(400).json({ message: "Wrong registration/password combination" });
      }

      const { id, name } = employee;

      return res.status(200).json({
        employee: {
          id,
          name,
          registration,
        },
        token: jwt.sign({ id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
      })
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
}

export default new LoginController();