import Sequelize, { Model } from 'sequelize';

class Appointment extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
        canceled_at: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    // quando uma tabela possui mais de um relacionamento, a chave estrangeira
    // obrigatoriamente precisa de um alias (o as: ...)
    this.belongsTo(models.Users, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Users, { foreignKey: 'provider_id', as: 'provider' });
  }
}

export default Appointment;
