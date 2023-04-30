var ar=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=1;

//to store game sequence
function nextSequence()
{
    $("h1").text("Level "+level);
level++;
    userClickedPattern=[];
    var n=Math.floor(Math.random()*4); 
    var randomChosenColor=ar[n];

gamePattern.push(randomChosenColor) ;
playSound(randomChosenColor);


}

//on click function
$(".btn").on("click",function()
{
    var userChosencolor=$(this).attr("id");
    userClickedPattern.push(userChosencolor);
    playSound(userChosencolor);
    animatePress(userChosencolor);
    checkAnswer(userClickedPattern.length-1);
});

//to play sound
function playSound(name){
    $("#"+name).fadeTo(100, 0.3, function() { $(this).fadeTo(500, 1.0); });
    var aud=new Audio("sounds/"+name+".mp3");
    aud.play();

}

//for animation
function animatePress(currentColor){
    $("."+currentColor).addClass("pressed");
    setTimeout(function() {
        $("."+currentColor).removeClass("pressed");
    }, 100);
   
    
}

//to increase level
var started=false;
$(document).keypress(function()
{  
    if(!started){
        $("h1").text("Level 1");
        nextSequence();
        started=true;
    }   
 
});

//to check answer
function checkAnswer(currentlevel){  
        if(gamePattern[currentlevel]===userClickedPattern[currentlevel]){
            if(userClickedPattern.length===gamePattern.length){
                setTimeout(function(){
                    nextSequence();
                },1000);
            }          
        } else{
            playSound("wrong");
            $("body").addClass("game-over");
            $("#level-title").text("Game Over, Press Any Key to Restart");
            setTimeout(function() {
              $("body").removeClass("game-over");
            },200);
            startOver();
        }

}

//to start over
function startOver(){
    level = 0;
  gamePattern = [];
  started = false;
}




 
 
