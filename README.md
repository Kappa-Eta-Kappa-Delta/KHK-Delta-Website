# KHK Delta Chapter Website

This repository contains the [Hugo](https://gohugo.io/) site for Kappa Eta Kappa, Delta Chapter at the University of Wisconsin-Madison.

## Overview

This is a modern, responsive website for Kappa Eta Kappa, a co-ed professional fraternity for Electrical Engineering and Computer Science students. Originally designed for use at Delta Chapter, other chapters of KHK are welcome to use this material as well.

## Goals

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Navigation Bar**: Quick access to all main sections with sticky top positioning
- **Hero Section**: Eye-catching introduction with the KHK crest
- **Multiple Sections**:
  - About Us: Organization overview, mission, values, and chapter history
  - Our Home: The chapter house
  - Rush Information: Guide for prospective members, FAQ, testimonials
  - Members: Executive board + full active-member roster
  - News: Chapter updates and event recaps
- **Footer**: Complete contact information, social media links, and external links
- **Interactive Elements**: Smooth scrolling, animations, form validation

## Local development

1. Install [Hugo Extended](https://gohugo.io/installation/) (e.g. `winget install Hugo.Hugo.Extended`) — the Extended edition is required for the Sass pipeline.
2. From the repo root: `hugo server` — then open the URL it prints. Draft content (`draft = true`) isn't shown unless you add `-D`.
3. `hugo --gc --minify` produces a production build in `public/` (gitignored).

## Project Structure

```
/
├── hugo.toml                  # Site config: menus, footer/social params, module mounts
├── content/                   # One file per page/post
│   ├── _index.md              #   Homepage
│   ├── about.md, rush.md, our-home.md, members.md, all-posts.md
│   └── posts/                 #   News posts — see content/posts/README.md to add one
├── data/                      # Structured content edited as data, not code
│   ├── members.json           #   Member roster (id/name/photo/status/position/etc.)
│   ├── employers.json         #   Logos for the moving employer-logo wall
│   ├── faq.yaml, testimonials.yaml, history.yaml
│   ├── alumni_testimonials.yaml #   "Our Alumni Network" belt on the About page
├── layouts/                   # Go HTML templates
│   ├── baseof.html            #   Shared page shell
│   ├── _partials/             #   head / navbar / footer / member-card
│   ├── posts/                 #   News list + single-post templates
│   └── _default/              #   One template per other page
├── assets/
│   ├── sass/                  #   Source for the site's one compiled stylesheet
│   ├── fonts/, img/, logos/, svg/   # Raw media, served as-is at /assets/...
├── js/                        # Only genuine client-side behavior lives here now
│   ├── main.js                 #   Smooth scroll / scroll-to-top
│   ├── join-form.js            #   "Interested in Joining?" form -> Google Sheet
│   ├── movingWall.js           #   Animated employer-logo marquee
│   └── members-interactions.js #   Member card flip/keyboard interactions
├── archetypes/                 # `hugo new` templates for content/posts
└── scripts/                    # One-time setup docs (e.g. the join-form Apps Script)
```

Navbar, footer, and every page's structure are rendered server-side by Hugo from `content/` + `data/` + `layouts/` — there's no client-side templating engine anymore.

## Tech Stack

- **[Hugo](https://gohugo.io/)**: static site generator — content in Markdown/TOML front matter, templates in Go HTML
- **Sass**: one compiled, minified stylesheet (`assets/sass/`) via Hugo Pipes
- **Bootstrap 5**: responsive grid system and components
- **Font Awesome 6**: icon library for social media and UI elements
- **Vanilla JavaScript**: only where real client-side behavior is needed (see `js/` above) — no framework, no JS build step

## Key Features Explained

### Navigation
- Sticky navigation bar that stays visible while scrolling
- Active link highlighting based on the current page (edit links in `hugo.toml`'s `[[menus.main]]`, not in a template)
- Mobile hamburger menu for responsive design
- Smooth scroll to sections when links are clicked

### Color Scheme
- **Primary**: #4a1f6f (Purple)
- **Secondary**: #c41e3a (Red)
- **Accent**: #ffc72c (Gold)

### Animations & Effects
- Fade-in animations on scroll
- Hover effects on buttons and cards
- Smooth transitions throughout
- Scroll-to-top button appears after scrolling down

### Accessibility
- Semantic HTML5 elements
- ARIA labels for screen readers
- Keyboard navigation support
- Focus visible styles for accessibility

## Customization Guide

### Contact Information
Edit `[params]` in `hugo.toml` — used by `layouts/_partials/footer.html`:
- Address: 114 N Orchard St, Madison, WI 53715
- Email: contact@delta.khk.org
- Phone: +1 (608) 251-7545

### Social Media Links
Also in `hugo.toml`'s `[params]` (`instagramUrl`, `linkedinUrl`, `githubUrl`).

### Adding a News Post
See [`content/posts/README.md`](content/posts/README.md).

### Adding/Editing a Member
Edit `data/members.json` — copy the shape of an existing entry (`id`, `name`, `photo`, `status`, `positionHeld`, etc.). No template changes needed; the page sorts/groups itself automatically.

The `linkedin`/`github`/`website`/`resume` fields are all optional — leave any of them `null` and its icon just doesn't show up on the card. `linkedin`/`github`/`website` take a full URL; `resume` takes a site-relative path to a PDF dropped in `static/files/resumes/` (e.g. `"files/resumes/agrawal-vidit.pdf"` for a member with `id: "agrawal-vidit"`).

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Optimized images for web
- CDN-hosted Bootstrap and Font Awesome
- One compiled, minified, fingerprinted stylesheet
- Lazy loading for images (built-in with modern browsers)

## Responsive Breakpoints

- **Large (lg)**: 992px and up
- **Medium (md)**: 768px - 991px
- **Small (sm)**: 576px - 767px
- **Extra Small (xs)**: Below 576px

## Roadmap

- Possible backend integration with a login system
  - Issue each member a login so they can update their own composite photo and links

## License

Website content (C) 2026 Delta of Kappa Eta Kappa. All rights reserved.

Website tools (HTML, CSS, JS) (C) 2026 Richard Lamb. License TBD.

---

**Last Updated**: 2026
