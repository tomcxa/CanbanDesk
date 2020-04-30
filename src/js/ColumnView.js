/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import dragula from './dragula';

export default class ColumnView {
    constructor(container) {
        this.container = container;
        this.drake = dragula({ revertOnSpill: true });
    }

    init(columns = [], handler, dndHandler) {
        document.addEventListener('mouseup', dndHandler);
        this.handler = handler;
        this.initColumn = this._createInitColumn();
        this.renderColumns(columns);
        this.columnsEl = this.container.getElementsByClassName('column-container');
    }

    updateDnd() {
        this.drake.containers = [...this.container.getElementsByClassName('column-body')];
    }

    _initColumnHTML() {
        return `
        <footer class="column-footer">
            <button class="btn btn-add" data-btn-type="addcolumnform">
                <span class="custom-ico add rounded thick" data-btn-type="addcolumnform"></span>
                <span class="text" data-btn-type="addcolumnform">Add new columns</span>
            </button>
        </footer>`;
    }

    _createInitColumn() {
        const initColumnContainer = document.createElement('section');
        initColumnContainer.innerHTML = this._initColumnHTML();
        initColumnContainer.classList.add('column-container');
        initColumnContainer.dataset.type = 'init';
        this.container.appendChild(initColumnContainer);
        this.addHandler(initColumnContainer, this.handler);
        return initColumnContainer;
    }

    _columnHTML(column) {
        const cplumnHeader = `
            <header class="column-header">
                <h2 class="column-title">${column.title}</h2>
                <button type="button" class="btn btn-close" data-btn-type="removecolumn">
                    <span class="custom-ico close rounded thick" data-btn-type="removecolumn"></span>
                </button>
            </header>`;
        const columnFooter = `
            <footer class="column-footer">
                <button class="btn btn-add" data-btn-type="addcardform">
                    <span data-btn-type="addcardform" class="custom-ico add rounded thick"></span>
                    <span data-btn-type="addcardform">Add new card</span>
                </button>
            </footer>`;
        const columnBody = this._cardsHTML(column);
        return cplumnHeader + columnBody + columnFooter;
    }

    _cardsHTML(column) {
        let cards = '';
        if (column.items && column.items.length) {
            column.items.forEach((item, index) => {
                cards += `
                    <div class="card" data-card-id="${index}">
                        <p>
                            ${item}
                        </p>
                        <button type="button" class="btn btn-close" data-btn-type="removecard">
                            <span class="custom-ico close rounded thick" data-btn-type="removecard"></span>
                        </button>
                    </div>`;
            });
        }
        const body = `<main class="column-body">${cards}</main>`;
        return body;
    }

    renderColumn(column, index) {
        this.initColumn.remove();
        const columnContainer = document.createElement('section');
        columnContainer.classList.add('column-container');
        columnContainer.dataset.columnId = index;
        const children = this._columnHTML(column);
        columnContainer.insertAdjacentHTML('beforeend', children);
        this.container.appendChild(columnContainer);
        this.addHandler(columnContainer, this.handler);
        this.container.appendChild(this.initColumn);
        this.updateDnd();
    }

    renderColumns(columns = []) {
        this.container.innerHTML = '';
        this.container.appendChild(this.initColumn);
        columns.forEach((column, index) => {
            this.renderColumn(column, index);
        });
    }

    removeCard(cardEl) {
        cardEl.remove();
    }

    updateColumn(columnIndex, column) {
        const targetColumn = document.querySelector(`[data-column-id="${columnIndex}"]`);
        targetColumn.querySelector('.column-body').remove();
        const header = targetColumn.querySelector('.column-header');
        header.insertAdjacentHTML('afterend', this._cardsHTML(column));
        this.updateDnd();
    }

    removeColumn(columnIndex) {
        // this.initColumn.remove();
        const removable = document.querySelector(`[data-column-id="${columnIndex}"]`);
        removable.remove();
        // this.container.appendChild(this.initColumn);
    }

    addHandler(column) {
        column.addEventListener('click', this.handler);
    }

    hide(el) {
        el.classList.add('hidden');
    }

    show(el) {
        el.classList.remove('hidden');
    }
}
