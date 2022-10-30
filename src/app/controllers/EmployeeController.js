import * as Yup from 'yup';
import Employee from '../models/Employee';

class EmployeeController {
  /* async listEmployee(req,res){
      
  } */
  // criação registro funcionario 

  async create(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        registration: Yup.number().required().integer(),
        password: Yup.string().required().min(6),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails' });
      };


      const employeeExists = await Employee.findOne({ where: { registration: req.body.registration } });

      if (employeeExists) {
        return res.status(400).json({ error: 'Employee already exists.' });
      }

      const { id, name, registration } = await Employee.create(req.body);

      return res.status(201).json({
        id,
        name,
        registration
      });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }

  }

  async update(req, res) {
    try {

      const schema = Yup.object().shape({
        name: Yup.string().required(),
        registration: Yup.number().required().integer(),
        oldPassword: Yup.string().required().min(6),
        password: Yup.string().min(6).when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
        confirmPassword: Yup.string().when('password', (password, field) =>
          password ? field.required().oneOf([Yup.ref('password')]) : field
        ),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails' });
      };

      const { registration, oldPassword } = req.body;

      const employee = await Employee.findByPk(req.employeeId);

      if (registration && registration != employee.registration) {
        const employeeExists = await Employee.findOne({ where: { email } });

        if (employeeExists) {
          return res.status(400).json({ error: 'Employee already exists.' })
        }
      }

      if (oldPassword && !(await employee.checkPassword(oldPassword))) {
        return res.status(401).json({ error: 'Password does not match' });
      }

      const { id, name } = await employee.update(req.body);

      return res.status(201).json({
        id,
        name,
        registration,
      });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
}

export default new EmployeeController();
