import { TaskRepository } from './TaskRepository.js';

/**
 * Implementación alternativa de TaskRepository, sin persistencia real.
 * Útil para pruebas unitarias o entornos sin localStorage.
 *
 * Puede reemplazar a LocalStorageTaskRepository en cualquier parte del
 * sistema sin alterar su comportamiento esperado (LSP en acción).
 */
export class InMemoryTaskRepository extends TaskRepository {
  constructor(initialTasks = []) {
    super();
    this._tasks = initialTasks;
  }

  getAll() {
    return this._tasks;
  }

  saveAll(tasks) {
    this._tasks = tasks;
  }
}
