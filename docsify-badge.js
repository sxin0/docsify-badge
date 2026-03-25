/*!
 * docsify-badge
 * Adds colored superscript badges to docsify sidebar links.
 *
 * Usage in _sidebar.md:
 *   * [Page](path)::New::
 *   * [Page](path)::Test|orange::
 *
 * https://github.com/tal/docsify-badge
 * MIT License
 */

(function () {
    'use strict';

    var DEFAULT_COLOR = 'red';
    var BADGE_RE = /::([^:|]+)(?:\|([^:]+))?::/;

    function applyBadges() {
        var sidebar = document.querySelector('.sidebar-nav');
        if (!sidebar) return;

        sidebar.querySelectorAll('li').forEach(function (li) {
            var found = null;

            // Scan direct child nodes only, skip nested <ul>
            Array.from(li.childNodes).forEach(function (child) {
                if (found || child.nodeName === 'UL') return;

                var m;
                if (child.nodeType === 3 /* TEXT_NODE */) {
                    m = child.textContent.match(BADGE_RE);
                    if (m) found = { node: child, text: m[1], color: m[2] || DEFAULT_COLOR };
                } else if (child.nodeName === 'P') {
                    // Docsify sometimes wraps link + text in a <p>
                    Array.from(child.childNodes).forEach(function (pChild) {
                        if (found || pChild.nodeName === 'A') return;
                        if (pChild.nodeType === 3) {
                            m = pChild.textContent.match(BADGE_RE);
                            if (m) found = { node: pChild, text: m[1], color: m[2] || DEFAULT_COLOR };
                        }
                    });
                }
            });

            if (!found) return;

            // Remove the raw marker text
            found.node.parentNode.removeChild(found.node);

            // Create the badge element
            var badge = document.createElement('sup');
            badge.className = 'docsify-badge';
            badge.style.cssText = [
                'color:' + found.color,
                'font-size:11px',
                'font-weight:bold',
                'margin-left:2px',
                'margin-right:2px',
            ].join(';');
            badge.textContent = found.text;

            // Prepend badge inside the <a> tag
            var link = li.querySelector('a');
            if (link) link.insertBefore(badge, link.firstChild);
        });
    }

    var plugin = function (hook) {
        hook.doneEach(applyBadges);
    };

    // Self-register
    if (window.$docsify) {
        window.$docsify.plugins = (window.$docsify.plugins || []).concat(plugin);
    } else {
        window.$docsify = { plugins: [plugin] };
    }
})();