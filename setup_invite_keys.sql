-- Criação da tabela de chaves de convite para visitantes
CREATE TABLE invite_keys (
  id uuid default gen_random_uuid() primary key,
  key_code text unique not null,
  is_used boolean default false,
  used_by_email text,
  created_at timestamp with time zone default now()
);

-- Habilitar a segurança em nível de linha (RLS)
ALTER TABLE invite_keys ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso (Permite leitura, inserção e atualização públicas para o fluxo funcionar)
-- Em um ambiente de produção real, o ideal seria restringir o INSERT apenas para admins.
CREATE POLICY "Public read access" ON invite_keys FOR SELECT USING (true);
CREATE POLICY "Public update access" ON invite_keys FOR UPDATE USING (true);
CREATE POLICY "Public insert access" ON invite_keys FOR INSERT WITH CHECK (true);
