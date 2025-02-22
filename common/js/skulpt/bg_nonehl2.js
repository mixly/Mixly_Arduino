//这一版删除了所有延时和高亮效果，用以适应非分步调试
// 监听属性getter/setter
const defineProperty = function(obj, property) {
    return Sk.misceval.callsimOrSuspend(Sk.builtins.property, new Sk.builtin.func(function(self) {
      if (typeof obj === 'function') {
        return obj(self)
      } else {
        return Sk.ffi.remapToPy(self[obj][property])
      }
    }), new Sk.builtin.func(function(self, val) {
      if (typeof property === 'function') {
        property(self, val)
      } else {
        self[obj][property] = val.v;
      }
    }))
} 
    
  
var $builtinmodule = function (name) {
	let mod= {__name__: new Sk.builtin.str("bg_nonehl")};
    
    var svg = d3.select('#blocklySVG').append('svg');
    
    //其他变量设置
    var map=//迷宫布局
        [[0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 2, 1, 1, 1, 1, 3, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]]
    var DirectionType={//移动方向的类型
        NORTH: 0,
        EAST: 1,
        SOUTH: 2,
        WEST: 3
    }
    var ResultType = {
        UNSET: 0,
        SUCCESS: 1,
        FAILURE: -1,
        TIMEOUT: 2,
        ERROR: -2
    }
    var tile_SHAPES = {
        '10010': [4, 0],  // Dead ends
        '10001': [3, 3],
        '11000': [0, 1],
        '10100': [0, 2],
        '11010': [4, 1],  // Vertical
        '10101': [3, 2],  // Horizontal
        '10110': [0, 0],  // Elbows
        '10011': [2, 0],
        '11001': [4, 2],
        '11100': [2, 3],
        '11110': [1, 1],  // Junctions
        '10111': [1, 0],
        '11011': [2, 1],
        '11101': [1, 2],
        '11111': [2, 2],  // Cross
        'null0': [4, 3],  // Empty
        'null1': [3, 0],
        'null2': [3, 1],
        'null3': [0, 3],
        'null4': [1, 3]
    }
    // 角色变量
    var actor={
        img : "../common/js/skulpt_mixtoy/pic/pegman.png",
        height : 52,
        width : 49,
        direction : DirectionType.EAST,
        type:"animate",
        x : 0,
        y : 0,
        stepSpeed : 150,
        coin_point:0,
        marker_num:0,
        oil:1,//表示小车有充足的油量（为了适应教材而新增的变量）
        traffic_light:22,//表示红绿灯为绿灯
        circulation_num:0,//小车在赛道中循环的次数
        apart_markers:{"redmarker":0,"yellowmarker":0,"bluemarker":0,"greenmarker":0}
    };
    //迷宫变量
    var maze_SQUARE_SIZE = 50;
    var maze_ROWS=map.length;
    var maze_COLS=map[0].length;
    var maze_marker_num=0;//迷宫中标记点的数目
    var maze={
        mlevel:0,
        tiles: '../common/js/skulpt_mixtoy/pic/maze_path.png',//地图路径图片
        marker: '../common/js/skulpt_mixtoy/pic/marker.png',//终点图标图片
        background: '../common/js/skulpt_mixtoy/pic/bg_default.png',//地图背景图片
        wall:'../common/js/skulpt_mixtoy/pic/wall.png',
        award:'../common/js/skulpt_mixtoy/pic/award.png',
        barrier:'../common/js/skulpt_mixtoy/pic/roadblock.png',
        markers:['../common/js/skulpt_mixtoy/pic/book/red.png','../common/js/skulpt_mixtoy/pic/book/yellow.png','../common/js/skulpt_mixtoy/pic/book/blue.png','../common/js/skulpt_mixtoy/pic/book/green.png'],
        SquareType :{//迷宫中方块的类型
            WALL: 0,
            OPEN: 1,
            START: 2,
            FINISH: 3,
            AWARD:4,//金币奖励
            BARRIER:5,//障碍物
            MARKER1:10,
            MARKER2:11,
            MARKER3:12,
            MARKER4:13,
        },
        //迷宫部分参数指定
        MAZE_WIDTH : maze_SQUARE_SIZE * maze_COLS,
        MAZE_HEIGHT : maze_SQUARE_SIZE * maze_ROWS,
        PATH_WIDTH : maze_SQUARE_SIZE / 3,
        result :  ResultType.UNSET,
        finish : {x:0,y:0},
        type:1//类型为用户自定义的
    };
    //简单的迷宫任务，不是小车的迷宫场景
    var simple_map_para={
        tiles: '../common/js/skulpt_mixtoy/pic/tiles_astro.png',//地图路径图片
        marker: '../common/js/skulpt_mixtoy/pic/marker.png',//终点图标图片
        background: '../common/js/skulpt_mixtoy/pic/bg_astro.jpg',//地图背景图片
        wall:'',
        state_num:1//为0就是未使用，为1就是已经使用（激活）
    }
    var simple_Maze=[
        //第一关
        {
            mlevel:1,
            map:[[0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 2, 1, 1, 1, 1, 3, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]],
        },
        //第二关
        {
            mlevel:2,
            map:[
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 3],
            [0, 0, 0, 0, 0, 1, 1, 0],
            [0, 0, 0, 0, 1, 1, 0, 0],
            [0, 0, 0, 1, 1, 0, 0, 0],
            [0, 0, 1, 1, 0, 0, 0, 0],
            [0, 1, 1, 0, 0, 0, 0, 0],
            [2, 1, 0, 0, 0, 0, 0, 0]],
        },
        //第三关
        {
            mlevel:3,
            map:[
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 0, 3, 0, 1, 0],
            [0, 1, 1, 0, 1, 1, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 0, 1, 0, 0, 1, 0],
            [0, 2, 1, 1, 1, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]]
        },
        //第四关
        {
            mlevel:4,
            map:[
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 0],
            [0, 0, 1, 0, 0, 0, 1, 0],
            [0, 0, 1, 1, 3, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 1, 0],
            [0, 0, 2, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]]
        },
        //第五关
        {
            mlevel:5,
            map:[
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 2, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 3, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]]
        },
        //第六关
        {
            mlevel:6,
            map:[
            [0, 0, 1, 1, 1, 0, 1, 1, 1],
            [0, 0, 1, 0, 1, 0, 1, 0, 1],
            [2, 1, 1, 0, 1, 1, 1, 0, 3],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]]
        },
        //第七关
        {
            mlevel:7,
            map:[
            [0, 0, 1, 1, 1],
            [0, 0, 1, 0, 1],
            [2, 1, 1, Math.random()>0.5?1:5, 3]],
            // tiles: '../common/js/skulpt_mixtoy/pic/maze_path.png',//地图路径图片
            // marker: '../common/js/skulpt_mixtoy/pic/marker.png',//终点图标图片
            // background: '',//地图背景图片
        },
        //第八关
        {
            mlevel:8,
            map:[
            [0, 0, 1, 1, 1, 1],
            [0, 0, 1, 0, 0, 1],
            [0, 1, 1, Math.random()>0.5?1:5, 1, 1],
            [0, 1, 0, 0, 0, 1],
            [2, 1, Math.random()>0.5?1:5, 1, 1, 3]],
            // tiles: '../common/js/skulpt_mixtoy/pic/maze_path.png',//地图路径图片
            // marker: '../common/js/skulpt_mixtoy/pic/marker.png',//终点图标图片
            // background: '',//地图背景图片
        },
        //第九关
        {
            mlevel:9,
            map:[
            [1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 4, 1, 1, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
            [0, 1, 0, 0, Math.random()>0.5?1:5, 0, 1, 0, 0, 0],
            [0, 1, 0, 0, 4, 0, 1, Math.random()>0.5?1:5, 4, 0],
            [0, 1, 0, 0, 1, 0, 1, 0, 1, 0],
            [0, 0, 0, 0, 1, 1, 1, 1, 3, 0]]
        },
        //第十关
        {
            mlevel:10,
            map:[
            [3, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 0, 0],
            [0, 1, 0, 1, 0, 1],
            [0, 1, 0, 1, 1, 1],
            [0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 2, 1]]
        },
        //第十一关
        {
            mlevel:11,
            map:[
            [3, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 2]]
        },
        //第十二关
        {
            mlevel:12,
            map:[
            [0, 0, 0, 0, 0, 0],
            [0, 3, 1, 1, 0, 0],
            [0, 0, 0, 1, 0, 1],
            [0, 0, 0, 1, 1, 1],
            [0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 2]]
        },
        //第十三关
        {
            mlevel:13,
            map:[
            [3, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 0, 0],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 0, 1, 1, 1],
            [0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 2, 1]]
        },
        //第十四关
        {
            mlevel:14,
            map:[
            [1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 1],
            [3, 1, 1, 1, Math.random()>0.5?1:5, 1],
            [0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 2]]
        },
        //第十五关
        {
            mlevel:15,
            map:[
            [1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 0, 1],
            [1, 0, 0, 1,  Math.random()>0.5?1:5, 1],
            [1, 3, 1,  Math.random()>0.5?1:5, 0, 1],
            [0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 2]]
        },
        //第十六关
        {
            mlevel:16,
            map:[
            [1, 1, 1, 1, 0, 0],
            [1, 0, 0, 1, 0, 0],
            [1, 1, Math.random()>0.5?1:5, 1, 1, 1],
            [1, 0, 0, Math.random()>0.5?1:5, 0, 1],
            [3, 1, 1, 1, 0, 1],
            [0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 2]]
        },
        //第十七关
        {
            mlevel:17,
            map:[
            [1, 1, 1, 1, 0, 0],
            [1, 0, 0, 1, 0, 0],
            [1, 1, Math.random()>0.5?1:5, 1, 1, 2],
            [1, 0, 0, Math.random()>0.5?1:5, 0, 0],
            [1, 3, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0]]
        }
    ]


    //已经设置好的关卡的map
    var MAZE_setted=[
        //第一关
        {   mlevel:1,
            map:[
            [0, 1, 1, 13, 1, 1, 12, 0],
            [0, 1, 0, 1, 0, 0, 1, 0],
            [0, 1, 1, 9, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 0, 1, 0],
            [0, 0, 0, 10, 1, 1, 11, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]],
            tiles: 'https://cdn.jsdelivr.net/gh/LIAO-wanting/skulpt_pj@latest/pic/book/tiles_road.png',//地图路径图片
            marker: '../common/js/skulpt_mixtoy/pic/book/Start_final.png',//终点图标图片
            background: '../common/js/skulpt_mixtoy/pic/book/bg_car1.png',//地图背景图片
            wall:'',
            award:'',
            barrier:'',
            markers:['../common/js/skulpt_mixtoy/pic/book/red.png','../common/js/skulpt_mixtoy/pic/book/yellow.png','../common/js/skulpt_mixtoy/pic/book/blue.png','../common/js/skulpt_mixtoy/pic/book/green.png'],
            SquareType :{//迷宫中方块的类型
                WALL: 0,
                OPEN: 1,
                MARKER1:10,
                MARKER2:11,
                MARKER3:12,
                MARKER4:13,
                S_F: 9,//既是起点又是终点
            },
            //迷宫部分参数指定
            MAZE_WIDTH : maze_SQUARE_SIZE * 8,
            MAZE_HEIGHT : maze_SQUARE_SIZE * 8,
            PATH_WIDTH : maze_SQUARE_SIZE / 3,
            result :  ResultType.UNSET,
            finish : {x:0,y:0},
            type:0//类型为非用户自定义的
        },
        //第二关
        {   
            mlevel:2,
            map:[
            [0, 1, 1, 13, 1, 1, 12, 0],
            [0, 1, 0, 5, 0, 0, 1, 0],
            [0, 1, 1, 9, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 0, 1, 0],
            [0, 0, 0, 10, 1, 1, 11, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]],
            tiles: 'https://cdn.jsdelivr.net/gh/LIAO-wanting/skulpt_pj@latest/pic/book/tiles_road.png',//地图路径图片
            marker: '../common/js/skulpt_mixtoy/pic/book/Start_final.png',//终点图标图片
            background: '../common/js/skulpt_mixtoy/pic/book/bg_car2.png',//地图背景图片
            wall:'',
            award:'',
            barrier:'../common/js/skulpt_mixtoy/pic/book/barrier.png',
            markers:['../common/js/skulpt_mixtoy/pic/book/red.png','../common/js/skulpt_mixtoy/pic/book/yellow.png','../common/js/skulpt_mixtoy/pic/book/blue.png','../common/js/skulpt_mixtoy/pic/book/green.png'],
            SquareType :{//迷宫中方块的类型
                WALL: 0,
                OPEN: 1,
                BARRIER:5,
                MARKER1:10,
                MARKER2:11,
                MARKER3:12,
                MARKER4:13,
                S_F: 9,//既是起点又是终点
            },
            //迷宫部分参数指定
            MAZE_WIDTH : maze_SQUARE_SIZE * 8,
            MAZE_HEIGHT : maze_SQUARE_SIZE * 8,
            PATH_WIDTH : maze_SQUARE_SIZE / 3,
            result :  ResultType.UNSET,
            finish : {x:0,y:0},
            type:0//类型为非用户自定义的
        },
        //第三关
        {   mlevel:3,
            map:[
            [0, 1, 1, 13, 1, 1, 1, 0],
            [0, 1, 0, Math.random()>0.5?1:5, 0, 0, 1, 0],
            [0, 1, 1, 9, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 0, 1, 0],
            [0, 0, 0, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]],
            tiles: 'https://cdn.jsdelivr.net/gh/LIAO-wanting/skulpt_pj@latest/pic/book/tiles_road.png',//地图路径图片
            marker: '../common/js/skulpt_mixtoy/pic/book/Start_final.png',//终点图标图片
            background: '../common/js/skulpt_mixtoy/pic/book/bg_car2.png',//地图背景图片
            wall:'',
            award:'',
            barrier:'../common/js/skulpt_mixtoy/pic/book/barrier.png',
            markers:['../common/js/skulpt_mixtoy/pic/book/red.png','../common/js/skulpt_mixtoy/pic/book/yellow.png','../common/js/skulpt_mixtoy/pic/book/blue.png','../common/js/skulpt_mixtoy/pic/book/green.png'],
            SquareType :{//迷宫中方块的类型
                WALL: 0,
                OPEN: 1,
                BARRIER:5,
                MARKER4:13,
                S_F: 9,//既是起点又是终点
            },
            //迷宫部分参数指定
            MAZE_WIDTH : maze_SQUARE_SIZE * 8,
            MAZE_HEIGHT : maze_SQUARE_SIZE * 8,
            PATH_WIDTH : maze_SQUARE_SIZE / 3,
            result :  ResultType.UNSET,
            finish : {x:0,y:0},
            type:0//类型为非用户自定义的
        },
        //第四关
        {   mlevel:4,
            map:[
            [0, 1, 1, 13, 1, 1, 1, 0],
            [20, 1, 0, Math.random()>0.5?1:5, 0, 0, 1, 0],
            [0, 1, 1, 9, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 0, 1, 0],
            [0, 0, 0, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]],
            tiles: 'https://cdn.jsdelivr.net/gh/LIAO-wanting/skulpt_pj@latest/pic/book/tiles_road.png',//地图路径图片
            marker: '../common/js/skulpt_mixtoy/pic/book/Start_final.png',//终点图标图片
            background: '../common/js/skulpt_mixtoy/pic/book/bg_car3.png',//地图背景图片
            wall:'',
            award:'',
            barrier:'../common/js/skulpt_mixtoy/pic/book/barrier.png',
            markers:['../common/js/skulpt_mixtoy/pic/book/red.png','../common/js/skulpt_mixtoy/pic/book/yellow.png','../common/js/skulpt_mixtoy/pic/book/blue.png','../common/js/skulpt_mixtoy/pic/book/green.png'],
            SquareType :{//迷宫中方块的类型
                WALL: 0,
                OPEN: 1,
                BARRIER:5,
                MARKER4:13,
                S_F: 9,//既是起点又是终点
                OIL_STATION:20//加油站
            },
            //迷宫部分参数指定
            MAZE_WIDTH : maze_SQUARE_SIZE * 8,
            MAZE_HEIGHT : maze_SQUARE_SIZE * 8,
            PATH_WIDTH : maze_SQUARE_SIZE / 3,
            result :  ResultType.UNSET,
            finish : {x:0,y:0},
            type:0//类型为非用户自定义的
        },
        //第五关
        {   mlevel:5,
            map:[
            [0, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 0, 0, 0, 0, 1, 0],
            [0, 1, 1, 2, 21, 0, 1, 0],
            [0, 0, 0, 1, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 0, 1, 0],
            [0, 0, 0, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]],
            tiles: 'https://cdn.jsdelivr.net/gh/LIAO-wanting/skulpt_pj@latest/pic/book/tiles_road.png',//地图路径图片
            marker: '../common/js/skulpt_mixtoy/pic/book/Start_final.png',//终点图标图片
            background: '../common/js/skulpt_mixtoy/pic/book/bg_car4.png',//地图背景图片
            wall:'',
            award:'',
            barrier:'',
            markers:[],
            SquareType :{//迷宫中方块的类型
                WALL: 0,
                OPEN: 1,
                START: 2,
                S_F: 9,//既是起点又是终点
                TRAFFIC_LIGHT:21//红绿灯
            },
            //迷宫部分参数指定
            MAZE_WIDTH : maze_SQUARE_SIZE * 8,
            MAZE_HEIGHT : maze_SQUARE_SIZE * 8,
            PATH_WIDTH : maze_SQUARE_SIZE / 3,
            result :  ResultType.UNSET,
            finish : {x:0,y:0},
            type:0//类型为非用户自定义的
        },
        //第六关
        {   mlevel:6,
            map:[
            [0, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 0, 0, 0, 0, 1, 0],
            [0, 1, 1, 2, 22, 0, 1, 0],
            [0, 0, 0, 1, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 0, 1, 0],
            [0, 0, 0, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]],
            tiles: 'https://cdn.jsdelivr.net/gh/LIAO-wanting/skulpt_pj@latest/pic/book/tiles_road.png',//地图路径图片
            marker: '../common/js/skulpt_mixtoy/pic/book/Start_final.png',//终点图标图片
            background: '../common/js/skulpt_mixtoy/pic/book/bg_car4.png',//地图背景图片
            wall:'',
            award:'',
            barrier:'',
            markers:[],
            SquareType :{//迷宫中方块的类型
                WALL: 0,
                OPEN: 1,
                START: 2,
                S_F: 9,//既是起点又是终点
                LIGHT_GREEN:22,//红绿灯中的绿灯
                LIGHT_RED:23//红绿灯中的红灯
            },
            //迷宫部分参数指定
            MAZE_WIDTH : maze_SQUARE_SIZE * 8,
            MAZE_HEIGHT : maze_SQUARE_SIZE * 8,
            PATH_WIDTH : maze_SQUARE_SIZE / 3,
            result :  ResultType.UNSET,
            finish : {x:0,y:0},
            type:0//类型为非用户自定义的
        }
    ]

   /**
     * Display Pegman at the specified location, facing the specified direction.
     * @param {number} x Horizontal grid (or fraction thereof).
     * @param {number} y Vertical grid (or fraction thereof).
     * @param {number} d Direction (0 - 15) or dance (16 - 17).
     * @param {number=} opt_angle Optional angle (in degrees) to rotate Pegman.
     */
    var displayPegman = function(x, y, d, opt_angle) {
        var pegmanIcon = $('#pegman');
        if(actor.type=='animate'){
            if(maze.type==0 || actor.img=='https://cdn.jsdelivr.net/gh/LIAO-wanting/skulpt_pj@latest/pic/book/actor_car.png' ){
                pegmanIcon.attr('x', x * maze_SQUARE_SIZE - d * actor.width+ 1);
                pegmanIcon.attr('y', maze_SQUARE_SIZE * (y + 0.5) - actor.height / 2 );
            }else{
                pegmanIcon.attr('x', x * maze_SQUARE_SIZE - d * actor.width + 1);
                pegmanIcon.attr('y', maze_SQUARE_SIZE * (y + 0.5) - actor.height / 2 - 8);
            }
            if (opt_angle) {
                pegmanIcon.attr('transform', 'rotate(' + opt_angle + ', ' +
                    (x * maze_SQUARE_SIZE + maze_SQUARE_SIZE / 2) + ', ' +
                    (y * maze_SQUARE_SIZE + maze_SQUARE_SIZE / 2) + ')');
              } else {
                pegmanIcon.attr('transform', 'rotate(0, 0, 0)');
              }
        }else{
            pegmanIcon.attr('x', x * maze_SQUARE_SIZE + 1);
            pegmanIcon.attr('y', maze_SQUARE_SIZE * (y + 0.5) - actor.height / 2 );
        }
        var clipRect = $('#clipRect');
        clipRect.attr('x', x * maze_SQUARE_SIZE + 1);
        clipRect.attr('y', pegmanIcon.attr('y'));
      };

    var initPegman=function(){
        // Pegman's clipPath element, whose (x, y) is reset by Maze.displayPegman
        svg.append('clipPath').attr('id','pegmanClipPath')
        d3.select("#pegmanClipPath").append('rect').attr('id','clipRect').attr('width', actor.width).attr('height', actor.height)

        if(actor.type=="animate"){
            if(maze.type==0 || actor.img=='https://cdn.jsdelivr.net/gh/LIAO-wanting/skulpt_pj@latest/pic/book/actor_car.png'){
                //绘制精灵.
                svg.append('image').attr('id','pegman').attr('width', actor.width * 16).attr('height',  actor.height).attr('clip-path', 'url(#pegmanClipPath)')
                .attr('xlink:href',actor.img)
            }else{      
                //绘制精灵.
                svg.append('image').attr('id','pegman').attr('width', actor.width * 21).attr('height',  actor.height).attr('clip-path', 'url(#pegmanClipPath)')
                .attr('xlink:href',actor.img)
            }
        }else{
            //绘制精灵.
            svg.append('image').attr('id','pegman').attr('width', actor.width ).attr('height',  actor.height).attr('clip-path', 'url(#pegmanClipPath)')
            .attr('xlink:href',actor.img)
        }

        displayPegman(actor.x , actor.y , actor.direction*4 )
    }

    var drawMap=function(){
        svg.attr('id','game_stage')
        var scale = Math.max(maze_ROWS, maze_COLS) * maze_SQUARE_SIZE;
        svg.attr('viewBox', '0 -10 ' + scale + ' ' + (scale+10));

        // 绘制外框
        svg.append('rect').attr('x', 0).attr('y', 0).attr('width', maze.MAZE_WIDTH).attr('height', maze.MAZE_HEIGHT)
        .style('fill','#F1EEE7').style('stroke','#CCB').style('stroke-width','1');
        
        for (var y = 0; y < maze_ROWS; y++) {
            for (var x = 0; x < maze_COLS; x++) {
                //绘制迷宫背景
                svg.append('image').attr('x', x*maze_SQUARE_SIZE).attr('y', y*maze_SQUARE_SIZE).attr('width', maze_SQUARE_SIZE).attr('height',maze_SQUARE_SIZE)
                .attr('xlink:href',maze.background)
            }
        }
        // svg.append('image').attr('x', 0).attr('y', 0).attr('width', maze_SQUARE_SIZE*maze_COLS).attr('height',maze_SQUARE_SIZE*maze_ROWS)
        // .attr('xlink:href',maze.background)
        //初始化地图
        
        var normalize = function(x, y) {
            if (x < 0 || x >= maze_COLS || y < 0 || y >= maze_ROWS) {
              return '0';
            }
            return ((map[y][x] == maze.SquareType.WALL)||(map[y][x] == maze.SquareType.OIL_STATION)) ? '0' : '1';
        };
        // 依次判断格子的类型，并绘制相应格子内的图形
        var tileId = 0;
        for (var y = 0; y < maze_ROWS; y++) {
            for (var x = 0; x < maze_COLS; x++) {
                // 标记每个格子的“弯曲状态”.
                var tileShape = normalize(x, y) +
                    normalize(x, y - 1) +  // North.
                    normalize(x + 1, y) +  // West.
                    normalize(x, y + 1) +  // South.
                    normalize(x - 1, y);   // East.
                // 绘制路径.
                if (!tile_SHAPES[tileShape]) {
                    // Empty square.  Use null0 for large areas, with null1-4 for borders.
                    // Add some randomness to avoid large empty spaces.
                    if (tileShape == '00000' && Math.random() > 0.3) {
                        tileShape = 'null0';
                    } else {
                        tileShape = 'null' + Math.floor(1 + Math.random() * 4);
                    }
                }
                var left = tile_SHAPES[tileShape][0];
                var top = tile_SHAPES[tileShape][1];
                // Tile's clipPath element.
                svg.append('clipPath').attr('id','tileClipPath' + tileId)
                d3.select("#tileClipPath" + tileId).append('rect').attr('x', x * maze_SQUARE_SIZE).attr('y', y * maze_SQUARE_SIZE).attr('width',  maze_SQUARE_SIZE).attr('height',  maze_SQUARE_SIZE)
               
                if(maze.type==0){//非用户自定义
                    // Tile sprite.
                    if ((map[y][x] != maze.SquareType.WALL) && (map[y][x] != maze.SquareType.OIL_STATION) && (map[y][x] != maze.SquareType.TRAFFIC_LIGHT)&& (map[y][x] != maze.SquareType.LIGHT_GREEN)&& (map[y][x] != maze.SquareType.LIGHT_RED)) {
                        svg.append('image').attr('x', x * maze_SQUARE_SIZE).attr('y', y * maze_SQUARE_SIZE).attr('width',maze_SQUARE_SIZE ).attr('height',maze_SQUARE_SIZE )
                        .attr('clip-path', 'url(#tileClipPath' + tileId + ')').attr('xlink:href',maze.tiles)
                        tileId++;
                    } 
                }else{
                    // Tile sprite.
                    svg.append('image').attr('x',(x - left) * maze_SQUARE_SIZE).attr('y',(y - top) * maze_SQUARE_SIZE).attr('width',maze_SQUARE_SIZE * 5).attr('height',maze_SQUARE_SIZE * 4)
                    .attr('clip-path', 'url(#tileClipPath' + tileId + ')').attr('xlink:href',maze.tiles)
                    tileId++;
                }

                if(map[y][x]==0){//当地图中此处标记为墙时
                    if(maze.tiles=='../common/js/skulpt_mixtoy/pic/maze_path.png'){//当是默认方格时，显示为墙的图片
                        svg.append('image').attr('x',x * maze_SQUARE_SIZE + (maze_SQUARE_SIZE/2 - maze_SQUARE_SIZE*0.8/2)).attr('y',y * maze_SQUARE_SIZE+ (maze_SQUARE_SIZE/2 - maze_SQUARE_SIZE*0.8/2)).attr('width',maze_SQUARE_SIZE*0.8 ).attr('height',maze_SQUARE_SIZE*0.8)
                        .attr('xlink:href',maze.wall)
                    }
                }else if(map[y][x]==4){//当地图中此处标记为金币时
                    svg.append('image').attr('id','coin'+y+x).attr('x',x * maze_SQUARE_SIZE+ (maze_SQUARE_SIZE/2 - maze_SQUARE_SIZE*0.5/2)).attr('y',y * maze_SQUARE_SIZE+ (maze_SQUARE_SIZE/2 - maze_SQUARE_SIZE*0.5/2)).attr('width',maze_SQUARE_SIZE*0.5).attr('height',maze_SQUARE_SIZE*0.5)
                    .attr('xlink:href',maze.award)
                }else if(map[y][x]==5){//当地图中此处标记为障碍时
                    svg.append('image').attr('id','barrier'+y+x).attr('x',x * maze_SQUARE_SIZE+ (maze_SQUARE_SIZE/2 - maze_SQUARE_SIZE*0.7/2)).attr('y',y * maze_SQUARE_SIZE+ (maze_SQUARE_SIZE/2 - maze_SQUARE_SIZE*0.7/2)).attr('width',maze_SQUARE_SIZE*0.7).attr('height',maze_SQUARE_SIZE*0.7)
                    .attr('xlink:href',maze.barrier)
                }else if(map[y][x]==10){//当地图中此处标记为符号1——红标时
                    svg.append('image').attr('id','marker1').attr('x',x * maze_SQUARE_SIZE+ (maze_SQUARE_SIZE/2 - maze_SQUARE_SIZE*0.7/2)).attr('y',y * maze_SQUARE_SIZE+ (maze_SQUARE_SIZE/2 - maze_SQUARE_SIZE*0.7/2)).attr('width',maze_SQUARE_SIZE*0.7).attr('height',maze_SQUARE_SIZE*0.7)
                    .attr('xlink:href',maze.markers[0])
                    maze_marker_num+=1
                }else if(map[y][x]==11){//当地图中此处标记为符号2——橘标时
                    svg.append('image').attr('id','marker2').attr('x',x * maze_SQUARE_SIZE+ (maze_SQUARE_SIZE/2 - maze_SQUARE_SIZE*0.7/2)).attr('y',y * maze_SQUARE_SIZE+ (maze_SQUARE_SIZE/2 - maze_SQUARE_SIZE*0.7/2)).attr('width',maze_SQUARE_SIZE*0.7).attr('height',maze_SQUARE_SIZE*0.7)
                    .attr('xlink:href',maze.markers[1])
                    maze_marker_num+=1
                }else if(map[y][x]==12){//当地图中此处标记为符号3——蓝标时
                    svg.append('image').attr('id','marker3').attr('x',x * maze_SQUARE_SIZE+ (maze_SQUARE_SIZE/2 - maze_SQUARE_SIZE*0.7/2)).attr('y',y * maze_SQUARE_SIZE+ (maze_SQUARE_SIZE/2 - maze_SQUARE_SIZE*0.7/2)).attr('width',maze_SQUARE_SIZE*0.7).attr('height',maze_SQUARE_SIZE*0.7)
                    .attr('xlink:href',maze.markers[2])
                    maze_marker_num+=1
                }else if(map[y][x]==13){//当地图中此处标记为符号4——绿标时
                    svg.append('image').attr('id','marker4').attr('x',x * maze_SQUARE_SIZE+ (maze_SQUARE_SIZE/2 - maze_SQUARE_SIZE*0.7/2)).attr('y',y * maze_SQUARE_SIZE+ (maze_SQUARE_SIZE/2 - maze_SQUARE_SIZE*0.7/2)).attr('width',maze_SQUARE_SIZE*0.7).attr('height',maze_SQUARE_SIZE*0.7)
                    .attr('xlink:href',maze.markers[3])
                    maze_marker_num+=1
                }
            }
        }

        if(maze.type==1){
            // 绘制终点图标
            svg.append('image').attr('id','finish').attr('width',  0.5 * maze_SQUARE_SIZE).attr('height',  0.5*maze_SQUARE_SIZE).attr('xlink:href',maze.marker)
            //定位：精灵与终点初始的位置
            // Locate the start and finish squares.
            for (var y = 0; y < maze_ROWS; y++) {
                for (var x = 0; x < maze_COLS; x++) {
                    if (map[y][x] == maze.SquareType.START) {
                        actor.x= x;
                        actor.y= y;
                    }
                    if (map[y][x] == maze.SquareType.FINISH) {
                        // Move the finish icon into position.
                        var finishIcon = $('#finish');
                        finishIcon.attr('x', maze_SQUARE_SIZE * (x + 0.5) -
                            finishIcon.attr('width') / 2);
                        finishIcon.attr('y', maze_SQUARE_SIZE * (y + 0.6) -
                            finishIcon.attr('height'));
                        maze.finish={x:x,y:y}
                    }
                }
            }
        }else{
            //绘制既是起点、又是终点的坐标
            // Locate the start and finish squares.
            for (var y = 0; y < maze_ROWS; y++) {
                for (var x = 0; x < maze_COLS; x++) {
                    if (map[y][x] == 9) {//既是起点又是终点
                        // 绘制终点图标
                        svg.append('image').attr('id','finish').attr('width',  maze_SQUARE_SIZE).attr('height', maze_SQUARE_SIZE).attr('xlink:href',maze.marker)
                        actor.x= x;
                        actor.y= y;
                        var finishIcon = $('#finish');
                        finishIcon.attr('x', maze_SQUARE_SIZE * x );
                        finishIcon.attr('y', maze_SQUARE_SIZE * y+5);
                        maze.finish={x:x,y:y}
                    }else if(map[y][x]==20){//当地图中此处标记为20——加油站时
                        svg.append('image').attr('id','station').attr('x',x * maze_SQUARE_SIZE+ (maze_SQUARE_SIZE/2 - maze_SQUARE_SIZE*0.8/2)).attr('y',y * maze_SQUARE_SIZE+ (maze_SQUARE_SIZE/2 - maze_SQUARE_SIZE*0.8/2)).attr('width',maze_SQUARE_SIZE*2*0.8).attr('height',maze_SQUARE_SIZE*0.8)
                        .attr('xlink:href','../common/js/skulpt_mixtoy/pic/book/oilstation.png')
                    }else if(map[y][x]==21){//当地图中此处标记为21——红绿灯时
                        svg.append('image').attr('id','trafficlight').attr('x',x * maze_SQUARE_SIZE+ (maze_SQUARE_SIZE/2 - maze_SQUARE_SIZE*0.7/2)).attr('y',y * maze_SQUARE_SIZE+ (maze_SQUARE_SIZE/2 - maze_SQUARE_SIZE*0.7/2)).attr('width',maze_SQUARE_SIZE*0.7).attr('height',maze_SQUARE_SIZE*0.7)
                        .attr('xlink:href','../common/js/skulpt_mixtoy/pic/book/trafficlight.png')
                    }else if(map[y][x]==22){//当地图中此处标记为22——红绿灯中的绿灯时
                        svg.append('image').attr('id','lightgreen').attr('x',x * maze_SQUARE_SIZE-5).attr('y',y * maze_SQUARE_SIZE+ 5).attr('width',maze_SQUARE_SIZE).attr('height',maze_SQUARE_SIZE)
                        .attr('xlink:href','../common/js/skulpt_mixtoy/pic/book/greenlight.png')
                    }else if(map[y][x]==23){//当地图中此处标记为23——红绿灯中的红灯时
                        svg.append('image').attr('id','lightred').attr('x',x * maze_SQUARE_SIZE-5).attr('y',y * maze_SQUARE_SIZE+ 5).attr('width',maze_SQUARE_SIZE).attr('height',maze_SQUARE_SIZE)
                        .attr('xlink:href','../common/js/skulpt_mixtoy/pic/book/redlight.png')
                    }else if(map[y][x]==2){//当地图中此处标记为起点时，画上和“既是起点又是终点”一样的图标
                        actor.x= x;
                        actor.y= y;
                        svg.append('image').attr('id','start').attr('x', maze_SQUARE_SIZE * x).attr('y',maze_SQUARE_SIZE * y+5).attr('width',maze_SQUARE_SIZE).attr('height',maze_SQUARE_SIZE)
                        .attr('xlink:href',maze.marker)
                    }
                }
            }
        }
    }

    //检查是否已到终点
    var checkFinish=function(){
        maze.result = actor.x != maze.finish.x || actor.y != maze.finish.y ?
        ResultType.UNSET : ResultType.SUCCESS;
        if(maze.result==ResultType.SUCCESS){
            if(maze.type==1){
                return true
            }else{
                if(actor.marker_num==maze_marker_num){
                    return true
                }else{
                    return "error2"
                }
            }
        }else{
            return false
        }
    }

    /**
     * Is there a path next to pegman?
     * @param {number} direction Direction to look
     *     (0 = forward, 1 = right, 2 = backward, 3 = left).
     * @param {?string} id ID of block that triggered this action.
     *     Null if called as a helper function in Maze.move().
     * @return {boolean} True if there is a path.
     */
    var isPath=function(direction,id){
        var effectiveDirection = actor.direction + direction;
        var square;
        var command;
        switch (constrainDirection4(effectiveDirection)) {
            case DirectionType.NORTH:
                square = map[actor.y - 1] && map[actor.y - 1][actor.x];
                command = 'look_north';
                break;
            case DirectionType.EAST:
                square = map[actor.y][actor.x + 1];
                command = 'look_east';
                break;
            case DirectionType.SOUTH:
                square = map[actor.y + 1] && map[actor.y + 1][actor.x];
                command = 'look_south';
                break;
            case DirectionType.WEST:
                square = map[actor.y][actor.x - 1];
                command = 'look_west';
                break;
        }
        if (id) {
            return [command , square !== maze.SquareType.WALL && square !== undefined && square !== maze.SquareType.BARRIER && square !== maze.SquareType.OIL_STATION && square !== maze.SquareType.TRAFFIC_LIGHT && square !== maze.SquareType.LIGHT_RED && square !== maze.SquareType.LIGHT_GREEN]
        }
        return square !== maze.SquareType.WALL && square !== undefined && square !== maze.SquareType.BARRIER && square !== maze.SquareType.OIL_STATION && square !== maze.SquareType.TRAFFIC_LIGHT && square !== maze.SquareType.LIGHT_RED && square !== maze.SquareType.LIGHT_GREEN;
    };

    var constrainDirection4 = function(d) {
        d = Math.round(d) % 4;
        if (d < 0) {
            d += 4;
        }
        return d;
    };
    var constrainDirection16 = function(d) {
        d = Math.round(d) % 16;
        if (d < 0) {
          d += 16;
        }
        return d;
      };
    
    /**
     * Attempt to move pegman forward or backward.
     * @param {number} direction Direction to move .
     * @param {string} id ID of block that triggered this action.
     * @throws {true} If the end of the maze is reached.
     * @throws {false} If Pegman collides with a wall.
     */
    var move = function(direction) {
        if (!isPath(0, null)) {
            return false
        }
        var command;
        switch (constrainDirection4(direction)) {
            case DirectionType.NORTH:
                command = 'north';
                break;
            case DirectionType.EAST:
                command = 'east';
                break;
            case DirectionType.SOUTH:
                command = 'south';
                break;
            case DirectionType.WEST:
                command = 'west';
                break;
            }
        return command
    };

    /**
     * Turn pegman left or right.
     * @param {number} direction Direction to turn (0 = left, 1 = right).
     * @param {string} id ID of block that triggered this action.
     */
    var turn = function(direction) {
        var command;
        if (direction=='right') {
            // Right turn (clockwise).
            command='right'
        } else {
            // Left turn (counterclockwise).
            command='left'
        }
        return command
    };

    /**
     * Schedule the animations for a move or turn.
     * @param {!Array.<number>} startPos X, Y starting points.
     * @param {!Array.<number>} endPos X, Y ending points.
     */
    var schedule = function(startPos, endPos) {
        var deltas = [(endPos[0] - startPos[0]) / 4, (endPos[1] - startPos[1]) / 4, (endPos[2] - startPos[2]) / 4];
        displayPegman(startPos[0] + deltas[0], startPos[1] + deltas[1], constrainDirection16(startPos[2] + deltas[2]));
        setTimeout(function() {
            displayPegman(startPos[0] + deltas[0] * 2, startPos[1] + deltas[1] * 2, constrainDirection16(startPos[2] + deltas[2] * 2));
        }, actor.stepSpeed);
        setTimeout(function() {
            displayPegman(startPos[0] + deltas[0] * 3, startPos[1] + deltas[1] * 3, constrainDirection16(startPos[2] + deltas[2] * 3));
        }, actor.stepSpeed * 2)
        setTimeout(function() {
            displayPegman(endPos[0], endPos[1], constrainDirection16(endPos[2]));
        }, actor.stepSpeed * 3)
    };

    /**
     * 检查精灵在移动的过程中是否吃到了金币
     * @param {<number>} x 当前精灵的横坐标.
     * @param {<number>} y 当前精灵的纵坐标.
     */
     var hasCoin=function(x , y) {
        if(map[y][x]==maze.SquareType.AWARD){//如果此处是金币
            setTimeout(function() {
                $('#coin'+y+x).remove()
            }, actor.stepSpeed * 3)
            map[y][x]=maze.SquareType.OPEN
            actor.coin_point+=1
        }
     }
    
     /**
     * 检查精灵在移动的过程中是否走到了标记处,并分别统计没种不同类型的标记的数目
     * @param {<number>} x 当前精灵的横坐标.
     * @param {<number>} y 当前精灵的纵坐标.
     */
      var hasMarker=function(x , y) {
        if((map[y][x]==maze.SquareType.MARKER1)||(map[y][x]==maze.SquareType.MARKER2)||(map[y][x]==maze.SquareType.MARKER3)||(map[y][x]==maze.SquareType.MARKER4)){//如果此处是标记
            actor.marker_num+=1
        }
        switch (map[y][x]){
            case maze.SquareType.MARKER1:
                actor.apart_markers['redmarker']+=1;
                break;
            case maze.SquareType.MARKER2:
                actor.apart_markers['yellowmarker']+=1;
                break;
            case maze.SquareType.MARKER3:
                actor.apart_markers['bluemarker']+=1;
                break;
            case maze.SquareType.MARKER4:
                actor.apart_markers['greenmarker']+=1;
                break;
        }
     }

    /**
     * 设置地图属性.
     * @param {string} block_id 高亮块的ID
     * @param {number} M_x为地图横向方格的数目（范围为3-10）,初始默认为8
     * @param {number} M_y为地图竖向方格的数目（范围为3-10）,初始默认为8
     * @param {number} startPos_x 起点位置的横坐标.
     * @param {number} endPos_x 终点位置的横坐标.
     * @param {number} endPos_y 终点位置的纵坐标.
     */
     var setMap_f=function( M_x , M_y , startPos_x ,startPos_y , endPos_x , endPos_y ) {
        Sk.builtin.pyCheckArgs("setMap", arguments, 6, 6);
        map=[]
        if((M_x<3) || (M_x>20) || (M_y<3) || (M_y>20)){
            throw Error("错误！超出地图可设置范围，请设置横纵方格数大于等于3，小于等于20")
        }
        M_x = Sk.ffi.remapToJs(M_x);
        M_y = Sk.ffi.remapToJs(M_y);
        maze_COLS=M_x;
        maze_ROWS=M_y;
        maze.MAZE_WIDTH= maze_SQUARE_SIZE * maze_COLS;
        maze.MAZE_HEIGHT=maze_SQUARE_SIZE * maze_ROWS;

        startPos_x =Sk.ffi.remapToJs(startPos_x)+1
        startPos_y =Sk.ffi.remapToJs(startPos_y)+1
        endPos_x =Sk.ffi.remapToJs(endPos_x)+1
        endPos_y =Sk.ffi.remapToJs(endPos_y)+1

        if((startPos_x>M_x) || (startPos_x<1) || (startPos_y>M_y) || (startPos_y<1)){
            throw Error("错误！起点坐标超出地图范围！")
        }
        if((endPos_x>M_x) || (endPos_x<1) || (endPos_y>M_y) || (endPos_y<1)){
            throw Error("错误！终点坐标超出地图范围！")
        }

        for (var i=0; i<M_y; i++){ 
            var b = [];  //辅助数组
            for(var j=0; j<M_x; j++){ 
                if( (j==(startPos_x-1)) && (i==(startPos_y-1))){
                    if((startPos_x==endPos_x) && (startPos_y==endPos_y)){//如果起点坐标和终点坐标重合，应优先把map坐标设置为终点，然后直接设置角色初始坐标
                        b[j]=maze.SquareType.FINISH;
                        actor.x= startPos_x-1;
                        actor.y= startPos_y-1;
                    }else{
                        b[j]=maze.SquareType.START;
                    }
                }else if((j==(endPos_x-1)) && (i==(endPos_y-1))){
                    b[j]=maze.SquareType.FINISH;
                }else{
                    b[j]=maze.SquareType.OPEN;
                }
            }
            map[i]=b;
        }
    }
	mod.setMap = new Sk.builtin.func(setMap_f);

    /**
     * 设置路径类型，如果不对路径形状进行设置，则默认为方格.
     * 
     * @param {string} path_type代表可通行路径的样式，默认为null
     */
    var setPathType_f=function(path_type) { 
        Sk.builtin.pyCheckArgs("setPathType", arguments, 1, 1);
        path_type = Sk.ffi.remapToJs(path_type);
        switch (path_type){
            case "default":
                maze.tiles='../common/js/skulpt_mixtoy/pic/maze_path.png';//默认为方格
                break;
            case "pipeline":
                maze.tiles='../common/js/skulpt_mixtoy/pic/tiles_astro.png';//设置为管道
                break;
            case "bamboo":
                maze.tiles='../common/js/skulpt_mixtoy/pic/tiles_panda.png';//设置为竹子
                break;
        }
    }
	mod.setPathType = new Sk.builtin.func(setPathType_f);

    /**
     * 设置地图背景.
     * @param {string} bg_pic代表地图背景对应的名称
     */
    var set_map_bg_f=function(bg_pic) { 
        Sk.builtin.pyCheckArgs("set_map_bg", arguments, 1, 1);
        bg_pic=Sk.ffi.remapToJs(bg_pic);
        if(bg_pic=='无可用地图'){
            bg_pic=""
        }
        switch(bg_pic){
            case "bg_default":
                maze.background ='../common/js/skulpt_mixtoy/pic/bg_default.png';//默认为方格
                break;
            case "bg_astro":
                maze.background ='../common/js/skulpt_mixtoy/pic/bg_astro.jpg';//设置为管道
                break;
            case "bg_panda":
                maze.background ='../common/js/skulpt_mixtoy/pic/bg_panda.jpg';//设置为竹子
                break;
        }
    }
    mod.set_map_bg = new Sk.builtin.func(set_map_bg_f);


    /**
     * 在某处放置障碍或者金币.
     * 
     * @param {number} Pos_x 放置物的x坐标位置.
     * @param {number} Pos_y 放置物的y坐标位置.
     * @param {string} type 放置物的类型：墙、障碍或是金币
     */
    var placeItem_f=function(Pos_x , Pos_y , type) { 
        Sk.builtin.pyCheckArgs("placeItem", arguments, 3, 3);
        Pos_x = Sk.ffi.remapToJs(Pos_x);
        Pos_y = Sk.ffi.remapToJs(Pos_y);
        type=Sk.ffi.remapToJs(type);

        if((Pos_x+1>(map[0].length)) || (Pos_x< 0) || (Pos_y+1>(map.length)) || (Pos_y< 0)){
            throw new Sk.builtin.TypeError("错误！放置物坐标超过地图范围");
        }else if((map[Pos_y][Pos_x]==2)||(map[Pos_y][Pos_x]==3)){
            throw new Sk.builtin.TypeError("错误！不能将放置物位置设置在起点或终点坐标！");
        }

        switch(type){
            case "wall"://墙
                map[Pos_y][Pos_x]=maze.SquareType.WALL;
                break;
            case "coin":
                map[Pos_y][Pos_x]=maze.SquareType.AWARD;
                break;
            case "barrier":
                map[Pos_y][Pos_x]=maze.SquareType.BARRIER;
                break;
            case "redmarker":
                map[Pos_y][Pos_x]=maze.SquareType.MARKER1;
                break;
            case "yellowmarker":
                map[Pos_y][Pos_x]=maze.SquareType.MARKER2;
                break;
            case "bluemarker":
                map[Pos_y][Pos_x]=maze.SquareType.MARKER3;
                break;
            case "greenmarker":
                map[Pos_y][Pos_x]=maze.SquareType.MARKER4;
                break;
        }
    }
	mod.placeItem = new Sk.builtin.func(placeItem_f);

    /**
     * 在某处随机放置障碍
     * 
     * @param {number} Pos_x 放置物的x坐标位置.
     * @param {number} Pos_y 放置物的y坐标位置.
     */
     var randomPlaceBarrier_f=function(Pos_x , Pos_y) { 
        Sk.builtin.pyCheckArgs("randomPlaceBarrier", arguments, 2, 2);
        Pos_x = Sk.ffi.remapToJs(Pos_x)+1;
        Pos_y = Sk.ffi.remapToJs(Pos_y)+1;

        if((Pos_x>(map[0].length)) || (Pos_x< 1) || (Pos_y>(map.length)) || (Pos_y< 1)){
            throw new Sk.builtin.TypeError("错误！放置物坐标超过地图范围");
        }else if((map[Pos_y-1][Pos_x-1]==2)||(map[Pos_y-1][Pos_x-1]==3)){
            throw new Sk.builtin.TypeError("错误！不能将放置物位置设置在起点或终点坐标！");        
        }

        var numType=Math.random()>0.5?maze.SquareType.OPEN:maze.SquareType.BARRIER;
        map[Pos_y-1][Pos_x-1]=numType;

    }
	mod.randomPlaceBarrier = new Sk.builtin.func(randomPlaceBarrier_f);

    /**
     * 初始化地图
     */
    var initMap_f=function() { 
        drawMap()
    }
	mod.initMap = new Sk.builtin.func(initMap_f);


    mod.Actor = Sk.misceval.buildClass(mod, function($gbl, $loc) {
        $loc.__init__ = new Sk.builtin.func(function(self,img , direction) {
            img= Sk.ffi.remapToJs(img) || 'pegman';
            if(img=='无可用角色'){
                img='pegman';
            }
            switch (img){
                case "pegman":
                    actor.img='../common/js/skulpt_mixtoy/pic/pegman.png';//默认为方格
                    actor.type="animate"
                    break;
                case "panda":
                    actor.img='../common/js/skulpt_mixtoy/pic/panda.png';//设置为管道
                    actor.type="animate"
                    break;
                case "astro":
                    actor.img='../common/js/skulpt_mixtoy/pic/astro.png';//设置为竹子
                    actor.type="animate"
                    break;
                case "robot":
                    actor.img='../common/js/skulpt_mixtoy/pic/robot.png';//设置为机器人
                    actor.type="still"
                    break;
                case "car":
                    actor.img='https://cdn.jsdelivr.net/gh/LIAO-wanting/skulpt_pj@latest/pic/book/actor_car.png';//设置为小车
                    actor.type="animate"
                    break;
            }

            actor.direction =  Sk.ffi.remapToJs(direction) || DirectionType.NORTH;
            size=[52,49]//[height,width]//size需要根据方格的数目来确定
            actor.coin_point=0
            initPegman()     
        });
        //get & set:Actor.direction新增函数，获取或设置精灵的方向
        $loc.direction = defineProperty(
            function(self) {
                return Sk.ffi.remapToPy(actor.direction)
            },
            function(self, val) {
                Sk.builtin.pyCheckType("direction", "number",Sk.builtin.checkNumber(val.v));
                actor.direction=val.v
            });
        //向某个方向移动移动
        //暂时只实现了移动一步
        //func: Actor.moveDirection()
        $loc.moveDirection=new Sk.builtin.func(function(self,direction) {
            Sk.builtin.pyCheckArgs("moveDirection", arguments, 2,2);
            return new Sk.misceval.promiseToSuspension(new Promise(function(resolve) {
                Sk.setTimeout(function() {
                    actor.direction =  parseInt(Sk.ffi.remapToJs(direction));
                    var command= move(direction) //向某个方向移动
                    if(command==false){
                        maze.result=ResultType.FAILURE
                        layer.alert("挑战失败!请修改后重新尝试", { shade: false })
                        console.log("错误")
                        document.getElementById("side_code").innerText='错误'
                        throw new Sk.builtin.TypeError("挑战失败!请修改后重新尝试");
                    }

                    if(maze.mlevel==4){//如果是第四关，则需要判断是否需要加油的问题
                        //如果左侧存在加油站
                        // if((map[actor.y - 1][actor.x])==maze.SquareType.OIL_STATION||(map[actor.y + 1][actor.x])==maze.SquareType.OIL_STATION||(map[actor.y ][actor.x-1])==maze.SquareType.OIL_STATION||(map[actor.y ][actor.x+1])==maze.SquareType.OIL_STATION){
                        if((map[actor.y][actor.x-1])==maze.SquareType.OIL_STATION){  
                            if(actor.oil==0){//在加油站处，如果没有油还想继续往前面走
                                maze.result=ResultType.FAILURE
                                svg.append('image').attr('id','caroil').attr('x',maze_SQUARE_SIZE).attr('y',3.5 * maze_SQUARE_SIZE).attr('width',maze_SQUARE_SIZE).attr('height',maze_SQUARE_SIZE)
                                .attr('xlink:href','../common/js/skulpt_mixtoy/pic/book/no_oil.png')
                                layer.alert("挑战失败!小车没有油了", { shade: false })
                                throw new Sk.builtin.TypeError("挑战失败!小车没有油了");
                            }
                        }
                    }else if(maze.mlevel==5){//如果是第五关，则需要记录循环次数；每次经过起点处循环次数+1
                        if((map[actor.y][actor.x])==maze.SquareType.START){  
                            actor.circulation_num+=1;
                        }
                    }else if(maze.mlevel==6){//如果是第六关，则需要判断红绿灯是否为绿灯的问题
                        if(actor.traffic_light==maze.SquareType.LIGHT_RED){  
                                layer.alert("挑战失败:小车在红灯亮时还未停止！", { shade: false });
                                throw new Sk.builtin.TypeError("挑战失败:小车在红灯亮时还未停止！");
                        }
                    }

                    switch (command) {
                        case 'north':
                            schedule([actor.x, actor.y, actor.direction * 4],
                                            [actor.x, actor.y - 1, actor.direction * 4]);
                            actor.y--;
                            break;
                        case 'east':
                            schedule([actor.x, actor.y, actor.direction * 4],
                                            [actor.x + 1, actor.y, actor.direction * 4]);
                            actor.x++;
                            break;
                        case 'south':
                            schedule([actor.x, actor.y, actor.direction * 4],
                                            [actor.x, actor.y + 1, actor.direction * 4]);
                            actor.y++;
                            break;
                        case 'west':
                            schedule([actor.x, actor.y, actor.direction * 4],
                                        [actor.x - 1, actor.y, actor.direction * 4]);
                            actor.x--;
                            break;
                    }
                    hasCoin(actor.x,actor.y)
                    hasMarker(actor.x,actor.y)
                    if(maze.mlevel==6){//如果是第六关，则需要随机改变红绿灯的颜色
                        if((map[actor.y][actor.x+1])==maze.SquareType.LIGHT_RED || (map[actor.y][actor.x+1])==maze.SquareType.LIGHT_GREEN){  
                            map[actor.y][actor.x+1]=Math.random()>0.5? maze.SquareType.LIGHT_RED:maze.SquareType.LIGHT_GREEN;//随机刷新红绿灯的状态
                            actor.traffic_light=map[actor.y][actor.x+1];
                            if(actor.traffic_light==maze.SquareType.LIGHT_RED){//图像变为红灯
                                d3.select("#lightgreen").remove();
                                svg.append('image').attr('id','lightred').attr('x',(actor.x+1) * maze_SQUARE_SIZE-5).attr('y',actor.y * maze_SQUARE_SIZE+5).attr('width',maze_SQUARE_SIZE).attr('height',maze_SQUARE_SIZE)
                                .attr('xlink:href','../common/js/skulpt_mixtoy/pic/book/redlight.png')
                            }   
                        }
                    }

                    var state=checkFinish()
                    if(state==true){
                        resolve(Sk.builtin.none.none$);
                    }else if(state=="error2"){
                        maze.result=ResultType.FAILURE
                        layer.alert("挑战失败，请检查是否通过所有标记点！", { shade: false })
                        console.log("失败")
                        throw new Sk.builtin.TypeError("挑战失败，请检查是否通过所有标记点！");
                    } 
                    resolve(Sk.builtin.none.none$);
                }, 800);
            }));
        });
        $loc.turn=new Sk.builtin.func(function(self,direction){
            Sk.builtin.pyCheckArgs("turn", arguments, 2, 2);
            Sk.builtin.pyCheckType("direction", "string", Sk.builtin.checkString(direction));
            return new Sk.misceval.promiseToSuspension(new Promise(function(resolve) {
                Sk.setTimeout(function() {
                    direction=Sk.ffi.remapToJs(direction)
                    var command=turn(direction)
                    switch (command) {
                        case 'left':
                            schedule([actor.x, actor.y, actor.direction * 4], [actor.x, actor.y, actor.direction * 4 - 4]);
                            actor.direction = constrainDirection4(actor.direction - 1);
                            break;
                        case 'right':
                            schedule([actor.x, actor.y, actor.direction * 4], [actor.x, actor.y, actor.direction * 4 + 4]);
                            actor.direction = constrainDirection4(actor.direction + 1);
                            break;
                    }
                    resolve(Sk.builtin.none.none$);
                }, 800);
            }));
        });
        $loc.isDone=new Sk.builtin.func(function(self){
            Sk.builtin.pyCheckArgs("isDone", arguments, 1, 1);
            var isdone= Sk.ffi.remapToPy(checkFinish()); 
            return new Sk.ffi.remapToPy(isdone);
        });
        $loc.isPath=new Sk.builtin.func(function(self,direction){
            Sk.builtin.pyCheckArgs("isPath", arguments, 2, 2);
            Sk.builtin.pyCheckType("direction", "number", Sk.builtin.checkNumber(direction));
            direction=Sk.ffi.remapToJs(direction)
            var state=false;
            var square=0;
            switch (direction) {
                case DirectionType.NORTH:
                    if(map[actor.y - 1]){
                        square = map[actor.y - 1][actor.x];
                    }else{
                        square = 0
                    }
                    break;
                case DirectionType.EAST:
                    if(map[actor.y][actor.x + 1]){
                        square = map[actor.y][actor.x + 1];
                    }else{
                        square = 0
                    }
                    break;
                case DirectionType.SOUTH:
                    if(map[actor.y + 1]){
                        square = map[actor.y + 1][actor.x];
                    }else{
                        square = 0
                    }
                    break;
                case DirectionType.WEST:
                    if(map[actor.y][actor.x - 1]){
                        square = map[actor.y][actor.x - 1];
                    }else{
                        square = 0
                    }
                    break;
            };
            state= (square != maze.SquareType.BARRIER) && (square != maze.SquareType.WALL);
            return Sk.ffi.remapToPy(state);
        });
        //判断某个方向是否存在障碍物
        $loc.isBarrier=new Sk.builtin.func(function(self,direction){
            Sk.builtin.pyCheckArgs("isBarrier", arguments, 2, 2);
            Sk.builtin.pyCheckType("direction", "number", Sk.builtin.checkNumber(direction));
            direction=Sk.ffi.remapToJs(direction)
            var state=false;
            var square=0;
            switch (direction) {
                case DirectionType.NORTH:
                    if(map[actor.y - 1]){
                        square = map[actor.y - 1][actor.x];
                    }else{
                        square = 0
                    }
                    break;
                case DirectionType.EAST:
                    if(map[actor.y][actor.x + 1]){
                        square = map[actor.y][actor.x + 1];
                    }else{
                        square = 0
                    }
                    break;
                case DirectionType.SOUTH:
                    if(map[actor.y + 1]){
                        square = map[actor.y + 1][actor.x];
                    }else{
                        square = 0
                    }
                    break;
                case DirectionType.WEST:
                    if(map[actor.y][actor.x - 1]){
                        square = map[actor.y][actor.x - 1];
                    }else{
                        square = 0
                    }
                    break;
            };
            state= square == maze.SquareType.BARRIER;
            return Sk.ffi.remapToPy(state);
        });
        //随机生成小车油量
        $loc.randomOil=new Sk.builtin.func(function(self){
            Sk.builtin.pyCheckArgs("randomOil", arguments, 1, 1);
            actor.oil=Math.random()>0.5?1:0;//随机初始化汽车的油量
            if(actor.oil==0){//没油(呈现少量油的图片)
                svg.append('image').attr('id','caroil').attr('x',maze_SQUARE_SIZE).attr('y',3.5 * maze_SQUARE_SIZE).attr('width',maze_SQUARE_SIZE).attr('height',maze_SQUARE_SIZE)
                .attr('xlink:href','../common/js/skulpt_mixtoy/pic/book/none_oil.png')
            }else if(actor.oil==1){//油量充足（呈现油量充足的图片）
                svg.append('image').attr('id','caroil').attr('x',maze_SQUARE_SIZE).attr('y',3.5 * maze_SQUARE_SIZE).attr('width',maze_SQUARE_SIZE).attr('height',maze_SQUARE_SIZE)
                .attr('xlink:href','../common/js/skulpt_mixtoy/pic/book/full_oil.png')
            }
        });
        //判断是否需要加油
        $loc.isOilFull=new Sk.builtin.func(function(self){
            Sk.builtin.pyCheckArgs("isOilFull", arguments, 1, 1);
            if(actor.oil==0){//没油了，返回需要加油为True
                return Sk.ffi.remapToPy(true);
            }else if(actor.oil==1){//还有油，返回需要加油为False
                return Sk.ffi.remapToPy(false);
            }
        });
        //进加油站加油
        $loc.addOil=new Sk.builtin.func(function(self){
            Sk.builtin.pyCheckArgs("addOil", arguments, 1, 1);
            return new Sk.misceval.promiseToSuspension(new Promise(function(resolve) {
                Sk.setTimeout(function() {
                    svg.append('image').attr('id','caroil').attr('x',maze_SQUARE_SIZE).attr('y',3.5 * maze_SQUARE_SIZE).attr('width',maze_SQUARE_SIZE).attr('height',maze_SQUARE_SIZE)
                    .attr('xlink:href','../common/js/skulpt_mixtoy/pic/book/full_oil.png')
                    actor.oil=1//油量充足
                    resolve(Sk.builtin.none.none$);
                }, 800);
            }));
        });
        $loc.getPoint=new Sk.builtin.func(function(self){
            Sk.builtin.pyCheckArgs("getPoint", arguments, 1, 1);
            var point= actor.coin_point; 
            return Sk.ffi.remapToPy(point);
        });
        //判断信号灯是否为绿灯？
        $loc.isLightGreen=new Sk.builtin.func(function(self){
            Sk.builtin.pyCheckArgs("isLightGreen", arguments, 1, 1);
            if(actor.traffic_light==maze.SquareType.LIGHT_GREEN){//绿灯，返回 true
                return Sk.ffi.remapToPy(true);
            }else if(actor.traffic_light==maze.SquareType.LIGHT_RED){//红灯，返回false
                return Sk.ffi.remapToPy(false);
            }
        });
        //检查循环的次数是否正确
        $loc.isCirculationRight=new Sk.builtin.func(function(self){
            Sk.builtin.pyCheckArgs("isCirculationRight", arguments, 1, 1);
            return new Sk.misceval.promiseToSuspension(new Promise(function(resolve) {
                var mlevel=maze.mlevel;//获取当前关卡序数
                var state=false;
                switch (mlevel){
                    case 5://第五关
                    state=actor.circulation_num==3?true:false;
                    break;
                    case 6://第六关
                    if(actor.traffic_light==maze.SquareType.LIGHT_GREEN){//如果是绿灯，则怎么都算失败
                        state=false;
                    }else if(actor.traffic_light==maze.SquareType.LIGHT_RED){//如果是红灯
                        for (var y = 0; y < maze.map.length; y++) {
                            for (var x = 0; x <  maze.map[0].length; x++) {
                                if(maze.map[y][x]==maze.SquareType.LIGHT_RED){
                                    if((actor.x+1)==x|| (actor.y)==y){//如果小车停的位置在红绿灯的左边，则挑战成功
                                        state=true;
                                    }
                                }
                            }
                        }
                    }
                    break;
                }
                if(state==true){
                    // setTimeout(function() {
                    //     layer.alert("挑战成功！", { shade: false });
                    // },1000)
                    // getFinishState_f(state)
                    // resolve(Sk.builtin.none.none$);
                }else{
                    maze.result=ResultType.FAILURE
                    layer.alert("挑战失败，请检查循环次数是否正确！", { shade: false })
                    console.log("失败")
                    throw new Sk.builtin.TypeError("挑战失败，请检查循环次数是否正确！");
                } 
            }))
        });
        //判断是否经过某种颜色的标记
        $loc.checkMarker=new Sk.builtin.func(function(self,marker){
            Sk.builtin.pyCheckArgs("checkMarker", arguments, 2, 2);
            marker=Sk.ffi.remapToJs(marker);
            var marker_num=actor.apart_markers[marker];
            if(marker_num==0){
                return Sk.ffi.remapToPy(false);
            }else{
                return Sk.ffi.remapToPy(true);
            }
        });
        //返回经过某种颜色标记的数目
        $loc.getMarkerNum=new Sk.builtin.func(function(self,marker){
            Sk.builtin.pyCheckArgs("getMarkerNum", arguments, 2, 2);
            marker=Sk.ffi.remapToJs(marker);
            var marker_num=actor.apart_markers[marker];
            return Sk.ffi.remapToPy(marker_num);
        })
    }, "Actor")

    /**
     * 初始化为设定好的地图
     * 
     * @param {number} level 初始化地图，level为地图的等级.
     */
     var settedMap_f=function(level) { 
        level=Sk.ffi.remapToJs(level)
        maze=MAZE_setted[level]
        map=MAZE_setted[level].map
        drawMap()
    }
	mod.settedMap = new Sk.builtin.func(settedMap_f);

    /**
     * 初始化为设定好的简单的迷宫地图
     * 
     * @param {number} level 初始化地图，level为地图的等级.
     */
    var settedSimpleMap_f=function(level) { 
        level=Sk.ffi.remapToJs(level)
        map=simple_Maze[level].map
        maze_ROWS=map.length;
        maze_COLS=map[0].length;
        // if(level==6 || level==7){
        //     maze.tiles=simple_Maze[level].tiles
        //     maze.background=simple_Maze[level].background
        // }else{
            maze.tiles=simple_map_para.tiles
            maze.wall=simple_map_para.wall
            maze.background=simple_map_para.background
        // }
        simple_map_para.state_num=1
        drawMap()
    }
    mod.settedSimpleMap = new Sk.builtin.func(settedSimpleMap_f);

    /**
     * 初始化为设定好的简单的迷宫地图
     * 
     * @return {boolean} 检测小人执行最后一个指令后是否到达终点,如果到达终点,返回True,否则返回False.
     */
    var getFinishState_f=function(state){
        var state=checkFinish()
        var state_str=""
        return new Sk.misceval.promiseToSuspension(new Promise(function(resolve) {
            if(state){
                state_str="成功"
                setTimeout(function() {
                    layer.alert("挑战成功！", { shade: false });
                    console.log("成功")
                },1000);
                
            }else{
                state_str="失败"
                setTimeout(function() {
                    console.log("失败")
                },1000)
            }
            if(simple_map_para.state_num==1){//对于已经激活的、已经预设的迷宫关卡
                resolve(Sk.ffi.remapToPy(state_str));
            }else{
                resolve(Sk.ffi.remapToPy(""));
            }
            
        }))
    }
    mod.getFinishState = new Sk.builtin.func(getFinishState_f);

	return mod;
}
