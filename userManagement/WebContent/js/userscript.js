function myFunction() {
  var x = document.getElementById("nav");
  if (x.className === "nav") {
    x.className += " responsive";
  } else {
    x.className = "nav";
  }
}

function submit() {
    console.log(event.type);
    var name = document.getElementById("name").value; 
    var sapId = document.getElementById("sapId").value;
    var mobile = document.getElementById("mobile").value;
    var email = document.getElementById("email").value;
    var gender = document.getElementById("gender").value;

    var obj = {name : name, sapId : sapId, mobile : mobile, email : email, gender : gender};
    console.log(obj);
    var httpReq;
    if(window.XMLHttpRequest) {
        httpReq = new XMLHttpRequest();
    }
    else{
        httpReq = new ActiveXObject("")
    }
    httpReq.onreadystatechange = function() {

        if(this.readyState ===4 && this.status === 201){ 
            console.log(this.response);
        }
    }
    httpReq.open('post', 'http://localhost:3000/user', true);
    httpReq.setRequestHeader("Content-type","application/json");
    httpReq.send(JSON.stringify(obj));
}
function getData() {
	//location.reload();
    var httpReq;
    if(window.XMLHttpRequest) {
        httpReq = new XMLHttpRequest();
    }
    else{
        httpReq = new ActiveXObject("")
    }
    httpReq.onreadystatechange = function() {

        if(this.readyState ===4 && this.status === 200){
            console.log(this.response);
            tablecreate(this.response);
           
        }
    }
    httpReq.open('get', 'http://localhost:3000/user', true);
    httpReq.send();
}

function tablecreate(response){
	debugger;
	var table = document.createElement('table');
	
	table.setAttribute("border", "1");
    var tbody = document.createElement('tbody');
    var thead = document.createElement('thead');
    var headTr = document.createElement('tr');

    var headTd1 = document.createElement('td');
    var headTd1text = document.createTextNode("Name");
    headTd1.appendChild(headTd1text);

    var headTd2 = document.createElement('td');
    var headTd2text = document.createTextNode ("SapId");
    headTd2.appendChild(headTd2text);

    var headTd3 = document.createElement('td');
    var headTd3text = document.createTextNode ("Id");
    headTd3.appendChild(headTd3text);

    var headTd4 = document.createElement('td');
    var headTd4text = document.createTextNode ("Mobile");
    headTd4.appendChild(headTd4text);

    var headTd5 = document.createElement('td');
    var headTd5text = document.createTextNode ("Email");
    headTd5.appendChild(headTd5text);

    var headTd6 = document.createElement('td');
    var headTd6text = document.createTextNode ("Gender");
    headTd6.appendChild(headTd6text);
    
    var headTd7 = document.createElement('td');
    var headTd7text = document.createTextNode ("Action-1");
    headTd7.appendChild(headTd7text);
    
    var headTd8 = document.createElement('td');
    var headTd8text = document.createTextNode ("Action-2");
    headTd8.appendChild(headTd8text);

    headTr.appendChild(headTd3);
    headTr.appendChild(headTd1);
    headTr.appendChild(headTd2);
    headTr.appendChild(headTd4);
    headTr.appendChild(headTd5);
    headTr.appendChild(headTd6);
    headTr.appendChild(headTd7);
    headTr.appendChild(headTd8);

    thead.appendChild(headTr);

    var data = JSON.parse(response);
    var len = data.length;
    
    if(len > 0 ){
    for(var i=0; i<len;i++){
        var tbodyTr = document.createElement('tr');

        var td1 = document.createElement('td');
        var td1Text = document.createTextNode(data[i].name);
        td1.appendChild(td1Text);

        var td2 = document.createElement('td');
        var td2Text = document.createTextNode(data[i].sapId);
        td2.appendChild(td2Text);

        var td3 = document.createElement('td');
        var td3Text = document.createTextNode(data[i].id);
        td3.appendChild(td3Text);

        var td4 = document.createElement('td');
        var td4Text = document.createTextNode(data[i].mobile);
        td4.appendChild(td4Text);

        var td5 = document.createElement('td');
        var td5Text = document.createTextNode(data[i].email);
        td5.appendChild(td5Text);

        var td6 = document.createElement('td');
        var td6Text = document.createTextNode(data[i].gender);
        td6.appendChild(td6Text);
        
        
        var td7=document.createElement('td');
        var a=document.createElement('a');
        var link = document.createTextNode("remove");
        a.appendChild(link);
        a.setAttribute('class', 'remove');
        a.setAttribute('href', 'javascript:remove('+data[i].id+')');
        td7.appendChild(a);
       
        
        var td8=document.createElement('td');
        var aa=document.createElement('a');
        var updatelink = document.createTextNode("Update");
        aa.appendChild(updatelink);
        aa.setAttribute('class', 'Update');
        aa.setAttribute('href', 'javascript:update('+data[i].id+')');
        td8.appendChild(aa);
        
        tbodyTr.appendChild(td3);
        tbodyTr.appendChild(td1);
        tbodyTr.appendChild(td2);
        tbodyTr.appendChild(td4);
        tbodyTr.appendChild(td5);
        tbodyTr.appendChild(td6);
        tbodyTr.appendChild(td7);
        tbodyTr.appendChild(td8);

        tbody.appendChild(tbodyTr); 
    }
    }
    else{
        var data = document.createElement("h4");
        var noData = document.createTextNode("No data Found")
        data.appendChild(noData);
        tbody.appendChild(data);
    }
    
    table.appendChild(thead);
    table.appendChild(tbody);
    var body = document.getElementsByTagName('body')[0];
    body.appendChild(table)
	
}

 function remove(id) {
    console.log(id);
    
   /*  axios({
    	  method: 'DELETE',
    	  url: 'http://localhost:3000/user/' + id
    	}); */
    	
    	var url = "http://localhost:3000/user/"+id;
    	var xhr = new XMLHttpRequest();
    	xhr.open("DELETE", url, true);
    	xhr.onload = function () {
    		var users = JSON.parse(xhr.responseText);
    		if (xhr.readyState == 4 && xhr.status == "200") {
    			console.table(users);
    		} else {
    			console.error(users);
    		}
    	}
    	xhr.send(null);
}
 
 function update(id) {
		console.log("id: "+id);
		var url = "http://localhost:3000/user/"+id;
		
			/*  console.log(event.type);
		    var name = document.getElementById("name").value; 
		    var sapId = document.getElementById("sapId").value;
		    var mobile = document.getElementById("mobile").value;
		    var email = document.getElementById("email").value;
		    var gender = document.getElementById("gender").value; */

		   // var obj = {name : name, sapId : sapId, mobile : mobile, email : email, gender : gender};
		    //console.log(obj);
		
		var data = {};
		data.name = "saheb";
		data.email  = "sa@abc.com";
		data.sapId="116465";
		data.gender="male";
		data.mobile="4567894561";
		var json = JSON.stringify(data);

		var xhr = new XMLHttpRequest();
		xhr.open("PUT", url, true);
		xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
		xhr.onload = function () {
			var users = JSON.parse(xhr.responseText);
			if (xhr.readyState == 4 && xhr.status == "200") {
				console.table(users);
			} else {
				console.error(users);
			}
		}
		xhr.send(json);
	     
	}


