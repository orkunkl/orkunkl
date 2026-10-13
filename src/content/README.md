# Content

Every entry on the site comes from a Markdown file in one of these folders.

| Folder | Section | Route |
|---|---|---|
| `work/` | Work | `/work` |
| `canon/` | Canon | `/canon` |

## Adding an entry

1. Copy `_template.md` in the right folder to a new name — e.g. `my-thing.md`
2. Fill in the frontmatter and write the body
3. That's it — the listing, the detail page, search and `llms.txt` all update on
   the next build

Files whose name starts with `_` are ignored by the loader. Templates live that
way on purpose, so they never publish.

## Frontmatter reference

**work/**
| Field | Required | Notes |
|---|---|---|
| `title` | yes | |
| `summary` | yes | one line, shown in the grid |
| `role` | no | the role held — "Blockchain Software Architect" |
| `period` | no | free text — "2022 — Present" |
| `status` | no | `active` \| `maintenance` \| `experiment` \| `archived` (default `active`) |
| `tags` | no | array of strings |
| `link` | no | external URL |
| `order` | no | lower = earlier (default `99`) |

**canon/**
| Field | Required | Notes |
|---|---|---|
| `title` | yes | |
| `whyItMatters` | **yes** | the listing is built around this line |
| `author` | no | |
| `kind` | no | `book` \| `teaching` \| `text` \| `talk` \| `essay` (default `book`) |
| `year` | no | free text |
| `tags` | no | array of strings |
| `link` | no | external URL |
| `order` | no | lower = earlier (default `99`) |

The schemas live in `src/content.config.ts`.
