import * as Sequelize from "sequelize";
import db from "../config/db";

const TaskModel = db.define("Task", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  name: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
  completedAt: {
    allowNull: true,
    type: Sequelize.DATE,
    defaultValue: null,
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
  excludeAt: {
    allowNull: true,
    type: Sequelize.DATE,
    defaultValue: null,
  },
  ownerId: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
});

export default TaskModel;
