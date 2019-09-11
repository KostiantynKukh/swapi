window.addEventListener("load", Init);


function Init(){
    let url = "https://swapi.co/api/people";
    Request(url, GetPerson);
    let nextUrl = "";
    let prevUrl = "";    
    let nextPage = document.querySelector(".nextPage");
    nextPage.addEventListener("click", Nextpage);
    let prePage = document.querySelector(".prePage");
    prePage.addEventListener("click", Prepage);    
    var swapiElem = document.getElementById("swapiElem");
    for(i=0; i<swapiElem.children.length;i++){
        swapiElem.children[i].addEventListener("click", ChooseElement);
    }
}

var number = 0;
function Nextpage(){    
    Request(nextUrl, GetPerson);    
    ++number;    
}
function Prepage(){    
    Request(prevUrl, GetPerson)
    --number;    
}
function ChooseElement(){ 
    var elementsUrl = [
        "https://swapi.co/api/people",
        "https://swapi.co/api/planets",
        "https://swapi.co/api/starships",
        "https://swapi.co/api/vehicles",
        "https://swapi.co/api/films",
        "https://swapi.co/api/species"
    ];   
    var currentUrl = elementsUrl[this.value];
    Request(currentUrl, GetPerson);
}

function ChangeNumber(num, countOf){       
    var count = document.getElementById("count");
    if(num>(countOf/10)){
        number = 0;
        num = 0;
    }
    if(num<0){
        number = 8;
        num = 8;
    }     
    var number1 = (num*10)+1;
    var number2 = (num+1)*10;    
    if(number2>countOf){
        number2=countOf;       
    }   
    var text = number1 + "-" + number2 + " of " + countOf;   
    
    count.innerHTML = text;
}

function Loader(xhr){
    if(xhr.readyState==0){
        var elem = document.getElementById("elem");           
        if(elem.hasChildNodes()){
            elem.firstElementChild.remove();                    
        }
        var img = document.createElement("img");
                    img.setAttribute("src","img/loader.gif");
                    img.setAttribute("class", "col-xs-offset-4 col-xs-4");                    
                    elem.append(img);      
    }
}

function Request(url, callback) {    
    let xhr = new XMLHttpRequest();    
    Loader(xhr);
    xhr.open("GET", url, true);
    xhr.send();    
    xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) return;       

        if (xhr.status != 200) {
            let errStatus = xhr.status;
            let errText = xhr.statusText;
            console.log(errStatus + ": " + errText);
        } else {
            let data = JSON.parse(xhr.responseText);
            callback(data);
        }
    };
}

function GetPerson(persons){          
    ChangeNumber(number, persons.count);
    ControlURL(persons);
    CreateTable(persons);    
}

function ControlURL(persons){
    prevUrl = persons.previous;
    nextUrl = persons.next;    
    if(prevUrl==null){
        prevUrl = "https://swapi.co/api/people/?page=9";
    }
    if(nextUrl==null){
        nextUrl = "https://swapi.co/api/people/?page=1";        
    } 
}

function CreateTable(persons){
    var elem = document.getElementById("elem");
    if(elem.hasChildNodes()){
        elem.firstElementChild.remove();
    }    
    var table = document.createElement("table");   
    table.setAttribute("class","table table-inbox table-hover");
    var thead = document.createElement("thead");
    thead.style.width = "100%";
    var tbody = document.createElement("tbody"); 
    var tr = document.createElement("tr");      
        for(i=0;i<3;i++){        
            var td = document.createElement("td");
            td.setAttribute("class", "fat-text")            
            tr.append(td);
        }
        thead.append(tr);
        for(var i=0;i<persons.results.length;i++){ 
            var tr = document.createElement("tr"); 
            tr.style.margin = "20px 0";       
                for(let j=0;j<3;j++){
                    var td = document.createElement("td");
                    tr.append(td);
                }
            tbody.append(tr);
            tbody.rows[i].cells[0].innerHTML = persons.results[i].name;
            tbody.rows[i].cells[1].innerHTML = persons.results[i].birth_year;
            tbody.rows[i].cells[2].innerHTML = persons.results[i].gender; 
        } 
    
    table.append(thead);
    table.append(tbody);
    elem.append(table);
    
        thead.rows[0].cells[0].innerHTML = "Name";
        thead.rows[0].cells[1].innerHTML = "Birth Year";
        thead.rows[0].cells[2].innerHTML = "Gender"; 
}