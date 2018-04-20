class variable{ 
    constructor(t){ this.tipo = t; this.nombre; this.valor; this.defecto(); } 
    defecto(){
        if(this.tipo == "float" || this.tipo == "int"){ this.valor = 0; }
        if(this.tipo == "string"){ this.valor = ""; }
        if(this.tipo == "bool"){ this.valor = false; }
    }    
}
class lol{ constructor(i,d,o){ this.is = i; this.de = d; this.op = o; } }
var variables = [],palabrasR = ["abstract","as","base","bool","break","	byte","case","catch","char","checked","class","	const","continue","decimal","default","delegate","do","double","else","enum","event","explicit","extern","false","finally","fixed","float","for","foreach","goto","if","implicit","in","int","interface","internal","is","lock","long","namespace","new","null","object","operator","out","override","params","private","protected","public","readonly","ref","return","sbyte","sealed","short","sizeof","stackalloc","static","string","struct","switch","this","throw","true","try","	typeof","uint","ulong","unchecked","unsafe","ushort","using","using static","virtual","void","volatile","while"];
function compilar(){
    variables = [];
    var x = document.getElementById("myText").value.split("\n");
    for (var i =0;i < x.length;i++){ detectarTipoVar(x[i]); }
    mostrarVar();
}
function mostrarVar(){
    for(var j = 0;j<variables.length;j++){ 
        console.log("Tipo: "+variables[j].tipo);
        console.log("Nombre: "+variables[j].nombre);
        console.log("Valor: "+variables[j].valor); 
    }
}
function detectarTipoVar(x){
    var z = true;
    if(comprobarVInt(x) || comprobarVBool(x) || comprobarVFloat(x) || comprobarVString(x)){
        detectarVar(x); 
        z = false; 
    }
    else if(comprobarOp(x)){ detectarOp(x); z = false; }
    else if(z){ console.log("ERROR no se detecto ninguna variable u operacion aritmetica"); }
}
function romperLinea(x){
    x = x.replace(/\s+/g," ");
    x = x.replace(/^\s+|\s+$/g,"");
    x = x.replace(/\s*=\s*/g," = ");
    x = x.replace(/\s*\*\s*/g," * ");
    x = x.replace(/\s*\+\s*/g," + ");
    x = x.replace(/\s*\/\s*/g," / ");
    x = x.replace(/\s*-\s*/g," - ");
    x = x.replace(/\s*;\s*(;+\s*)*/g," ;");
    x = x.replace(/\s*,\s*/g," , ");
    x = x.split(" ");
    return x;
}
function detectarOp(x){
    var kuku,y = false;
    x = romperLinea(x);
    for(var i = 0; i < x.length; i++){
        for(var j = 0; j < variables.length; j++){
            if(x[i] == variables[j].nombre){
                if(x[i+1] == "=" || x[i+2] == "="){ kuku = variables[j]; y = true; }
                else{ x[i] = variables[j].valor; }
            }
        }   
        if(/\d+/.test(x[i])){ x[i] = parseInt(x[i]); }
    }
    if(y){
        if(kuku.tipo == "int"){ kuku.valor = parseInt(kuku.valor); }
        if(kuku.tipo == "float"){ kuku.valor = parseFloat(kuku.valor); }
        if(kuku.tipo == "bool"){ kuku.valor == "true" ? kuku.valor = true : kuku.valor = false; }
    }
    else { console.log("no se detecto ninguna variable antes del ="); }     
    for(var i = 0;i < x.length;i++){
        if(x[i]  == "="){
            if(x[i-1] == "+"){
                if(x[i+1] == "-"){ x[i+2] = kuku.valor - x[i+2]; x.shift(i+1); }
                else{ x[i+1] = kuku.valor + x[i+1]; }
            }
            else if(x[i-1] == "-"){
                if(x[i+1] == "-"){ x[i+2] = kuku.valor + x[i+2]; x.shift(i+1); }
                else{ x[i+1] = kuku.valor - x[i+1]; }
            }
            else if(x[i-1] == "*"){
                if(x[i+1] == "-"){ x[i+2] = kuku.valor *- x[i+2]; x.shift(i+1); }
                else{ x[i+1] = kuku.valor * x[i+1]; }
            }
            else if(x[i-1] == "/"){
                if(x[i+1] == "-"){ x[i+2] = kuku.valor /- x[i+2]; x.shift(i+1); }
                else{ x[i+1] = kuku.valor / x[i+1]; }
            }
        }
    }
    x = x.join(" ").replace(/ ;/g,"").split("=");
    if(y){ kuku.valor = eval(x[1]); }
    cod3Dir(x[0],x[1]);
    codPos(x[0],x[1]);
    for(var i = 0; i < variables.length; i++){
        if(x[0] == variables[i].nombre){ variables[j].valor = kuku.valor; break;}
    }                      
}
function codPos(x,y){
    var i = 0,z = true;
    y = romperLinea(y);
    do{
        while(i < y.length){
            if(y[i] == "*"){
                if (z){ y.splice(i-1,3,y[i-1]+y[i+1]+"*"); i = 0; z = false; }
                else { z = true; }
            }
            if(y[i] == "/"){ 
                if (z){ y.splice(i-1,3,y[i-1]+y[i+1]+"/"); i = 0; z = false; }
                else { z = true; }
            }   
            i++;
        }
        i = 0;
        while(i < y.length){
            if(y[i] == "*"){
                if (z){ y.splice(i-1,3,y[i-1]+y[i+1]+"*"); i = 0; z = false; }
                else { z = true; }
            }
            if(y[i] == "/"){ 
                if (z){ y.splice(i-1,3,y[i-1]+y[i+1]+"/"); i = 0; z = false; }
                else { z = true; }
            } 
            if(y[i] == "+"){
                if (z){ y.splice(i-1,3,y[i-1]+y[i+1]+"+"); i = 0; z = false; }
                else { z = true; }
            }
            if(y[i] == "-"){ 
                if (z){ y.splice(i-1,3,y[i-1]+y[i+1]+"-"); i = 0; z = false; }
                else { z = true; } 
            }   
            i++;
        }
        console.log(y);
    }while(y.length != 1);
}
function cod3Dir(x,y){
    var z = "", a = 1, b = 1, i = 0;
    y = romperLinea(y);
    while(i < y.length){
        if(y[i] == "*"){ 
            z += "\n"+a+". MUL "+y[i-1]+" "+y[i+1]+" R"+b; 
            y.splice(i-1,3,"R"+b); 
            a++;
            b++;
            i = 0;
        }
        if(y[i] == "/"){ 
            z += "\n"+a+". DIV "+y[i-1]+" "+y[i+1]+" R"+b; 
            y.splice(i-1,3,"R"+b); 
            a++;
            b++;
            i = 0;
        }   
        i++;
    }
    i = 0;
    while(i < y.length){
        if(y[i] == "+"){ 
            z += "\n"+a+". ADD "+y[i-1]+" "+y[i+1]+" R"+b; 
            y.splice(i-1,3,"R"+b); 
            a++;
            b++;
            i = 0;
        }
        if(y[i] == "-"){ 
            z += "\n"+a+". SUB "+y[i-1]+" "+y[i+1]+" R"+b; 
            y.splice(i-1,3,"R"+b); 
            a++;
            b++;
            i = 0;
        }   
        i++;
    }
    z += "\n"+a+". STO "+y+" "+x;
    console.log(z);
}
function detectarVar(x){
    var y;
    x = romperLinea(x);
    for(var i = 0; i < x.length; i++){
        if(x[i] == "int" || x[i] == "float" || x[i] == "string" || x[i] == "bool" || x[i] == ",")
        {
            y = x[i];
            if(checkNombre(x[i+1])){ console.log("ERROR nombre duplicado: "+x[i+1]); break; }
            if(checkPalabra(x[i+1])){ 
                console.log("ERROR el nombre: "+x[i+1]+" es una palabra reservada"); 
                break; 
            }        
            else{ variables.unshift(new variable(y)); variables[0].nombre = x[i+1]; }
        }
        if(x[i] == "="){ variables[0].valor = x[i+1]; }
    }
}
function checkPalabra(x){
    var y = false;
    for(var i = 0;i < palabrasR.length;i++){ if(palabrasR[i] == x){ y = true; } }
    return y;
}
function checkNombre(x){
    var y = false;
    for(var i = 0;i < variables.length;i++){ if(variables[i].nombre == x){ y = true; } }
    return y;
}
function comprobarOp(x){
    var exp = /\s*[A-z]+\d*\s*(\/|\+|-|\*)?\s*=\s*-?\s*([A-z]+\d*|\d+)(\s*(\/|\+|-|\*)\s*([A-z]+\d*|\d+))*\s*;+/g;
    if(exp.test(x)){ return true; }
    else { return false; }
}
function comprobarVInt(x){
    var exp = /\s*int\s*[A-z]+\d*\s*(=\s*-?\d+)?\s*(,\s*[A-z]+\d*\s*(=\s*-?\d+)?)*\s*;+/g;
    if(exp.test(x)){ return true; }
    else { return false; }
}
function comprobarVFloat(x){
    var exp = /\s*float\s*[A-z]+\d*\s*(=\s*-?\d+(\.\d+)?)?\s*(,\s*[A-z]+\d*\s*(=\s*-?\d+(\.\d+)?)?)*\s*;+/g;
    if (exp.test(x)){ return true; }
    else { return false; }
}
function comprobarVBool(x){
    var exp = /\s*bool\s*[A-z]+\d*\s*(=\s*(true|false|0|1))?\s*(,\s*[A-z]+\d*\s*(=\s*(true|false|0|1))?)*\s*;+/g;
    if (exp.test(x)){ return true; }
    else{ return false; }
}
function comprobarVString(x){
    var exp =/\s*string\s*[A-z]+\d*\s*(=\s*"(\w*\s*)*")?\s*(,\s*[A-z]+\d*(=\s*"(\w*\s*)*")?)*\s*;+/g;
    if (exp.test(x)){ return true; }
    else{ return false; }
}