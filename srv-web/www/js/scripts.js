const main = document.querySelector('main');


// Eventos onClick
const cNoticia = document.querySelector('#menuNoticias');
cNoticia.onclick = function(e) {
    e.preventDefault();
    carregarAllNoticias();
}

const cCovid = document.querySelector('#menuCovid');
cCovid.onclick = function(e) {
    e.preventDefault();
    carregarConteudo("covid/covid/covid");
}


//REQUISIÇÃO AJAX. feita assincrona
async function carregarConteudo(content){
    if(content.indexOf("?") != -1){
        console.log(content);
        // await fetch(`html/${content}.html`)
        await fetch(`html/noticiaDinamica.html`)
        .then(res => res.text())
        .then(html =>{
            main.innerHTML = html;
        });
    }
    else
        await fetch(`html/${content}.html`)
        .then(res => res.text())
        .then(html =>{
            main.innerHTML = html;
        });
}

{/* <h2><a href="">Notícias</a></h2>

<div class="sla">
    <h3>Titulo da Notícia</h3>
    <img class= "imagem" src="./img/alface.png">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
         Facere, consectetur! Officia eveniet atque dolorem facilis accusamus,
         dolorum id molestias minus culpa iure totam porro consectetur. Commodi debitis sit animi aliquam?
         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad consequatur molestiae alias cumque tempora nostrum, porro repellat nam numquam commodi similique iste ipsa impedit repellendus quibusdam inventore expedita ea quisquam.     
</div>

<section class="nome">
    <pre>
        Nome do escritor
        Fonte
    </pre> 
</section> */}

async function carregarHome(){
    await carregarConteudo("home");
    // const section = document.querySelector('section');
    // console.log(section);
        await fetch('http://localhost:8000/noticias')
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
                const noticia = document.querySelector("body > main > div > div.container-b > article > div:nth-child(1)")
                noticia.toggleAttribute(noticias[0].id_ = `${noticias[0].id_}`);
            });
}
carregar();
async function carregar(){
    await carregarHome();
    const cArtigo = document.getElementById('artigo');
    console.log(cArtigo.attributes[2]['name']);

    cArtigo.onclick = function() {
        // e.preventDefault();
        alert(this.attributes[2]['name']);
        // carregarConteudo("covid/covid/covid");
    }
}


// async function carregarDados(){
//     await fetch('http://localhost:8000/noticias')
//         .then(res => res.json())
//         .then(noticias =>{
//             criarNoticia(noticias);
//         });
//     // const response = await fetch('http://localhost:8000/noticias')
//     // const noticias = await response.json();
//     // console.log(noticias);
//     // return noticias;
// }

// carregarDados();

async function carregarAllNoticias(){
    await fetch(`html/noticias.html`)
    .then(res => res.text())
    .then(html =>{
        main.innerHTML = html;
        const section = document.querySelector('section');
        fetch('http://localhost:8000/noticias')
            .then(res => res.json())
            .then(noticias =>{
                // console.log(noticias);
                // criarNoticia(noticias);
                noticias.forEach(noticiaDb => {
                    const cardNoticia = criarNoticia(noticiaDb);
                    section.appendChild(cardNoticia);
                });
            });
    });
}


function criarNoticia(noticias){
    const divAll = document.createElement('div');
    divAll.classList.add('containerAll');
    divAll.id = `${noticias.id_}`;
    const divContainerC = document.createElement('div');
    divContainerC.classList.add('container-c');

    const article = document.createElement('article');


    const divNoticia = document.createElement('div');
    divNoticia.classList.add('noticia');

    const ancoraNoticia = document.createElement('a');
    ancoraNoticia.classList.add('imgNoticiaAllNoticias');


    const imgNoticia = document.createElement('img');
    imgNoticia.classList.add('imgNoticiaHome');
    imgNoticia.src = `./img/noticias/${noticias.imagem}`

    const divBlock = document.createElement('div');
    divBlock.classList.add('block');

    const ancoraCategoria= document.createElement('a');

    const divCategoria = document.createElement('div');
    divCategoria.classList.add('categoriaId');
    divCategoria.innerHTML = noticias.categoriaId;

    const ancoraTitulo = document.createElement('a');

    const divTitulo = document.createElement('div');
    divTitulo.classList.add('titulo');
    divTitulo.innerHTML = noticias.titulo;


    const ancoraResumo = document.createElement('a');

    const divResumo = document.createElement('div');
    divResumo.classList.add('resumo');
    divResumo.innerHTML = noticias.resumo;


    const divTempo = document.createElement('div');
    divTempo.classList.add('tempo');
    divTempo.innerHTML = noticias.data;


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

    divAll.addEventListener("click", function(){
        listener(divAll);
    }, false);
    return divAll;
}
function listener(divAll){
    console.log(divAll.id);
    carregarConteudo(`noticia/?id=${divAll.id}`);
}
                                            