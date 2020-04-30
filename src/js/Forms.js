/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
export default class Forms {
    constructor(container) {
        this.container = container;
    }

    _addColumnFormHTML() {
        return `
        <form class="add-column_form">
            <input data-type="input" type="text" placeholder="Введите название колонки">
            <div class="btn-box">
                <button class="btn btn-add" data-btn-type="addcolumn">
                    <span class="custom-ico add rounded thick" data-btn-type="addcolumn"></span>
                </button>
                <button class="btn btn-close" data-btn-type="cancel">
                    <span class="custom-ico close rounded thick" data-btn-type="cancel"></span>
                </button>
            </div>
        </form>`;
    }

    _addCardFormHTML() {
        return `
        <form class="add-card_form">
            <textarea data-type="input" rows="3" placeholder="Напишите что-то..."></textarea>
            <div class="btn-box">
                <button class="btn btn-add" data-btn-type="addcard">
                    <span class="custom-ico add rounded thick" data-btn-type="addcard"></span>
                    <span data-btn-type="addcard">Add</span>
                </button>
                <button class="btn btn-close" data-btn-type="cancel">
                    <span class="custom-ico close rounded thick" data-btn-type="cancel"></span>
                    <span data-btn-type="cancel">Close</span>
                </button>
            </div>
        </form>`;
    }

    bindToDOM(type) {
        if (type === 'addcolumn') this.container.insertAdjacentHTML('beforeend', this._addColumnFormHTML());
        if (type === 'addcard') this.container.insertAdjacentHTML('beforeend', this._addCardFormHTML());
    }

    focus() {
        const focusfield = this.container.querySelector('[data-type="input"]');
        focusfield.focus();
    }
}
