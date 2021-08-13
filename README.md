# Web Chess

This is a fun side project born of my relatively new passion for Chess
Here I will try to implement as many features (seen on sites like chess.com & lichess.org)
for the UI side of playing online chess.

> Backend and Engine are out of scope for now...

An implementation of a playable chess board using web technologies: 

- React
- Recoil JS
- Styled Components
- Framer Motion


## Features

### P1

| Feature | Area | Status
|-------- | -----| -----------
| Flip Board | board |   ✅
| Board Coordinates (inside, outside) | board |
| All legal moves (castle, castling limitations, en passant) | moves | 
| Can move indication | moves, pieces | 🚧
| Promotion | moves | 
| Stalemate detection | moves |
| check & checkmate detection | moves |
| time travel (show moves backward, forward) | moves, game |
| history board | game |
| taken pieces bar | game | 
| Start from any FEN | state |
| Load PGN (lichess, chess.com) | state |
| Output to FEN | state |
| Output to PGN | state |


### P2


| Feature | Area | Status
|-------- | -----| -----------
| Check Highlight | board |
| Legal moves highlight (+toggle) | board |
| board themes | board | 
| sounds (move, check, invalid) | feedback |

### P3

| Feature | Area | Status
|-------- | -----| -----------
| Analysis mode (check moves without committing to history) | moves |
| Game Clock (per side, bonus) | game |
| Output to Image | extras |
| Create game from custom position
