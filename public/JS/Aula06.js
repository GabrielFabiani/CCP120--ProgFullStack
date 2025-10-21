let canvas1 = document.getElementById('canvas1');
let ctx1 = canvas1.getContext('2d');

class Retangulo {
    constructor(srcImagem, x, y, largura, altura) {
        this.img = new Image();
        this.img.src = srcImagem;
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura;
    }

    desenhe(contexto) {
        
            contexto.drawImage(this.img, this.x, this.y, this.largura, this.altura);
        
    }
}


let Beemovie = new Retangulo('../img/the-bee-movie-bee-movie.png', 125, 125, 50, 50);

function animacao() {
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
    Beemovie.desenhe(ctx1);
    requestAnimationFrame(animacao);
}

animacao();

canvas1.addEventListener('mousemove', function(evento) {
    let rect = canvas1.getBoundingClientRect();
    let x_mouse = evento.clientX - rect.left;
    let y_mouse = evento.clientY - rect.top;

    // Centraliza a imagem no cursor (opcional)
    Beemovie.x = x_mouse - Beemovie.largura / 2;
    Beemovie.y = y_mouse - Beemovie.altura / 2;
});