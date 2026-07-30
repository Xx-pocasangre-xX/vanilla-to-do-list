/**
 * Responsabilidad única: generar identificadores incrementales para tareas.
 * Antes esta lógica vivía mezclada dentro del flujo de carga de main.js.
 */
export class IdGenerator {
  constructor(existingTasks = []) {
    this._currentId = existingTasks.length > 0
      ? Math.max(...existingTasks.map((task) => task.id)) + 1
      : 1;
  }

  next() {
    return this._currentId++;
  }
}
