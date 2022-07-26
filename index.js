function initSimsRpp(elem,conf){
    console.log("SIMSRPP v1.0\nhttps://github.com/YanJi314/SimsRPP");
    elem.innerHTML="";
    simsRppElem=elem;
    simsRppConf=conf;
    simsRppCurrent=-1;
    simsRppAutoNext=true;
    simsRppDisableSwitch=false;
    simsRppContainer=document.createElement("div");
    simsRppContainer.classList.add("simsRppContainer");
    simsRppElem.onmouseover=function(){clearInterval(simsRppInterval)};
    simsRppElem.onmouseout=function(){simsRppInterval=setInterval(function(){if(simsRppAutoNext){simsRppNext()}},5000);};
    simsRppElem.ontouchstart=function(){simsRppTouchLocation=event.touches[0].clientX;simsRppElem.ontouchmove=simsRppTouchmoveHandler;clearInterval(simsRppInterval)};
    elem.appendChild(simsRppContainer);
    simsRppSwitchContainer=document.createElement("div");
    simsRppSwitchContainer.classList.add("simsRppSwitchContainer");
    elem.appendChild(simsRppSwitchContainer);
    conf.forEach(function(data,index){
        if(data.play==-1){simsRppPlayId=Math.round(Math.random()*(data.contents.length-1));}else{simsRppPlayId=data.play;}
        simsRppPlayContent=data.contents[simsRppPlayId];
        simsRppPlayElement=document.createElement("div");
        simsRppPlayElement.classList.add("simsRppContent");
        simsRppPlayElement.dataset.simsRppId=index;
        simsRppPlayLinks='';
        simsRppPlayContent.links.forEach(function(data){simsRppPlayLinks+="<a href='"+data[1]+"'>"+data[0]+" ></a>"});
        simsRppPlayElement.innerHTML=`<img src="${simsRppPlayContent.img}"><div><h1>${simsRppPlayContent.header}</h1><span>${simsRppPlayContent.text}</span><links>${simsRppPlayLinks}</links></div>`;
        elem.getElementsByClassName("simsRppContainer")[0].appendChild(simsRppPlayElement);
        simsRppSwitchContainer.innerHTML+=`<div onclick="showSimsRpp(${index})" data-sims-rpp-id="${index}"></div>`
    });
    showSimsRpp(0);
    simsRppInterval=setInterval(function(){if(simsRppAutoNext){simsRppNext()}},5000);
}
function simsRppIsdark(){
    if(document.body.classList.contains("dark")){return 1;}else{return 0;}
}
function showSimsRpp(rppid){
    if(rppid!=simsRppCurrent && !simsRppDisableSwitch){
        simsRppDisableSwitch=true;
        simsRppCurrent=rppid;
        if(document.querySelector(".simsRppContent.active")){
            document.querySelector(".simsRppContent.active").classList.add("hidden");
            document.querySelector(".simsRppContent.active").classList.remove("active");
        }
        if(document.querySelector(".simsRppSwitchContainer div.active")){
            document.querySelector(".simsRppSwitchContainer div.active").classList.remove("active");
        }
        document.querySelector(".simsRppSwitchContainer div[data-sims-rpp-id^='"+rppid+"']").classList.add("active");
        setTimeout(function(){
            simsRppDisableSwitch=false;
            simsRppContainer.style.background=simsRppConf[rppid].background[simsRppIsdark()];
            if(!simsRppConf[rppid].darktext[simsRppIsdark()]){simsRppElem.classList.add("lightText")}else{simsRppElem.classList.remove("lightText")}
            document.querySelector(".simsRppContent[data-sims-rpp-id^='"+rppid+"']").classList.remove("hidden");
            document.querySelector(".simsRppContent[data-sims-rpp-id^='"+rppid+"']").classList.add("active");
        },200)
    }
}
function simsRppNext(){
    if(simsRppCurrent==simsRppConf.length-1){showSimsRpp(0);}else{showSimsRpp(simsRppCurrent+1);}
}
function simsRppPrev(){
    if(simsRppCurrent==0){showSimsRpp(simsRppConf.length-1);}else{showSimsRpp(simsRppCurrent-1);}
}
function simsRppTouchmoveHandler(){
    if(event.touches[0].clientX-simsRppTouchLocation>50){simsRppPrev();simsRppElem.ontouchmove=function(){};simsRppInterval=setInterval(function(){if(simsRppAutoNext){simsRppNext()}},5000);}
    if(event.touches[0].clientX-simsRppTouchLocation<-50){simsRppNext();simsRppElem.ontouchmove=function(){};simsRppInterval=setInterval(function(){if(simsRppAutoNext){simsRppNext()}},5000);}
}
