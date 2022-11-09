status="";
objects=[];
function setup()
{
    canvas=createCanvas(480,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}
function start()
{
    objectDetector=ml5.objectDetector("cocossd",modelloaded);
    document.getElementById("status").innerHTML="Status:Detecting Objects";
}
function modelloaded()
{
    console.log("model is loaded");
    status=true;
    video.loop();
    video.volume(0);
    video.speed(1);
}
function draw()
{
    image(video,0,0,480,380);
    if(status!="")
    {
        objectDetector.detect(video,gotresults);
        for(i=0;i<objects.length;i++)
        {
            document.getElementById("status").innerHTML="status:Objects detected";
            document.getElementById("number_of_objects").innerHTML="Number of object detected are:"+objects.length;

            fill("#ff0000");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
            noFill();
            stroke("ff0000");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}
function gotresults(error,results)
{
    if(error)
    {
        console.error(error);
    }
    console.log(results);
    objects=results;
    
}