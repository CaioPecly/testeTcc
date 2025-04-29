-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 29/04/2025 às 23:31
-- Versão do servidor: 10.4.28-MariaDB
-- Versão do PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `quiz`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `question` text NOT NULL,
  `answer1` text NOT NULL,
  `answer2` text NOT NULL,
  `answer3` text NOT NULL,
  `answer4` text NOT NULL,
  `correct_answer` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `questions`
--

INSERT INTO `questions` (`id`, `question`, `answer1`, `answer2`, `answer3`, `answer4`, `correct_answer`) VALUES
(1, 'Dentro de qual elemento HTML colocamos o JavaScript?', '<javascript>', '<js>', '<script>', '<scripting>', 3),
(2, 'Onde é o lugar correto para inserir JavaScript?', 'Tanto no <head> quanto no <body> está correto', 'No <body>', 'No <head>', 'Em outro lugar', 1),
(3, 'Qual é a sintaxe correta para se referir a um script externo chamado \"xxx.js\"', '<script src=\"xxx.js\">', '<script href=\"xxx.js\">', '<script name=\"xxx.js\">', 'Nenhuma das alternativas', 1),
(4, 'O que é um algoritmo?', 'Um tipo de dado', 'Um erro de compilação', 'Uma sequência de passos para resolver um problema', 'Um interpretador', 3),
(5, 'Qual estrutura é usada para decisões em programação?', 'for', 'if', 'while', 'switch', 2),
(6, 'Qual é o operador lógico “OU” em muitas linguagens?', '&&', '||', '==', '!=', 2),
(7, 'Qual tipo de dado armazena valores verdadeiros ou falsos?', 'int', 'string', 'float', 'boolean', 4),
(8, 'Qual o resultado da expressão 5 > 3 && 2 < 4?', 'false', 'true', '5', '3', 2),
(9, 'Para que serve a estrutura while?', 'Para declarar variáveis', 'Para imprimir valores', 'Para repetir instruções enquanto uma condição for verdadeira', 'Para definir funções', 3),
(10, 'O que significa o operador ==?', 'Atribuição', 'Diferença', 'Comparação de igualdade', 'Concatenação', 3),
(11, 'Qual estrutura permite executar diferentes blocos com base em múltiplas condições?', 'if', 'while', 'switch', 'for', 3),
(12, 'Qual palavra-chave define uma função em Python?', 'function', 'def', 'lambda', 'func', 2),
(13, 'Qual é o valor final da variável x no código: x = 2; x += 3?', '5', '3', '2', '6', 1),
(14, 'O que faz o comando break em um loop?', 'Repete o loop', 'Pula para a próxima iteração', 'Encerra o loop imediatamente', 'Reinicia o loop', 3),
(15, 'Qual a função do comando continue em um loop?', 'Finaliza o programa', 'Sai do loop', 'Interrompe todas as repetições', 'Pula a iteração atual e continua para a próxima', 4),
(16, 'Qual estrutura de controle é usada para repetição com contador?', 'while', 'if', 'for', 'do', 3),
(17, 'Qual o valor da variável x após: x = 10; x = x / 2;', '2', '5', '10', '20', 2),
(18, 'Qual operador representa a negação lógica?', '&&', '||', '==', '!', 4),
(19, 'O que acontece se um loop while nunca tiver sua condição alterada?', 'O código não roda', 'O loop executa uma vez', 'O loop nunca inicia', 'O loop entra em loop infinito', 4),
(20, 'ual a saída de print(2 * 3 + 1) em Python?', '7', '8', '5', '6', 1),
(21, 'ual comando Python recebe entrada do usuário?', 'input()', 'read()', 'scanf()', 'gets()', 1),
(22, 'Qual estrutura permite repetir pelo menos uma vez, mesmo que a condição seja falsa?', 'while', 'do-while', 'for', 'if', 2),
(23, 'ual é o tipo de erro que ocorre quando uma variável não foi declarada?', 'Erro de lógica', 'Erro de sintaxe', 'Erro de tempo de execução', 'Erro de compilação', 3);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
