/**
 * Contrato que debe cumplir cualquier repositorio de tareas.
 *
 * Al depender de esta abstracción (en lugar de localStorage directamente),
 * TaskService cumple el Principio de Inversión de Dependencias (DIP):
 * el módulo de alto nivel (lógica de negocio) no depende de un detalle
 * de implementación (el mecanismo de almacenamiento concreto).
 *
 * La interfaz es intencionalmente pequeña (ISP): solo expone lo que
 * un consumidor de tareas necesita, nada más.
 */
export class TaskRepository {
  /** @returns {Task[]} */
  getAll() {
    throw new Error('getAll() debe ser implementado por la subclase');
  }

  /** @param {Task[]} tasks */
  saveAll(tasks) {
    throw new Error('saveAll() debe ser implementado por la subclase');
  }
}
