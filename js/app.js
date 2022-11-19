debounce = function (func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

$('[data-group]').each(function (e) {
  e.preventDefault;
  // Encontrando itens dentro dos atributos data grupo que
  // correspondem aos atributos declarados no método target
  const allTarget = $(this).find('[data-target]');
  const allClick = $(this).find('[data-click]');
  // Selecionando os filhos correspondentes de cada data
  allClick.each(function (item) {
    item.preventDefault;
    $(this).click(function (e) {
      // removendo as classe do botao para evitar duas ativas simultaneamente
      allClick.each(function () {
        $(this).removeClass('botao-ativo');
      });
      //
      $(this).addClass('botao-ativo');
      //Atribuindo ao link o valor do atributo. Virando o meu alvo.
      var link = $(this).attr('data-click');
      //
      allTarget.each(function () {
        $(this).removeClass('ativo');
        if ($(this).attr('data-target') === link) {
          $(this).addClass('ativo');
        }
      });
    });
  });
});
// 36 a 52 Escopo do evento de click nos botões do escopo anterior que retorna o objeto contendo
// como conteúdo todos os botões.
// 27 a 54 Captura os pais contendo o atributo data group
// Depois encontra os filhos contendo os atributos na 31 e 32
// O retorno dessas variáveis é um objeto, então se usa um laço each no objeto de click
// Dentro do escopo do click no allClick, chamei o objeto allTarget.
// O allTarget retorna um objeto com o alvo das sections que quero mostrar
// Declarei uma variável chamada link para capturar o valor do atributo na 44
// Usei o valor desta variável para verificar a semelhança de valores entre diferentes atributos para ocorrer a ativação.

// Esta seleção é para evitar o preventDefault em um botao para link externo
$('.menu li a[href^="#"]').click(function (e) {
  e.preventDefault();
  // Há a opção de colocar o innerHeight do menu em uma variável.
  let href = $(this).attr('href');
  let offSet = $(href).offset().top;

  $('html, body').animate(
    {
      scrollTop: offSet - 74,
    },
    500,
  );
  console.log(offSet);
});

$('.logo').click(function (e) {
  e.preventDefault();
  $('html, body').animate(
    {
      scrollTop: 0,
    },
    500,
  );
});

// Botão ativo de acordo com a seção

$('section').each(function () {
  var height = $(this).height(),
    offsetTop = $(this).offset().top,
    menuHeight = $('.menu').innerHeight(),
    id = $(this).attr('id'),
    $itemMenu = $('a[href="#' + id + '"]');

  $(window).scroll(function () {
    let scrollTop = $(window).scrollTop();
    // verificando a seção atual
    //
    // Delimita o topo da página como sendo o pé do nav.
    //
    if (
      offsetTop - 2 * menuHeight < scrollTop &&
      offsetTop + height - menuHeight > scrollTop
    ) {
      $itemMenu.addClass('ativo-secao');
    } else {
      $itemMenu.removeClass('ativo-secao');
    }
  });
});

// 80 a 83 Se a distancia entre o topo da seção
//( sendo o inicio da página - 2* a altura do menu,
//tornando o bottom do menu, o referente
// de topo para A SEÇÃO )
// for MENOR que a distância do topo do scroll com o inicio
// do Scroll
// E se a distancia entre o topo da seção MAIS a altura da seção
// (significando que o user ainda está na seção)
// MENOS a altura do menu for MAIOR que a distância do topo do
// Scroll com o inicio

// Botão hambúrguer

const classeAtiva = 'active';
$('.mobile-btn').click(function () {
  $(this).toggleClass('active');
  $('.mobile-menu').toggleClass(classeAtiva);
});

// Slide

$('.slide > :first').addClass(classeAtiva);

function rotateSlide() {
  let activeSlide = $('.slide > .active'),
    nextSlide = activeSlide.next();

  if (nextSlide.length == 0) {
    nextSlide = $('.slide > :first');
  }
  activeSlide.removeClass(classeAtiva);
  nextSlide.addClass(classeAtiva);
}

setInterval(rotateSlide, 1600);

// Animar ao Scroll

let $target = $('[data-anime="scroll"]'),
  animationClass = 'animate',
  offset = ($(window).height() * 3) / 4;

function animeScroll() {
  let documentTop = $(window).scrollTop();

  $target.each(function () {
    let itemTop = $(this).offset().top;
    if (documentTop > itemTop - offset) {
      $(this).addClass(animationClass);
    } else {
      $(this).removeClass(animationClass);
    }
  });
}

$(document).scroll(function () {
  animeScroll();
});

/*const aulas = [
  {
    nome: 'Mat',
    tempo: 45,
  },
  {
    nome: 'Por',
    tempo: 45,
  },
  {
    nome: 'Bio',
    tempo: 45,
  },
];

// O acumulador está acumulando, em seus indices, os nomes das aulas do objeto aula
// o index do loop serve como index do acumulador

const mostrarAulas = aulas.reduce((acumulador, aula, index) => {
  acumulador[index] = aula.nome;
  return acumulador;
}, {});

// detalhe importante no reduceRight: o index não vai na funcao //

// some() retorna true se houver ao menos uma vez o valor verificado

const frutas = ['Banana', 'Maca', 'Uva'];

const temUva = frutas.some((item) => {
  return item === 'Uva';
});

const cor = ['Branco', 'Marrom', 'Magenta', 'Púrpura'];

/*const temBranco = frutas.every((item) => {
  return item === 'Uva';
}); */

// find retorna o primeiro truthy que encontrar

// const temBranco = frutas.find((item) => item === 'Uva');

//const temBranco = frutas.findIndex((item) => item === 'Uva');

// FILTER() Retorna uma array de todos elementos truthy

//const temBranco = cor.filter((item) => item);
