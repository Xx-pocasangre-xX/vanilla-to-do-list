/**
 * Orquesta el flujo entre TaskService (negocio) y las vistas (presentación).
 *
 * Depende de abstracciones inyectadas por constructor (taskService y las
 * vistas), no de implementaciones concretas creadas internamente: esto
 * cumple DIP y facilita sustituir cualquiera de las piezas (ej. cambiar
 * de localStorage a una API remota) sin tocar este archivo.
 */
export class TaskController {
  constructor({ taskService, taskListView, statsView, filterView, taskInputView }) {
    this.taskService = taskService;
    this.taskListView = taskListView;
    this.statsView = statsView;
    this.filterView = filterView;
    this.taskInputView = taskInputView;
    this.currentFilter = 'all';
  }

  init() {
    this._renderAll();
  }

  handleAddTask(text) {
    try {
      this.taskService.addTask(text);
      this.taskInputView.clear();
      this._renderAll();
    } catch (error) {
      alert(error.message);
    }
  }

  handleToggleTask(id) {
    try {
      this.taskService.toggleTask(id);
      this._renderAll();
    } catch (error) {
      console.error(error.message);
    }
  }

  handleDeleteTask(id) {
    try {
      this.taskService.deleteTask(id);
      this._renderAll();
    } catch (error) {
      console.error(error.message);
    }
  }

  handleFilterChange(filter) {
    this.currentFilter = filter;
    this._renderAll();
  }

  _renderAll() {
    this.taskListView.render(this.taskService.getTasks(this.currentFilter));
    this.statsView.render(this.taskService.getStats());
  }
}
