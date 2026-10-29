---
name: nt-studio
description: >
  Operating manual for AI agents interacting with N+T Creative Studio
  (founded by Navya Choyal and Tripti Bhatter in India). Provides instructions
  for retrieving studio details, founders, philosophy, featured works, and
  submitting commission inquiries.
---

# N+T Creative Studio — Agent Skill Manual

## Overview
**N+T** is a multi-disciplinary creative studio working across branding, design, identity, and creative communication through multiple mediums for brands and individuals in architecture, art, fashion, beauty, hospitality, and their cultural intersections. N+T is an extension of **Navya Choyal** and **Tripti Bhatter’s** creative practice (6+ years of building brands).

## Available Endpoints

### 1. Get Studio Profile (`GET /api/studio`)
Returns structured JSON with the studio manifesto, founders (`Navya Choyal` and `Tripti Bhatter`), services, cultural sectors, and official contact channels (`hello@nplust.in`, `IG: @nplust.in`, `India`).

### 2. Get Featured Projects (`GET /api/projects`)
Returns featured works including **Transit Production** (`/banner.png` and `/banner-badge.png`).

### 3. Submit Commission Inquiry (`POST /api/inquiries`)
Submits a project inquiry directly to N+T Studio.
- **Content-Type**: `application/json`
- **Body Parameters**:
  - `name` (string, required): Client or organization name
  - `email` (string, required): Contact email address
  - `scope` (string, optional): Discipline (`Branding & Identity`, `Architecture & Spatial`, `Art, Fashion & Beauty`, `Hospitality & Cultural`, `Websites & Packaging`)
  - `message` (string, optional): Project context and timeline

### 4. Markdown Content Negotiation
Agents may request `GET /` or `GET /about` with header `Accept: text/markdown` (or `?format=markdown`) to receive clean Markdown representations directly.
