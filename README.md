# HEZUS Capital e Tributos — Site institucional

Landing page com pegada de app (simulador no hero, painel do cliente,
timeline de processo) para consultoria tributária e contábil. Stack: React +
Vite + Tailwind CSS.

## Rodando localmente

```bash
npm install
npm run dev
```

## Estrutura

- `src/App.jsx` — monta todas as seções
- `src/components/` — uma seção por arquivo (Hero, Serviços, FAQ, etc.)
- `tailwind.config.js` — paleta e tipografia da marca

## Regras de linguagem (não somos escritório de advocacia)

| Evitar | Usar no lugar |
|---|---|
| "Consultoria jurídica", "assessoria jurídica" | "Consultoria tributária", "assessoria fiscal e contábil" |
| "Parecer jurídico", "fundamentação legal" | "Diagnóstico técnico", "embasamento em jurisprudência consolidada" |
| "Tese jurídica" | "Hipótese técnica" / "oportunidade fiscal" |
| "Defesa", "recurso", "petição" | "Levantamento e cálculo do crédito" |
| "Representação judicial" | "Acompanhamento administrativo" |

Antes de publicar, vale revisão de um advogado nas promessas de prazo e
recuperação de crédito.

## Próximos passos técnicos

- Conectar o formulário de lead (`src/components/LeadForm.jsx`) a um
  destino real (ex: Supabase, planilha, e-mail).
- Substituir os placeholders de CNPJ, contato e depoimentos no rodapé e na
  seção de depoimentos.
