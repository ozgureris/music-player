class Music {
    constructor(title, singer, img, file){
        this.title = title;
        this.singer = singer;
        this.img = img;
        this.file = file;
    }

    getName(){
        return this.title + ' - ' + this.singer;
    }
}

const musicList = [
    new Music("Another Love", "Tom Odell", "another.jpeg", "anotherlove.mp3"),
    new Music("Antidepresan", "Mabel Matiz", "mabel.png", "antidepresan.mp3"),
    new Music("Can't Get You", "Annen MK", "annen.jpeg", "cant.mp3")
];