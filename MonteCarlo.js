var MonteCarlo = class MonteCarlo {
    constructor(canvas, canvasCompute){
        this.canvas = canvas;
        this.canvasCompute = canvasCompute;
        this.ctxCanvas = canvas.getContext("2d");
        this.ctxCanvasCompute = this.canvasCompute.getContext("2d");
        
        this.copyData = [];
        this.formEnum = {"mona" : 0, "scream" : 1, "heart" : 3};
    }
    
    clearCanvas(){
        this.ctxCanvas.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    clearCanvasCompute(){
        this.ctxCanvasCompute.clearRect(0, 0, this.canvasCompute.width, this.canvasCompute.height);
    }

    drawMona(){
        this.clearCanvas();
        var img = document.getElementById("mona");
        this.ctxCanvas.drawImage(img, 10, 10);
    }

    drawLittleHeart(){
        this.clearCanvas();
        this.ctxCanvas.beginPath();
        this.ctxCanvas.moveTo(75,40);
        this.ctxCanvas.bezierCurveTo(75,37,70,25,50,25);
        this.ctxCanvas.bezierCurveTo(20,25,20,62.5,20,62.5);
        this.ctxCanvas.bezierCurveTo(20,80,40,102,75,120);
        this.ctxCanvas.bezierCurveTo(110,102,130,80,130,62.5);
        this.ctxCanvas.bezierCurveTo(130,62.5,130,25,100,25);
        this.ctxCanvas.bezierCurveTo(85,25,75,37,75,40);
        this.ctxCanvas.fill();
    }
    
    /**
    * Codigo para dibujar un canva a partir de una imagen obtenido de 
    * https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_canvas_drawimage
    */
    drawScream(){
        this.clearCanvas();
        /* this.ctxCanvas.beginPath();
        this.ctxCanvas.arc(this.canvas.width/2, this.canvas.height/2, 95, 0, 2*Math.PI, true);
        this.ctxCanvas.closePath();
        this.ctxCanvas.fill(); */

        var img = document.getElementById("scream");
        this.ctxCanvas.drawImage(img, 10, 10);
    }
    
   
    drawCompute(n){
        for (var i = 0; i < n; i++){
            //console.log(this.copyData[i][2]);
            this.ctxCanvasCompute.fillStyle = "#" + this.copyData[i][2];
            this.ctxCanvasCompute.fillRect(this.copyData[i][0], this.copyData[i][1], 1, 1);
            
        }  
    }
    
  
    /**
    * "mona" : 0, "scream" : 1,  "heart" : 3
    */
    setFormDraw(n){
        switch (n) {
            case this.formEnum.mona:
            this.drawMona();
            break;
            case this.formEnum.scream:
            this.drawScream();
            break;
            case this.formEnum.heart:
            this.drawLittleHeart();
            break;
        }
    }

    /*
        Codigo para convertir de rgb a hexadecimal obtenido de 
        https://stackoverflow.com/questions/1936021/javascript-eyedropper-tell-color-of-pixel-under-mouse-cursor
    */
    rgbToHex(r, g, b){
        if (r > 255 || g > 255 || b > 255)
            throw "Invalid color component";
        return ((r << 16) | (g << 8) | b).toString(16);
    }
    
    
    montecarlo(n){
        var x, y, pixels, data;
        var count = 0;
        var min = 0;
        var max = this.canvas.width; 
        this.copyData = []; 

        /*
            Codigo para obtener los pixeles de una imagen y buscar a traves de los colores de ella obtenido de:
            https://stackoverflow.com/questions/19499500/canvas-getimagedata-for-optimal-performance-to-pull-out-all-data-or-one-at-a 
        */

        //pixels = this.ctxCanvas.getImageData(0, 0, this.canvas.width, this.canvas.height);
        //console.log(pixels);
        //var dataView = new DataView(pixels.data.buffer);
        //console.log(dataView);
       
        for(var i = 0; i < n; ++i){ 
            x = Math.floor(Math.random() * (max - min) + min);
            y = Math.floor(Math.random() * (max - min) + min);
            //data = dataView.getUint32(x + y*this.canvas.width); //obtener el pixel en la posicion [x,y]
            pixels = this.ctxCanvas.getImageData(x, y, this.canvas.width, this.canvas.height).data;
            var hex = ("000000" + this.rgbToHex(pixels[0], pixels[1], pixels[2])).slice(-6);
            this.copyData.push([x, y, hex]);
            if(data == 0){ //si es igual a 255 significa que caimos dentro del espacio negro
                count++;
            }
        }
        return (max * max) * (count/n);
    }
}

var $ = function(id){
    return document.getElementById(id);
}