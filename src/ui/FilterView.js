/**
 * Responsabilidad única: manejar la interacción de los botones de filtro
 * y reflejar visualmente cuál está activo.
 */
export class FilterView {
  constructor(buttonSelector, onFilterChange) {
    this.buttons = Array.from(document.querySelectorAll(buttonSelector));
    this.onFilterChange = onFilterChange;
    this._bindEvents();
  }

  _bindEvents() {
    this.buttons.forEach((button) => {
      button.onclick = () => {
        const filter = button.getAttribute('data-filter');
        this.setActive(filter);
        this.onFilterChange(filter);
      };
    });
  }

  setActive(filter) {
    this.buttons.forEach((button) => {
      button.classList.toggle('active', button.getAttribute('data-filter') === filter);
    });
  }
}
