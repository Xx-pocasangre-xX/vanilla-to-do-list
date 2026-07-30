/**
 * Cada filtro es una estrategia independiente (predicado).
 *
 * Esto cumple el Principio Abierto/Cerrado (OCP): para agregar un nuevo
 * filtro (ej. "urgentes") basta con añadir una entrada aquí, sin modificar
 * TaskService ni la vista de filtros que ya funcionan.
 */
export const TASK_FILTERS = {
  all: () => true,
  active: (task) => !task.completed,
  completed: (task) => task.completed,
};

export const DEFAULT_FILTER = 'all';

export function isValidFilter(name) {
  return Object.prototype.hasOwnProperty.call(TASK_FILTERS, name);
}
