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

    let novoX = x_mouse - Beemovie.largura / 2;
    let novoY = y_mouse - Beemovie.altura / 2;

    // 2. Define os limites
    // Limite Mínimo (Lado Esquerdo/Topo): 0
    let limiteMinX = 0;
    let limiteMinY = 0;
    
    // Limite Máximo (Lado Direito/Fundo)
    let limiteMaxX = canvas1.width - Beemovie.largura;
    let limiteMaxY = canvas1.height - Beemovie.altura;

    // 3. Aplica o "Clamping" (Limitação)
    
    // Para X: 
    // Garante que Beemovie.x nunca seja menor que 0.
    // Garante que Beemovie.x nunca seja maior que limiteMaxX.
    Beemovie.x = Math.min(Math.max(limiteMinX, novoX), limiteMaxX);

    // Para Y:
    // Garante que Beemovie.y nunca seja menor que 0.
    // Garante que Beemovie.y nunca seja maior que limiteMaxY.
    Beemovie.y = Math.min(Math.max(limiteMinY, novoY), limiteMaxY);

});