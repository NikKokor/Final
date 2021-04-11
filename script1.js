let i = 0;

//процедура загрузки json
function loadJSON() {
    let img;
    $.getJSON('imgs.json', function(data) {
        if (data.imgs[i] != null) {
            img = data.imgs[i];
            loadIMG(img);
        }
        i++;

    });
}

//процедура загрузки картинки из json
function loadIMG(img) {
    let div = document.createElement("div");
    div.className = "column";
    let im = document.createElement("img");
    im.src = img;
    div.appendChild(im);
    document.querySelector('.wall').append(div);

}