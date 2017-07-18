const Mock = require('mockjs');

module.exports = {
    // 首页数据
    index_db: Mock.mock({
        'data': [{
            'name': '推荐课程',
            'url': '1',
            'sub': [{
                'id': '1',
                'img': "@image('682x368', '#ddd','#fff')",
                'title|6-15': "@cword",
                'jiage|1': ['12', '12', '123'],
                'renshu|1': ['132', '122', '1233']
            }]
        }, {
            'name': 'STEAM课程',
            'url': '2',
            'sub|6': [{
                'id': '2',
                'img': "@image('330x240', '#ddd','#fff')",
                'title|6-15': "@cword",
                'jiage|1': ['12', '12', '123'],
                'renshu|1': ['132', '122', '1233']
            }]
        }, {
            'name': '生涯研学',
            'url': '3',
            'sub|6': [{
                'id': '1',
                'img': "@image('330x240', '#ddd','#fff')",
                'title|6-15': "@cword",
                'jiage|1': ['12', '12', '123'],
                'renshu|1': ['132', '122', '1233']
            }]
        }, {
            'name': '生涯拓展',
            'url': '4',
            'sub|6': [{
                'id': '1',
                'img': "@image('330x240', '#ddd','#fff')",
                'title|6-15': "@cword",
                'jiage|1': ['12', '12', '123'],
                'renshu|1': ['132', '122', '1233']
            }]
        }, ]
    })

};
