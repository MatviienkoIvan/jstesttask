document.body.onload = function(){
    var score = document.getElementById("score")
    var scoreParam = 0;
    var interval;     
    var currentPos = 0;
    
    var start = document.getElementById('start').addEventListener('click', function(){
        this.setAttribute("disabled", "disabled")   
        var color = getRandomColor();
        var rndWidth = getRandomWidth(0, (canvas.clientWidth-20))
        var speed =  getRandomWidth(0.1, 8)
        interval = setInterval(function(){
            requestAnimationFrame(function() {                  
                var canvas = document.getElementById('canvas');
                var ctx = canvas.getContext('2d');  
                ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientWidth);
                ctx.fillStyle = color;
                ctx.fillRect(rndWidth, currentPos, 20, 20);
                currentPos += speed;
                canvas.addEventListener('click', function(e){
                    var clickX = e.pageX - canvas.offsetLeft;
                    var clickY = e.pageY - canvas.offsetTop;
                    if(clickX > rndWidth && clickX < (rndWidth+20) && clickY > currentPos && clickY < (currentPos+20)){
                        scoreParam += 1                        
                        currentPos = 0;
                        score.textContent = scoreParam;  
                        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientWidth);     
                        color = getRandomColor();
                        rndWidth = getRandomWidth(0, (canvas.clientWidth-20));
                        speed = getRandomWidth(0.1, 8);
                    }
                })
                if(currentPos >= canvas.clientHeight) {
                    currentPos = 0;
                    scoreParam += 1
                    score.textContent = scoreParam;    
                    color = getRandomColor();
                    rndWidth = getRandomWidth(0, (canvas.clientWidth-20));
                    speed = getRandomWidth(0.1, 8);
                }
            })
        }, 50)
    })
    var stop = document.getElementById('stop').addEventListener('click', function(){
        score.textContent = "0";
        scoreParam = 0;
        animateStop();
        
    })
    
    function animateStop(){        
            document.getElementById('canvas').getContext('2d').clearRect(0, 0, canvas.clientWidth, canvas.clientWidth); 
            currentPos = 0;
            document.getElementById('start').removeAttribute("disabled")
            clearInterval(interval)
    }
    
    function getRandomColor() {
        var color = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
        return color;
    }
    
    function getRandomWidth(param1, param2) {      
        var rand = param1 + Math.random() * (param2 + 1 - param1);
        return rand;
    }
    
}