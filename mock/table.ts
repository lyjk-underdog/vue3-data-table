type mock = {
    url: string | RegExp,
    method: 'get' | 'post' | 'put' | 'delete',
    tpl: Function
}

const mocks: mock[] = [
    {
        url: /table\/list/,
        method: 'get',
        tpl() {
            return {
                data: {
                    rows: [
                        { name: 'lyjk' }
                    ],
                    total: 100,
                },
                code: 200
            }
        }
    }
]

export default mocks;