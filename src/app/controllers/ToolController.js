import * as Yup from 'yup';
import Tools from '../models/Tool';


class ToolController {

  async list(req, res) {
    try {
      console.log("Fui chamado");
      const tools = await Tools.findAll();
      return res.status(200).json(tools);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong" })
    }
  };


  async getById(req, res) {
    try {
      const { id } = req.params;
      const foundTool = await Tools.findByPk(id);
      if (!foundTool) {
        return res.status(404).json({ message: "Tool not found" });
      }
      return res.status(200).json(foundTool);
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Something went wrong" });
    }
  };

  async registration(req, res) {
    try {

      const schema = Yup.object().shape({
        name: Yup.string().required(),
      })

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails' })
      };


      const toolExists = await Tools.findOne({ where: { name: req.body.name } });

      if (toolExists) {
        return res.status(400).json({ error: "Tool already exists." });
      }
      const { name } = await Tools.create(req.body);

      return res.status(201).json({
        name,
      });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" })
    }
  }

}

export default new ToolController();