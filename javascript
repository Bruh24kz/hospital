/**
 * Módulo de Agendamento (Backend - Node.js/Express-like)
 *
 * Objetivo: Receber os dados do formulário de agendamento (via POST),
 * validar e retornar uma resposta JSON apropriada.
 */

// ===============================================
// 1. Função de Validação (Coração da Lógica)
// ===============================================

/**
 * Valida os dados de agendamento recebidos de uma requisição HTTP.
 * @param {object} dados - O corpo da requisição (body) contendo nome, email, data, assunto.
 * @returns {{isValid: boolean, mensagemErro: string}} O resultado da validação.
 */
function validarAgendamento(dados) {
    // Pega os valores dos campos
    const nome = dados.nome ? String(dados.nome).trim() : '';
    const email = dados.email ? String(dados.email).trim() : '';
    const data = dados.data ? String(dados.data).trim() : '';
    const assunto = dados.assunto ? String(dados.assunto) : '';

    let isValid = true;
    let mensagemErro = [];

    // Validação básica de presença
    if (nome === '') {
        isValid = false;
        mensagemErro.push('O campo Nome é obrigatório.');
    }

    // Validação de Email
    // Expressão regular simples para verificar o formato básico do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '' || !emailRegex.test(email)) {
        isValid = false;
        mensagemErro.push('Por favor, insira um Email válido.');
    }

    // Validação de Data
    if (data === '') {
        isValid = false;
        mensagemErro.push('A Data Preferencial é obrigatória.');
    } else {
        // Verifica se a data é futura (ou hoje)
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0); // Zera a hora para comparação
        
        const dataSelecionada = new Date(data);
        dataSelecionada.setHours(0, 0, 0, 0); // Zera a hora para comparação

        // Verifica se a data é inválida (ex: '2023-99-99')
        if (isNaN(dataSelecionada.getTime())) {
             isValid = false;
             mensagemErro.push('O formato da Data é inválido.');
        } else if (dataSelecionada < hoje) {
            isValid = false;
            mensagemErro.push('A data de agendamento deve ser hoje ou uma data futura.');
        }
    }
    
    // Validação de Assunto (Especialidade)
    if (assunto === '' || assunto === 'Escolha a Especialidade') {
        isValid = false;
        mensagemErro.push('Por favor, escolha uma Especialidade válida.');
    }

    return {
        isValid: isValid,
        mensagemErro: mensagemErro.join('\n')
    };
}


// ===============================================
// 2. Controlador de Rota HTTP (Simulação Express)
// ===============================================

/**
 * Função de tratamento da rota POST /agendamento
 * (Simula um controlador de rota em um framework como Express ou NestJS)
 *
 * @param {object} req - Objeto de Requisição (contém os dados do corpo)
 * @param {object} res - Objeto de Resposta (usado para enviar o resultado)
 */
function handleAgendamentoPost(req, res) {
    const dadosAgendamento = req.body; // Assume que o body parser já transformou o body em objeto JS

    const { isValid, mensagemErro } = validarAgendamento(dadosAgendamento);

    if (isValid) {
        // LOGICA DE NEGÓCIO DO BACKEND:
        // 1. Salvar os dados no banco de dados (MongoDB, PostgreSQL, etc.)
        // 2. Enviar um e-mail de confirmação para o paciente (via SendGrid, Nodemailer, etc.)
        // 3. Notificar o sistema de gestão hospitalar.

        console.log('✅ Agendamento Válido. Simulação de Salvar no DB:', dadosAgendamento);

        // Retorna sucesso (Status 200 OK ou 201 Created)
        res.status(200).json({
            sucesso: true,
            mensagem: 'Solicitação de agendamento recebida com sucesso. Verifique seu e-mail.',
            dadosRecebidos: dadosAgendamento
        });

    } else {
        // Retorna erro (Status 400 Bad Request)
        console.log('❌ Erro de Validação:', mensagemErro);

        res.status(400).json({
            sucesso: false,
            mensagem: 'Erro de validação. Por favor, corrija os campos.',
            detalhesErro: mensagemErro
        });
    }
}


// Exemplo de como esta função seria integrada a um servidor Express
/*
const express = require('express');
const app = express();
app.use(express.json()); // Habilita body-parser

app.post('/agendamento', handleAgendamentoPost);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
*/

// Para fins de teste (não faz
