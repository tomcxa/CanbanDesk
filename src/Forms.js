/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
export default class Forms {
    constructor(container) {
        this.container = container;
    }

    _addColumnFormHTML() {
        return `
        <form class="add-column_form">
            <input type="text" placeholder="Введите название колонки">
            <button class="btn btn-add" data-btn-type="addcolumn">
                <span class="custom-ico add rounded thick" data-btn-type="addcolumn"></span>
            </button>
        </form>`;
    }

    _addCardFormHTML() {
        return `
        <form class="add-card_form">
            <textarea rows="3" placeholder="Напишите что-то..."></textarea>
            <button class="btn btn-add" data-btn-type="addcard">
                <span class="custom-ico add rounded thick" data-btn-type="addcard"></span>
                <span class="text" data-btn-type="addcard">Add new card</span>
            </button>
        </form>`;
    }

    bindToDOM(type) {
        if (type === 'addcolumn') this.container.insertAdjacentHTML('beforeend', this._addColumnFormHTML());
        if (type === 'addcard') this.container.insertAdjacentHTML('beforeend', this._addCardFormHTML());
    }
}
