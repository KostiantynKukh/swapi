window.addEventListener("load", Init);


function Init(){
    let url = "https://swapi.co/api/people/";
    Request(url, GetPerson);
    let prevUrl = "";
    let nextURL = "";
    let nextPage = document.querySelector(".nextPage");
    nextPage.addEventListener("click", Nextpage);
    let prePage = document.querySelector(".prePage");
    prePage.addEventListener("click", Prepage);
}

function Nextpage(){
    Request(nextUrl, GetPerson);
}

function Prepage(){
    Request(prevUrl, GetPerson);
}

function Request(url, callback) {

    let xhr = new XMLHttpRequest();

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
    if(persons.previos==null){
        console.log(persons);
    }     
    prevUrl = persons.previous;
    nextUrl = persons.next;    
    var elem = document.getElementById("elem");
    if(elem.hasChildNodes()){
        elem.firstElementChild.remove();
    }    
    var table = document.createElement("table");    
    table.style.cssText = "width:100%; text-align:center;";
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
        for(var i=0;i<10;i++){ 
            var tr = document.createElement("tr"); 
            tr.style.margin = "20px 0";       
                for(let i=0;i<3;i++){
                    var td = document.createElement("td");
                    td.style.padding = "20px;"                        
                    tr.append(td);
                }
            tbody.append(tr);
        } 
    
    table.append(thead);
    table.append(tbody);
    elem.append(table);

        thead.rows[0].cells[0].innerHTML = "Name";
        thead.rows[0].cells[1].innerHTML = "Birth Year";
        thead.rows[0].cells[2].innerHTML = "Gender";

    for (let i = 0; i < persons.results.length; i++){    
    tbody.rows[i].cells[0].innerHTML = persons.results[i].name;
    tbody.rows[i].cells[1].innerHTML = persons.results[i].birth_year;
    tbody.rows[i].cells[2].innerHTML = persons.results[i].gender;
    
    }  
}
