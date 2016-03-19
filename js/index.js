(function (root) {
    var map = root.maze.MAZE_51;
    var result = root.maze.solution(map, 1, 0);

    document.querySelector('.outer').appendChild(
        root.maze.render(map)
    );

    root.maze.visualizeWaves(map, 0, result.waves, result.path);
})(this);
