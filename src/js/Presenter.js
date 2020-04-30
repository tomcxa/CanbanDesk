/* eslint-disable object-curly-newline */
import Forms from './Forms';

export default class Presenter {
    constructor(view, model) {
        this.view = view;
        this.model = model;

        this.init();
    }

    init() {
        this.view.init(this.model.columns, this.handler.bind(this), this.dropHandler.bind(this));

        this.model.addColumnEvent.attach(this.addColumn.bind(this));
        this.model.removeColumnEvent.attach(this.removeColumn.bind(this));
        this.model.addItemEvent.attach(this.updateColumns.bind(this));
        this.model.removeItemEvent.attach(this.updateColumns.bind(this));
        this.model.swapItemEvent.attach(this.updateColumns.bind(this));
    }

    handler(event) {
        event.preventDefault();
        const { btnType } = event.target.dataset;
        const { columnId } = event.currentTarget.dataset;
        if (btnType === 'cancel') {
            const formEl = event.currentTarget.querySelector('form');
            const hideEl = event.currentTarget.querySelector('.column-footer');
            formEl.remove();
            this.view.show(hideEl);
        }
        // обработчик для добавления новой колонки
        if (btnType === 'addcolumnform') {
            const hideEl = event.target.closest('.column-footer');
            this.view.hide(hideEl);
            const form = new Forms(event.currentTarget);
            form.bindToDOM('addcolumn');
            form.focus();
        }

        if (btnType === 'addcolumn') {
            const formEl = event.currentTarget.querySelector('form');
            const hideEl = event.currentTarget.querySelector('.column-footer');
            const inputEl = formEl.elements[0];
            if (inputEl.value.trim() === '') return;
            this.model.addColumn({ title: inputEl.value.trim() });
            formEl.remove();
            this.view.show(hideEl);
        }

        // обработчик для удаления колонки
        if (btnType === 'removecolumn') {
            this.model.removeColumn(columnId);
        }

        // обработчик для добавления каточки в колонку
        if (btnType === 'addcardform') {
            const hideEl = event.target.closest('.column-footer');
            this.view.hide(hideEl);
            const form = new Forms(event.currentTarget);
            form.bindToDOM('addcard');
            form.focus();
        }

        if (btnType === 'addcard') {
            const hideEl = event.currentTarget.querySelector('.column-footer');
            const formEl = event.currentTarget.querySelector('form');
            const inputEl = formEl.elements[0];
            if (inputEl.value.trim() === '') return;
            this.model.addItem(columnId, inputEl.value.trim());
            formEl.remove();
            this.view.show(hideEl);
        }

        // обработчик для удаления карточки из колонки
        if (btnType === 'removecard') {
            const card = event.target.closest('[data-card-id]');
            const { cardId } = card.dataset;
            this.model.removeItem(columnId, cardId);
        }
    }

    dropHandler(event) {
        if (event.type === 'mouseup' && event.target.closest('.card')) {
            const data = this.view.drake.dataForModel;
            if (!data.item) return;
            const itemIdx = data.item.dataset.cardId;
            if (!data.source.closest('.column-container')) return;
            const sourceColumn = data.source.closest('.column-container').dataset.columnId;
            const targetColumn = data.target.closest('.column-container').dataset.columnId;
            const siblingItemIdx = data.currentSibling ? data.currentSibling.dataset.cardId : null;
            this.model.swapItem(itemIdx, sourceColumn, targetColumn, siblingItemIdx);
        }
    }

    addColumn(column, index) {
        this.view.renderColumn(column, index);
    }

    removeColumn(columns) {
        this.view.renderColumns(columns);
    }

    updateColumns(...columnList) {
        for (const columnIndex of columnList) {
            const column = this.model.columns[columnIndex];
            this.view.updateColumn(columnIndex, column);
        }
    }
}
