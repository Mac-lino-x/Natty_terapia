# Natty Terapia — Natallyane Costa, Massoterapeuta
 
Landing page com quiz de agendamento (WhatsApp), fichas pré/pós-sessão e painel administrativo com Supabase.
 
## Arquivos
 
| Arquivo | Função |
|---|---|
| `index.html` + `main.js` + `Style.css` | Landing page, quiz e registro de acessos |
| `pre.html` / `pos.html` | Ficha pré-sessão e avaliação pós-sessão |
| `admin.html` | Painel (exige login) |
| `config.js` | **Única** configuração do Supabase |
| `admin-pre-pos.css` | Estilo de pre, pos e admin |
| `supabase.sql` | Tabelas, segurança (RLS) e tempo real |
 
## Configuração
 
1. No Supabase, rode o `supabase.sql` (SQL Editor).
2. Crie o usuário do painel em **Authentication > Users > Add user** e desative novos cadastros (instruções no fim do SQL).
3. Em `config.js`, preencha `SUPABASE_URL` e `SUPABASE_KEY` (chave **anon public**; nunca a `service_role`).
4. Faça o deploy (Vercel). Acesse `/admin.html` e entre com o e-mail e a senha criados.
Para não contar suas próprias visitas, abra uma vez `seusite.com/?admin=1` em cada aparelho seu.
 
## Arquivos para renomear (sem espaços e acentos)
 
| Antes | Depois |
|---|---|
| `video/b6d2b43d316f4df28e8b3afd0390dc2d (1).webm` | `video/pre.webm` |
| `video/931656b0428e4cd5b1adeb1b7470cb7d.webm` | `video/pos.webm` |
| `imagem/Massagem Relaxante.jpg` | `imagem/massagem-relaxante.jpg` |
| `imagem/Drenagem Linfática.webp` | `imagem/drenagem-linfatica.webp` |
| (nova) | `imagem/massagem-modeladora.jpg` |
| `imagem/Liberação Miofascial.jpg` | `imagem/liberacao-miofascial.jpg` |
| `imagem/Preciso de Indicação.jpg` | `imagem/preciso-de-indicacao.jpg` |
 
Crie também `imagem/icon-192.png` e `imagem/icon-512.png` (ícones quadrados) para o app instalável.
 
## Privacidade (LGPD)
 
A ficha pré-sessão coleta dados de saúde. O formulário exige consentimento, o banco só aceita ficha com consentimento, e só a profissional logada consegue ler os dados.
 