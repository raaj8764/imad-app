var button=document.getElementById('counter');
document.getElementById("button").onclick=function(){
    
    var request=new XMLHttpRequest();
    
    
    Request.onreadystatechange=function(){
    if(request.readystate===XMLHttpRequest.DONE){
        if(request.status===200){
            var counter=request.responseText;
            var span=document.getElementById('count');
            span.InnerHtml=counter.toString();
        }
    }
    };
    request.open('GET','http://revanthr47.imad.hasura-app.io/counter',True);
    request.send(null);
};