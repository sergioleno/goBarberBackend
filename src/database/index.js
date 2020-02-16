import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';

import databaseConfig from '../config/database';

const models = [User, File, Appointment];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
    // testa se o model.associate existe, e chama se existir
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://localhost:27017/gobarber',
      /** cria automaticamente a base(aqui sem senha nem usuário) */
      { useNewUrlParser: true, useUnifiedTopology: true }
      /** configurações adicionais do mongo
       * no bc foi usado useFindAndModify que está desatualizada.
       */
    );
  }
}

export default new Database();
