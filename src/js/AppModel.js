/* eslint-disable no-underscore-dangle */
import Event from './Event';

export default class Model {
    constructor() {
        this._columns = [];
        this.readLocalMemoryEvent = new Event();
        this.addDataEvent = new Event();
        this.swapItemEvent = new Event();
        this.removeItemEvent = new Event();
    }

    setData() {
        localStorage.setItem('columns', JSON.stringify([{ title: 'Column title', id: 1, items: ['Lorem adjasjda asdnadjakda kskd', 'asdadadadadad'] },
            { title: 'Column title', id: 2, items: ['Lorem adjasjda asdnadjakda kskd', 'asdadadadadad'] }]));
    }

    getData() {
        return this._columns;
    }

    addData(data) {
        this._columns.push(data);
        this.addDataEvent.notify();
    }

    removeItem(columnIndex, itemIndex) {
        const { items } = this.columns[columnIndex];
        items.splice(itemIndex, 1);
        this.removeItemEvent.notify();
    }

    swapItem(columnId, prevPosition, newPosition) {
        const column = this._columns[columnId];
        const prevItem = column.items.splice(prevPosition, 1);
        column.items.splice(newPosition, 0, prevItem);
        this.swapItemEvent.notify();
    }

    localMemory() {
        const localData = localStorage.getItem('columns');
        if (localData) {
            this.columns = JSON.parse(localData);
            this.readLocalMemoryEvent.notify();
        }
    }
}
