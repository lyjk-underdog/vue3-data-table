import Mock, { mock } from 'mockjs'
import tableMocks from './table';

const mocks = [
    ...tableMocks
];

mocks.forEach(mock => {
    Mock.mock(
        new RegExp(mock.url),
        mock.method || 'get',
        mock.tpl
    )
})
