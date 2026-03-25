# docsify-badge

A [docsify](https://docsify.js.org) plugin that adds colored superscript badges to sidebar links — useful for marking status like **New**, **Testing**, or **Done**.

![license](https://img.shields.io/github/license/sxin0/docsify-badge)

---

## Preview

```
├── Query API     ᴺᵉʷ
├── Export API    ᵀᵉˢᵗ
└── Detail API    ᴰᵒⁿᵉ
```

Badges appear as small superscript labels before the link text, colored to match their status.

---

## Installation

### Option 1 — Direct script tag

Add the script after the main docsify script in your `index.html`:

```html
<!-- docsify -->
<script src="//cdn.jsdelivr.net/npm/docsify/lib/docsify.min.js"></script>

<!-- docsify-badge -->
<script src="//cdn.jsdelivr.net/gh/sxin0/docsify-badge/docsify-badge.js"></script>
```

No configuration in `$docsify` is needed. The plugin registers itself automatically.

### Option 2 — Self-hosted

Download `docsify-badge.js` and place it in your docs folder:

```html
<script src="_docsify/docsify-badge.js"></script>
```

---

## Usage

In `_sidebar.md`, append a badge marker to any list item:

```markdown
* [Page Title](path/to/page)::New::
* [Page Title](path/to/page)::Test|orange::
* [Page Title](path/to/page)::Done|green::
* [Page Title](path/to/page)::Deprecated|gray::
```

### Syntax

| Pattern | Result |
|---------|--------|
| `::text::` | Badge with default color (`red`) |
| `::text\|color::` | Badge with a custom color |

**Color** accepts any valid CSS value:

| Example | Value |
|---------|-------|
| Named color | `red`, `orange`, `green`, `gray` |
| Hex | `#e74c3c`, `#f90` |
| RGB | `rgb(231,76,60)` |

---

## Examples

```markdown
* [Introduction](README)
* [Query](api/query)::New::
* [Export](api/export)::Test|orange::
* [Detail](api/detail)::Done|green::
* [Legacy](api/legacy)::Deprecated|gray::
```

---

## Notes

- Only the **first** badge marker per list item is recognized.
- The marker must be on the **same line** as the link.
- Nested sublists are independent — each item is matched separately.
- The badge is prepended inside the `<a>` tag so it stays inline with the link.

---

## License

[MIT](LICENSE)