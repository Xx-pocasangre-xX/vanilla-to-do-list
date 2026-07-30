import './style.css';
import { LocalStorageTaskRepository } from './repositories/LocalStorageTaskRepository.js';
import { IdGenerator } from './services/IdGenerator.js';
import { TaskService } from './services/TaskService.js';
import { TaskListView } from './ui/TaskListView.js';
import { StatsView } from './ui/StatsView.js';
import { FilterView } from './ui/FilterView.js';
import { TaskInputView } from './ui/TaskInputView.js';
import { TaskController } from './controllers/TaskController.js';

/**
 * Composition root: aquí, y solo aquí, se construyen las implementaciones
 * concretas y se inyectan en el controlador. Si mañana se cambia el
 * almacenamiento o la librería de UI, este es el único lugar que cambia.
 */
window.onload = () => {
  const repository = new LocalStorageTaskRepository();
  const existingTasks = repository.getAll();
  const idGenerator = new IdGenerator(existingTasks);
  const taskService = new TaskService(repository, idGenerator, existingTasks);

  const controller = new TaskController({
    taskService,
    taskListView: new TaskListView('taskList', {
      onToggle: (id) => controller.handleToggleTask(id),
      onDelete: (id) => controller.handleDeleteTask(id),
    }),
    statsView: new StatsView('stats'),
    filterView: new FilterView('.filter-btn', (filter) => controller.handleFilterChange(filter)),
    taskInputView: new TaskInputView('taskInput', 'addBtn', (text) => controller.handleAddTask(text)),
  });

  controller.init();
};
