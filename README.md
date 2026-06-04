# Agntbase Agent Commerce Layer

An open schema and starter kit for publishing product facts, proof, claims, and safe commerce actions in a format AI agents can read without guessing.

The project is a small open-source slice of Agntbase's work on machine-readable business layers: structured files that sit next to a website and tell agents what to trust, what claims are approved, what sources win during conflicts, and which actions require a human handoff.

## Why This Exists

Schema.org can describe a product page. It usually does not explain:

- which source wins when a marketplace listing conflicts with an official page;
- whether a claim is approved, stale, unsupported, or legally sensitive;
- what proof supports a performance, certification, or warranty claim;
- whether an agent may route a quote request, request a sample, or complete a risky action;
- which fields must be rechecked before an agent repeats them.

This repository adds a lightweight layer around those decisions.

## Repository Contents

```text
schema/
  agent-commerce-layer.schema.json
templates/
  product-catalog.template.json
  product-profile.template.json
  claim-ledger.template.json
  proof-index.template.json
  agent-actions.template.json
  marketplace-consistency-map.template.json
  AGENTS.md
  llms-template.txt
examples/
  acme-industrial-catalog.json
scripts/
  validate.mjs
```

## Quick Start

```bash
npm install
npm test
```

To validate your own catalog:

```bash
node scripts/validate.mjs path/to/catalog.json
```

## Core Concepts

**Entity**
The business, brand, merchant, manufacturer, or publisher that owns the facts.

**Product profile**
A machine-readable product description with canonical URL, status, freshness, use cases, limitations, and next action.

**Claim ledger**
An approval map for claims that agents may repeat, claims that require review, and claims that are forbidden.

**Proof index**
The source-of-truth list for spec sheets, certificates, tests, case studies, owner confirmations, and other evidence.

**Source policy**
Rules for deciding which source wins when official pages, marketplace listings, third-party summaries, or internal notes disagree.

**Safe actions**
Actions an agent may prepare or route, with explicit human confirmation requirements.

## Safety Rules

The default posture is conservative:

- do not invent price, stock, delivery, warranty, compliance, certification, safety, or performance claims;
- do not treat marketplace data as canonical when it conflicts with owner-approved sources;
- do not complete payment, place orders, sign contracts, or submit private data without explicit human confirmation;
- route custom, safety-sensitive, regulated, or stale-field questions to a human review path;
- mark unsupported claims as needing proof instead of silently suppressing the uncertainty.

## Example

`examples/acme-industrial-catalog.json` shows a small generic industrial catalog with:

- two products;
- canonical product URLs;
- approved and forbidden claims;
- proof indexes;
- safe actions for quote/sample/custom order routing;
- marketplace conflict tracking.

## Project Status

This is an early, practical schema kit. The goal is to keep it small enough for merchants and maintainers to adopt, while making agent behavior more auditable.

Planned improvements:

- more examples for SaaS, local services, and content publishers;
- CLI scaffolding for new catalogs;
- source freshness checks;
- JSON-LD bridge examples;
- evaluation prompts for before/after agent answer quality.

## License

MIT
