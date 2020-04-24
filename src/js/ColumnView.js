/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
export default class ColumnView {
    constructor(container, columns) {
        this.container = container;
        this.columns = columns;
        this.init();
    }

    init() {
        this.initColumn = this._createInitColumn();
        this.renderColumns(this.columns);
        this.columnBody = this.container.querySelector('.column-body');
        this.addColumnBtn = this.container.querySelector('[data-btn-type="addcolumn"]');
        this.addCardBtn = this.container.querySelector('[data-btn-type="addcard"]');
        this.removeColumnBtn = this.container.querySelector('[data-btn-type="removecolumn"]');
        this.removeCardBtns = this.container.getElementsByAttr
    }

    _initColumnHTML() {
        return `
        <footer class="column-footer">
            <button class="btn btn-add" data-btn-type="addcolumn">
                <span class="custom-ico add rounded thick"></span>
                <span>Add new columns</span>
            </button>
        </footer>`;
    }

    _createInitColumn() {
        const initColumnContainer = document.createElement('section');
        initColumnContainer.innerHTML = this._initColumnHTML();
        initColumnContainer.classList.add('column-container');
        initColumnContainer.dataset.type = 'init';
        this.container.appendChild(initColumnContainer);
        return initColumnContainer;
    }

    _columnHTML(column) {
        const header = `
            <header class="column-header">
                <h2 class="column-title">${column.title}</h2>
                <button type="button" class="btn btn-close" data-btn-type="removecolumn">
                    <span class="custom-ico close rounded thick"></span>
                </button>
            </header>`;
        const footer = `
            <footer class="column-footer">
                <button class="btn btn-add" data-btn-type="addcard">
                    <span class="custom-ico add rounded thick"></span>
                    <span>Add new card</span>
                </button>
            </footer>`;
        const body = this._cardsHTML(column.items);
        return header + body + footer;
    }

    _cardsHTML(items) {
        let cards = '';
        if (items.length) {
            items.forEach((item, index) => {
                cards += `
                    <div class="card">
                        <p>
                            ${item}
                        </p>
                        <button type="button" class="btn btn-close" data-btn-type="removecard">
                            <span class="custom-ico close rounded thick"></span>
                        </button>
                    </div>`;
            });
        }
        const body = `<main class="column-body">${cards}</main>`;
        return body;
    }

    renderColumns(columns) {
        this.initColumn.remove();
        columns.forEach((column, index) => {
            const columnContainer = document.createElement('section');
            columnContainer.classList.add('column-container');
            columnContainer.dataset.columnId = index;
            const children = this._columnHTML(column);
            columnContainer.insertAdjacentHTML('beforeend', children);
            this.container.appendChild(columnContainer);
        });
        this.container.appendChild(this.initColumn);
    }

    addCard(text) {
        const card = `
            <div class="card">
                <p>
                    ${text}
                </p>
                <button type="button" class="btn btn-close" data-btn-type="removecard">
                    <span class="custom-ico close rounded thick"></span>
                </button>
            </div>`;
        this.columnBody.insertAdjacentHTML('afterbegin', card);
    }

    removeCard(cardEl) {
        cardEl.remove();
    }

    addColumn() {
        this.initColumn.remove();

        this.container.appendChild(this.initColumn);
    }

    updateColumn(columnIndex, newCards) {
        const updatable = document.querySelector(`[data-column-index="${columnIndex}"]`);
        updatable.innerHTML = this._cardsHTML(newCards);

    }

    removeColumn(columnIndex) {
        this.initColumn.remove();
        const removable = document.querySelector(`[data-column-index="${columnIndex}"]`);
        removable.remove();
        this.container.appendChild(this.initColumn);
    }
}
