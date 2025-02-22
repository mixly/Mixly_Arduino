//这一版加入了所有延时和高亮效果，用以适应分布调试
var $builtinmodule = function (name) {
	let mod= {__name__: new Sk.builtin.str("blocklygame")};
    
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
        img : "../common/js/skulpt_mixcar/pic/pegman.png",
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
        circulation_num:0//小车在赛道中循环的次数
    };
    //迷宫变量
    var maze_SQUARE_SIZE = 50;
    var maze_ROWS=map.length;
    var maze_COLS=map[0].length;
    var maze_marker_num=0;//迷宫中标记点的数目
    var maze={
        mlevel:0,
        tiles: '../common/js/skulpt_mixcar/pic/maze_path.png',//地图路径图片
        marker: '../common/js/skulpt_mixcar/pic/marker.png',//终点图标图片
        background: '../common/js/skulpt_mixcar/pic/bg_astro.jpg',//地图背景图片
        wall:'../common/js/skulpt_mixcar/pic/roadblock.png',
        award:'../common/js/skulpt_mixcar/pic/award.png',
        barrier:'',
        markers:[],
        SquareType :{//迷宫中方块的类型
            WALL: 0,
            OPEN: 1,
            START: 2,
            FINISH: 3,
            AWARD:4//金币奖励
        },
        //迷宫部分参数指定
        MAZE_WIDTH : maze_SQUARE_SIZE * maze_COLS,
        MAZE_HEIGHT : maze_SQUARE_SIZE * maze_ROWS,
        PATH_WIDTH : maze_SQUARE_SIZE / 3,
        result :  ResultType.UNSET,
        finish : {x:0,y:0},
        type:1//类型为用户自定义的
    };
    
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
            tiles: '../common/js/skulpt_mixcar/pic/tiles_road.png',//地图路径图片
            marker: '../common/js/skulpt_mixcar/pic/Start_final.png',//终点图标图片
            background: '../common/js/skulpt_mixcar/pic/bg1.jpg',//地图背景图片
            wall:'',
            award:'',
            barrier:'',
            markers:['../common/js/skulpt_mixcar/pic/red.png','../common/js/skulpt_mixcar/pic/yellow.png','../common/js/skulpt_mixcar/pic/blue.png','../common/js/skulpt_mixcar/pic/green.png'],
            SquareType :{//迷宫中方块的类型
                WALL: 0,
                OPEN: 1,
                MARKER1:10,
                MARKER2:11,
                MARKER3:12,
                MARKER4:13,
                S_F: 9,//既是起点又是终点
                INVIMAKER:24
            },
            //迷宫部分参数指定
            MAZE_WIDTH : maze_SQUARE_SIZE * 8,
            MAZE_HEIGHT : maze_SQUARE_SIZE * 8,
            PATH_WIDTH : maze_SQUARE_SIZE / 3,
            result :  ResultType.UNSET,
            finish : {x:0,y:0},
            type:0,//类型为非用户自定义的
            INVIMNUM : 0
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
            tiles: '../common/js/skulpt_mixcar/pic/tiles_road.png',//地图路径图片
            marker: '../common/js/skulpt_mixcar/pic/Start_final.png',//终点图标图片
            background: '../common/js/skulpt_mixcar/pic/bg2.jpg',//地图背景图片
            wall:'',
            award:'',
            barrier:'../common/js/skulpt_mixcar/pic/barrier.png',
            markers:['../common/js/skulpt_mixcar/pic/red.png','../common/js/skulpt_mixcar/pic/yellow.png','../common/js/skulpt_mixcar/pic/blue.png','../common/js/skulpt_mixcar/pic/green.png'],
            SquareType :{//迷宫中方块的类型
                WALL: 0,
                OPEN: 1,
                BARRIER:5,
                MARKER1:10,
                MARKER2:11,
                MARKER3:12,
                MARKER4:13,
                S_F: 9,//既是起点又是终点
                INVIMAKER:24
            },
            //迷宫部分参数指定
            MAZE_WIDTH : maze_SQUARE_SIZE * 8,
            MAZE_HEIGHT : maze_SQUARE_SIZE * 8,
            PATH_WIDTH : maze_SQUARE_SIZE / 3,
            result :  ResultType.UNSET,
            finish : {x:0,y:0},
            type:0,//类型为非用户自定义的
            INVIMNUM : 0
        },
        //第三关
        {   mlevel:3,
            map:[
            [0, 1, 1, 13, 24, 1, 24, 0],
            [0, 1, 0, Math.random()>0.5?1:5, 0, 0, 1, 0],
            [0, 1, 1, 9, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 0, 1, 0],
            [0, 0, 0, 24, 1, 1, 24, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]],
            tiles: '../common/js/skulpt_mixcar/pic/tiles_road.png',//地图路径图片
            marker: '../common/js/skulpt_mixcar/pic/Start_final.png',//终点图标图片
            background: '../common/js/skulpt_mixcar/pic/bg2.jpg',//地图背景图片
            wall:'',
            award:'',
            barrier:'../common/js/skulpt_mixcar/pic/barrier.png',
            markers:['../common/js/skulpt_mixcar/pic/red.png','../common/js/skulpt_mixcar/pic/yellow.png','../common/js/skulpt_mixcar/pic/blue.png','../common/js/skulpt_mixcar/pic/green.png'],
            SquareType :{//迷宫中方块的类型
                WALL: 0,
                OPEN: 1,
                BARRIER:5,
                MARKER4:13,
                S_F: 9,//既是起点又是终点
                INVIMAKER: 24
            },
            //迷宫部分参数指定
            MAZE_WIDTH : maze_SQUARE_SIZE * 8,
            MAZE_HEIGHT : maze_SQUARE_SIZE * 8,
            PATH_WIDTH : maze_SQUARE_SIZE / 3,
            result :  ResultType.UNSET,
            finish : {x:0,y:0},
            type:0,//类型为非用户自定义的
            INVIMNUM : 4
        },
        //第四关
        {   mlevel:4,
            map:[
            [0, 1, 1, 13, 24, 1, 24, 0],
            [20, 1, 0, Math.random()>0.5?1:5, 0, 0, 1, 0],
            [0, 1, 1, 9, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 0, 1, 0],
            [0, 0, 0, 24, 1, 1, 24, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]],
            tiles: '../common/js/skulpt_mixcar/pic/tiles_road.png',//地图路径图片
            marker: '../common/js/skulpt_mixcar/pic/Start_final.png',//终点图标图片
            background: '../common/js/skulpt_mixcar/pic/bg3.jpg',//地图背景图片
            wall:'',
            award:'',
            barrier:'../common/js/skulpt_mixcar/pic/barrier.png',
            markers:['../common/js/skulpt_mixcar/pic/red.png','../common/js/skulpt_mixcar/pic/yellow.png','../common/js/skulpt_mixcar/pic/blue.png','../common/js/skulpt_mixcar/pic/green.png'],
            SquareType :{//迷宫中方块的类型
                WALL: 0,
                OPEN: 1,
                BARRIER:5,
                MARKER4:13,
                S_F: 9,//既是起点又是终点
                OIL_STATION:20,//加油站
                INVIMAKER:24
            },
            //迷宫部分参数指定
            MAZE_WIDTH : maze_SQUARE_SIZE * 8,
            MAZE_HEIGHT : maze_SQUARE_SIZE * 8,
            PATH_WIDTH : maze_SQUARE_SIZE / 3,
            result :  ResultType.UNSET,
            finish : {x:0,y:0},
            type:0,//类型为非用户自定义的
            INVIMNUM : 4
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
            tiles: '../common/js/skulpt_mixcar/pic/tiles_road.png',//地图路径图片
            marker: '../common/js/skulpt_mixcar/pic/Start_final.png',//终点图标图片
            background: '../common/js/skulpt_mixcar/pic/bg4.jpg',//地图背景图片
            wall:'',
            award:'',
            barrier:'',
            markers:[],
            SquareType :{//迷宫中方块的类型
                WALL: 0,
                OPEN: 1,
                START: 2,
                S_F: 9,//既是起点又是终点
                TRAFFIC_LIGHT:21,//红绿灯
                INVIMAKER:24
            },
            //迷宫部分参数指定
            MAZE_WIDTH : maze_SQUARE_SIZE * 8,
            MAZE_HEIGHT : maze_SQUARE_SIZE * 8,
            PATH_WIDTH : maze_SQUARE_SIZE / 3,
            result :  ResultType.UNSET,
            finish : {x:3,y:2},
            type:0,//类型为非用户自定义的
            INVIMNUM : 0
        },
        //第六关
        {   mlevel:6,
            map:[
            [0, 1, 1, 13, 1, 1, 12, 0],
            [0, 1, 0, 1, 0, 0, 1, 0],
            [0, 1, 1, 2, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 0, 1, 0], 
            [0, 0, 0, 10, 1, 1, 11, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]],
            tiles: '../common/js/skulpt_mixcar/pic/tiles_road.png',//地图路径图片
            marker: '../common/js/skulpt_mixcar/pic/Start_final.png',//终点图标图片
            background: '../common/js/skulpt_mixcar/pic/bg1.jpg',//地图背景图片
            wall:'',
            award:'',
            barrier:'',
            markers:['../common/js/skulpt_mixcar/pic/red.png','../common/js/skulpt_mixcar/pic/yellow.png','../common/js/skulpt_mixcar/pic/blue.png','../common/js/skulpt_mixcar/pic/green.png'],
            SquareType :{//迷宫中方块的类型
                WALL: 0,
                OPEN: 1,
                START: 2,
                MARKER1:10,
                MARKER2:11,
                MARKER3:12,
                MARKER4:13,
                S_F: 9,//既是起点又是终点
                INVIMAKER:24
            },
            //迷宫部分参数指定
            MAZE_WIDTH : maze_SQUARE_SIZE * 8,
            MAZE_HEIGHT : maze_SQUARE_SIZE * 8,
            PATH_WIDTH : maze_SQUARE_SIZE / 3,
            result :  ResultType.UNSET,
            finish : {x:0,y:0},
            type:0,//类型为非用户自定义的
            INVIMNUM : 0
        },
        //第七关
        {   mlevel:7,
            map:[
            [0, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 0, 0, 0, 0, 1, 0],
            [0, 1, 1, 2, 22, 0, 1, 0],
            [0, 0, 0, 1, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 0, 1, 0],
            [0, 0, 0, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]],
            tiles: '../common/js/skulpt_mixcar/pic/tiles_road.png',//地图路径图片
            marker: '../common/js/skulpt_mixcar/pic/Start_final.png',//终点图标图片
            background: '../common/js/skulpt_mixcar/pic/bg4.jpg',//地图背景图片
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
                LIGHT_RED:23,//红绿灯中的红灯
                INVIMAKER:24
            },
            //迷宫部分参数指定
            MAZE_WIDTH : maze_SQUARE_SIZE * 8,
            MAZE_HEIGHT : maze_SQUARE_SIZE * 8,
            PATH_WIDTH : maze_SQUARE_SIZE / 3,
            result :  ResultType.UNSET,
            finish : {x:3,y:2},
            type:0,//类型为非用户自定义的
            INVIMNUM : 0
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
            if(maze.type==0){
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
            if(maze.type==0){
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
        
        // for (var y = 0; y < maze_ROWS; y++) {
        //     for (var x = 0; x < maze_COLS; x++) {
        //         //绘制迷宫背景
        //         svg.append('image').attr('x', x*maze_SQUARE_SIZE).attr('y', y*maze_SQUARE_SIZE).attr('width', maze_SQUARE_SIZE).attr('height',maze_SQUARE_SIZE)
        //         .attr('xlink:href',maze.background)
        //     }
        // }
        svg.append('image').attr('x', 0).attr('y', 0).attr('width', maze_SQUARE_SIZE*maze_COLS).attr('height',maze_SQUARE_SIZE*maze_ROWS)
        .attr('xlink:href',maze.background)
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
                    svg.append('image').attr('x',x * maze_SQUARE_SIZE + (maze_SQUARE_SIZE/2 - maze_SQUARE_SIZE*0.8/2)).attr('y',y * maze_SQUARE_SIZE+ (maze_SQUARE_SIZE/2 - maze_SQUARE_SIZE*0.8/2)).attr('width',maze_SQUARE_SIZE*0.8 ).attr('height',maze_SQUARE_SIZE*0.8)
                    .attr('xlink:href',maze.wall)
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
                    } else if (map[y][x] == maze.SquareType.FINISH) {
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
                        svg.append('image').attr('id','finish').attr('width',  maze_SQUARE_SIZE*0.8).attr('height', maze_SQUARE_SIZE*0.8).attr('xlink:href',maze.marker)
                        actor.x= x;
                        actor.y= y;
                        var finishIcon = $('#finish');
                        finishIcon.attr('x', maze_SQUARE_SIZE * x+5 );
                        finishIcon.attr('y', maze_SQUARE_SIZE * y+5);
                        maze.finish={x:x,y:y}
                    }else if(map[y][x]==20){//当地图中此处标记为20——加油站时
                        svg.append('image').attr('id','station').attr('x',x * maze_SQUARE_SIZE+ (maze_SQUARE_SIZE/2 - maze_SQUARE_SIZE*0.8/2)).attr('y',y * maze_SQUARE_SIZE+ (maze_SQUARE_SIZE/2 - maze_SQUARE_SIZE*0.8/2)).attr('width',maze_SQUARE_SIZE*2*0.8).attr('height',maze_SQUARE_SIZE*0.8)
                        .attr('xlink:href','../common/js/skulpt_mixcar/pic/oilstation.png')
                    }else if(map[y][x]==21){//当地图中此处标记为21——红绿灯时
                        svg.append('image').attr('id','trafficlight').attr('x',x * maze_SQUARE_SIZE+ (maze_SQUARE_SIZE/2 - maze_SQUARE_SIZE*0.7/2)).attr('y',y * maze_SQUARE_SIZE+ (maze_SQUARE_SIZE/2 - maze_SQUARE_SIZE*0.7/2)).attr('width',maze_SQUARE_SIZE*0.7).attr('height',maze_SQUARE_SIZE*0.7)
                        .attr('xlink:href','../common/js/skulpt_mixcar/pic/trafficlight.png')
                    }else if(map[y][x]==22){//当地图中此处标记为22——红绿灯中的绿灯时
                        svg.append('image').attr('id','lightgreen').attr('x',x * maze_SQUARE_SIZE+ (maze_SQUARE_SIZE/2 - maze_SQUARE_SIZE*0.7/2)).attr('y',y * maze_SQUARE_SIZE+ (maze_SQUARE_SIZE/2 - maze_SQUARE_SIZE*0.7/2)).attr('width',maze_SQUARE_SIZE*0.7).attr('height',maze_SQUARE_SIZE*0.7)
                        .attr('xlink:href','../common/js/skulpt_mixcar/pic/greenlight.png')
                    }else if(map[y][x]==23){//当地图中此处标记为23——红绿灯中的红灯时
                        svg.append('image').attr('id','lightred').attr('x',x * maze_SQUARE_SIZE+ (maze_SQUARE_SIZE/2 - maze_SQUARE_SIZE*0.7/2)).attr('y',y * maze_SQUARE_SIZE+ (maze_SQUARE_SIZE/2 - maze_SQUARE_SIZE*0.7/2)).attr('width',maze_SQUARE_SIZE*0.7).attr('height',maze_SQUARE_SIZE*0.7)
                        .attr('xlink:href','../common/js/skulpt_mixcar/pic/redlight.png')
                    }else if(map[y][x]==2){//当地图中此处标记为起点时，画上和“既是起点又是终点”一样的图标
                        actor.x= x;
                        actor.y= y;
                        svg.append('image').attr('id','start').attr('x', maze_SQUARE_SIZE * x).attr('y',maze_SQUARE_SIZE * y+5).attr('width',maze_SQUARE_SIZE).attr('height',maze_SQUARE_SIZE*0.8)
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
                if(maze.mlevel==5 || maze.mlevel==7 ||maze.mlevel==6){
                    console.log(11)
                    return true
                }else{
                    if(actor.marker_num==maze_marker_num){
                        if(actor.invisible_mark>=maze.INVIMNUM){
                            return true
                        }else{return "error3"}
                    }else{return "error2"}
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
     * 检查精灵在移动的过程中是否走到了标记处
     * @param {<number>} x 当前精灵的横坐标.
     * @param {<number>} y 当前精灵的纵坐标.
     */
      var hasMarker=function(x , y) {
        if((map[y][x]==maze.SquareType.MARKER1)||(map[y][x]==maze.SquareType.MARKER2)||(map[y][x]==maze.SquareType.MARKER3)||(map[y][x]==maze.SquareType.MARKER4)){//如果此处是标记
            actor.marker_num+=1
        }
     }

    /**
     * 检查精灵在移动的过程中是否走到不可见的标记点（INVIMAKER）处
     * @param {<number>} x 当前精灵的横坐标.
     * @param {<number>} y 当前精灵的纵坐标.
     */
    var hasInviMarker=function(x , y) {
        if(map[y][x]==maze.SquareType.INVIMAKER){//如果此处是标记
            actor.invisible_mark+=1
        }
    }

     //高亮辅助函数
     var highlight = function(id) {
        id=Sk.ffi.remapToJs(id)
        Mixly.Editor.blockEditor.highlightBlock(id);
    };

    /**
     * 设置地图属性.
     * 
     * @param {number} M_x为地图横向方格的数目（范围为3-10）,初始默认为8
     * @param {number} M_y为地图竖向方格的数目（范围为3-10）,初始默认为8
     * @param {string} startPos X, Y 起点位置的坐标.
     * @param {string} endPos X, Y 终点位置的坐标
     * @param {string} bg_pic为地图背景的图片
     */
    var setMap_f=function( M_x , M_y , startPos , endPos , bg_pic) {
        Sk.builtin.pyCheckArgs("setMap", arguments, 5, 5);
        map=[]
        if(bg_pic=='无可用地图'){
            bg_pic=""
        }
        if((M_x<3) || (M_x>20) || (M_y<3) || (M_y>20)){
            throw new Sk.builtin.TypeError("错误！超出地图可设置范围，请设置横纵方格数大于等于3，小于等于20");
        }
        M_x = Sk.ffi.remapToJs(M_x);
        M_y = Sk.ffi.remapToJs(M_y);
        maze_COLS=M_x;
        maze_ROWS=M_y;
        maze.MAZE_WIDTH= maze_SQUARE_SIZE * maze_COLS;
        maze.MAZE_HEIGHT=maze_SQUARE_SIZE * maze_ROWS;

        startPos =Sk.ffi.remapToJs(startPos)
        endPos =Sk.ffi.remapToJs(endPos)

        switch (Sk.ffi.remapToJs(bg_pic)){
            case "bg_default":
                maze.background ='../common/js/skulpt_mixcar/pic/bg_default.png';//默认为方格
                break;
            case "bg_astro":
                maze.background ='../common/js/skulpt_mixcar/pic/bg_astro.jpg';//设置为管道
                break;
            case "bg_panda":
                maze.background ='../common/js/skulpt_mixcar/pic/bg_panda.jpg';//设置为竹子
                break;
        }

        var re=/\((\d+),(\d+)\)/.exec(startPos);
        if(re!=null){
            if((re[1]>M_x) || (re[1]<1) || (re[2]>M_y) || (re[2]<1)){
                throw new Sk.builtin.TypeError("错误！起点坐标超出地图范围！");
            }
        }
        var re=/\((\d+),(\d+)\)/.exec(endPos);
        if(re!=null){
            if((re[1]>M_x) || (re[1]<1) || (re[2]>M_y) || (re[2]<1)){
                throw new Sk.builtin.TypeError("错误！终点坐标超出地图范围！");
            }
        }

        for (var i=0; i<M_y; i++){ 
            var b = [];  //辅助数组
            for(var j=0; j<M_x; j++){ 
                var pos='('+(j+1)+','+(i+1)+')'
                if( pos==startPos){
                    b[j]=maze.SquareType.START;
                }else if(pos==endPos){
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
                maze.tiles='../common/js/skulpt_mixcar/pic/maze_path.png';//默认为方格
                break;
            case "pipeline":
                maze.tiles='../common/js/skulpt_mixcar/pic/tiles_astro.png';//设置为管道
                break;
            case "bamboo":
                maze.tiles='../common/js/skulpt_mixcar/pic/tiles_panda.png';//设置为竹子
                break;
        }
    }
	mod.setPathType = new Sk.builtin.func(setPathType_f);

    /**
     * 在某处放置障碍或者金币.
     * 
     * @param {number} Pos_x 放置物的x坐标位置.
     * @param {number} Pos_y 放置物的y坐标位置.
     * @param {string} type 放置物的类型：障碍或是金币
     */
    var placeItem_f=function(Pos_x , Pos_y , type) { 
        Sk.builtin.pyCheckArgs("placeItem", arguments, 3, 3);
        Pos_x = Sk.ffi.remapToJs(Pos_x);
        Pos_y = Sk.ffi.remapToJs(Pos_y);
        type=Sk.ffi.remapToJs(type);

        if((map[Pos_y-1][Pos_x-1]==2)||(map[Pos_y-1][Pos_x-1]==3)){
            throw new Sk.builtin.TypeError("错误！不能将放置物位置设置在起点或终点坐标！");
        }else if((Pos_x>(map[0].length)) || (Pos_x< 0) || (Pos_y>(map.length)) || (Pos_y< 0)){
            throw new Sk.builtin.TypeError("错误！放置物坐标超过地图范围");
        }

        switch(type){
            case "wall"://墙：障碍
                map[Pos_y-1][Pos_x-1]=maze.SquareType.WALL;
                break;
            case "coin":
                map[Pos_y-1][Pos_x-1]=maze.SquareType.AWARD;
                break;
        }
    }
	mod.placeItem = new Sk.builtin.func(placeItem_f);

    /**
     * 初始化地图
     */
    var initMap_f=function() { 
        drawMap()
    }
	mod.initMap = new Sk.builtin.func(initMap_f);


    var isDone = function(block_id) {
        return new Promise((resolve) => {
            // Do things
            setTimeout( () => {   
                var re=/block_id=([\s\S]*)/.exec(block_id)
                if(re!=null){
                    block_id=re[1];
                    highlight(block_id)
                }
                highlight(block_id)
                var isdone= Sk.ffi.remapToPy(checkFinish()); 
                resolve(isdone);
            }, 800);
        })
    }

    var isPathCheck=function(direction,block_id) {
        return new Promise((resolve) => {
            // Do things
            setTimeout( () => {   
                var state="";
                var re=/block_id=([\s\S]*)/.exec(block_id)
                if(re!=null){
                    block_id=re[1];
                    highlight(block_id)
                }
                highlight(block_id);
                switch (direction) {
                    case 'left':
                        direction= 3
                        state=isPath(direction, null)
                        break;
                    case 'right':
                        direction= 1
                        state=isPath(direction, null)
                        break;
                };
                resolve(Sk.ffi.remapToPy(state));
            }, 800);
        })
    }

    var isBarrierCheck=function(direction,block_id) {
        return new Promise((resolve) => {
            // Do things
            setTimeout( () => {   
                var state=false;
                var square=0;
                var re=/block_id=([\s\S]*)/.exec(block_id)
                if(re!=null){
                    block_id=re[1];
                    highlight(block_id)
                }
                highlight(block_id);
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
                resolve(Sk.ffi.remapToPy(state));
            }, 800);
        })
    }

    var isOilFullCheck=function(block_id) {
        return new Promise((resolve) => {
            // Do things
            setTimeout( () => {   
                var state=false;
                var re=/block_id=([\s\S]*)/.exec(block_id)
                if(re!=null){
                    block_id=re[1];
                    highlight(block_id)
                }
                highlight(block_id);
                if(actor.oil==0){//没油了，返回需要加油为True
                    resolve(Sk.ffi.remapToPy(true));
                }else if(actor.oil==1){//还有油，返回需要加油为False
                    resolve(Sk.ffi.remapToPy(false));
                }
            }, 800);
        })
    }

    var getpoint= function(block_id){
        return new Promise((resolve) => {
            // Do things
            setTimeout( () => {   
                var re=/block_id=([\s\S]*)/.exec(block_id)
                if(re!=null){
                    block_id=re[1];
                    highlight(block_id)
                }
                highlight(block_id)
                var point= actor.coin_point; 
                resolve(Sk.ffi.remapToPy(point));
            }, 800);
        })
    }

    var checkLightGreen=function(block_id){
        return new Promise((resolve) => {
            // Do things
            setTimeout( () => {   
                var re=/block_id=([\s\S]*)/.exec(block_id)
                if(re!=null){
                    block_id=re[1];
                    highlight(block_id)
                }
                highlight(block_id)
                if(actor.traffic_light==maze.SquareType.LIGHT_GREEN){//绿灯，返回 true
                    resolve(Sk.ffi.remapToPy(true));
                }else if(actor.traffic_light==maze.SquareType.LIGHT_RED){//红灯，返回false
                    resolve(Sk.ffi.remapToPy(false));
                }    
            }, 800);
        })
    }

    mod.Actor = Sk.misceval.buildClass(mod, function($gbl, $loc) {
        $loc.__init__ = new Sk.builtin.func(function(self,img , direction ,block_id) {
            return new Sk.misceval.promiseToSuspension(new Promise(function(resolve) {
                Sk.setTimeout(function() {
                    img= Sk.ffi.remapToJs(img) || 'pegman';
                    if(img=='无可用角色'){
                        img='pegman';
                    }
                    switch (img){
                        case "pegman":
                            actor.img='../common/js/skulpt_mixcar/pic/pegman.png';//默认为方格
                            actor.type="animate"
                            break;
                        case "panda":
                            actor.img='../common/js/skulpt_mixcar/pic/panda.png';//设置为管道
                            actor.type="animate"
                            break;
                        case "astro":
                            actor.img='../common/js/skulpt_mixcar/pic/astro.png';//设置为竹子
                            actor.type="animate"
                            break;
                        case "robot":
                            actor.img='../common/js/skulpt_mixcar/pic/robot.png';//设置为机器人
                            actor.type="still"
                            break;
                        case "car":
                            actor.img='../common/js/skulpt_mixcar/pic/actor_car3.png';//设置为小车
                            actor.type="animate"
                            break;
                    }

                    actor.direction =  Sk.ffi.remapToJs(direction) || DirectionType.NORTH;
                    size=[52,49]//[height,width]//size需要根据方格的数目来确定
                    actor.coin_point=0

                    //高亮效果
                    var re=/block_id=([\s\S]*)/.exec(block_id)
                    if(re!=null){
                        block_id=re[1];
                        highlight(block_id)
                    }
                    initPegman()     
                    resolve(Sk.builtin.none.none$);
                }, 800);
            }));

        });
        //向某个方向移动移动
        //暂时只实现了移动一步
        //func: Actor.moveDirection()
        $loc.moveDirection=new Sk.builtin.func(function(self,direction,block_id) {
            Sk.builtin.pyCheckArgs("moveDirection", arguments, 3,3);
            return new Sk.misceval.promiseToSuspension(new Promise(function(resolve) {
                Sk.setTimeout(function() {
                    actor.direction =  parseInt(Sk.ffi.remapToJs(direction));
                    var command= move(direction) //向某个方向移动
                    if(command==false){
                        maze.result=ResultType.FAILURE
                        layer.alert("挑战失败!请修改后重新尝试", { shade: false })
                        throw new Sk.builtin.TypeError("挑战失败!请修改后重新尝试");
                    }

                    if(maze.mlevel==4){//如果是第四关，则需要判断是否需要加油的问题
                        //如果左侧存在加油站
                        // if((map[actor.y - 1][actor.x])==maze.SquareType.OIL_STATION||(map[actor.y + 1][actor.x])==maze.SquareType.OIL_STATION||(map[actor.y ][actor.x-1])==maze.SquareType.OIL_STATION||(map[actor.y ][actor.x+1])==maze.SquareType.OIL_STATION){
                        if((map[actor.y][actor.x-1])==maze.SquareType.OIL_STATION){  
                            if(actor.oil==0){//在加油站处，如果没有油还想继续往前面走
                                maze.result=ResultType.FAILURE
                                svg.append('image').attr('id','caroil').attr('x',maze_SQUARE_SIZE).attr('y',3.5 * maze_SQUARE_SIZE).attr('width',maze_SQUARE_SIZE).attr('height',maze_SQUARE_SIZE)
                                .attr('xlink:href','../common/js/skulpt_mixcar/pic/no_oil.png')
                                layer.alert("挑战失败!小车没有油了", { shade: false })
                                throw new Sk.builtin.TypeError("挑战失败!小车没有油了");
                            }
                        }
                    }else if(maze.mlevel==5){//如果是第五关，则需要记录循环次数；每次经过起点处循环次数+1
                        if((map[actor.y][actor.x])==maze.SquareType.START){  
                            actor.circulation_num+=1;
                        }
                    }else if(maze.mlevel==7){//如果是第七关，则需要判断红绿灯是否为绿灯的问题
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

                     //高亮效果
                     var re=/block_id=([\s\S]*)/.exec(block_id)
                     if(re!=null){
                         block_id=re[1];
                         highlight(block_id)
                     }

                    hasCoin(actor.x,actor.y)
                    hasMarker(actor.x,actor.y)
                    hasInviMarker(actor.x,actor.y)
                    if(maze.mlevel==7){//如果是第七关，则需要随机改变红绿灯的颜色
                        if((map[actor.y][actor.x+1])==maze.SquareType.LIGHT_RED || (map[actor.y][actor.x+1])==maze.SquareType.LIGHT_GREEN){  
                            map[actor.y][actor.x+1]=Math.random()>0.5? maze.SquareType.LIGHT_RED:maze.SquareType.LIGHT_GREEN;//随机刷新红绿灯的状态
                            actor.traffic_light=map[actor.y][actor.x+1];
                            if(actor.traffic_light==maze.SquareType.LIGHT_RED){//图像变为红灯
                                d3.select("#lightgreen").remove();
                                svg.append('image').attr('id','lightred').attr('x',(actor.x+1) * maze_SQUARE_SIZE-5).attr('y',actor.y * maze_SQUARE_SIZE+5).attr('width',maze_SQUARE_SIZE).attr('height',maze_SQUARE_SIZE)
                                .attr('xlink:href','../common/js/skulpt_mixcar/pic/redlight.png')
                            }   
                        }
                    }

                    var state=checkFinish()
                    if(state=="error2"){
                        maze.result=ResultType.FAILURE
                        layer.alert("挑战失败，请检查是否通过所有标记点！", { shade: false })
                        throw new Sk.builtin.TypeError("挑战失败，请检查是否通过所有标记点！");
                    }else if(state=="error3"){
                        layer.alert("挑战失败,请修改后重新尝试！", { shade: false })
                        throw new Sk.builtin.TypeError("挑战失败!请修改后重新尝试");
                    }
                    resolve(Sk.builtin.none.none$);
                }, 800);
            }));
        });
        $loc.turn=new Sk.builtin.func(function(self,direction,block_id){
            Sk.builtin.pyCheckArgs("turn", arguments, 3, 3);
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
                    var re=/block_id=([\s\S]*)/.exec(block_id)
                    if(re!=null){
                        block_id=re[1];
                        highlight(block_id)
                    }
                    resolve(Sk.builtin.none.none$);
                }, 800);
            }));
        });
        $loc.isDone=new Sk.builtin.func(function(self,block_id){
            Sk.builtin.pyCheckArgs("isDone", arguments, 2, 2);
            return new Sk.misceval.promiseToSuspension(isDone(block_id).then((r) => Sk.ffi.remapToPy(r)));
        });
        $loc.isPath=new Sk.builtin.func(function(self,direction){
            Sk.builtin.pyCheckArgs("isPath", arguments, 2, 2);
            Sk.builtin.pyCheckType("direction", "string", Sk.builtin.checkString(direction));
            direction=Sk.ffi.remapToJs(direction)
            return new Sk.misceval.promiseToSuspension(isPathCheck(direction,block_id).then((r) => Sk.ffi.remapToPy(r)));
        });
        //判断某个方向是否存在障碍物
        $loc.isBarrier=new Sk.builtin.func(function(self,direction,block_id){
            Sk.builtin.pyCheckArgs("isBarrier", arguments, 3, 3);
            Sk.builtin.pyCheckType("direction", "number", Sk.builtin.checkNumber(direction));
            direction=Sk.ffi.remapToJs(direction)
            return new Sk.misceval.promiseToSuspension(isBarrierCheck(direction,block_id).then((r) => Sk.ffi.remapToPy(r)));
        });
        //随机生成小车油量
        $loc.randomOil=new Sk.builtin.func(function(self,block_id){
            Sk.builtin.pyCheckArgs("randomOil", arguments, 2, 2);
            return new Sk.misceval.promiseToSuspension(new Promise(function(resolve) {
                Sk.setTimeout(function() {
                    actor.oil=Math.random()>0.5?1:0;//随机初始化汽车的油量
                    if(actor.oil==0){//没油(呈现少量油的图片)
                        svg.append('image').attr('id','caroil').attr('x',maze_SQUARE_SIZE).attr('y',3.5 * maze_SQUARE_SIZE).attr('width',maze_SQUARE_SIZE).attr('height',maze_SQUARE_SIZE)
                        .attr('xlink:href','../common/js/skulpt_mixcar/pic/none_oil.png')
                    }else if(actor.oil==1){//油量充足（呈现油量充足的图片）
                        svg.append('image').attr('id','caroil').attr('x',maze_SQUARE_SIZE).attr('y',3.5 * maze_SQUARE_SIZE).attr('width',maze_SQUARE_SIZE).attr('height',maze_SQUARE_SIZE)
                        .attr('xlink:href','../common/js/skulpt_mixcar/pic/full_oil.png')
                    }
                    var re=/block_id=([\s\S]*)/.exec(block_id)
                    if(re!=null){
                        block_id=re[1];
                        highlight(block_id)
                    }
                    resolve(Sk.builtin.none.none$);
                }, 800);
            }));
        });
        //判断是否需要加油
        $loc.isOilFull=new Sk.builtin.func(function(self,block_id){
            Sk.builtin.pyCheckArgs("isOilFull", arguments, 2, 2);
            return new Sk.misceval.promiseToSuspension(isOilFullCheck(block_id).then((r) => Sk.ffi.remapToPy(r)));
        });
        //进加油站加油
        $loc.addOil=new Sk.builtin.func(function(self,block_id){
            Sk.builtin.pyCheckArgs("addOil", arguments, 2, 2);
            return new Sk.misceval.promiseToSuspension(new Promise(function(resolve) {
                Sk.setTimeout(function() {
                    svg.append('image').attr('id','caroil').attr('x',maze_SQUARE_SIZE).attr('y',3.5 * maze_SQUARE_SIZE).attr('width',maze_SQUARE_SIZE).attr('height',maze_SQUARE_SIZE)
                    .attr('xlink:href','../common/js/skulpt_mixcar/pic/full_oil.png')
                    actor.oil=1//油量充足
                    var re=/block_id=([\s\S]*)/.exec(block_id)
                    if(re!=null){
                        block_id=re[1];
                        highlight(block_id)
                    }
                    resolve(Sk.builtin.none.none$);
                }, 800);
            }));
        });
        //获取角色当前的分数
        $loc.getPoint=new Sk.builtin.func(function(self,block_id){
            Sk.builtin.pyCheckArgs("getPoint", arguments, 2, 2);
            return new Sk.misceval.promiseToSuspension(getpoint(block_id).then((r) => Sk.ffi.remapToPy(r)));
        });
        //判断信号灯是否为绿灯？
        $loc.isLightGreen=new Sk.builtin.func(function(self,block_id){
            Sk.builtin.pyCheckArgs("isLightGreen", arguments, 2, 2);
            return new Sk.misceval.promiseToSuspension(checkLightGreen(block_id).then((r) => Sk.ffi.remapToPy(r)));
        });
        //检查循环的次数是否正确
        $loc.isCirculationRight=new Sk.builtin.func(function(self){
            Sk.builtin.pyCheckArgs("isCirculationRight", arguments, 1, 1);
            return new Sk.misceval.promiseToSuspension(new Promise(function(resolve) {
                Sk.setTimeout(function() {
                    var mlevel=maze.mlevel;//获取当前关卡序数
                    var state=false;
                    switch (mlevel){
                        case 5://第五关
                        state=actor.circulation_num==3?true:false;
                        break;
                        case 7://第七关
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
                    if(state==false){
                        maze.result=ResultType.FAILURE
                        layer.alert("挑战失败，请检查循环次数是否正确！", { shade: false })
                        throw new Sk.builtin.TypeError("挑战失败，请检查循环次数是否正确！");
                    }else{
                        maze.result=ResultType.SUCCESS
                        resolve(Sk.builtin.none.none$);
                    }
                }, 800);
            }))
        });
        //检查是否挑战成功
        $loc.isSuccess=new Sk.builtin.func(function(self){
            Sk.builtin.pyCheckArgs("isSuccess", arguments, 1,1);
            return new Sk.misceval.promiseToSuspension(new Promise(function(resolve) {
                var state=checkFinish()
                console.log(state)
                if(state==true){
                    setTimeout(function() {
                        layer.alert("挑战成功！", { shade: false });
                    },1000)
                    resolve(Sk.builtin.none.none$);
                }else if(state==false){//没有到达终点就游戏结束，或者超过了终点
                    maze.result=ResultType.FAILURE
                    layer.alert("挑战失败，请检查是否到达终点！", { shade: false })
                    throw new Sk.builtin.TypeError("挑战失败，请检查是否到达终点！");
                }
            }))
        })

    }, "Actor")

    /**
     * 初始化为设定好的地图
     * 
     * @param {number} level 初始化地图，level为地图的等级.
     * @param {string} block_id 图形块ID.
     */
     var settedMap_f=function(level,block_id) { 
        return new Sk.misceval.promiseToSuspension(new Promise(function(resolve) {
            Sk.setTimeout(function() {
                //高亮效果
                var re=/block_id=([\s\S]*)/.exec(block_id)
                if(re!=null){
                    block_id=re[1];
                    highlight(block_id)
                } 
                level=Sk.ffi.remapToJs(level)
                maze=MAZE_setted[level]
                map=MAZE_setted[level].map
                drawMap()
                resolve(Sk.builtin.none.none$);
            }, 800);
        }));
    }
	mod.settedMap = new Sk.builtin.func(settedMap_f);

	return mod;
}