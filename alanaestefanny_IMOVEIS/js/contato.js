'use strict'


$(document).ready(function(){
    // ------ Plugin Mask para o formulário
    $('#cep').mask('00000-000');
    $('#telefone').mask('(00) 00000-0000');

    // ------ Contador dos caracteres do formulário
    const spanMaximo = $('#maximo');
    const bCaracteres = $('#caracteres');
    const textMensagem = $('#mensagem');

    // Determinando a quantidade de caracteres
    let quantidade = 300;

    // Ouvinte de evento para detectar quando o usuário digitar algo no campo
    textMensagem.on('input', function(){
        // Captura em tempo real o que está sendo digitado
        let conteudo = textMensagem.val();

        // Contagem regressiva
        let contagem = quantidade - conteudo.length;

        // Atualizar a exibição de caracteres
        bCaracteres.text(contagem);

        if(contagem != 0){
            spanMaximo.css('color','black');
        } else {
            spanMaximo.css('color','red');
        };
    });

});



// ------ API ViaCep 

// Formulário
const formulario = document.querySelector('#formulario');

// Campos do formulário
const inputCep = formulario.querySelector('#cep');
const inputEndereco = formulario.querySelector('#endereco');
const inputBairro = formulario.querySelector('#bairro');
const inputCidade = formulario.querySelector('#cidade');
const inputEstado = formulario.querySelector('#estado');

/* Ouvinte de evento para o formulário */
formulario.addEventListener('submit', function(event){
    event.preventDefault();

    formulario.classList.add("form-load");
    
    // Capturar o CEP
    let cepDigitado = inputCep.value;

    // Url para a API ViaCep
    let url = `https://viacep.com.br/ws/${cepDigitado}/json/`;

    // Ajax usando Fetch
    fetch(url).then(function(resposta){
        return resposta.json();

    }).then(function(dados){
        setTimeout(function(){
            if(!('erro' in dados)){
                // Coloca os dados encontrados pela API ViaCep nos campos do formulário
                inputEndereco.value = dados.logradouro;
                inputBairro.value = dados.bairro;
                inputCidade.value = dados.localidade;
                inputEstado.value = dados.uf;
            } else {
                alert('Cep não encontrado');
                inputCep.value = '';
                inputEndereco.value = '',
                inputBairro.value = '',
                inputCidade.value = '',
                inputEstado.value = '',
                inputCep.focus();
            };
            
    
            formulario.classList.remove('form-load')

        },1000);

        
    
    });

});

// ------ API ViaCEP


