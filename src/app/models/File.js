import Sequelize, { Model } from 'sequelize';

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://localhost:3333/files/${this.path}`;
            // localhost:3333=endereço da api
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default File;
