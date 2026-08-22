---
name: wedding-studio-documents
description: Discover granted Wedding Studio documents and extract bounded evidence without bypassing document grants or exposing private content.
---

# Documents and evidence

Use `list_granted_documents` first. Each returned document declares its grant
source; use the opaque `document_id` with `get_document_content` only when the
needed grant is active.

- Document metadata is not content.
- Individual document grants and `documents.read.all` are distinct.
- Keep page, table, document ID and confidence attached to every extracted
  fact.
- If access is missing, name the required grant and continue with aggregate
  context when possible.
- Never expose guest contacts, mailbox contents, credentials or private notes.

Use document facts only to form a visible proposal. Do not treat extracted
amounts, dates or clauses as verified human decisions without evidence.
