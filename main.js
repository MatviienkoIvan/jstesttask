document.body.onload = function(){
    var score = document.getElementById("score")
    var scoreParam = 0;
    var interval;     
    var currentPos = 0;
    
    var start = document.getElementById('start').addEventListener('click', function(){
        this.setAttribute("disabled", "disabled")   
        var color = getRandomColor();
        var rndWidth = getRandomWidth()
        interval = setInterval(function(){
            requestAnimationFrame(function() {                  
                var canvas = document.getElementById('canvas');
                var ctx = canvas.getContext('2d');  
                ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientWidth);
                ctx.fillRect(rndWidth, currentPos, 20, 20);
                ctx.fillStyle = color;
                currentPos += 1;
                canvas.addEventListener('click', function(e){
                    var clickX = e.pageX - canvas.offsetLeft;
                    var clickY = e.pageY - canvas.offsetTop;
                    if(clickX > rndWidth && clickX < (rndWidth+20) && clickY > currentPos && clickY < (currentPos+20)){
                        scoreParam += 1
                        score.textContent = scoreParam;  
                        animateStop();
                    }
                })
                if(currentPos >= canvas.clientHeight) {
                    currentPos = 0;
                    scoreParam += 1
                    score.textContent = scoreParam;    
                    color = getRandomColor()
                    rndWidth = getRandomWidth()
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
    
    function getRandomWidth() {      
        var rand = 0 + Math.random() * ((canvas.clientWidth-20) + 1 - 0);
        rand = Math.floor(rand);
        return rand;
    }
    
}