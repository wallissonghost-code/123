# Captura de texto

Protótipo para salvar automaticamente textos inseridos voluntariamente no campo da própria aplicação. Salva após 1 segundo sem digitação.

## Uso

Requer Node.js 22.13 ou superior. Execute `npm start` e abra `http://localhost:3000`.

O SQLite é criado em `data/entries.sqlite`. Configure `DB_PATH` para mudar o local.

API: `GET /api/entries` e `POST /api/entries` com JSON `{ "text": "Oi, teste" }`.

**Atenção:** este protótipo não possui autenticação. Use somente com textos de teste não sensíveis. Para publicar na internet, implemente autenticação e controle de acesso. GitHub Pages não executa o servidor nem persiste o banco SQLite.
