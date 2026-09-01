+++
title = "README"
[build]
render = false
list = false
+++

# How to add a news post — no coding required

## Step 1 — Add your photo

Put the picture for your post in:

```
assets/img/postImgs/
```

Give it a simple, descriptive filename with no spaces — use dashes instead. For example: `spring-2026-casino-night.jpg`.

## Step 2 — Create your post file

The easiest way: run this from the repo root (requires the `hugo` command — see the root README for setup) —

```
hugo new posts/2026-08-10-casino-night-recap.md
```

— which creates a new file pre-filled with the right fields, named `YYYY-MM-DD-a-short-title.md` (dashes instead of spaces, no punctuation; the date just keeps the folder tidy and easy to scan, it doesn't control anything by itself — that's the `date` field below).

Or copy any existing post in this folder as a starting point instead.

Open your new file in any text editor and fill in the blanks:

```toml
+++
title = "Casino Night Recap"
date = 2026-08-10
author = "Jane Doe"
image = "assets/img/postImgs/spring-2026-casino-night.jpg"
+++

We had a blast at Casino Night this year...

Thanks to everyone who came out and made it a success!
```

A few rules to keep in mind:
- `date` must be `YYYY-MM-DD` (year-month-day). This is what controls the order posts show up in — the newest date is always shown first.
- `image` must point to the photo you added in Step 1.
- Everything after the second `+++` is the article itself, in plain text/Markdown — leave a **blank line** between paragraphs, that's how the page knows where one paragraph ends and the next begins. Write as many paragraphs as you want.
- Delete the `draft = true` line (or set it to `false`) once you're ready for the post to actually appear on the site — `hugo new` sets new posts as drafts by default so half-written posts never accidentally go live. A draft post never appears in `hugo server`/`hugo build` output unless you explicitly build with `-D`.

That's it — no separate "manifest" file to update, no image-loading step. Every `.md` file in this folder that isn't a draft shows up on the site automatically, newest first.
