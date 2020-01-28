# ChangeLog
**This change log documents all changes to [MaxBlog](https://github.com/aHuYan/ahuyan.github.io).**
**The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and MaxBlog adheres to [Semantic Versioning](https://semver.org/).**

## [Unreleased]
### Changed
- Stop using *jQuery* when *[Bootstrap5](https://github.com/twbs/bootstrap/pull/23586)* is released.
- Use templates.

### Added
- Sticky Post.

## [0.3.0] - 2019-07-10
### Added
- New style used in device whose max-width is 767px.
- Animations form [Animate.css](https://daneden.github.io/animate.css/).
- URL parameter *type* to display different types of contents based on styles.
- Listen on scrolling the page to get more list items of contents.
- Single page counter [busuanzi](https://busuanzi.ibruce.info/).
- Links of previous and next article in an article page.
- Thumbnails in cards.

### Changed
- Replace the icon with a new [red fox](http://ahuyan.github.io/about#logo).
- Start using *Fetch* over *ajax* to get jsons.
- Start using URL parameter *view* to transport content's location over URL parameter *p*.
- Start storing content files in the foldar **root/blog/YYYY/MM/DD** over gathering those files in the folder **root/blog/**.
- Get content lists one after another by using Doubly Linked List over getting all of them at a time.(Recursion)
- Replace the icon font *Star* with *Github icon* from [icomoon](https://icomoon.io/).

### Fixed
- Unify the way of naming most JS variables and functions in Camel Case.
- Unify the way of naming HTML classes and ids in Dash Case.
- Fix [404.html](/404.html).
- Fix [about.html](/about.html).

### Removed
- Delete page-turn buttons.
