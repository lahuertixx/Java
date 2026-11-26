/*
 * LAHU PAGE · JavaScript vanilla.
 * - Navegación por "páginas" con hash (#/inicio, #/java, #/ejercicios…)
 * - Listado de ejercicios, resaltado Java, explicaciones y ejecución con Wandbox
 * - Zona interactiva de ejercicios y apuntes
 */
(function () {
    'use strict';

    document.body.classList.add('js-ready');

    const CONFIG = window.LAHU_CONFIG || {};
    const exercises = Array.isArray(window.JAVA_EXERCISES) ? window.JAVA_EXERCISES.slice() : [];
    const explanations = window.LAHU_EXPLANATIONS || {};
    const PAGES = ['inicio', 'java', 'ejercicios', 'apuntes', 'proyectos', 'contacto'];
    const PAGE_TITLES = {
        inicio: 'Inicio', java: 'Java', ejercicios: 'Práctica',
        apuntes: 'Apuntes', proyectos: 'Proyectos', contacto: 'Contacto'
    };
    const ROUTE_PREFIX = 'java/ejercicio/';
    const WANDBOX_COMPILER = 'openjdk-jdk-21+35';
    const WANDBOX_URL = 'https://wandbox.org/api/compile.json';
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const dom = {
        panels: Array.prototype.slice.call(document.querySelectorAll('[data-page-panel]')),
        javaList: document.querySelector('[data-page-panel="java"] > .page-top'),
        viewer: document.getElementById('detalle'),
        grid: document.getElementById('exercise-grid'),
        status: document.getElementById('exercise-status'),
        search: document.getElementById('search-input'),
        filters: Array.prototype.slice.call(document.querySelectorAll('.filter-btn')),
        navLinks: Array.prototype.slice.call(document.querySelectorAll('.nav-links a')),
        menuToggle: document.getElementById('menu-toggle'),
        navPanel: document.getElementById('nav-panel'),
        statExercises: document.getElementById('stat-exercises'),
        heroCount: document.getElementById('hero-count'),
        languageCount: document.getElementById('language-count'),
        filterAllCount: document.getElementById('filter-all-count'),
        filterProblemsCount: document.getElementById('filter-problems-count'),
        filterPracticesCount: document.getElementById('filter-practices-count'),
        year: document.getElementById('year'),
        runBtn: document.getElementById('run-btn'),
        runLabel: document.querySelector('.run-label'),
        copyBtn: document.getElementById('copy-btn'),
        copyLabel: document.querySelector('.copy-label'),
        openFile: document.getElementById('open-file'),
        openGithub: document.getElementById('open-github'),
        detailCategory: document.getElementById('detalle-categoria'),
        detailTitle: document.getElementById('detalle-titulo'),
        detailDescription: document.getElementById('detalle-descripcion'),
        detailMeta: document.getElementById('detalle-meta'),
        detailQue: document.getElementById('detalle-que'),
        detailPara: document.getElementById('detalle-para'),
        detailName: document.getElementById('detalle-nombre'),
        detailCode: document.getElementById('detalle-code'),
        detailError: document.getElementById('detalle-error'),
        detailHint: document.getElementById('detalle-hint'),
        consolePanel: document.getElementById('console-panel'),
        consoleOutput: document.getElementById('console-output'),
        consoleInput: document.getElementById('console-input'),
        consoleClear: document.getElementById('console-clear'),
        toast: document.getElementById('toast'),
        emailLink: document.getElementById('email-link'),
        emailText: document.getElementById('email-text')
    };

    if (!dom.grid || !dom.viewer || !dom.panels.length) return;

    const codeCache = new Map();
    const metaPromises = new Map();
    const cardNodes = new Map();
    let revealObserver = null;
    let activeFilter = 'all';
    let currentCode = '';
    let currentFile = '';
    let toastTimer = null;
    let copyTimer = null;

    /* ---------- Utilidades ---------- */

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function truncate(text, max) {
        if (text.length <= max) return text;
        const cut = text.slice(0, max);
        const lastSpace = cut.lastIndexOf(' ');
        return (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd() + '…';
    }

    function fileUrl(file) {
        return './' + encodeURIComponent(file);
    }

    function categoryOf(file) {
        return /^Problema_/i.test(file) ? 'Problemas' : 'Prácticas';
    }

    function lineCount(code) {
        if (!code.trim()) return 0;
        const lines = code.split(/\r\n|\r|\n/);
        while (lines.length && lines[lines.length - 1].trim() === '') lines.pop();
        return lines.length;
    }

    function isMetadataLine(line) {
        return /^@?(?:author|fecha|date|version)\b/i.test(line) ||
            /^[A-Za-z0-9_.-]+\.java$/i.test(line) ||
            /^\d{8}$/.test(line);
    }

    function extractDescription(code, file) {
        const block = code.match(/^\ufeff?\s*\/\*([\s\S]*?)\*\//);
        if (block) {
            const lines = block[1]
                .split(/\r?\n/)
                .map(function (line) { return line.replace(/^\s*\*?\s?/, '').trim(); })
                .filter(Boolean);
            const meaningful = lines.filter(function (line) { return !isMetadataLine(line); });
            const text = meaningful.join(' ').replace(/\s+/g, ' ').trim();
            if (text.length >= 30) return truncate(text, 230);
        }

        const lines = code.replace(/^\ufeff/, '').split(/\r?\n/);
        const classIndex = lines.findIndex(function (line) {
            return /^\s*(?:(?:public|private|protected|final|abstract|static)\s+)*class\b/.test(line);
        });
        const head = lines.slice(0, classIndex === -1 ? Math.min(lines.length, 12) : classIndex);
        const commentLine = head.find(function (line) { return /^\s*\/\//.test(line); });

        if (commentLine) {
            const text = commentLine.replace(/^\s*\/\/\s?/, '').trim();
            const usable = text.length >= 25 &&
                !/^Importamos\b/i.test(text) &&
                !/^ESTO ES PARA PRUEBAS$/i.test(text) &&
                !/\.java$/i.test(text);
            if (usable) return truncate(text, 230);
        }

        return file;
    }

    function detectTags(code, file) {
        const tags = [];
        if (explanations[file]) tags.push('Explicado');
        if (/\bScanner\b/.test(code)) tags.push('Scanner');
        if (/\b(?:for|while|do)\b/.test(code)) tags.push('Bucles');
        if (/\bif\b/.test(code)) tags.push('Condicionales');
        if (/\bMath\b/.test(code)) tags.push('Math');
        if (!tags.length && /\bclass\b/.test(code)) tags.push('Clases');
        if (!tags.length) tags.push('Java');
        return tags.slice(0, 3);
    }

    function loadExercise(file) {
        if (!metaPromises.has(file)) {
            metaPromises.set(
                file,
                fetch(fileUrl(file), { cache: 'force-cache' })
                    .then(function (response) {
                        if (!response.ok) throw new Error('HTTP ' + response.status);
                        return response.text();
                    })
                    .then(function (code) {
                        codeCache.set(file, code);
                        return {
                            file: file,
                            category: categoryOf(file),
                            description: extractDescription(code, file),
                            tags: detectTags(code, file),
                            lines: lineCount(code),
                            ok: true
                        };
                    })
                    .catch(function () {
                        return {
                            file: file,
                            category: categoryOf(file),
                            description: file,
                            tags: [],
                            lines: null,
                            ok: false
                        };
                    })
            );
        }
        return metaPromises.get(file);
    }

    /* ---------- Resaltado de sintaxis Java ---------- */

    const KEYWORDS = [
        'abstract', 'assert', 'boolean', 'break', 'byte', 'case', 'catch', 'char',
        'class', 'continue', 'default', 'do', 'double', 'else', 'enum', 'extends',
        'final', 'finally', 'float', 'for', 'if', 'implements', 'import', 'instanceof',
        'int', 'interface', 'long', 'native', 'new', 'package', 'private', 'protected',
        'public', 'return', 'short', 'static', 'strictfp', 'super', 'switch',
        'synchronized', 'this', 'throw', 'throws', 'transient', 'try', 'var', 'void',
        'volatile', 'while', 'true', 'false', 'null', 'record', 'sealed', 'permits', 'yield'
    ];

    const TYPES = [
        'String', 'Object', 'System', 'Math', 'Scanner', 'Integer', 'Double',
        'Boolean', 'Character', 'StringBuilder', 'Exception'
    ];

    const TOKEN_PATTERN = new RegExp(
        '(\\/\\*[\\s\\S]*?\\*\\/|\\/\\/[^\\n]*)' +
        '|("(?:\\\\.|[^"\\\\])*"|\'(?:\\\\.|[^\'\\\\])*\')' +
        '|(@[A-Za-z_$][\\w$]*)' +
        '|(\\b(?:' + KEYWORDS.join('|') + ')\\b)' +
        '|(\\b(?:' + TYPES.join('|') + ')\\b)' +
        '|(\\b\\d[\\d_]*(?:\\.\\d+)?(?:[fFdDlL])?\\b)' +
        '|([{}()\\[\\];,.=+\\-*/%<>!&|^~?:]+)',
        'g'
    );

    function highlightJava(code) {
        let html = '';
        let lastIndex = 0;
        let match;
        TOKEN_PATTERN.lastIndex = 0;

        while ((match = TOKEN_PATTERN.exec(code)) !== null) {
            html += escapeHtml(code.slice(lastIndex, match.index));
            let className = '';
            if (match[1]) className = 'tok-comment';
            else if (match[2]) className = 'tok-string';
            else if (match[3]) className = 'tok-annotation';
            else if (match[4]) className = 'tok-keyword';
            else if (match[5]) className = 'tok-type';
            else if (match[6]) className = 'tok-number';
            else if (match[7]) className = 'tok-operator';
            html += '<span class="' + className + '">' + escapeHtml(match[0]) + '</span>';
            lastIndex = match.index + match[0].length;
        }

        html += escapeHtml(code.slice(lastIndex));
        return html;
    }

    /* ---------- Tarjetas y filtros ---------- */

    function cardMarkup(meta) {
        const lines = meta.lines === null
            ? 'Java'
            : meta.lines === 0 ? 'Archivo vacío' : meta.lines + ' líneas';
        const info = explanations[meta.file];
        const description = info ? truncate(info.que, 170) : meta.description;
        const tags = meta.tags.map(function (tag) {
            return '<span class="tag">' + escapeHtml(tag) + '</span>';
        }).join('');

        return '' +
            '<div class="card-top">' +
            '<span class="file-icon" aria-hidden="true">{ }</span>' +
            '<span class="card-category">' + escapeHtml(meta.category) + '</span>' +
            '</div>' +
            '<h3>' + escapeHtml(meta.file) + '</h3>' +
            '<p>' + escapeHtml(description) + '</p>' +
            '<div class="card-tags">' + tags + '</div>' +
            '<div class="card-footer">' +
            '<span>' + escapeHtml(lines) + '</span>' +
            '<span class="card-cta">Ver y ejecutar <span aria-hidden="true">→</span></span>' +
            '</div>';
    }

    function renderSkeletonCards() {
        dom.grid.innerHTML = '';
        cardNodes.clear();

        exercises.forEach(function (file) {
            const card = document.createElement('article');
            card.className = 'exercise-card is-loading';
            card.dataset.file = file;
            card.dataset.category = categoryOf(file);
            card.dataset.search = file.toLowerCase();
            card.tabIndex = 0;
            card.setAttribute('role', 'link');
            card.setAttribute('aria-label', 'Ver y ejecutar ' + file);
            card.innerHTML = '' +
                '<div class="card-top">' +
                '<span class="file-icon" aria-hidden="true">{ }</span>' +
                '<span class="card-category">' + escapeHtml(categoryOf(file)) + '</span>' +
                '</div>' +
                '<h3>' + escapeHtml(file) + '</h3>' +
                '<div class="skeleton-line"></div>' +
                '<div class="skeleton-line"></div>' +
                '<div class="skeleton-line"></div>';
            dom.grid.appendChild(card);
            cardNodes.set(file, card);
        });

        observeReveals();
        applyFilters();
    }

    function hydrateCards() {
        Promise.all(exercises.map(loadExercise)).then(function (metas) {
            metas.forEach(function (meta) {
                const card = cardNodes.get(meta.file);
                if (!card) return;
                card.classList.remove('is-loading');
                card.dataset.search = (meta.file + ' ' + meta.description + ' ' +
                    ((explanations[meta.file] || {}).que || '')).toLowerCase();
                card.innerHTML = cardMarkup(meta);
            });
            observeReveals();
            applyFilters();
        });
    }

    function applyFilters() {
        const query = dom.search ? dom.search.value.trim().toLowerCase() : '';
        let visible = 0;

        exercises.forEach(function (file) {
            const card = cardNodes.get(file);
            if (!card) return;
            const matchesCategory = activeFilter === 'all' || card.dataset.category === activeFilter;
            const matchesQuery = !query || (card.dataset.search || file.toLowerCase()).indexOf(query) !== -1;
            const shouldShow = matchesCategory && matchesQuery;
            card.hidden = !shouldShow;
            if (shouldShow) visible++;
        });

        if (!exercises.length) {
            dom.status.textContent = 'No se han detectado archivos .java en el inventario.';
        } else if (visible === 0) {
            dom.status.textContent = 'Sin resultados. Prueba con otra búsqueda o filtro.';
        } else {
            dom.status.textContent = visible + ' de ' + exercises.length + ' ejercicios visibles';
        }
    }

    function openExercise(file) {
        location.hash = '#/' + ROUTE_PREFIX + encodeURIComponent(file);
    }

    /* ---------- Visor ---------- */

    function showMeta(meta) {
        const tags = meta.tags.map(function (tag) {
            return '<span class="tag">' + escapeHtml(tag) + '</span>';
        });
        if (meta.lines !== null) {
            tags.push('<span class="status-pill">' + escapeHtml(
                meta.lines === 0 ? 'Archivo vacío' : meta.lines + ' líneas'
            ) + '</span>');
        }
        dom.detailMeta.innerHTML = tags.join('');
    }

    function renderExercise(file) {
        currentCode = '';
        currentFile = file;
        dom.detailError.hidden = true;
        dom.consolePanel.hidden = true;
        dom.consoleOutput.textContent = '';
        dom.detailCode.textContent = '';
        dom.detailName.textContent = file;
        dom.openFile.href = fileUrl(file);
        dom.openGithub.href = (CONFIG.REPO_URL || '') + '/blob/main/' + encodeURIComponent(file);
        dom.detailDescription.textContent = 'Leyendo el archivo…';
        dom.detailQue.textContent = '';
        dom.detailPara.textContent = '';
        dom.detailHint.textContent = 'Para ejecutarlo en local: javac ' + file + ' y después java ' +
            file.replace(/\.java$/i, '');

        if (exercises.indexOf(file) === -1) {
            dom.detailCategory.textContent = 'Ejercicio no encontrado';
            dom.detailTitle.textContent = 'Archivo no disponible';
            dom.detailDescription.textContent = 'No hay un ejercicio registrado con ese nombre en el inventario.';
            dom.detailMeta.innerHTML = '';
            dom.detailError.hidden = false;
            dom.detailError.textContent = 'Vuelve al listado para elegir un ejercicio válido.';
            return;
        }

        loadExercise(file).then(function (meta) {
            const code = codeCache.get(file) || '';
            currentCode = code;
            dom.detailCategory.textContent = meta.category === 'Problemas' ? 'Problema · Java' : 'Práctica · Java';
            dom.detailTitle.textContent = file;
            dom.detailDescription.textContent = meta.description;
            const info = explanations[file] || {};
            dom.detailQue.textContent = info.que || 'Este archivo todavía no tiene explicación escrita. Puedes leer el código y usar los apuntes para entenderlo.';
            dom.detailPara.textContent = info.para || 'Sirve como ejemplo de código real para practicar la lectura y la depuración.';
            showMeta(meta);

            if (!meta.ok) {
                dom.detailError.hidden = false;
                dom.detailError.textContent = 'No se pudo leer el archivo con fetch. Si estás abriendo el HTML directamente desde el disco, inicia un servidor local; en GitHub Pages la lectura funciona con rutas relativas.';
                dom.detailCode.textContent = '// No se pudo cargar el contenido de ' + file;
            } else {
                dom.detailCode.innerHTML = highlightJava(code);
            }
        });
    }

    /* ---------- Ejecución con Wandbox ---------- */

    function prepareForWandbox(code) {
        const match = code.match(/\bpublic\s+class\s+([A-Za-z_$][\w$]*)/);
        if (!match) return code;
        const name = match[1];
        let prepared = code.replace(/\bpublic\s+class\s+[A-Za-z_$][\w$]*/, 'class prog');
        prepared = prepared.replace(new RegExp('\\b' + name.replace(/\$/g, '\\$') + '\\b', 'g'), 'prog');
        return prepared;
    }

    function runCode() {
        if (!currentCode || !dom.runBtn || dom.runBtn.disabled) return;

        dom.runBtn.disabled = true;
        dom.runLabel.textContent = 'Compilando…';
        dom.consolePanel.hidden = false;
        dom.consoleOutput.textContent = 'Enviando código al compilador…';

        fetch(WANDBOX_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                compiler: WANDBOX_COMPILER,
                code: prepareForWandbox(currentCode),
                stdin: dom.consoleInput ? dom.consoleInput.value : ''
            })
        })
            .then(function (response) {
                if (!response.ok) throw new Error('HTTP ' + response.status);
                return response.json();
            })
            .then(function (result) {
                const parts = [];
                if (result.compiler_error) parts.push('ERROR DE COMPILACIÓN:\n' + result.compiler_error);
                if (result.program_error) parts.push('ERROR AL EJECUTAR:\n' + result.program_error);
                if (result.program_output) parts.push('SALIDA:\n' + result.program_output);
                if (!parts.length) {
                    parts.push(result.status === '0'
                        ? 'El programa terminó sin imprimir nada.'
                        : 'El programa terminó con estado ' + result.status + '.');
                }
                dom.consoleOutput.textContent = parts.join('\n\n').trim();
                showToast(result.status === '0' ? 'Programa ejecutado' : 'Revisa la consola');
            })
            .catch(function (error) {
                dom.consoleOutput.textContent = 'No se pudo conectar con el compilador (' + error.message + ').\n\n' +
                    'Puedes ejecutarlo en local con:\n  javac ' + (currentFile || 'Archivo.java') + '\n  java ' +
                    (currentFile || 'Archivo.java').replace(/\.java$/i, '');
                showToast('Sin conexión con el compilador');
            })
            .then(function () {
                dom.runBtn.disabled = false;
                dom.runLabel.textContent = 'Ejecutar código';
            });
    }

    /* ---------- Navegación por páginas ---------- */

    function parseRoute() {
        const raw = location.hash.replace(/^#\/?/, '');
        if (!raw) return { page: 'inicio', target: '' };

        if (raw.indexOf(ROUTE_PREFIX) === 0) {
            let file = '';
            try { file = decodeURIComponent(raw.slice(ROUTE_PREFIX.length)); } catch (error) { file = ''; }
            return { page: 'java', exercise: file };
        }

        const segments = raw.split('/');
        if (PAGES.indexOf(segments[0]) !== -1) {
            return { page: segments[0], target: segments.slice(1).join('/') };
        }
        if (raw === 'ejercicios-lista') return { page: 'java', target: raw };
        return { page: 'inicio', target: '' };
    }

    function renderRoute() {
        const route = parseRoute();
        const showExercise = Boolean(route.exercise);

        dom.panels.forEach(function (panel) {
            panel.hidden = panel.dataset.pagePanel !== route.page;
        });
        if (dom.javaList) dom.javaList.hidden = showExercise;
        dom.viewer.hidden = !showExercise;

        dom.navLinks.forEach(function (link) {
            if (link.dataset.nav === route.page) link.setAttribute('aria-current', 'page');
            else link.removeAttribute('aria-current');
        });

        closeMenu();

        if (showExercise) {
            renderExercise(route.exercise);
            document.title = route.exercise + ' · LAHU PAGE';
            window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
            return;
        }

        document.title = 'LAHU PAGE · ' + (PAGE_TITLES[route.page] || 'Inicio');
        if (route.target) {
            requestAnimationFrame(function () {
                const target = document.getElementById(route.target);
                if (target) target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
            });
        } else if (window.scrollY > 0) {
            window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
        }
    }

    /* ---------- Interacción general ---------- */

    function observeReveals() {
        const elements = document.querySelectorAll('.reveal:not(.is-visible)');
        if (!('IntersectionObserver' in window)) {
            Array.prototype.forEach.call(elements, function (element) {
                element.classList.add('is-visible');
            });
            return;
        }
        if (!revealObserver) {
            revealObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        revealObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
        }
        Array.prototype.forEach.call(elements, function (element) {
            revealObserver.observe(element);
        });
    }

    function closeMenu() {
        if (!dom.navPanel || !dom.menuToggle) return;
        dom.navPanel.classList.remove('is-open');
        dom.menuToggle.setAttribute('aria-expanded', 'false');
        dom.menuToggle.setAttribute('aria-label', 'Abrir menú');
    }

    function setupMenu() {
        if (!dom.menuToggle || !dom.navPanel) return;
        dom.menuToggle.addEventListener('click', function () {
            const open = !dom.navPanel.classList.contains('is-open');
            dom.navPanel.classList.toggle('is-open', open);
            dom.menuToggle.setAttribute('aria-expanded', String(open));
            dom.menuToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
        });
        const cta = document.querySelector('.nav-cta');
        if (cta) cta.addEventListener('click', closeMenu);
        document.addEventListener('click', function (event) {
            if (!event.target.closest('.nav')) closeMenu();
        });
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') closeMenu();
        });
    }

    function setupCardNavigation() {
        dom.grid.addEventListener('click', function (event) {
            const card = event.target.closest('.exercise-card');
            if (card && !card.classList.contains('is-loading')) openExercise(card.dataset.file);
        });
        dom.grid.addEventListener('keydown', function (event) {
            if (event.key !== 'Enter' && event.key !== ' ') return;
            const card = event.target.closest('.exercise-card');
            if (card && !card.classList.contains('is-loading')) {
                event.preventDefault();
                openExercise(card.dataset.file);
            }
        });
    }

    function setupFilters() {
        dom.filters.forEach(function (button) {
            button.addEventListener('click', function () {
                activeFilter = button.dataset.filter;
                dom.filters.forEach(function (other) {
                    const active = other === button;
                    other.classList.toggle('is-active', active);
                    other.setAttribute('aria-pressed', String(active));
                });
                applyFilters();
            });
        });
        if (dom.search) dom.search.addEventListener('input', applyFilters);
    }

    function showToast(message) {
        if (!dom.toast) return;
        clearTimeout(toastTimer);
        dom.toast.textContent = message;
        dom.toast.classList.add('is-visible');
        toastTimer = setTimeout(function () {
            dom.toast.classList.remove('is-visible');
        }, 2200);
    }

    function fallbackCopy(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.top = '-1000px';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        const copied = document.execCommand('copy');
        document.body.removeChild(textarea);
        if (!copied) throw new Error('execCommand no disponible');
    }

    function copyCode() {
        if (!currentCode) return;
        const promise = (navigator.clipboard && window.isSecureContext)
            ? navigator.clipboard.writeText(currentCode)
            : Promise.resolve().then(function () { fallbackCopy(currentCode); });

        promise.then(function () {
            showToast('Código copiado al portapapeles');
            dom.copyLabel.textContent = 'Copiado';
            clearTimeout(copyTimer);
            copyTimer = setTimeout(function () {
                dom.copyLabel.textContent = 'Copiar código';
            }, 1800);
        }).catch(function () {
            showToast('No se pudo copiar. Selecciona el código manualmente.');
        });
    }

    /* ---------- Apuntes y práctica ---------- */

    function setupNotes() {
        const buttons = Array.prototype.slice.call(document.querySelectorAll('.notes-nav__item'));
        const notes = Array.prototype.slice.call(document.querySelectorAll('[data-note-panel]'));
        buttons.forEach(function (button) {
            button.addEventListener('click', function () {
                buttons.forEach(function (other) {
                    other.classList.toggle('is-active', other === button);
                });
                notes.forEach(function (note) {
                    note.hidden = note.dataset.notePanel !== button.dataset.note;
                });
                observeReveals();
            });
        });
    }

    function setupPractice() {
        const tabs = Array.prototype.slice.call(document.querySelectorAll('.practice-tab'));
        const panels = Array.prototype.slice.call(document.querySelectorAll('.practice-list'));
        tabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                tabs.forEach(function (other) {
                    const active = other === tab;
                    other.classList.toggle('is-active', active);
                    other.setAttribute('aria-selected', String(active));
                });
                panels.forEach(function (panel) {
                    panel.hidden = panel.id !== 'practice-' + tab.dataset.tab;
                });
                observeReveals();
            });
        });

        const checks = {
            'var-numero': {
                test: /^\s*int\s*$/i,
                ok: 'Correcto: int guarda números enteros.',
                fail: 'Casi. Para un número entero se usa la palabra clave de tres letras.',
                hint: 'Pista: piensa en el tipo para números enteros (int).'
            },
            condicion: {
                test: /edad\s*>=\s*18|18\s*<=\s*edad/,
                ok: 'Correcto: así solo se imprime "Mayor" con 18 o más.',
                fail: 'Revisa el operador: tiene que incluir el 18 (>=).',
                hint: 'Pista: necesitas comparar edad con 18 usando mayor o igual.'
            },
            bucle: {
                test: /i\s*<=\s*5|5\s*>=\s*i/,
                ok: 'Correcto: el bucle va del 1 al 5, los dos incluidos.',
                fail: 'Fíjate en el límite: tiene que llegar hasta el 5 inclusive.',
                hint: 'Pista: la condición se cumple mientras i sea menor o igual que 5.'
            },
            'html-titulo': {
                test: /^\s*title\s*$/i,
                ok: 'Correcto: <title> va en <head> y aparece en la pestaña.',
                fail: 'No es esa. Piensa en la etiqueta que pone el título.',
                hint: 'Pista: son cinco letras y empieza por t.'
            },
            'html-parrafo': {
                test: /^\s*p\s*$/i,
                ok: 'Correcto: <p> es la etiqueta de párrafo.',
                fail: 'Prueba con la etiqueta de una sola letra.',
                hint: 'Pista: paragraph empieza por p.'
            },
            'html-enlace': {
                test: /^\s*href\s*$/i,
                ok: 'Correcto: href guarda la dirección del enlace.',
                fail: 'El atributo no es ese. Cuatro letras.',
                hint: 'Pista: h-r-e-f.'
            }
        };

        document.addEventListener('click', function (event) {
            const checkBtn = event.target.closest('[data-check]');
            if (checkBtn) {
                const id = checkBtn.dataset.check;
                const rule = checks[id];
                const input = document.getElementById('answer-' + id);
                const feedback = document.getElementById('feedback-' + id);
                if (!rule || !input || !feedback) return;
                const ok = rule.test.test(input.value);
                feedback.textContent = ok ? rule.ok : rule.fail;
                feedback.className = 'practice-feedback ' + (ok ? 'is-ok' : 'is-fail');
                return;
            }

            const hintBtn = event.target.closest('[data-hint]');
            if (hintBtn) {
                const rule = checks[hintBtn.dataset.hint];
                const feedback = document.getElementById('feedback-' + hintBtn.dataset.hint);
                if (rule && feedback) {
                    feedback.textContent = rule.hint;
                    feedback.className = 'practice-feedback is-hint';
                }
            }
        });
    }

    /* ---------- Arranque ---------- */

    const problemCount = exercises.filter(function (file) { return categoryOf(file) === 'Problemas'; }).length;

    if (dom.statExercises) dom.statExercises.textContent = String(exercises.length);
    if (dom.heroCount) dom.heroCount.textContent = exercises.length + ' archivos .java detectados';
    if (dom.languageCount) dom.languageCount.textContent = exercises.length + ' archivos .java';
    if (dom.filterAllCount) dom.filterAllCount.textContent = String(exercises.length);
    if (dom.filterProblemsCount) dom.filterProblemsCount.textContent = String(problemCount);
    if (dom.filterPracticesCount) dom.filterPracticesCount.textContent = String(exercises.length - problemCount);
    if (dom.year) dom.year.textContent = String(new Date().getFullYear());

    if (dom.emailLink && CONFIG.EMAIL) {
        dom.emailLink.href = 'mailto:' + CONFIG.EMAIL;
        if (dom.emailText) dom.emailText.textContent = CONFIG.EMAIL;
    }

    setupMenu();
    setupCardNavigation();
    setupFilters();
    setupNotes();
    setupPractice();
    if (dom.copyBtn) dom.copyBtn.addEventListener('click', copyCode);
    if (dom.runBtn) dom.runBtn.addEventListener('click', runCode);
    if (dom.consoleClear) {
        dom.consoleClear.addEventListener('click', function () {
            if (dom.consoleInput) dom.consoleInput.value = '';
            dom.consoleOutput.textContent = '';
        });
    }
    window.addEventListener('hashchange', renderRoute);

    renderSkeletonCards();
    hydrateCards();
    renderRoute();
    observeReveals();
})();
