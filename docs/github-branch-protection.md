# Configuración de Branch Protection para el merge automático `develop → main`

## Problema detectado

En el PR **"Merge automático: develop → main" (#5)** se observó:

- ✅ *Changes approved* — 1 approving review por revisor con acceso de escritura.
- ✅ *All checks have passed* — 1 successful check.
- ❌ **Merging is blocked — "Cannot update this protected ref."**

Es decir: todas las condiciones del flujo se cumplieron, pero GitHub impidió
actualizar la rama protegida `main`.

## Causa raíz

El merge lo ejecuta (o lo intenta) el workflow `PR Develop Merge Main` usando
el token `GITHUB_TOKEN`. La identidad de ese token es **`github-actions[bot]`**,
que **no es un colaborador humano**: no aparece en las listas de usuarios y
GitHub lo trata como una identidad aparte al evaluar los permisos de escritura
sobre ramas protegidas.

La regla de protección de `main` queda entonces así:

| Condición | Estado |
|---|---|
| Aprobación de revisión requerida | ✅ cumplida |
| Checks obligatorios en verde | ✅ cumplida |
| Identidad autorizada a escribir en `main` | ❌ `github-actions[bot]` no está autorizado |

Cuando en la protección de rama se marca **"Restrict who can push to matching
branches"** y sólo se enumeran cuentas humanas (`vincentdgrey`, equipos), el
bot queda excluido y tanto el auto-merge nativo como cualquier merge vía API
fallan con `Cannot update this protected ref`.

## Solución — Checklist de configuración

Todo lo siguiente se realiza con la cuenta propietaria (`vincentdgrey`) en:
**Repo → Settings → Branches → Branch protection rules → `main`**
(y **Settings → General → Pull Requests** para el punto 1).

### 1. Habilitar auto-merge a nivel de repositorio

**Settings → General → Pull Requests → Allow merge commits:** marcar
**"Allow auto-merge"**. Sin esto, `gh pr merge --auto` falla siempre.

### 2. Regla de protección de `main` (opción recomendada)

Configurar la regla existente con estos valores:

- ☑️ **Require a pull request before merging**
  - ☑️ Require approvals → **Required approvals: 1**
  - Desmarcar *"Require approval of the most recent reviewable push"* si se
    quiere que la aprobación siga valiendo aunque el bot/colaboradores vuelvan
    a pushear a `develop` (opcional, según seguridad deseada).
  - En *"Do not allow bypassing the above settings"* NO incluir al bot.
- ☑️ **Require status checks to pass before merging**
  - ☑️ Require branches to be up to date before merging (opcional; si se activa,
    el job `merge-on-approval` sincroniza `develop` desde `main` cuando el PR
    queda en estado `BEHIND`).
  - Seleccionar los checks obligatorios que aparezcan (p. ej. el del workflow).
- ☑️ **Allow auto-merges** ← clave: permite que la cola de auto-merge escriba
  en la rama protegida al cumplirse las condiciones.
- Si **"Restrict who can push to matching branches"** está marcado:
  - Añadir **`github-actions[bot]`** a la lista (empieza a escribir el nombre y
    selecciónalo de la lista de identidades), o bien
  - Desmarcar esa restricción (los merges siguen pasando por PR + revisión).

Alternativa equivalente más simple: desactivar "Restrict who can push…" y
mantener únicamente "Require a pull request before merging". Así el único
camino hacia `main` sigue siendo el PR aprobado, y el bot puede fusionarlo.

### 3. Verificar permisos del workflow

En **Settings → Actions → General → Workflow permissions** asegurar que no
está forzado `Read repository contents and packages permissions` a nivel de
repo sin excepción, o declarar explícitamente (ya hecho en el YAML):

```yaml
permissions:
  contents: write
  pull-requests: write
  checks: read
```

Y en **Settings → Actions → General → Allow GitHub Actions to create and
approve pull requests**: habilitado (necesario para que el bot pueda operar
PRs; la *aprobación* la siguen haciendo humanos).

### 4. Confirmar la resolución

Tras aplicar la configuración, en el PR #5 (bloqueado hoy):

1. Recargar la página del PR → el banner debe pasar de
   *"Merging is blocked"* a *"Auto-merge enabled"* o permitir el merge.
2. Como el workflow ahora también se dispara en `pull_request_review` y
   `check_suite`, el job **`merge-on-approval`** reintentará el merge
   automáticamente tras guardar la nueva protección (o se puede forzar con un
   push vacío a `develop`: `git commit --allow-empty -m "chore: retry auto-merge"`).

## Cómo quedó el workflow (respaldo automático)

`.github/workflows/pr-develop-merge-main.yml` ahora tiene dos jobs:

1. **`create-or-update-pr`** (push a `develop`): crea/reutiliza el PR
   `develop → main`, solicita revisión a `edwin-coder-arquitech` /
   `vincentdgrey` y activa la cola de auto-merge nativa.
2. **`merge-on-approval`** (`pull_request_review` + `check_suite`): plan B.
   Verifica TODAS las condiciones antes de fusionar:
   - `reviewDecision == APPROVED` y la aprobación proviene de un aprobador
     autorizado (no del propio bot);
   - todos los checks completados y sin fallos (con espera reintentada);
   - `mergeStateStatus` sano:
     - `CLEAN`/`HAS_HOOKS` → ejecuta `gh pr merge --merge`;
     - `BEHIND` → sincroniza `develop` desde `main` y reintenta en el
       siguiente evento;
     - `BLOCKED` → falla el job con un log que apunta exactamente a esta causa
       ("Cannot update this protected ref") y a este checklist.

Con la protección corregida, el auto-merge nativo hace el trabajo y el plan B
queda como red de seguridad idempotente (si el PR ya se fusionó, el job no
encuentra PR abierto y termina sin acción).

## Referencias

- GitHub Docs: *Managing auto-merge for pull requests*
- GitHub Docs: *Configuring branch rule settings* (Allow auto-merges, Restrict pushes)
- GitHub Community Discussions: "Cannot update ref 'refs/heads/main' with auto-merge and GITHUB_TOKEN" (los bots deben autorizarse explícitamente en *Restrict who can push*)
