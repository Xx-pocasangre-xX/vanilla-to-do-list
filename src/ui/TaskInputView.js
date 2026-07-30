/**
 * Responsabilidad única: capturar la intención del usuario de agregar
 * una tarea (clic en botón o tecla Enter) y delegarla mediante callback.
 */
export class TaskInputView {
  constructor(inputId, buttonId, onSubmit) {
    this.input = document.getElementById(inputId);
    this.button = document.getElementById(buttonId);
    this.onSubmit = onSubmit;
    this._bindEvents();
  }

  _bindEvents() {
    this.button.onclick = () => this._submit();
    this.input.onkeypress = (event) => {
      if (event.key === 'Enter') this._submit();
    };
  }

  _submit() {
    this.onSubmit(this.input.value);
  }

  clear() {
    this.input.value = '';
  }
}
