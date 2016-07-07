function Demo() {
    var el = document.createElement('div');
    var bars = [];

    function createBar(x, y, w, h, color) {
        var b = new Bar(x, y, w, h, color);
        el.appendChild(b.el);
        bars.push(b);
        return b;
    }

    function removeBar(bar) {
        el.removeChild(bar.el);
    }

    var resolution = 10;
    // display width and display height - ensure these are a multiple of resolution for best display
    var dw = 1020, // Servo default width is 1024
        dh = 740; // Servo default height is 740
    // window.resizeTo(dw, dh);
    var barWidth  = resolution,
        barHeight = resolution;

    var barsX = Math.ceil(document.body.clientWidth / barWidth),
        barsY = Math.ceil(document.body.clientHeight / barHeight);

    var imgName = 'banksy2.jpg' || 'chrome.jpg' || 'servo.jpg' || 'banksy1.jpg' || 'sunset.jpg' || 'firefox.png' || 'red.png' || 'bars.jpg';
    Http.get('http://localhost:3000/c/' + imgName + '?width=' + barsX +'&height=' + barsY, paint, (err) => {
        console.error(err);
    });

    function paint(grid) {
        bars.forEach(removeBar);
        bars = [];
        var zi = 1; // zIndex to assign to bar when interacted with
        _.times(barsY, (y) => {
            _.times(barsX, (x) => {
                var color = grid[y][x];
                var dx = x * barWidth,
                    dy = y * barHeight;
                var b = createBar(_.random(document.body.clientWidth), document.body.clientHeight, barWidth, barHeight, color);
                
                b.addEventListener('mouseover', () => {
                    b.el.style.zIndex = zi++; // Ensure the bar is on top, so changes are visible
                    b.tweenOpacity(0, 500)
                        .chain(b.tweenOpacity(1, 500))
                        .start();
                });

                setTimeout(() => {
                    b.tweenPos(dx, dy, 1000)
                        .start();    
                }, 2000);

            });
        });
    }

    function randomColorGrid(hue) {
         var grid = [];
        _.times(barsY, () => {
            var row = [];

            _.times(barsX, () => {
                r.push(hue ? randomColor({hue: hue}): randomColor());
            });

            grid.push(row);
        });
        return grid;
    }
   
    this.animate = function(t) {
        TWEEN.update(t);
    };

    this.dom = el;
}