# Imports:

Reihenfolge:

1. Installierte Pakete
2. Lokale/eigene Files
3. CSS / Types

```ts
import express from "express";

// Variable bevor imports fertig sind is gefährlich
const router = express.Router();

import AuthController from "../controllers/authController";
import { auth } from "../middleware/auth.js";
```

Types können importiert werden mit `type`

```ts
import { PrismaClient, type User } from "@prisma/client";

// oder

import type { Type1, Type2, Type3 } from "./somewhere.ts";
```

Hat zur Folge, dass TypeScript das besser erkennt und es in runtime nicht abschmiert sollte was nicht gefunden werden (da TS das wie gesagt als Type erkennt).

# NPM Workspaces:

Du kannst eine "root" package.json haben, die workspaces (also sub-pakete) definiert:

```json
  "workspaces": [
    "./client",
    "./server"
  ]
```

Dabei werden dann dependencies wenn sie überlappen geteilt (also nur einmal im root installiert und dann können client & server sie beide verwenden)
