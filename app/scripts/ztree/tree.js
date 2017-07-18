/**
 * Created by likuan on 9/22 0022.
 */
requirejs.config({
    paths : {
        "ztreeall": "scripts/ztree/jquery.ztree.all.min",
        "ztree": "scripts/ztree/jquery.ztree.core.min",
        "excheck": "scripts/ztree/jquery.ztree.excheck.min"
    },
    shim : {//兼容不符合AMD规范的脚本
        "ztree": {exports: 'ztree'},
        "excheck": {exports: 'excheck'}
    }
});
require(['ztreeall'],function() {
    var fufei =function (tag){
        if(!tag.hasClass("tree-yifu2")){
                tag.addClass('tree-yifu2');
        }else{
            tag.removeClass('tree-yifu2');
        }
    };
    var setting = {
        view: {
            showIcon: false,
            nameIsHTML: true,
            autoCancelSelected: false
        },
        check: {
            enable: true,
            chkStyle: "checkbox",
            chkboxType: { "Y": "s", "N": "s" }
        },
        data: {
            simpleData: {
                enable: true
            }
        }
    };
    var zNodes =[
        { id:1, pId:0, name:"学校<samp class='tree-yifu ' onclick='comm.fun.fufei($(this))'></samp>", open:false},
            { id:1.1, pId:1, name:"学校信息设置", open:true},
            { id:1.2, pId:1, name:"年级段设置", open:true},
            { id:1.3, pId:1, name:"年级段设置", open:true},
            { id:1.4, pId:1, name:"班级设置",open:true},
                { id:1.41, pId:1.4, name:"行政班管理"},
                { id:1.42, pId:1.4, name:"走班管理"},
                { id:1.43, pId:1.4, name:"添加走班"},
                { id:1.44, pId:1.4, name:"修改走班"},
            { id:1.5, pId:1, name:"教室设置", open:true},
            { id:1.6, pId:1, name:"科目设置", open:true},
                { id:1.61, pId:1.6, name:"课程管理"},
                { id:1.62, pId:1.6, name:"实践课"},
            { id:1.7, pId:1, name:"人员管理", open:true},
                { id:1.71, pId:1.7, name:"学校账号管理"},
                { id:1.72, pId:1.7, name:"角色权限管理"},
                { id:1.73, pId:1.7, name:"科室设置"},
                { id:1.74, pId:1.7, name:"教师管理"},
                { id:1.75, pId:1.7, name:"学生管理"},
        { id:2, pId:0, name:"生涯测评<samp class='tree-yifu' onclick='comm.fun.fufei($(this))'></samp>", open:false},
            { id:2.1, pId:2, name:"测评列表"},
                { id:2.11, pId:2.1, name:"新建问卷"},
                { id:2.12, pId:2.1, name:"修改问卷"},
                { id:2.13, pId:2.1, name:"问卷统计"},
                { id:2.14, pId:2.1, name:"查看问卷调查"},
                { id:2.15, pId:2.1, name:"修改问卷"},
                { id:2.16, pId:2.1, name:"查看报告"},
            { id:2.2, pId:2, name:"已做的测评", open:true},
        { id:3, pId:0, name:"学职信息<samp class='tree-yifu' onclick='comm.fun.fufei($(this))'></samp>", checked:false, open:false},
            { id:3.1, pId:3, name:"大学库", open:true},
                { id:3.11, pId:3.1, name:"添加学校",open:true},
            { id:3.2, pId:3, name:"专业库", open:true},
                { id:3.21, pId:3.2, name:"新建专业",  open:true},
            { id:3.3, pId:3, name:"职业库", open:true},
                { id:3.31, pId:3.3, name:"新建职业", open:true},
            { id:3.4, pId:3, name:"院校数据查询", open:true},
            { id:3.5, pId:3, name:"专业数据查询",  open:true},
            { id:3.6, pId:3, name:"招生计划查询",  open:true},
        { id:4, pId:0, name:"决策<samp class='tree-yifu no-fufei' onclick='comm.fun.fufei($(this))'></samp>", open:false},
            { id:4.1, pId:4, name:"决策报告", open:true},
            { id:4.2, pId:4, name:"高考志愿表", open:true},
            { id:4.3, pId:4, name:"志愿填报评估报表", open:true},
            { id:4.4, pId:4, name:"成长激励", open:true},
            { id:4.5, pId:4, name:"6选3选科策略", open:true},
            { id:4.6, pId:4, name:"7选3选科策略", open:true},
            { id:4.7, pId:4, name:"我的志愿表", open:true},
            { id:4.8, pId:4, name:"模拟志愿填报", open:true},
            { id:4.9, pId:4, name:"成长激励", open:true},
            { id:4.10, pId:4, name:"正式志愿填报", open:true},
            { id:4.11, pId:4, name:"目标激励3", open:true},
            { id:4.12, pId:4, name:"学生志愿表", open:true},
        { id:5, pId:0, name:"档案<samp class='tree-yifu' onclick='comm.fun.fufei($(this))'></samp>", open:false},
            { id:5.1, pId:5, name:"档案批量添加详情页", open:true},
            { id:5.2, pId:5, name:"时光轴成绩详情", open:true},
            { id:5.3, pId:5, name:"时光轴笔记详情", open:true},
            { id:5.4, pId:5, name:"日志批量添加", open:true},
            { id:5.5, pId:5, name:"学生添加笔记", open:true},
            { id:5.6, pId:5, name:"时光轴", open:true},
            { id:5.7, pId:5, name:"成长日志", open:true},
            { id:5.8, pId:5, name:"档案中心", open:true},
            { id:5.9, pId:5, name:"学生列表", open:true},
        { id:6, pId:0, name:"生涯教辅<samp class='tree-yifu no-fufei' onclick='comm.fun.fufei($(this))'></samp>", open:false},
            { id:6.1, pId:6, name:"教辅详情页", open:true},
            { id:6.2, pId:6, name:"案例资源", open:true},
            { id:6.3, pId:6, name:"案例上传", open:true},
            { id:6.4, pId:6, name:"慕课视频", open:true},
            { id:6.5, pId:6, name:"教辅管理", open:true},
        { id:7, pId:0, name:"课表<samp class='tree-yifu no-fufei' onclick='comm.fun.fufei($(this))'></samp>", open:false},
            { id:7.1, pId:7, name:"当前课表", open:true},
        { id:8, pId:0, name:"创建预选课任务<samp class='tree-yifu no-fufei' onclick='comm.fun.fufei($(this))'></samp>", open:true},
        { id:9, pId:0, name:"教务<samp class='tree-yifu no-fufei' onclick='comm.fun.fufei($(this))'></samp>", open:false},
            { id:9.1, pId:9, name:"预选课", open:true},
            { id:9.2, pId:9, name:"预选任务", open:true},
            { id:9.3, pId:9, name:"排课规则", open:true},
            { id:9.4, pId:9, name:"排课任务", open:true},
                { id:9.41, pId:9.4, name:"创建预选任务", open:true},
                { id:9.42, pId:9.4, name:"创建排课任务", open:true},
            { id:9.5, pId:9, name:"课表查询", open:true},
            { id:9.6, pId:9, name:"假期设置", open:true},
        { id:10, pId:0, name:"成绩<samp class='tree-yifu no-fufei' onclick='comm.fun.fufei($(this))'></samp>", open:false},
            { id:10.1, pId:10, name:"学生成绩查询", open:true},
            { id:10.2, pId:10, name:"学生成绩跟踪", open:true},
            { id:10.3, pId:10, name:"上传成绩", open:true},
            { id:10.4, pId:10, name:"上传管理", open:true},
            { id:10.5, pId:10, name:"班级成绩", open:true},
                { id:10.51, pId:10.5, name:"班级三率统计", open:true},
                { id:10.52, pId:10.5, name:"平均成绩分析", open:true},
                { id:10.53, pId:10.5, name:"平均排名分析", open:true},
                { id:10.54, pId:10.5, name:"班级历次成绩", open:true},
                { id:10.55, pId:10.5, name:"班级分段对比", open:true},
                { id:10.56, pId:10.5, name:"班级三参统计", open:true},
                { id:10.57, pId:10.5, name:"教师平均成绩", open:true},
                { id:10.58, pId:10.5, name:"班级积分对比", open:true},
            { id:10.6, pId:10, name:"学生成绩", open:true},
                { id:10.61, pId:10.6, name:"学生成绩查询", open:true},
                { id:10.61, pId:10.6, name:"学生成绩跟踪", open:true},
                { id:10.61, pId:10.6, name:"学生等级查询", open:true},
                { id:10.61, pId:10.6, name:"学生排名对比", open:true},
                { id:10.61, pId:10.6, name:"学生偏科对比", open:true},
        { id:11, pId:0, name:"导师制<samp class='tree-yifu no-fufei' onclick='comm.fun.fufei($(this))'></samp>", open:false},
            { id:11.1, pId:11, name:"消息中心", open:true},
            { id:11.2, pId:11, name:"选择导师", open:true},
            { id:11.3, pId:11, name:"开始群聊", open:true},
        { id:12, pId:0, name:"通知<samp class='tree-yifu no-fufei' onclick='comm.fun.fufei($(this))'></samp>", open:false},
            { id:12.1, pId:12, name:"通知列表", open:true},
            { id:12.2, pId:12, name:"添加通知", open:true},
        { id:13, pId:0, name:"活动<samp class='tree-yifu no-fufei' onclick='comm.fun.fufei($(this))'></samp>", open:false},
            { id:13.1, pId:13, name:"活动列表", open:true},
            { id:13.2, pId:13, name:"添加活动", open:true},
        { id:14, pId:0, name:"系统<samp class='tree-yifu no-fufei' onclick='comm.fun.fufei($(this))'></samp>", open:false},
            { id:14.1, pId:14, name:"页面管理", open:true},
            { id:14.2, pId:14, name:"意见反馈", open:true},
            { id:14.3, pId:14, name:"订单管理", open:true}
    ];
    var code;
    function setCheck() {
        var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
            py = $("#py").attr("checked")? "p":"",
            sy = $("#sy").attr("checked")? "s":"",
            pn = $("#pn").attr("checked")? "p":"",
            sn = $("#sn").attr("checked")? "s":"",
            type = { "Y":py + sy, "N":pn + sn};
            //zTree.setting.check.chkboxType = type;
            showCode('setting.check.chkboxType = { "Y" : "' + type.Y + '", "N" : "' + type.N + '" };');
            menu_hei();
    }
    function showCode(str) {
        if (!code) code = $("#code");
        code.empty();
        code.append("<li>"+str+"</li>");


    }
    $(document).ready(function(){
        setTimeout(function(){
            menu_hei();
        },100);
        $.fn.zTree.init($("#treeDemo"), setting, zNodes);
        setCheck();
        $("#py").bind("change", setCheck);
        $("#sy").bind("change", setCheck);
        $("#pn").bind("change", setCheck);
        $("#sn").bind("change", setCheck);
    });
});
