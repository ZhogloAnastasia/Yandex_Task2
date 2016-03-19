(function (root) {
    var EMPTY = root.maze.EMPTY;
    var WALL = root.maze.WALL;
    var PATH = root.maze.PATH;
    var CURRENT = root.maze.CURRENT;

    var _waves = [];
    var _wave = null;
    var _oldWave = null;
    var _maze = null;
    var direction = [[0, -1], [1, 0], [0, 1], [-1, 0]];

    var _clone = function (obj) {
        return JSON.parse(JSON.stringify(obj));
    };

    var _init = function (maze, x, y) {
        _wave = [];
        _oldWave = [[x, y]];
        _maze = maze;
    };

    var _findWay = function (x, y) {
        var stepNumber = 0;

        _maze[y][x] = stepNumber;

        var isWayFounded = false;

        while (_oldWave.length > 0 && !isWayFounded) {
            ++stepNumber;
            _wave = [];

            for (var i = 0; i < _oldWave.length && !isWayFounded; ++i) {
                for (var j = 0; j < direction.length && !isWayFounded; ++j) {
                    var x = _oldWave[i][0] + direction[j][0];
                    var y = _oldWave[i][1] + direction[j][1];

                    if (x > -1 && y > -1 && y < _maze.length && x < _maze[0].length && _maze[y][x] === 0 && !(x === 1 && y === 0)) {
                        _wave.push([x, y]);
                        _maze[y][x] = stepNumber;

                        if (y === _maze.length - 1 && _maze[y][x] !== WALL) {
                            isWayFounded = true;
                        }
                    }
                }
            }


            _oldWave = _wave;
            _waves.push(_clone(_wave));
        }

        return {
            x: x,
            y: y
        };
    };

    var _getWay = function (x, y) {
        _wave = [];
        _wave.push([x, y]);

        while (_maze[y][x] !== 0) {
            for (var i = 0; i < direction.length; ++i) {
                var _x = x + direction[i][0];
                var _y = y + direction[i][1];

                if (_x > -1 && _y > -1 && _y < _maze.length && _x < _maze[0].length && _maze[y][x] - 1 === _maze[_y][_x]) {
                    x = _x;
                    y = _y;
                    _wave.push([x, y]);

                    break;
                }
            }
        } 

        return _wave;      
    };


    /**
     * Функция находит путь к выходу и возвращает найденный маршрут
     *
     * @param {number[][]} maze карта лабиринта представленная двумерной матрицей чисел
     * @param {number} x координата точки старта по оси X
     * @param {number} y координата точки старта по оси Y
     * @returns {[number, number][]} маршрут к выходу представленный списоком пар координат
     */
    function solution(maze, x, y) {
        _init(maze, x, y);

        var endPoint = _findWay(x, y);

        return { 
            path: _getWay(endPoint.x, endPoint.y),
            waves: _waves
        };
    }

    root.maze.solution = solution;
})(this);
