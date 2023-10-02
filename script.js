const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const rect = canvas.getBoundingClientRect();


const mouse = {
    x: null,
    y: null,
}


canvas.addEventListener('mousemove', function(event) {
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
    console.log(mouse);
})


function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;


    this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.strokeStyle = 'blue';
        ctx.stroke();
    }

    this.update = function() {

       
        if (this.x + this.radius > rect.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
    
        if (this.y + this.radius > rect.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy; 



        ///////////interactivity//////
        var distance = Math.sqrt((mouse.x - this.x) ** 2 + (mouse.y - this.y) ** 2);

        if (distance < 50) {

            if (this.radius < 100){
                this.radius += 1;

            }
        } else if (this.radius > 5) {
            this.radius -= 1;
        }

                this.draw();
    }
}



var circleArray = [];

for (var i = 0; i < 200; i++) {
    var radius = 30;
    var x = Math.random() * (rect.width - radius * 2) + radius;
    var y = Math.random() * (rect.height - radius * 2) + radius;
    var dx = (Math.random() - 0.5);
    var dy = (Math.random() - 0.5);
    circleArray.push(new Circle(x, y, dx, dy, radius));

}


function drawRays() {
    ctx.clearRect(0, 0, canvas.Width, canvas.height);

    for (var i = 0; i < circleArray.length; i++) {
        var circle = circleArray[i];
        var distance = Math.sqrt((mouse.x - circle.x) ** 2 + (mouse.y - circle.y) ** 2);

        if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(circle.x, circle.y);
            ctx.strokeStyle = 'rgb(255, 255, 0)';
            ctx.stroke();
        }
    }
}


function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
        circleArray[i].draw();
    }

    drawRays();

}




 animate();


