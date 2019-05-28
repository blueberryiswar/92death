export default class Point {
    constructor(x=0, y=0, path=false, pathCount = 0) {
        this.x = x;
        this.y = y;
        this.path = path;

        if (this.path) {
            this.setCoordinatesFromPath(this.path, pathCount);
        }
    }

    setCoordinatesFromPath(path, pathCount) {
        this.x = path.x + path.polyline[pathCount].x;
        this.y = path.y + path.polyline[pathCount].y;
    }

    getDistanceTo(point) {
        return Math.abs(point.x - this.x) + Math.abs(point.y - this.y)
    }
}