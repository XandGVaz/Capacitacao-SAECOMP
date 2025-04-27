-- Limpa tabelas para fazer testes
DROP TABLE IF EXISTS tarefas CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;
DROP TABLE IF EXISTS categorias CASCADE;

-- Criação de tabelas
create TABLE IF NOT EXISTS usuarios(
	id				BIGSERIAL 		PRIMARY KEY,
	username		VARCHAR(50) 	UNIQUE NOT NULL,
	nome			VARCHAR(50) 	NOT NULL,
	data_cadastro	DATE			NOT NULL DEFAULT CURRENT_DATE,
	ativo			BOOLEAN			DEFAULT TRUE
);

create TABLE IF NOT EXISTS categorias(
	id					BIGSERIAL		PRIMARY KEY,
	nome				VARCHAR(50)		NOT NULL,
	prioridade			int				CHECK(prioridade>=0)
);

create TABLE IF NOT EXISTS tarefas(
	id				BIGSERIAL		PRIMARY KEY,
	titulo			VARCHAR(50)		NOT NULL,
	usuario_id		BIGINT			REFERENCES usuarios(id) ON DELETE CASCADE,
	categoria_id	BIGINT			REFERENCES categorias(id) ON DELETE CASCADE,
	data_criacao	DATE			NOT NULL DEFAULT CURRENT_DATE,
	concluida		BOOLEAN			DEFAULT FALSE
);

-- Inserção de valores
INSERT INTO usuarios
(username, nome)
VALUES
('user1', 'vitor'),
('user2', 'jetosbaldo'),
('user3', 'negodafarofa');

INSERT INTO categorias
(nome, prioridade)
VALUES
('eletrônica', 1),
('mecanica', 2),
('relações humanas', 3);

INSERT INTO tarefas
(titulo, usuario_id, categoria_id)
VALUES
('testar resistores' , 1, 1),
('testar capacitores', 1, 1),
('conversar com novatos', 1, 3),
('fazer desenho da peça', 2, 2),
('media a peça', 3, 2);

-- Consulta relação TÍTULO TAREFA -> NOME DA CATEGORIA -> NOME DO USUÀRIO RESPONSÁVEL
--de tarefas que tem prioridade 1 em sua categoria
SELECT
	t.titulo AS titulo_tarefa,
	u.nome AS nome_usuario,
	c.nome AS nome_categoria
FROM tarefas t
INNER JOIN categorias c ON t.categoria_id = c.id
INNER JOIN usuarios u ON t.usuario_id = u.id
WHERE c.prioridade = 1;

-- muda estado da tarefa para concluída quando possui prioridade 1 em sua categoria
UPDATE tarefas
SET concluida = TRUE
FROM categorias c
WHERE c.id = tarefas.categoria_id AND c.prioridade = 1;

-- deleta tarefas que foram concluídas
DELETE FROM tarefas
WHERE concluida = TRUE;

-- exibe tabela de tarefas
SELECT * FROM tarefas;


