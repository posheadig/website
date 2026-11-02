---
title: Searching for Null
year: 2023–24
sortYear: 2024
order: 3
kinds: [art]
featured: 6
discipline: Software installation
medium: Brute-force key search against Ethereum's zero address, real-time 3D visualization
summary: A program that endlessly generates private keys in search of Ethereum's zero address — the "black hole" where burned assets go — rendered as a shifting maze.
thumb: searching-for-null/maze.thumb.webp
image: searching-for-null/maze.webp
shown:
  - '<a href="https://thewrong.org/">The Wrong Biennale — reverse tarpit</a>, Onassis ONX Studio, New York, 2023'
  - Reverse TarPit, Brooklyn Arts Cluster, New York, 2024
links:
  - { label: "Source code", url: "https://github.com/posheadig/0/tree/main" }
  - { label: "Web version", url: "https://posheadig.github.io/0/" }
---

{% fig "searching-for-null/maze.webp", "The zero address rendered as a maze-walled cube, in the Reverse Tar Pit virtual gallery on New Art City.", "wide" %}

Ethereum's address `0x0000000000000000000000000000000000000000` is a digital void. Owners send assets there when they want to throw away the key — "burning" value into a state of absence that is often compared to a black hole.

Searching for Null is a brute-force program that tries to open it. It generates wallets and private keys without pause, checking each against address zero, and touches on personal security, the energy cost of computation, and the folklore of malicious programs that run constantly in the background and can surface at any moment.

{% vid "searching-for-null/program", "The search visualized: each attempt reshapes the maze; colour shifts with the program's computational load." %}

Brute-forcing secret keys cuts both ways — it can recover lost assets or enable theft. The work turns that computation against a crypto myth: could "burned" assets ever be reclaimed, and if they were, where should they go? Setting the energy spent on crypto infrastructure against the energy spent on piracy, it is a study of an emerging synthetic financial folklore.

{% fig "searching-for-null/exhibition.webp", "Opening conversation at Onassis ONX Studio, New York.", "wide" %}

<p class="note">The search only targets address zero, which by design has no owner. The work was originally shown with a live feed from the running program.</p>
