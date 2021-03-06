document.addEventListener('DOMContentLoaded', function() {

    var Gato = function(nome, foto){
        this.nome = nome;
        this.foto = foto;
        this.contador = 0;     
    }

    Gato.prototype.incrementar = function() {
        this.contador += 1;
    }

    var model = {
        gatoAtual: null,
        gatos: [new Gato("Teste", "img/img.jpg"), new Gato("Gato Selvagem", "img/selvagem.jpg"), new Gato("Miau", "img/gato.jpg"), new Gato("Teste2", "img/assustado.jpg"), new Gato("Miau", "img/img.jpg")] 
    };

    var controller = {
        adicionarGato: function (gato) {
            model.gatos.push(gato);
            view.listarGatos();
            view.limparTelaCadastro();
        },

        incrementarContador: function(){
            model.gatoAtual.incrementar();
            gatoView.renderizarGato();
        },

        pegarGatos: function(){
            return model.gatos;
        },

        pegarGatoAtual: function(){
            return model.gatoAtual;
        },

        setGatoAtual: function(gato){
            model.gatoAtual = gato;
        },

        init: function() {
            model.gatoAtual = model.gatos[0];
            view.init();
            gatoView.init();
            
        }


    };

    var gatoView = {
        init: function(){
            this.divGato = document.getElementById('cat');
            this.imgGato = document.getElementById('cat-img');
            this.textoGato = document.getElementById('cat-counter');

            this.imgGato.addEventListener('click', function(){
                controller.incrementarContador();
            });

            this.renderizarGato();
        },

        renderizarGato: function(){
            var gatoAtual = controller.pegarGatoAtual();
            this.imgGato.src = gatoAtual.foto;
            this.textoGato.innerText = `Numero de cliques no gato ${gatoAtual.nome}: ${gatoAtual.contador}`;
        }
    
    }

    var view = {

        init: function() {
            var addFotoBtn = document.getElementById('new-cat-img');
            addFotoBtn.addEventListener('change', view.pegarFoto, false);

            var addGatoBtn = document.getElementById('novo-gato-btn');
            addGatoBtn.addEventListener('click',function(e){

                

                if(view.novaImg){

                    var nomeGato = document.getElementById('nome').value;

                    controller.adicionarGato(new Gato(nomeGato,view.novaImg));
                }

                e.preventDefault();
            }, false);

            this.listarGatos();
        },

        listarGatos: function() {
            var lista = document.getElementById('list');
            lista.innerHTML = '';
            controller.pegarGatos().forEach(function (gato, index) {            
                var liGato = document.createElement('li');
                liGato.setAttribute('id', 'gato-'+index);
                liGato.innerText = gato.nome;
                
                lista.appendChild(liGato);

                liGato.addEventListener('click', function(){
                    controller.setGatoAtual(gato);              
                    gatoView.renderizarGato();                
                }, false);
            });
        },

        // mostrarGato: function(gato){
        //     var conteudo = document.getElementById('conteudo');
        //     conteudo.innerHTML = '';

        //     var divGato = document.createElement('div');
        //     var imgGato = document.createElement('img');
        //     var textoGato = document.createElement('p');
        //     var contadorGato = document.createElement('span');

        //     divGato.setAttribute('class', 'gato');
        
        //     imgGato.setAttribute('src', gato.foto);
            

        //     textoGato.innerText = "Numero de cliques no gato "+gato.nome+ ": ";
        //     contadorGato.innerText = gato.contador;


        //     divGato.appendChild(imgGato);
        //     textoGato.appendChild(contadorGato);
        //     divGato.appendChild(textoGato);
        //     conteudo.appendChild(divGato);

        //     imgGato.addEventListener('click', function () {
        //         gato.incrementar();
        //         contadorGato.innerText = gato.contador;
        //     }, false);
        // },

        pegarFoto: function (e) {
            var arquivo = e.target.files[0];
            
            var filtro = RegExp('image/*');
            if(filtro.test(arquivo.type)){
                var imagem = new FileReader();
                imagem.readAsDataURL(arquivo);

                imagem.onload = function(e){
                    
                    var imgUrl = e.target.result; 
                    
                    document.getElementById('img-result').innerHTML = ("<img id='new-img' src='"+imgUrl+"' />");
                    view.novaImg = imgUrl;                
                    
                }
            } else {
                document.getElementById('img-result').innerHTML = "<p>Arquivo invalido</p>";
            }         
            
        },

        limparTelaCadastro: function(){
            document.getElementById('form-add').reset();
            document.getElementById('img-result').innerHTML = "";
        }

    }

    controller.init();

});