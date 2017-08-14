var button=document.getElementById('counter');
document.getElementById("button").onclick=function(){
    
    var request=new XMLHttpRequest();
    
    
   request.onreadystatechange = function(){

        //take some action
        if(request.readyState === 4 && request.status === 200){
          var counter =  request.responseText;
         var span = document.getElementById("count");
         span.innerHTML = counter.toString(); 
        }

    //Not done yet
};
//make a request
    request.open('GET','http://revanthr47.imad.hasura-app.io/counter', true);
    request.send(null);
};

//submit name
var nameinput=document.getElementById('name');
name=nameinput.value;
var submit=document.getElementById('submit_btn');
submit.onclick=function(){
   
    
   request.onreadystatechange = function(){

        //take some action
        if(request.readyState === 4 && request.status === 200){
          var names=['name1','name2','name3','name4'];
          var list='';
          for(var i=0;i<names.lenght;i++)
          {
          list+='<li>'+ names[i] +'</li>';
          }
        var ul=document.getElementById('namelist');
        ul.innerHTML=list;
        }

};
    request.open('GET','http://revanthr47.imad.hasura-app.io/submitname?name=' +name, true);
    request.send(null);
}; 
  
