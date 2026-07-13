class moveableObject {
    x = 10;
    y = 250;
    img;
    height = 200;
    width = 250;

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }


    moveRight() {
     console.log('Moving Right');
    }
    
    moveLeft(){
        
    }
}