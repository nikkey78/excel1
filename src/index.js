import { Formula } from './components/formula/Formula';
import { Header } from './components/header/Header';
import { Table } from './components/table/Table';
import { Toolbar } from './components/toolbar/Toolbar';
import './scss/index.scss';

import { Excel } from '@/components/excel/Excel';

const excel = new Excel('#app', {
   components: [Header, Toolbar, Formula, Table],
});


excel.render();
