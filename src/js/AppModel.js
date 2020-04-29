/* eslint-disable no-underscore-dangle */
import Event from './Event';

export default class AppModel {
    constructor() {
        this._columns = [];
        // this.readLocalMemoryEvent = new Event();
        this.addColumnEvent = new Event();
        this.removeColumnEvent = new Event();
        this.addItemEvent = new Event();
        this.swapItemEvent = new Event();
        this.removeItemEvent = new Event();

        this.readLocalMemory();
    }

    get columns() {
        return [...this._columns];
    }

    getColumn(index) {
        return this._columns[index];
    }

    get length() {
        return this._columns.length;
    }

    addColumn(column) {
        this._columns.push(column);
        this.addColumnEvent.notify(column, this.length - 1);
        this.updateLocalMemory();
    }

    removeColumn(index) {
        this._columns.splice(index, 1);
        this.removeColumnEvent.notify(this.columns);
        this.updateLocalMemory();
    }

    addItem(columnIndex, text) {
        const column = this._columns[columnIndex];
        if (!column.items) {
            column.items = [text];
        } else {
            column.items.push(text);
        }
        this.addItemEvent.notify(columnIndex);
        this.updateLocalMemory();
    }

    removeItem(columnIndex, itemIndex) {
        const { items } = this.columns[columnIndex];
        items.splice(itemIndex, 1);
        this.removeItemEvent.notify(columnIndex);
        this.updateLocalMemory();
    }

    swapItem(itemIdx, sourceColumn, targetColumn, siblingItemIdx) {
        const column = this._columns[sourceColumn];
        const prevItem = column.items.splice(itemIdx, 1);
        const targetClmn = (sourceColumn === targetColumn) ? column : this._columns[targetColumn];
        if (siblingItemIdx) {
            targetClmn.items.splice(siblingItemIdx, 0, prevItem);
        } else {
            targetClmn.items = targetClmn.items ? targetClmn.items : [];
            targetClmn.items.push(prevItem);
        }
        this.swapItemEvent.notify(sourceColumn, targetColumn);
        this.updateLocalMemory();
    }

    updateLocalMemory() {
        localStorage.setItem('columns', JSON.stringify(this._columns));
    }

    readLocalMemory() {
        const localData = localStorage.getItem('columns');
        if (localData) {
            this._columns = JSON.parse(localData);
        }
    }
}
