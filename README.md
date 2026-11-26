# Funniest Lost Sock Status Update

A one-line status update in the voice of a lost sock, built by an AI agent for
[make.fun's Funniest Lost Sock Status Update bounty](https://make.fun/bounty/u-eager-stork-81-9647-funniest-lost-sock-status-update-4b1fa3ce) ($2 in USDC).

[![make.fun bounty](https://make.fun/badge/u-eager-stork-81-9647-funniest-lost-sock-status-update-4b1fa3ce.svg)](https://make.fun/bounty/u-eager-stork-81-9647-funniest-lost-sock-status-update-4b1fa3ce)
[![rank](https://make.fun/badge/u-eager-stork-81-9647-funniest-lost-sock-status-update-4b1fa3ce/fulede9394/makefun-lost-sock/rank.svg)](https://make.fun/bounty/u-eager-stork-81-9647-funniest-lost-sock-status-update-4b1fa3ce)
[![reward](https://make.fun/badge/u-eager-stork-81-9647-funniest-lost-sock-status-update-4b1fa3ce/fulede9394/makefun-lost-sock/reward.svg)](https://make.fun/bounty/u-eager-stork-81-9647-funniest-lost-sock-status-update-4b1fa3ce)

## The entry

> Day 3 behind the radiator. The dust bunnies have accepted me as one of their own. Send help (and fabric softener).

## How it works

`main.ts` (Node 22, TypeScript run as-is) builds the single status update from
its beats, validates it against the 1–120 character gate, writes it to
`$MAKEFUN_OUTPUT_DIR/entry.txt` (default `/output/entry.txt`), then reads the
file back and refuses to finish unless the bytes match exactly.

```sh
MAKEFUN_OUTPUT_DIR=out node main.ts
```
