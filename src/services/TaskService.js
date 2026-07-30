import { Task } from '../models/Task.js';
import { TASK_FILTERS, DEFAULT_FILTER } from './taskFilters.js';

/**
 * Responsabilidad única: reglas de negocio sobre tareas
 * (crear, completar, eliminar, filtrar, calcular estadísticas).
 *
 * No sabe nada de localStorage ni del DOM: depende únicamente de la
 * abstracción TaskRepository que recibe por constructor (DIP), y de un
 * IdGenerator inyectado. Esto la hace fácil de probar de forma aislada.
 */
export class TaskService {
  constructor(repository, idGenerator, initialTasks = null) {
    this.repository = repository;
    this.idGenerator = idGenerator;
    this.tasks = initialTasks ?? repository.getAll();
  }

  getTasks(filterName = DEFAULT_FILTER) {
    const predicate = TASK_FILTERS[filterName] ?? TASK_FILTERS[DEFAULT_FILTER];
    return this.tasks.filter(predicate);
  }

  addTask(text) {
    const trimmedText = (text ?? '').trim();
    if (trimmedText === '') {
      throw new Error('Por favor escribe una tarea');
    }

    const task = new Task(this.idGenerator.next(), trimmedText);
    this.tasks.push(task);
    this.repository.saveAll(this.tasks);
    return task;
  }

  toggleTask(id) {
    const task = this._findTaskOrThrow(id);
    task.toggle();
    this.repository.saveAll(this.tasks);
  }

  deleteTask(id) {
    this._findTaskOrThrow(id);
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.repository.saveAll(this.tasks);
  }

  getStats() {
    const total = this.tasks.length;
    const completed = this.tasks.filter((task) => task.completed).length;
    return { total, completed, active: total - completed };
  }

  _findTaskOrThrow(id) {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      throw new Error(`No se encontró ninguna tarea con id ${id}`);
    }
    return task;
  }
}
