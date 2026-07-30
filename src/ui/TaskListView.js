/**
 * Responsabilidad única: renderizar la lista de tareas en el DOM
 * y delegar las interacciones del usuario mediante callbacks.
 *
 * No conoce reglas de negocio (no decide qué es "completar" o "eliminar"):
 * solo notifica la intención del usuario a quien la use (ISP + SRP).
 */
export class TaskListView {
  constructor(containerId, { onToggle, onDelete }) {
    this.container = document.getElementById(containerId);
    this.onToggle = onToggle;
    this.onDelete = onDelete;
  }

  render(tasks) {
    this.container.innerHTML = '';

    if (tasks.length === 0) {
      this._renderEmptyState();
      return;
    }

    tasks.forEach((task) => {
      this.container.appendChild(this._createTaskElement(task));
    });
  }

  _renderEmptyState() {
    const message = document.createElement('p');
    message.className = 'empty-message';
    message.textContent = 'No hay tareas para mostrar';
    this.container.appendChild(message);
  }

  _createTaskElement(task) {
    const taskDiv = document.createElement('div');
    taskDiv.className = task.completed ? 'task-item completed' : 'task-item';

    const label = document.createElement('span');
    label.textContent = task.text;

    const buttons = document.createElement('div');
    buttons.className = 'task-buttons';

    const completeBtn = document.createElement('button');
    completeBtn.className = 'complete-btn';
    completeBtn.textContent = task.completed ? 'Reactivar' : 'Completar';
    completeBtn.onclick = () => this.onToggle(task.id);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.onclick = () => this.onDelete(task.id);

    buttons.append(completeBtn, deleteBtn);
    taskDiv.append(label, buttons);

    return taskDiv;
  }
}
