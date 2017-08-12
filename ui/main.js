var button=document.getElementById('counter');
button.onclick=function(){
    
    var request=new XMLHttpRequest();
    
    
    Request.onreadystatechange=function(){
    if(request.readystate===XMLHttpRequest.DONE){
        if(request.status===200){
            var counter=request.responseText;
            var span=document.getElementById('count');
            span.innerHtml=counter.toString();
        }
    }
    };
    request.open('GET','http://revanthr47.imad.hasura-app.io/counter',true);
    request.send(null);
};