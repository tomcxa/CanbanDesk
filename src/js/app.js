// eslint-disable-next-line no-console
import ColumnView from './ColumnView';
import Model from './AppModel';
import Presenter from './Presenter';

console.log('it works!');

const container = document.querySelector('.app-container');
const view = new ColumnView(container, [
    { title: 'Column title', id: 1, items: ['Lorem adjasjda asdnadjakda kskd', 'asdadadadadad'] },
    { title: 'Column title', id: 2, items: ['Lorem adjasjda asdnadjakda kskd', 'asdadadadadad'] },
]);

const model = new Model();
const controller = new Presenter(view, model);

