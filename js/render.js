(function (root) {
    var EMPTY = root.maze.EMPTY;
    var WALL = root.maze.WALL;
    var PATH = root.maze.PATH;
    var CURRENT = root.maze.CURRENT;

    /**
     * Создает HTML элемент заданного типа с заданным CSS классом
     *
     * @param {string} type тип создаваемого HTML элемента
     * @param {string} className CSS класс
     * @returns {HTMLElement} HTML элемент
     */
    function element(type, className) {
        var elem = document.createElement(type);
        elem.className = className;
        return elem;
    }

    /**
     * Создает визуализацию лабиринта по его схеме с возможностью наложения маршрута
     *
     * @param {number[][]} maze схема лабиринта
     * @param {[number, number][]} [path] маршрут
     * @returns {HTMLElement} HTML элемент
     */
    function render(maze) {
        var containerElem = element('div', 'maze'),
            rowElem,
            type,
            row, 
            cell,
            x, 
            y;

        for (y = 0; y < maze.length; y++) {
            row = maze[y];
            rowElem = element('div', 'maze__row');

            for (x = 0; x < row.length; x++) {
                cell = row[x];

                switch (cell) {
                    case WALL:
                        type = 'wall';
                        break;

                    case CURRENT:
                        type = 'current';
                        break;

                    default:
                        type = 'wave';
                }

                var cellElement = document.createElement('div');
                cellElement.className = 'maze__cell' + (type ? ' maze__cell_' + type : '');
                cellElement.id = x + 'x' + y;

                rowElem.appendChild(cellElement);
            }

            containerElem.appendChild(rowElem);
        }

        return containerElem;
    }

    var visulizePath = function (maze, i, path) {
        var cellId = path[i][0] + 'x' + path[i--][1];

        var cellElement = document.getElementById(cellId);
        cellElement.className = 'maze__cell maze__cell_path';
        cellElement.style.background = '';
        
        if (i > -1) {
            setTimeout(function () {
                visulizePath(maze, i, path);
            }, 10);
        }
    }

    var visualizeWaves = function (maze, i, waves, path) {
        var wave = waves[i++];
        var color = 200 - Math.round(i / waves.length * 150);
        var waveSolor = 'rgba(' + color + ', 255, ' + color + ', 1)';

        for (var j = 0; j < wave.length; ++j) {
            var id = wave[j][0] + 'x' + wave[j][1];

            var cell = document.getElementById(id);
            cell.style.background = waveSolor;
        }

        if (i < waves.length) {
            setTimeout(function () {
                visualizeWaves(maze, i, waves, path);
            }, 20);
        } else {
            visulizePath(maze, path.length - 1, path);            
        }
    }

    root.maze.render = render;
    root.maze.visualizeWaves = visualizeWaves;
})(this);
