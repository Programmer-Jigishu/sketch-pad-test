class SketchPad{
    constructor(container,size=400){
        this.canvas = document.createElement("canvas");
        this.canvas.width=size;
        this.canvas.height = size;
        this.canvas.style = `
            background-color: aqua;
            box-shadow: 0px 0px 10px 2px black
        `;
        container.appendChild(this.canvas);

        this.division = document.createElement("div");
        container.appendChild(this.division);

        this.clearButton = document.createElement("button");
        this.clearButton.textContent="Clear"; 
        // this.clearButton.style.cssText = "color:white;width:20%;height:10%"
        this.division.appendChild(this.clearButton);
        this.undoButton = document.createElement("button");
        this.undoButton.textContent="Undo"; 
        // this.undoButton.style.cssText = "color:white;width:20%;height:10%"
        this.division.appendChild(this.undoButton);
        this.redoButton = document.createElement("button");
        this.redoButton.textContent="Redo"; 
        // this.redoButton.style.cssText = "color:white;width:20%;height:10%"
        this.division.appendChild(this.redoButton);



        this.ctx = this.canvas.getContext("2d");
        this.#addEventListeners();

        
        // ===============
        this.isDrawing = false;
        this.deleted=[];
        this.paths = [];
        this.#redraw();
    }
    
    #addEventListeners(){
        this.canvas.onmousedown= (evt)=>{
                const rect = this.canvas.getBoundingClientRect();
                const mouse = [
                    evt.clientX-rect.left,
                    evt.clientY-rect.top,
                ] 
                // console.log(mouse);
                
                this.paths.push([mouse]);
                this.isDrawing = true;
                
                
                
            }
            
            this.canvas.onmousemove= (evt)=>{
                
                const rect = this.canvas.getBoundingClientRect();
                if(this.isDrawing){
                    
                    const mouse = [
                        evt.clientX-rect.left,
                        evt.clientY-rect.top,
                    ] 
                    
                    const lastPath=this.paths[this.paths.length-1];
                    // console.log(mouse);
                    lastPath.push(mouse)
                    this.#redraw();
                }
            }
            this.canvas.onmouseup= (evt)=>{
                this.isDrawing = false;
                console.log(this.paths);
                console.log("---------------------");
                
                
                // console.log(typeof(this.paths));
            }
            this.canvas.ontouchstart=(evt)=>{
                const loc = evt.touches[0];
                this.canvas.onmousedown(loc);
            }
            this.canvas.ontouchmove=(evt)=>{
                const loc = evt.touches[0];
                this.canvas.onmousemove(loc);
            }
            this.canvas.ontouchend=(evt)=>{
                const loc = evt.touches[0];
                this.canvas.onmouseup(loc);
            }
            this.clearButton.onmousedown=(evt)=>{
                this.ctx.clearRect(0,0,this.canvas.height,this.canvas.width);
                // this.clearButton.style.cssText = "text-decoration:dotted;background-color:purple;width:20%;height:10%"
                this.paths=[];
                this.deleted = [];
                this.#redraw();
            }
            this.undoButton.onmousedown=(evt)=>{
                // this.undoButton.style.cssText = "background-color:purple;width:20%;height:10%"
                this.ctx.clearRect(0,0,this.canvas.height,this.canvas.width);
                let item = this.paths.pop();
                this.deleted.push(item);
                this.#redraw();
            }
            this.redoButton.onmousedown=(evt)=>{
                // this.redoButton.style.cssText = "background-color:purple;width:20%;height:10%"
                this.ctx.clearRect(0,0,this.canvas.height,this.canvas.width);
                let item =this.deleted.pop(0);
                this.paths.push(item);
                this.#redraw();
            }
            // this.canvas.onmouseout= (evt)=>{
                //     this.isDrawing = false;
                //     if (this.paths.length!=0){
                    //     console.log(this.paths);
                    //     console.log("---------------------");
                    //     }
                    //     this.paths = [];
                    //     // console.log(typeof(this.paths));
                    //     console.log(this.paths);
                    // };
                }
                
                #redraw=()=>{
                    if(this.paths.length > 0 ){
                        this.undoButton.disabled=false;
                    }else{
                        this.undoButton.disabled=true;
                    }

                    if(this.deleted.length > 0 ){
                        this.redoButton.disabled=false;
                    }else{
                        this.redoButton.disabled=true;
                    }

                    this.ctx.clearRect(0,0,this.canvas.height,this.canvas.width);
                    draw.paths(this.ctx,this.paths);
                }

  

}