import User from '../models/User'; // provider é um usuário
import File from '../models/File'; // caso eu queira retornar todos os dados do avatar

class ProviderController {
  async index(req, res) {
    const providers = await User.findAll({
      where: { provider: true },
      attributes: ['id', 'name', 'email', 'avatar_id'], // define as colunas do banco que serão retornadas
      // include: [File], // caso queira passar todos os dados
      // include: [{ File }], // caso haja mais de um relacionamento, posso escolher quais passar
      include: [
        {
          model: File,
          as: 'avatar', // assim o relacionamento aparecerá como avatar, não como File
          attributes: ['name', 'path', 'url'], // escolhe os atributos do relacionamento
        },
      ],
    });
    return res.json(providers);
  }
}

export default new ProviderController();
