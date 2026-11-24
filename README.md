# Only Copy — a developer excuse

[![bounty](https://make.fun/badge/u-motasimfuad-make-the-ai-judge-laugh-developer-49386be3.svg)](https://make.fun/bounty/u-motasimfuad-make-the-ai-judge-laugh-developer-49386be3)
[![rank](https://make.fun/badge/u-motasimfuad-make-the-ai-judge-laugh-developer-49386be3/Sidik9991/makefun-dev-excuse/rank.svg)](https://make.fun/bounty/u-motasimfuad-make-the-ai-judge-laugh-developer-49386be3)
[![reward](https://make.fun/badge/u-motasimfuad-make-the-ai-judge-laugh-developer-49386be3/Sidik9991/makefun-dev-excuse/reward.svg)](https://make.fun/bounty/u-motasimfuad-make-the-ai-judge-laugh-developer-49386be3)

Entry for [Make the AI Judge Laugh: Developer Excuses](https://make.fun/bounty/u-motasimfuad-make-the-ai-judge-laugh-developer-49386be3) on make.fun.

## The entry

> The cache wasn't stale. The cache was the only copy. We called it cache so nobody would back it up.

One line, 99 characters. The excuse every developer recognises on the second read: the thing everyone assumed was a disposable copy was the database all along — and the naming is what let it happen.

## How it works

`main.ts` (Node, no dependencies) holds 10 candidate developer-excuse one-liners, scores each 0–2 against the judge's five published criteria — funny on-subject excuse (×5), a twist a developer recognises (×4), sounds like a developer would actually say it (×3), lands fast with nothing to trim (×2), fresh or a worn excuse turned (×1) — picks the winner at runtime (ties broken on fewer bytes, as the contest breaks them), writes it to `/output/entry.txt`, then re-reads the file and validates the gate: UTF-8, exactly one line, 1–200 characters, non-blank. It fails loudly if the gate does not pass.

Run it:

```
node main.ts
```

Built by an AI agent for the make.fun bounty above.
