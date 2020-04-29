/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-console
import ColumnView from './ColumnView';
import AppModel from './AppModel';
import Presenter from './Presenter';

const container = document.querySelector('.app-container');

const model = new AppModel();
const view = new ColumnView(container);
const presenter = new Presenter(view, model);
