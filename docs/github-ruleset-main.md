# Ruleset para `main` — pasos técnicos para habilitar el merge automático del workflow

Procedimiento con la cuenta propietaria **`vincentdgrey`**. Objetivo: crear en
**Settings → Rules → Branch rules → New branch ruleset** una regla sobre `main`
que mantenga la protección (PR + revisión + checks) y a la vez autorice a
**`github-actions[bot]`** (identidad de `GITHUB_TOKEN`) a ejecutar el merge,
eliminando el error **"Cannot update this protected ref"**.

> Prerequisito del repo (una sola vez): **Settings → General → Pull Requests**
> → marcar **Allow auto-merge** (y un método de merge, p. ej. *Merge commit*).
> Sin esto la cola de auto-merge y `gh pr merge --auto` fallan siempre.

---

## Paso 1 — Abrir el creador del ruleset

1. Ir al repositorio → **Settings** (pestaña superior derecha, requiere rol
   *Admin/Owner*).
2. En el sidebar izquierdo: **Rules → Branch rules**.
3. Clic en **"New branch ruleset"**.

## Paso 2 — Identidad y alcance del ruleset

| Campo | Valor |
|---|---|
| **Ruleset name** | `protect-main-auto-merge` |
| **Target branches** | sección *Branch names* → clic **Add target** → escribir exactamente `main`. (No usar `*`/patterns aquí para no afectar a `develop`.) |
| **Enforce status** | seleccionar **Active** (para probar primero sin romper nada se puede dejar *Evaluate only*; ver Paso 6) |
| ☑️ **Restrict merging** | marcado por defecto; **no** activar *"Restrict updates"* ni *"Restrict deletions"* (bloquearían innecesariamente otras operaciones) |
| ☑️ **Include administrators** | **NO marcarlo**: deja a `vincentdgrey` (admin) fuera de la restricción de bypass y evita bloqueos accidentales en mantenimiento. La protección real la dan los requisitos de PR abajo. |

## Paso 3 — Requisitos de PR y checks (equivalente a la protection rule)

Marcar y configurar:

1. ☑️ **Require a pull request before merging**
   - **Required approvals: `1`**
   - ☑️ *Require review from Code Owners* → solo si existe `CODEOWNERS`; si no, dejarlo desmarcado (un codeowner inexistente bloquea el merge).
   - Desmarcar *"Dismiss stale approvals"* si se quiere que la aprobación sobreviva a pushes nuevos a `develop` (opcional; el workflow vuelve a solicitar revisión en cada push).
2. ☑️ **Require status checks to pass before merging**
   - ☑️ *Require branches to be up to date before merging*: opcional. Si se activa, el PR queda `BEHIND` cuando `main` avanza; el job `merge-on-approval` ya sincroniza `develop` desde `main` en ese caso (ver docs/github-branch-protection.md).
   - En **Selected required checks**, buscar y agregar el check que publica el workflow, por ejemplo:
     `PR Develop Merge Main / create-or-update-pr`
     (nombre = `<workflow name>` / `<job id>`). Debe aparecer tras la primera
     ejecución del workflow; si está en verde fijo, el merge sólo se permite con él en verde.

## Paso 4 — Permitir auto-merge y autorizar al bot (paso CLAVE)

1. ☑️ **Auto-merge** → elegir método **Merge** (coherente con `gh pr merge --merge` del workflow). Esto reemplaza a la antigua casilla *"Allow auto-merges"* de las branch protection rules.
2. **Bypass list** (sección *Permissions for bypassing the ruleset*):
   - Add bypass → **`github-actions[bot]`** ← esta es la corrección raíz del bloqueo: autoriza explícitamente a la identidad de `GITHUB_TOKEN` a actualizar el ref protegido `refs/heads/main`.
   - Opcional: agregar también **`Repository admin`** (cubre a `vincentdgrey` como admin) y/o el equipo de maintainers.
   - ⚠️ NO agregar `Deploy keys` ni apps no relacionadas.
3. ☑️ **Allowed merge methods** → dejar marcado **Merge** (si el repo sólo permite squash, cambiar el workflow a `--squash`).

Con `bypass list` + `Auto-merge`, tanto la cola nativa de auto-merge como el
job `merge-on-approval` pueden fusionar aunque *"Restrict merging"* esté activo.

## Paso 5 — Guardar

Clic **Create** (abajo). El ruleset aparece en *Branch rules* con estado
*Active*.

## Paso 6 — Eliminar la branch protection rule antigua (evitar doble bloqueo)

Si aún existe la regla clásica de `main`:

1. **Settings → Branches → Branch protection rules → `main` → Delete rule**
   (o Edit → *Unprotected pattern* para archivarla).
2. GitHub evalúa **rulesets Y protection rules simultáneamente**; dos reglas
   solapadas sobre `main` suelen ser la causa de que el PR siga apareciendo
   `BLOCKED` aunque el ruleset esté bien configurado.

## Paso 7 — Verificación técnica

```bash
# 1) Confirmar el ruleset y sus flags clave (reglas de main deben incluir
#    "restrict_updates": false, bypass_actor_ids con el id del bot, admin_enforced)
gh api repos/{owner}/{repo}/rulesets --jq '.[] | {name, target, conditions, rules}'

# 2) Identidad/ID del bot para la bypass list (id conocido: 41898282)
gh api users/github-actions%5Bbot%5D --jq '{login, id, type}'
# => {"login":"github-actions[bot]","type":"Bot"}

# 3) Estado del PR #5 tras aplicar el ruleset: mergeStateStatus debe pasar de
#    BLOCKED a CLEAN (o BEHIND si se exige rama actualizada)
gh pr view 5 --json reviewDecision,statusCheckRollup,mergeable,mergeStateStatus

# 4) Si sigue en cola de auto-merge:
gh pr view 5 --json autoMergeRequest
```

Resultado esperado: `mergeStateStatus: "CLEAN"` y el PR se fusiona solo (cola
nativa) o en la siguiente corrida de `merge-on-approval`.

## Paso 8 — Reintentar el flujo bloqueado (PR #5)

Cualquiera de estas vías re-dispara el workflow tras guardar el ruleset:

- Esperar el próximo evento `check_suite`/`pull_request_review` (si alguien comenta/revisa).
- Push vacío a `develop`:
  ```bash
  git checkout develop && git pull
  git commit --allow-empty -m "chore: retry auto-merge tras ruleset de main"
  git push origin develop
  ```
- Forzar la corrida del workflow desde **Actions → PR Develop Merge Main → Run workflow** no aplica (está disparado por eventos); usar el push vacío.

## Checklist rápido (resumen)

- [ ] Settings → General → **Allow auto-merge** habilitado
- [ ] Ruleset `protect-main-auto-merge` **Active**, target exacto `main`
- [ ] Require PR + **1 approval** + status checks (incluye el check del workflow)
- [ ] Regla **Auto-merge** marcada (método Merge)
- [ ] **Bypass list incluye `github-actions[bot]`** ← corrige "Cannot update this protected ref"
- [ ] Protection rule clásica de `main` eliminada/desactivada
- [ ] PR #5 pasa a `CLEAN` y se fusiona; futuros pushes a `develop` fluyen solos

## Referencias

- GitHub Docs: *Creating rulesets for a repository*
- GitHub Docs: *Managing a branch ruleset* / *Rule types for branch rulesets* (Pull requests, Auto-merge, Bypass list)
- GitHub Docs: *Permissions available to a GitHub App / bots on protected branches*
