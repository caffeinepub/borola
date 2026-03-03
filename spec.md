# BOROLA Party App

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- **Home page**: Full-width banner using uploaded image `/assets/uploads/borola-party2-1.jpg`, party intro text, navigation to all sections
- **MLAs page**: Grid/list of MLA profiles with photo, name, constituency, and bio. Public view.
- **Candidates page**: Grid/list of Candidate profiles with photo, name, constituency, and bio. Public view.
- **Join the Party page**: Registration form for new supporters with fields: name, phone, address, photo upload. Submits to backend.
- **Supporters page**: Publicly visible grid/list of all registered supporters showing name, address, and photo.
- **Admin panel** (`/admin`): Separate login page with hardcoded credentials (ID: `BOROLA2026`, Password: `BOROLA@2026`). After login, admin can:
  - Add, edit, delete MLAs (name, photo, constituency, bio)
  - Add, edit, delete Candidates (name, photo, constituency, bio)
  - View and delete Supporters
- **Navigation**: Top navbar with links to Home, MLAs, Candidates, Supporters, Join Us, Admin

### Modify
- None (new project)

### Remove
- None (new project)

## Implementation Plan

### Backend (Motoko)
- `MLA` record type: id, name, constituency, bio, photoUrl
- `Candidate` record type: id, name, constituency, bio, photoUrl
- `Supporter` record type: id, name, phone, address, photoUrl, joinedAt
- CRUD functions for MLAs: addMLA, updateMLA, deleteMLA, getMLA, getAllMLAs
- CRUD functions for Candidates: addCandidate, updateCandidate, deleteCandidate, getCandidate, getAllCandidates
- Supporter functions: addSupporter, deleteSupporter, getAllSupporters
- Admin auth: verifyAdmin(userId, password) returning Bool — hardcoded BOROLA2026 / BOROLA@2026
- Blob storage integration for photo uploads (MLAs, Candidates, Supporters)

### Frontend (React + TypeScript)
- React Router with routes: `/`, `/mlas`, `/candidates`, `/supporters`, `/join`, `/admin`
- Shared navbar component
- Home: banner image, party tagline, call-to-action buttons
- MLAs page: card grid fetching getAllMLAs
- Candidates page: card grid fetching getAllCandidates
- Supporters page: card grid fetching getAllSupporters
- Join page: form with blob upload for photo, calls addSupporter
- Admin login page: simple form, stores session in localStorage
- Admin dashboard: tabs for MLAs, Candidates, Supporters management with add/edit/delete modals and blob upload for photos
- Sample seed data for MLAs and Candidates displayed on first load
