function abrirMenu() {
    var x = document.getElementById("menu-principal-id");
    var overlay = document.getElementById("nav-overlay");
    if (x.className === "menu-principal") {
        x.className += " responsive";
        overlay.className += " active";
    } else {
        x.className = "menu-principal";
        overlay.className = "";
    }
}

function fecharMenu() {
    var x = document.getElementById("menu-principal-id");
    var overlay = document.getElementById("nav-overlay");
    x.className = "menu-principal";
    overlay.className = "";
}

document.addEventListener('DOMContentLoaded', (event) => {
    const btnMudarCor = document.getElementById('btn-mudar-cor');
    const paragrafoDestaque = document.getElementById('paragrafo-js-1');

    if (btnMudarCor && paragrafoDestaque) {
        btnMudarCor.addEventListener('click', () => {
            paragrafoDestaque.classList.toggle('js-cor-alternativa');
        });
    }

    const btnToggleTexto = document.getElementById('btn-toggle-texto');
    const detalhesEstriamento = document.getElementById('detalhes-estriamento-js');
    
    if (btnToggleTexto && detalhesEstriamento) {
        detalhesEstriamento.style.display = 'none';

        btnToggleTexto.addEventListener('click', () => {
            if (detalhesEstriamento.style.display === 'none' || detalhesEstriamento.style.display === '') {
                detalhesEstriamento.style.display = 'block';
                btnToggleTexto.textContent = 'Esconder Detalhes';
            } else {
                detalhesEstriamento.style.display = 'none';
                btnToggleTexto.textContent = 'Mostrar/Esconder Detalhes';
            }
        });
    }

    const btnNightMenu = document.getElementById('btn-night-vision-menu');
    
    if (btnNightMenu) {
        btnNightMenu.addEventListener('click', () => {
            document.body.classList.toggle('night-vision');
            const isActive = document.body.classList.contains('night-vision');

            const existingScanline = document.querySelector('.scanline');
            if (isActive) {
                if (!existingScanline) {
                    const scanline = document.createElement('div');
                    scanline.className = 'scanline';
                    document.body.appendChild(scanline);
                }
                btnNightMenu.innerHTML = '<i class="material-icons" style="vertical-align: middle; font-size: 18px;">visibility_off</i> Desativar';
            } else {
                if (existingScanline) existingScanline.remove();
                btnNightMenu.innerHTML = '<i class="material-icons" style="vertical-align: middle; font-size: 18px;">visibility</i> Visão Noturna';
            }
            
            fecharMenu();
        });
    }
});

function mascaraCPF(input) {
    let value = input.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    input.value = value;
}

function mascaraTelefone(input) {
    let value = input.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    
    if (value.length > 10) {
        value = value.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (value.length > 5) {
        value = value.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (value.length > 2) {
        value = value.replace(/^(\d\d)(\d{0,5}).*/, "($1) $2");
    }
    input.value = value;
}

function validarCPFLogica(cpf) {
    cpf = cpf.replace(/[^\d]/g, "");
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

    let soma = 0;
    let resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;

    return true;
}

function validarFormulario() {
    const inputCPF = document.getElementById('inputCPF');
    const inputTelefone = document.getElementById('inputTelefone');
    const feedbackCPF = document.getElementById('feedback-cpf');
    const feedbackTelefone = document.getElementById('feedback-telefone');
    
    let isValido = true;

    if (inputCPF) {
        if (!validarCPFLogica(inputCPF.value)) {
            feedbackCPF.textContent = 'CPF inválido. Verifique os dígitos.';
            inputCPF.classList.add('is-invalid');
            isValido = false;
        } else {
            feedbackCPF.textContent = '';
            inputCPF.classList.remove('is-invalid');
        }
    }

    if (inputTelefone) {
        const telNumeros = inputTelefone.value.replace(/[^\d]/g, ""); 
        if (telNumeros.length < 10) {
            feedbackTelefone.textContent = 'Telefone inválido. Inclua DDD e número.';
            inputTelefone.classList.add('is-invalid');
            isValido = false;
        } else {
            feedbackTelefone.textContent = '';
            inputTelefone.classList.remove('is-invalid');
        }
    }
    
    if (isValido) {
        alert('Formulário validado e pronto para envio!');
        return true;
    } else {
        return false;
    }
}