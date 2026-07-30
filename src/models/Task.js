/**
 * Representa una tarea individual de la lista.
 * Encapsula su propio estado y comportamiento (alternar completado).
 */
export class Task {
  constructor(id, text, completed = false, createdAt = new Date().toISOString()) {
    this.id = id;
    this.text = text;
    this.completed = completed;
    this.createdAt = createdAt;
  }

  toggle() {
    this.completed = !this.completed;
  }

  /** Reconstruye una instancia de Task a partir de un objeto plano (ej. localStorage). */
  static fromJSON(data) {
    return new Task(data.id, data.text, data.completed, data.createdAt);
  }
}
