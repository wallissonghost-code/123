# Captura 123 — GitHub Pages + Supabase

Site estático com autenticação por link enviado ao e-mail e armazenamento de textos no Supabase PostgreSQL. Cada usuário só pode ler e inserir seus próprios registros, conforme RLS.

## Publicar

No GitHub: Settings > Pages > Deploy from a branch > main / (root). Não requer Node.js nem SQLite.

No Supabase: Authentication > URL Configuration, configure Site URL com a URL final do GitHub Pages e adicione essa mesma URL em Redirect URLs. Em Authentication > Providers > Email, mantenha o login por OTP habilitado e configure o serviço de envio de e-mails conforme os limites da plataforma.

## Segurança

A chave no navegador é publishable (pública); nunca coloque uma service_role key no frontend. Os dados são protegidos por autenticação e Row Level Security. O campo captura somente o texto inserido voluntariamente na aplicação, após 1 segundo sem digitar. Cada alteração salva cria um novo registro. Evite registrar dados sensíveis sem políticas adicionais de privacidade e retenção.
