type mock = {
    url: string | RegExp,
    method: 'get' | 'post' | 'put' | 'delete',
    tpl: (request: { url: string, body: string }) => any
}

let uid = 1;

let getUid = () => String(uid++);

let data = [
    {
        id: getUid(),
        name: "石强",
        age: 29
    },
    {
        id: getUid(),
        name: "易勇",
        age: 21
    }
]


const mocks: mock[] = [
    {
        url: /\/table\/data\/list/,
        method: 'get',
        tpl({ url }) {

            console.log(url);

            return {
                code: 200,
                message: 'ok',
                data: {
                    rows: data,
                    total: 100
                }
            }
        }
    },

    {
        url: /\/table\/data\/(?<id>\w+)/,
        method: 'get',
        tpl({ url }) {

            let { id: targetId } = /\/table\/data\/(?<id>\w+)/.exec(url)?.groups!;

            let target = data.find(item => item.id === targetId);
            console.log(url);

            return {
                code: 200,
                message: 'ok',
                data: target
            }
        }
    },

    {
        url: /\/table\/data/,
        method: 'post',
        tpl({ body }) {
            let bodyObj = JSON.parse(body);

            console.log(bodyObj);
            

            data.push({ id: getUid(), ...bodyObj });

            return {
                code: 200,
                message: 'ok'
            }
        }
    },

    {
        url: /\/table\/data\/(?<id>\w+)/,
        method: 'delete',
        tpl({ url }) {
            console.log(url);

            let { id: targetId } = /\/table\/data\/(?<id>\w+)/.exec(url)?.groups!;

            data = data.filter(item => item.id !== targetId);

            return {
                code: 200,
                message: 'ok'
            }
        }
    },

    {
        url: /\/table\/data/,
        method: 'put',
        tpl({ body }) {

            let bodyObj = JSON.parse(body);
            let targetId = bodyObj.id;
            console.log(bodyObj);

            let target = data.find(item => item.id === targetId);

            Object.assign(target!, { ...bodyObj })

            return {
                code: 200,
                message: 'ok'
            }
        }
    }
]

export default mocks;