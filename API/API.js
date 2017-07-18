const Mock = require('mockjs');

module.exports = {
    // 时光抽，，评论详情
    sgc_info_pingjia: Mock.mock({
            'id': 1,
            'title|20-40': '@cword',
            'time': '@date',
            'g_tag|3-4': '@cword',
            'jianjie': '',
            'content|2': [
                {
                    "id|+1": 1,
                    "name|4-7": "@cword",
                    "ziji|2": [
                        {
                            "id|+1": 1,
                            "name|4-6": "@cword",
                            "check|1": ["1", "2", "3", "4"]
                        }
                    ],
                }
            ],
            'yijian|20-50': '@cword'
        }
    ),
};
