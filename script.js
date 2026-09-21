const cabecalho = document.querySelector('#cabecalho');
const botaoMenu = document.querySelector('#botao-menu');
const menuPrincipal = document.querySelector('#menu-principal');
const botaoFaixa = document.querySelector('.track-play');
const audioFaixa = document.querySelector('#audio-faixa');
const progressoFaixa = document.querySelector('#progresso-faixa');
const tempoFaixa = document.querySelector('#tempo-faixa');
const formulario = document.querySelector('#formulario-contato');
const campoEmail = document.querySelector('#email');
const campoConsentimento = document.querySelector('#consentimento');
const mensagemFormulario = document.querySelector('#mensagem-formulario');
const modalPrivacidade = document.querySelector('#modal-privacidade');
const botaoAbrirPrivacidade = document.querySelector('#abrir-privacidade');
const botaoFecharPrivacidade = document.querySelector('#fechar-privacidade');

function atualizarCabecalho() {
  cabecalho.classList.toggle('scrolled', window.scrollY > 24);
}

function alternarMenu() {
  const menuAberto = menuPrincipal.classList.toggle('menu-open');

  botaoMenu.setAttribute('aria-expanded', String(menuAberto));
  botaoMenu.setAttribute('aria-label', menuAberto ? 'Fechar menu' : 'Abrir menu');
}

botaoMenu.addEventListener('click', alternarMenu);

menuPrincipal.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuPrincipal.classList.remove('menu-open');
    botaoMenu.setAttribute('aria-expanded', 'false');
    botaoMenu.setAttribute('aria-label', 'Abrir menu');
  });
});

window.addEventListener('scroll', atualizarCabecalho, { passive: true });
atualizarCabecalho();

function formatarTempo(segundos) {
  if (!Number.isFinite(segundos)) {
    return '0:00';
  }

  const minutos = Math.floor(segundos / 60);
  const segundosRestantes = Math.floor(segundos % 60).toString().padStart(2, '0');
  return `${minutos}:${segundosRestantes}`;
}

function atualizarBotaoFaixa(estaTocando) {
  const icone = botaoFaixa.querySelector('i');
  icone.classList.toggle('fa-play', !estaTocando);
  icone.classList.toggle('fa-pause', estaTocando);
  botaoFaixa.setAttribute('aria-label', estaTocando ? 'Pausar Beat, electronic' : 'Reproduzir Beat, electronic');
}

function atualizarProgresso() {
  const duracao = audioFaixa.duration;
  const porcentagem = duracao ? (audioFaixa.currentTime / duracao) * 100 : 0;
  progressoFaixa.value = porcentagem;
  progressoFaixa.style.background = `linear-gradient(to right, var(--ink) 0%, var(--ink) ${porcentagem}%, rgb(16 16 15 / 25%) ${porcentagem}%, rgb(16 16 15 / 25%) 100%)`;
  tempoFaixa.textContent = `${formatarTempo(audioFaixa.currentTime)} / ${formatarTempo(duracao)}`;
}

botaoFaixa.addEventListener('click', () => {
  if (audioFaixa.paused) {
    audioFaixa.play();
  } else {
    audioFaixa.pause();
  }
});

audioFaixa.addEventListener('play', () => atualizarBotaoFaixa(true));
audioFaixa.addEventListener('pause', () => atualizarBotaoFaixa(false));
audioFaixa.addEventListener('loadedmetadata', atualizarProgresso);
audioFaixa.addEventListener('timeupdate', atualizarProgresso);
audioFaixa.addEventListener('ended', () => {
  audioFaixa.currentTime = 0;
  atualizarBotaoFaixa(false);
  atualizarProgresso();
});

progressoFaixa.addEventListener('input', () => {
  if (audioFaixa.duration) {
    audioFaixa.currentTime = (progressoFaixa.value / 100) * audioFaixa.duration;
  }
});

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();
  mensagemFormulario.className = 'form-message';

  if (!campoEmail.validity.valid) {
    mensagemFormulario.textContent = 'Digite um e-mail válido para continuar.';
    mensagemFormulario.classList.add('error');
    campoEmail.focus();
    return;
  }

  if (!campoConsentimento.checked) {
    mensagemFormulario.textContent = 'Marque a autorização para receber as novidades.';
    mensagemFormulario.classList.add('error');
    campoConsentimento.focus();
    return;
  }

  mensagemFormulario.textContent = 'Tudo certo! Você entrou na lista de novidades do Melodia.';
  mensagemFormulario.classList.add('success');
  formulario.reset();
});

botaoAbrirPrivacidade.addEventListener('click', () => {
  modalPrivacidade.showModal();
});

botaoFecharPrivacidade.addEventListener('click', () => {
  modalPrivacidade.close();
});

modalPrivacidade.addEventListener('click', (evento) => {
  if (evento.target === modalPrivacidade) {
    modalPrivacidade.close();
  }
});
