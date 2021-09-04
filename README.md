# Web Chess

This is a fun side-project born of my recent new passion for Chess
Here I will try to implement as many features (seen on sites like chess.com & lichess.org)
for the UI side of playing online chess.

> Backend is out of scope for now...

> combining client side engine is inspirational 

An implementation of a playable chess board using web technologies: 

- React
- Recoil JS
- Styled Components
- Framer Motion


## Features

Supports all rules of classical Chess:

- only legal moves
- castling
- enpassant
- 50 move count rule
- pawn promotion (TBD)
- move algebraic notation (TBD)

### Capabilities 

- Start from any legal FEN
- Check(mate) identification & highlighting
- legal moves identification & highlighting
- take identification & highlighting
- pinned piece (absolute) identification

## Roadmap

### P1

| Feature | Area | Status
|-------- | -----| -----------
| Flip Board | board |   ✅
| Board Coordinates (inside, outside) | board |
| All legal moves (castle, castling limitations, en passant, promotion) | moves | 
| Promotion Selector | ui, moves | 
| Stalemate detection | moves |
| check & checkmate detection | moves |
| Check/mate Highlight | board |
| Legal moves highlight | board | ✅
| history board | game |
| taken pieces bar | game | 
| Start from any FEN | state |  ✅
| Output to FEN | state |


### P2

| Feature | Area | Status
|-------- | -----| -----------
| time travel (show moves backward, forward) | moves, game |
| board themes | board | 
| sounds (move, check, invalid) | feedback |
| Load PGN (lichess, chess.com) | state |
| Output to PGN | state |
| write own FEN parser | infra

### P3

| Feature | Area | Status
|-------- | -----| -----------
| toggle allowed moves highlighting | board | 
| toggle check/mate highlight | board |
| Analysis mode (check moves without committing to history) | moves |
| Game Clock (per side, bonus) | game |
| Output to Image | extras |
| Create game from custom position

### P4

| Feature | Area | Status
|-------- | -----| -----------
| use Engine! | game, engine | 
