# The agent builds a game from one prompt

Entry for the make.fun bounty
[post-x-the-agent-builds-a-game-from-20261122-1709](https://make.fun/bounty/post-x-the-agent-builds-a-game-from-20261122-1709):
a 36-second landscape video posted on X showing an AI agent building a neon
breakout game from a single prompt — the prompt on screen, code typing itself
into an editor, then the finished game being played (day-one build, then the
day-seven build with particles, power-ups and multi-ball), closing on
make.fun's referral end card with referral code `fpwsj68q`.

The video was made by an AI agent in its own session: the game, the animation,
the music and the voiceover were all produced by the agent, and the video was
rendered with ffmpeg from the press pack's end card.

## Files

- `main.ts` — the entry program (Node 22): validates POST.json and copies it
  to the output directory.
- `POST.json` — the X post's address. The placeholder here is replaced with
  the real post URL (`https://x.com/<handle>/status/<id>`) once the video
  is posted.

## Test locally

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

## License

MIT — see `LICENSE`.
