// ===============================================
// 1. Configuração Inicial e Seletores DOM
// ===============================================

// Seleciona o formulário pelo seu ID (precisa adicionar id="agendamento-form" no HTML)
const formularioAgendamento = document.getElementById('agendamento-form');

// Se o formulário for encontrado, adicionamos um "ouvinte" de evento
if (formularioAgendamento) {
    // Adiciona um ouvinte para o evento 'submit' (quando o usuário clica em Enviar)
    formularioAgendamento.addEventListener('submit', function(event) {
        // Previne o comportamento padrão de recarregar a página
        event.preventDefault(); 
        
        // Chama a função de validação e processamento
        processarAgendamento(event.target);
    });
}


// ===============================================
// 2. Função de Validação e Processamento
// ===============================================

function processarAgendamento(form) {
    // Pega os valores dos campos
    const nome = form.nome.value.trim();
    const email = form.email.value.trim();
    const data = form.data.value.trim();
    const assunto = form.assunto.value;

    let isValid = true;
    let mensagemErro = '';

    // Validação básica
    if (nome === '') {
        isValid = false;
        mensagemErro += 'O campo Nome é obrigatório.\n';
    }

    if (email === '' || !email.includes('@')) {
        isValid = false;
        mensagemErro += 'Por favor, insira um Email válido.\n';
    }

    if (data === '') {
        isValid = false;
        mensagemErro += 'A Data Preferencial é obrigatória.\n';
    }
    
    // Verifica se a data é futura (ou hoje)
    const hoje = new Date().setHours(0, 0, 0, 0);
    const dataSelecionada = new Date(data).setHours(0, 0, 0, 0);
    
    if (dataSelecionada < hoje) {
         isValid = false;
         mensagemErro += 'A data de agendamento deve ser hoje ou uma data futura.\n';
    }


    // ===============================================
    // 3. Resultado do Processamento
    // ===============================================
    
    if (isValid) {
        // Se a validação for bem-sucedida, simula o envio de dados

        console.log('--- Dados Enviados ---');
        console.log(`Nome: ${nome}`);
        console.log(`Email: ${email}`);
        console.log(`Data: ${data}`);
        console.log(`Especialidade: ${assunto}`);
        console.log('----------------------');

        // Feedback visual para o usuário
        alert(`Solicitação de agendamento enviada!
        Aguarde nosso contato no e-mail: ${email}
        Obrigado por escolher o Nome do Hospital.`);
        
        // Limpa o formulário após o sucesso
        form.reset();

    } else {
        // Se houver erros, exibe a mensagem de erro
        alert('Erro no Agendamento:\n\n' + mensagemErro);
    }
}


// ===============================================
// 4. Efeito Visual: Alerta de Emergência
// (Um pequeno toque de interatividade extra)
// ===============================================

// Simula um alerta de emergência que aparece após 5 segundos
window.onload = function() {
    setTimeout(function() {
        console.log("Alerta de script: Pronto-Socorro 24 Horas Ativo!");
        // Você poderia adicionar aqui código para mostrar um pop-up ou barra de alerta
        
        // Exemplo de como modificar um elemento dinamicamente (se você tiver um elemento com id="status-emergencia")
        const statusElemento = document.getElementById('status-emergencia');
        if (statusElemento) {
            statusElemento.textContent = "PRONTO-SOCORRO 24H - ATIVO";
            statusElemento.style.backgroundColor = 'red';
            statusElemento.style.color = 'white';
        }

    }, 5000); // 5000 milissegundos = 5 segundos
};
