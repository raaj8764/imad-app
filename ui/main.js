
var submit = document.getElementById('submit_btn');
submit.onclick = function (){
     var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE){
        if (request.status === 200){
           console.log('user logged in');
           alert('user logged in');
        }else if(request.status === 403){
            alert('username/password incorrect');
        }else if(request.status === 500){
             alert('something went wrong in server');
        }
    }
};
var cmt = document.getElementById('btn');
var sub_cmt = document.getElementById('sub_btn');
var username = document.getElementById('username').value;
var password = document.getElementById('password').value;
console.log(username);
console.log(password);
request.open('POST', 'http://revanthr47.imad.hasura-app.io/login', true);
request.setRequestHeader('Content-Type','application/json');
request.send(JSON.stringify({username:username,password:password}));
};
