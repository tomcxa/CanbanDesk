export default class CardView {
    constructor(container) {
        this.container = container;
    }

    init() {
        
    }

    removeCard(target) {
        target.remove();
    }

    _createCard(text) {
        return `
            <div class="card">
                <p>
                    ${text}
                </p>
                <button type="button" class="btn btn-close" data-btn-type="removecard">
                    <span class="custom-ico close rounded thick"></span>
                </button>
            </div>`;
    }

    render() {

    }
}
