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
            //separo o id da noticia do link (poderia só enviar o id)
            const id = content.split('?')[1];
            //CARREGO A DATABASE DE NOTICIAS
            const noticiasJson  = await carregarDados();
            var noticiaClicada;
            for(let i = 0; i < noticiasJson.length; i++){
                if(noticiasJson[i].id == id){
                    noticiaClicada = noticiasJson[i];
                    break;
                }
            }
            const htmlNoticia = criarHtmlNoticiaCompleta(noticiaClicada);
            await fetch(`html/noticiaDinamica.html`)
            .then(res => res.text())
            .then(html =>{
                main.innerHTML = html;
                const content = document.querySelector('content');
                content.appendChild(criarHtmlNoticiaCompleta(noticiaClicada));
                // console.log(content);
            });

        }
        else
            await fetch(`html/${content}.html`)
            .then(res => res.text())
            .then(html =>{
                main.innerHTML = html;
            });
    }


    //CARREGA O JSON COM OS DADOS
    async function carregarDados(){
        const response = await fetch('http://localhost:8000/noticias');
        if(response.ok){
            const noticiaJson = await response.json();
            return noticiaJson;

        } else{
            alert("ERRO COM O JSON! Provavelmente esqueci de executar o srv-api");
        }
    }
                    
    carregar();
    async function carregar(){
        await carregarHome();
        // const cArtigo = document.getElementById('artigo');
        // // console.log(cArtigo.attributes[2]['name']);

        // cArtigo.onclick = function() {
        //     // e.preventDefault();
        //     alert(this.attributes[2]['name']);
        //     // carregarConteudo("covid/covid/covid");
        // }
    }

    // carregarDados();

    //RENDERIZA A PAGINA COM TODAS AS NOTICIAS -> CHAMA A FUNÇÃO DE CRIAR NOTICIA DESSA PAG;
    async function carregarAllNoticias(){
        await fetch(`html/noticias.html`)
        .then(res => res.text())
        .then(html =>{
            main.innerHTML = html;
            const section = document.querySelector('section');
            fetch('http://localhost:8000/noticias')
                .then(res => res.json())
                .then(noticias =>{
                    noticias.forEach(noticiaDb => {
                        const cardNoticia = criarNoticia(noticiaDb);
                        section.appendChild(cardNoticia);
                    });
                });
        });
    }
    //CARREGA A PÁGINA HOME
    async function carregarHome(){
        const noticiasJson = await carregarDados();
        console.log(noticiasJson);
        const htmlHome = criarHtmlHome(noticiasJson);
        console.log(htmlHome);
        main.appendChild(htmlHome);
    }

    //criar O HTML DA PÁGINA QUE APRESENTA A NOTICIA COMPLETA
    function criarHtmlNoticiaCompleta(noticia){ 
        const divSla = document.createElement('div');
        const main = document.createElement('main');
        divSla.classList.add('sla');
        const h3 = document.createElement('h3');
        h3.innerHTML = noticia.titulo;
        const img = document.createElement('img');
        img.classList.add('imagem');
        img.src = `img/noticias/${noticia.imagem}`;
        const content = document.createElement('content');
        content.innerHTML = noticia.texto;

        const section = document.createElement('section');
        section.classList.add('nome');
        const divAutor = document.createElement('div');
        divAutor.innerHTML = noticia.autor;
        const divData = document.createElement('div');
        divData.innerHTML = noticia.data;
        main.appendChild(divSla);
        main.appendChild(section);
        divSla.appendChild(h3);
        divSla.appendChild(img);
        divSla.appendChild(content);
        section.appendChild(divAutor);
        section.appendChild(divData);

        return main;
    }

    //CRIO OS HTML DA PÁGINA HOME, COM AS NOTICIAS DINAMICAS E O RETORNO
    function criarHtmlHome(noticias){ 
        const article = document.createElement('article');
        for(i=0; i<3; i++){
            const divNoticia = document.createElement('div');
            divNoticia.classList.add('noticia');
            divNoticia.id = noticias[i].id;

            const ancoraNoticia = document.createElement('a');
            ancoraNoticia.classList.add('imgNoticiaAllNoticias');


            const imgNoticia = document.createElement('img');
            imgNoticia.classList.add('imgNoticiaHome');
            imgNoticia.src = `./img/noticias/${noticias[i].imagem}`

            const divBlock = document.createElement('div');
            divBlock.classList.add('block');

            const ancoraCategoria= document.createElement('a');

            const divCategoria = document.createElement('div');
            divCategoria.classList.add('categoriaId');
            divCategoria.innerHTML = noticias[i].categoriaId;

            const ancoraTitulo = document.createElement('a');

            const divTitulo = document.createElement('div');
            divTitulo.classList.add('titulo');
            divTitulo.innerHTML = noticias[i].titulo;


            const ancoraResumo = document.createElement('a');

            const divResumo = document.createElement('div');
            divResumo.classList.add('resumo');
            divResumo.innerHTML = noticias[i].resumo;


            const divTempo = document.createElement('div');
            divTempo.classList.add('tempo');
            divTempo.innerHTML = noticias[i].data;


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

            divNoticia.addEventListener("click", function(){
                listener(divNoticia);
            }, 
            false
            );
        }
        //CRIAÇÃO DA PARTE DA BOX COVID

        // const divContainer = document.createElement('div');
        // divContainer.classList.add("container")

        const divBoxCovid = document.createElement('div');
        divBoxCovid.classList.add("boxCovid");
        
        const divCovid = document.createElement('div');
        divCovid.classList.add("covid");

        const ancoraHref = document.createElement('a');
        ancoraHref.href = "./html/covid/covid/covid.html";

        const divSessao = document.createElement('div');
        divSessao.classList.add("sessao");
        divSessao.textContent = "Sessão COVID-19";

        


        const divContainer = document.createElement('div');
        const divContainerB = document.createElement('div');
        divContainerB.classList.add("container-b")
        divContainer.classList.add("container");
        divContainerB.appendChild(article);
        const divContainerMaisVista = document.createElement('div');


        //CRIAÇÃO DAS NOTICIAS MAIS VISTAS
        const divContainerA = document.createElement('div');
        divContainerA.classList.add("container-a");

        const divSide = document.createElement('div');
        divSide.classList.add("side");

        const divNoticiaSide= document.createElement('div');
        divNoticiaSide.classList.add("noticiaside");
        divNoticiaSide.textContent = "Notícias mais lidas";
        divSide.appendChild(divNoticiaSide);
        for(i=noticias.length;i>noticias.length-3;i--){
            const divMaisVistas= document.createElement('div');

            divMaisVistas.classList.add("maisvistas");
            divMaisVistas.id = noticias[i-1].id;
            const ancoraMaisvista= document.createElement('a');
    
            const divMaisVistNumero= document.createElement('div');
            divMaisVistNumero.classList.add("maisvistasnumero");
            divMaisVistNumero.textContent = `${noticias.length - i + 1}.`;
    
            const ancoraTitulo= document.createElement('a');
    
            const divMaisVistasTitulo= document.createElement('div');
            divMaisVistasTitulo.classList.add("maisvistastitulo");
            divMaisVistasTitulo.textContent = `${noticias[i-1].titulo}`;

            divContainerA.appendChild(divSide);
            divSide.appendChild(divMaisVistas);
            divMaisVistas.appendChild(ancoraMaisvista);
            ancoraMaisvista.appendChild(divMaisVistNumero);
            divMaisVistas.appendChild(ancoraTitulo);
            ancoraTitulo.appendChild(divMaisVistasTitulo);

            divMaisVistas.addEventListener("click", function(){
                listener(divMaisVistas);
            }, 
            false
            );

        }
        // divContainer.appendChild(divContainerMaisVista);
        // divContainerB.appendChild(article);
        divContainerA.appendChild(divSide);

        divContainer.appendChild(divBoxCovid);
        divBoxCovid.appendChild(divCovid);
        divCovid.appendChild(ancoraHref);
        ancoraHref.appendChild(divSessao);

        divContainer.appendChild(divContainerB);
        divContainer.appendChild(divContainerA);
        divContainerB.appendChild(article);
        console.log(divContainer);
        return divContainer;
    }

    //RENDERIZA AS NOTICIAS DA COM TODAS AS NOTICIAS
    function criarNoticia(noticias){
        const divAll = document.createElement('div');
        divAll.classList.add('containerAll');
        divAll.id = `${noticias.id}`;
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
    //LISTENER PARA QUANDO UMA NOTÍCIA É CLICADA EXECUTA ESSA FUNÇÃO E PASSA O ID DA NOTICIA PARA CARREGAR A PAGINA COMPLETA DA NOTICIA.
    function listener(divAll){
        carregarConteudo(`noticia/?${divAll.id}`);
    }