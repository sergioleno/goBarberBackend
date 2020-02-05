'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'users', //nome da tabela
      'avatar_id', //nome da coluna
      {
        //informações sobre a coluna
        type: Sequelize.INTEGER,
        references: {
          //chave estrangeira
          model: 'files', //a qual tabela o campo faz referência
          key: 'id', //campo da tabela referência que pretendo usar
          onUpdate: 'CASCADE', //se alterado, será automaticamente alterado na tabela user
          onDelete: 'SET NULL', //se o arquivo for deletado da tabela files, fica null na tabela user
        },
        allowNull: true,
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'avatar_id'); //tabela e coluna a ser removida
  },
};
