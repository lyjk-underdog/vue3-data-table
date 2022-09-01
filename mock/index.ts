import Mock from 'mockjs'
import tableMocks from './table';

Mock.setup({
    timeout: 1500
})

const mocks = [
    ...tableMocks
];

mocks.forEach(mock => {
    Mock.mock(
        new RegExp(mock.url),
        mock.method || 'get',
        mock.tpl,
    )
})
