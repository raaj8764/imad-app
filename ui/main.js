var button=document.getElementById('counter');
document.getElementById("button").onclick=function(){
    
    var request=new XMLHttpRequest();
    
    
    Request.onreadystatechange=function(){
    if(request.readystate===XMLHttpRequest.DONE){
        if(request.status===200){
            var counter=request.responseText;
            var span=document.getElementById('count');
            span.innerHTML=counter.toString();
        }
    }
    };
    request.open('GET','http://revanthr47.imad.hasura-app.io/counter',true);
    request.send(null);
};

//submit name
var nameinput=document.getElementById('name');
var name=nameinput.value;
var submit=document.getElementById('submit_btn');
submit.onclick=function(){
    //fetch data from server to browser
    //render the name to webpage
    var names=['name1','name2','name3','name4'];
    var list='';
    for(var i=0;i<names.lenght;i++){
        list+='<li>'+ names[i] +'</li>';
    }
    var ul=document.getElementById('namelist');
    ul.innerHTML=list;
};