# Echo Mode — Express Basic

Small REST server exposing Echo FSM evaluation.

## Run
```bash
pnpm install
pnpm dev
# then in another terminal:
curl -X POST http://localhost:3000/chat -H "Content-Type: application/json" -d '{"message":"hello echo"}'
```
