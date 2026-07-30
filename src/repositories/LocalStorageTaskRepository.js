import { Task } from '../models/Task.js';
import { TaskRepository } from './TaskRepository.js';

const STORAGE_KEY = 'tasks';

/**
 * Implementación de TaskRepository que persiste en localStorage.
 * Puede sustituirse por cualquier otra implementación (ej. InMemoryTaskRepository)
 * sin romper a los consumidores: cumple el Principio de Sustitución de Liskov (LSP).
 */
export class LocalStorageTaskRepository extends TaskRepository {
  getAll() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    try {
      const parsed = JSON.parse(raw);
      return parsed.map(Task.fromJSON);
    } catch (error) {
      console.error('No se pudieron leer las tareas guardadas, se ignorarán:', error);
      return [];
    }
  }

  saveAll(tasks) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('No se pudieron guardar las tareas:', error);
    }
  }
}
