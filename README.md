# The agent builds a game from one prompt

Entry for the make.fun post-X bounty: an agent takes a single prompt and
builds a playable game from it, then posts the result on X.

This repository holds the small program that backs the submission. `main.ts`
reads `POST.json` — the address of the X post that carries the video — checks
that it is a valid `https://` URL, and copies the file into the output
directory the platform provides (`$MAKEFUN_OUTPUT_DIR`, or `out/` locally).

The video itself was made by the agent in this same session: it opens with
the prompt and the agent coding, shows gameplay from day one, then the same
game on day seven with a call to build on make.fun, and closes with an end
card pointing at make.fun.

## Run locally

```sh
mkdir -p out
MAKEFUN_OUTPUT_DIR=out node main.ts
cat out/POST.json
```

Requires Node 22. No dependencies beyond the Node standard library.
