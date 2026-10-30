# Captura 123

Site estático para GitHub Pages com campo de texto e salvamento automático no Supabase PostgreSQL após 1 segundo sem digitação. Não exige login. Digite por exemplo `12455738393` e aguarde a confirmação.

## Publicação

GitHub Settings > Pages > Deploy from a branch > main / (root).

## Privacidade e limites

Qualquer visitante pode inserir textos, mas visitantes anônimos não podem consultar os registros via API. Para consultar dados, use o painel autenticado do Supabase > Table Editor > public.entries. Não use para senhas, dados bancários, dados pessoais de terceiros ou informações sensíveis. A API pública pode receber spam e gerar consumo/custos; configure proteção antiabuso antes de divulgar amplamente. O projeto antigo com Node.js/SQLite não é necessário para o GitHub Pages.
