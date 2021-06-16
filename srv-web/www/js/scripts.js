const main = document.querySelector('main');

carregarHome();

// Eventos onClick
const cNoticia = document.querySelector('#menuNoticias');
cNoticia.onclick = function(e) {
    e.preventDefault();
    carregarConteudo("noticias");
}

const cCovid = document.querySelector('#menuCovid');
cCovid.onclick = function(e) {
    e.preventDefault();
    carregarConteudo("covid/covid/covid");
}


//REQUISIÇÃO AJAX. feita assincrona
async function carregarConteudo(content){
    await fetch(`html/${content}.html`)
    .then(res => res.text())
    .then(html =>{
        main.innerHTML = html;
    });
}

async function carregarHome(){
    await carregarConteudo("home");
    // const section = document.querySelector('section');
    // console.log(section);
        fetch('http://localhost:8000/noticias')
            .then(res => res.json())
            .then(noticias =>{
                const img = document.querySelector("body > main > div > div.container-b > article > div:nth-child(1) > a > img");
                img.src = `./img/noticias/${noticias[0].imagem}`;
                const categoria = document.querySelector("body > main > div > div.container-b > article > div:nth-child(1) > div > a:nth-child(1) > div");
                categoria.textContent = noticias[0].categoriaId;
                const titulo = document.querySelector("body > main > div > div.container-b > article > div:nth-child(1) > div > a:nth-child(2) > div");
                titulo.textContent = noticias[0].titulo;
                const resumo = document.querySelector("body > main > div > div.container-b > article > div:nth-child(1) > div > a:nth-child(3) > div");
                resumo.textContent = noticias[0].resumo;
                const data = document.querySelector("body > main > div > div.container-b > article > div:nth-child(1) > div > div");
                data.textContent = noticias[0].data;
            });
}

async function carregarDados(){
    // await fetch('http://localhost:8000/noticias')
    //     .then(res => res.json())
    //     .then(noticias =>{
    //         const noticias1 = noticias;
    //         return noticias1;
    //     })
    const response = await fetch('http://localhost:8000/noticias')
    const noticias = await response.json();
    console.log(noticias);
    return noticias;
}

// const dados = carregarDados();
// console.log(dados);

async function criarNoticia(noticias){
    const divAll = document.createElement('div');
    divAll.classList.add('containerAll');

    const divContainerC = document.createElement('div');
    divAll.classList.add('container-c');

    const article = document.createElement('article');


    const divNoticia = document.createElement('div');
    divNoticia.classList.add('noticia');

    const ancoraNoticia = document.createElement('a');
    ancoraNoticia.classList.add('noticia');


    const imgNoticia = document.createElement('img');
    imgNoticia.classList.add('imgNoticiaHome');
    imgNoticia.src = `./img/noticias/${noticias[0].imagem}`

    const divBlock = document.createElement('div');
    divBlock.classList.add('block');

    const ancoraCategoria= document.createElement('a');

    const divCategoria = document.createElement('div');
    divCategoria.classList.add('categoriaId');
    divContainerC.innerHTML = noticias[0].categoriaId;

    const ancoraTitulo = document.createElement('a');

    const divTitulo = document.createElement('div');
    divTitulo.classList.add('titulo');
    divTitulo.innerHTML = noticias[0].titulo;


    const ancoraResumo = document.createElement('a');

    const divResumo = document.createElement('div');
    divResumo.classList.add('resumo');
    divResumo.innerHTML = noticias[0].resumo;


    const divTempo = document.createElement('div');
    divTempo.classList.add('tempo');
    divTempo.innerHTML = noticias[0].divTempo;


    divAll.appendChild(divContainerC);
    divContainerC.appendChild(article);
    article.appendChild(divNoticia);
    divNoticia.appendChild(ancoraNoticia);
    ancoraNoticia.appendChild(imgNoticia);
    divNoticia.appendChild(divBlock);
    divBlock.appendChild(ancoraCategoria);
    ancoraCategoria.appendChild(divCategoria);

    divBlock.appendChild(ancoraTitulo);
    ancoraTitulo.appendChild(divTitulo);

    divBlock.appendChild(ancoraResumo);
    ancoraResumo.appendChild(divResumo);

    divBlock.appendChild(divTempo);

    return divAll;
}
/* 
<div class="containerAll">
    <div class="container-c">
        <article>
                <div class="noticia">
                    <a href="noticia/"><img class="imgNoticiaHome" src="./img/noticias/imagens/" alt=""></a>
                    <div class="block">
                        <a href="">
                            <div class="categoriaId">categoria</div>
                        </a>
                        <a href="noticia/">
                            <div class="titulo">titulo</div>
                        </a>
                        <a href="noticia/">
                            <div class="resumo">resumo</div>
                        </a>
                        <div class="tempo">há tantos dias</div>
                    </div>
                </div>
        </article>
    </div>
</div> */

{/* <div class="containerAll container-c">
    <div>
        <article>
            <div class="noticia">
                <a class="noticia"><img class="imgNoticiaHome" src="" alt=""></a>
                <div class="block">
                    <a>
                        <div class="categoriaId">
                        </div>
                    </a>
                    <a>
                        <div class="titulo">
                        </div>
                    </a>
                    <a>
                        <div class="resumo">
                        </div>
                    </a>
                    <div class="tempo">
                    </div>
                </div>
            </div>
        </article>
    </div>
</div> */}

                                            