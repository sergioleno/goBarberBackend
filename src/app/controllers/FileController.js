import File from '../models/File';

class FileController {
  async store(req, res) {
    //req.file permite visualizar todos os dados do arquivo. o que importa é original name e filename
    //return res.json(req.file);

    const { originalname: name, filename: path } = req.file;

    const file = await File.create({
      name,
      path,
    });

    return res.json(file);
  }
}

export default new FileController();
