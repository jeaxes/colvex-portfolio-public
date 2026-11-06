/**
 * All page copy in one place.
 * Personal data never lives in the repository: it comes from environment variables at build time
 * (see .env.example). Public defaults are used when a value is not set.
 */
export type Lang = 'de' | 'en';

const env = import.meta.env as Record<string, string | undefined>;
const read = (key: string, fallback: string) => env[key]?.trim() || fallback;
const https = (key: string, fallback: string) => {
  const value = read(key, fallback);
  if (value !== fallback && !value.startsWith('https://')) throw new Error(`${key} must start with https://`);
  return value;
};

export const contact = {
  email: read('CONTACT_EMAIL', 'contact@colvex.io'),
  github: https('CONTACT_GITHUB', 'https://github.com/jeaxes'),
  discord: read('CONTACT_DISCORD', '.jeaxes'),
};

export const routes = {
  home: { en: '/', de: '/de/' },
} as const;

/** Project ids double as anchors (#p-<id>). */
export const projectRepositories = {
  homelab: 'https://github.com/jeaxes/homelab-public',
  kado: 'https://github.com/jeaxes/Kado-public',
  chromefever: 'https://github.com/jeaxes/Chrome-Fever-public',
  claudeskills: 'https://github.com/jeaxes/claude-skills-public',
  studio: null,
  portfolio: 'https://github.com/jeaxes/colvex-portfolio-public',
  tickets: null,
  automation: null,
  colvex: null,
} as const;
export type ProjectId = keyof typeof projectRepositories;

/**
 * Skill cells follow the logo: seven cells form the C, the centre is blue, one cell stays open.
 * Positions are [column, row] in the 3x3 grid.
 */
export type CellPos = [number, number];
export const skillCells: { id: string; pos: CellPos }[] = [
  { id: 'network', pos: [0, 0] },
  { id: 'linux', pos: [1, 0] },
  { id: 'windows', pos: [2, 0] },
  { id: 'automation', pos: [0, 1] },
  { id: 'cloud', pos: [0, 2] },
  { id: 'security', pos: [1, 2] },
  { id: 'code', pos: [2, 2] },
];

/** practice = used myself (work, homelab, projects); learning = vocational school or self-study. */
interface SkillCell {
  title: string;
  practice: string[];
  learning: string[];
}

/** Project state is independent of whether its source repository is public. */
export type ProjectStatus = 'wip' | 'prototype' | 'active' | 'live';

interface Project {
  icon: string;
  status?: ProjectStatus;
  category: string;
  title: string;
  summary: string;
  points: string[];
  stack: string[];
}

interface Copy {
  meta: { title: string; description: string; imageAlt: string };
  a11y: { skip: string; home: string; nav: string; langSwitch: string; menu: string };
  nav: { projects: string; skills: string; about: string; contact: string };
  hero: { lead: string; primary: string; secondary: string };
  presentation: { details: string; system: string; server: string; containers: string; monitoring: string; alerts: string };
  projects: {
    title: string;
    intro: string;
    hint: string;
    stack: string;
    source: string;
    privateSource: string;
    status: Record<ProjectStatus, string>;
    items: Record<ProjectId, Project>;
  };
  skills: {
    title: string;
    intro: string;
    legend: { practice: string; learning: string };
    cells: Record<string, SkillCell>;
    center: { title: string; items: string[] };
    open: { title: string; text: string };
  };
  about: { title: string; personal: string[]; workTitle: string; work: string[]; facts: { label: string; value: string }[] };
  contactSection: { title: string; heading: string; text: string; email: string; github: string; discord: string; copy: string; copied: string };
  notFound: { title: string; text: string; back: string };
}

export const copy: Record<Lang, Copy> = {
  de: {
    meta: {
      title: 'colvex | Homelab, Automatisierung und Systemintegration',
      description:
        'Portfolio von colvex: Projekte rund um Homelab, Server, Automatisierung, Software und Monitoring.',
      imageAlt: 'Das colvex Raster-Logo auf dunkelblauem Hintergrund.',
    },
    a11y: {
      skip: 'Zum Inhalt springen',
      home: 'colvex, zur Startseite',
      nav: 'Hauptnavigation',
      langSwitch: 'Sprache',
      menu: 'Menü',
    },
    nav: { projects: 'Projekte', skills: 'Skills', about: 'Über mich', contact: 'Kontakt' },
    hero: {
      lead: 'Ich bin 18, komme aus Deutschland und baue am liebsten Server und Automatisierungen.',
      primary: 'Projekte ansehen',
      secondary: 'Kontakt',
    },
    presentation: { details: 'Einblick ins Projekt', system: 'So hängt mein Homelab zusammen', server: 'Basis', containers: 'Dienste', monitoring: 'Monitoring', alerts: 'Meldungen' },
    projects: {
      'title': 'Meine Projekte',
      'intro': 'Was ich betreibe und weiterbaue. Bei öffentlichen Projekten führt ein Link direkt zum Code auf GitHub.',
      'hint': 'Viele davon baue ich mit Claude Code und meinem eigenen OpenCode-Setup. Ziel und Aufbau lege ich fest, das Ergebnis prüfe ich selbst.',
      'stack': 'Technologien',
      'source': 'Code auf GitHub',
      'privateSource': 'Privates Projekt',
      'status': {
        'wip': 'Im Bau',
        'prototype': 'Spielbarer Prototyp',
        'active': 'In Nutzung',
        'live': 'Online'
      },
      'items': {
        'homelab': {
          'icon': 'server',
          'status': 'active',
          'category': 'Homelab und Betrieb',
          'title': 'Mein Homelab: Server, Dienste und Monitoring',
          'summary': 'Mein Ubuntu-Server mit Docker Compose. Hier verbinde ich selbst gehostete Dienste, Monitoring und Automatisierung.',
          'points': [
            'Traefik bündelt den Zugriff auf die Dienste, Admin-Oberflächen erreiche ich über SSH-Tunnel',
            'Prometheus, Grafana und Uptime Kuma für Metriken und Verfügbarkeit, Loki und Alloy für Logs',
            'Gitea, n8n und weitere Dienste als getrennte Compose-Projekte mit eigener Konfiguration',
            'Öffentliche Vorlagen sowie Skripte für Einrichtung, Zustandsprüfungen und Backups mit sieben Tagen Aufbewahrung'
          ],
          'stack': [
            'Ubuntu',
            'Docker Compose',
            'Traefik',
            'Prometheus',
            'Grafana',
            'Loki',
            'n8n',
            'Gitea'
          ]
        },
        'kado': {
          'icon': 'monitor',
          'status': 'wip',
          'category': 'Windows und Entwicklung',
          'title': 'Kado: Windows für Entwicklung und KI',
          'summary': 'Build-Werkzeuge, die eine offizielle Windows-11-ISO auf meinem eigenen Rechner anpassen, samt Branding und Entwicklerumgebung.',
          'points': [
            'PowerShell-Pipeline mit DISM, Antwortdatei und Nachinstallationsskripten. Windows selbst wird nicht mitgeliefert',
            'Konfigurierbare App-Auswahl, eigene Logos und Wallpaper sowie Profile für Systemanpassungen',
            'Entwickler-Stack mit WSL 2, Git, PowerShell 7, VS Code, uv, Node.js und Ollama',
            'Ein ISO-Build ist durchgelaufen. Installation in einer VM und Vorher-nachher-Messungen stehen noch aus'
          ],
          'stack': [
            'PowerShell',
            'Windows ADK',
            'DISM',
            'WSL 2',
            'Python',
            'Node.js'
          ]
        },
        'chromefever': {
          'icon': 'gamepad-2',
          'status': 'prototype',
          'category': 'Spieleentwicklung',
          'title': 'Chrome Fever',
          'summary': 'Ein spielbarer Cyberpunk-Shooter im Browser. Auf einem verregneten Neon-Nachtmarkt kämpfe ich gegen immer stärkere Gegnerwellen.',
          'points': [
            'Three.js ohne Build-Schritt, mit Toon-Look, Bloom und Steuerung für Desktop und Touch',
            'Drei Waffen, Overclock-Zeitlupe, Cyberware-Upgrades und ein Boss nach jeder fünften Welle',
            'Figuren, Stadt, Soundeffekte und Musik entstehen im Code statt aus externen Asset-Dateien',
            'Der Prototyp ist spielbar. Three.js und die Fonts lädt er beim Start aus dem Netz'
          ],
          'stack': [
            'Three.js',
            'JavaScript',
            'WebGL',
            'Web Audio'
          ]
        },
        'claudeskills': {
          'icon': 'library',
          'category': 'KI-Werkzeuge',
          'title': 'Claude Skills',
          'summary': 'Meine Sammlung wiederverwendbarer Skills für Claude und kompatible Coding-Assistenten, mit Anleitungen, Skripten und Vorlagen.',
          'points': [
            'Themen von Entwicklung und Design bis Automatisierung, Marketing und Security Research',
            'Jeder Skill hat eine eigene SKILL.md, ein Index hilft bei der Auswahl',
            'Die Sammlung verbindet eigene Ergänzungen mit importierten Skills und deren Lizenzhinweisen',
            'Skills und ihre Werkzeuge prüfe ich vor dem Einsatz, weil sie Befehle ausführen können und eigene Voraussetzungen haben'
          ],
          'stack': [
            'Claude',
            'Markdown',
            'Python',
            'JavaScript',
            'Shell'
          ]
        },
        'studio': {
          'icon': 'route',
          'status': 'active',
          'category': 'KI-Werkzeuge',
          'title': 'Creative Studio: mein OpenCode-Setup',
          'summary': 'Mein eigenes OpenCode-Setup, das ich neben Claude Code nutze. Ein lokaler Router gibt jede Agenten-Rolle an ein Modell, das zur Aufgabe passt.',
          'points': [
            'OpenCode schickt Anfragen über einen lokalen LiteLLM-Router, betrieben mit Docker Compose, an OpenRouter',
            'Eigene Agenten für Rollen wie Planung, Architektur, Code, UI, Design und Review, jede mit eigenem Modell',
            'Skills kommen aus meiner eigenen Sammlung und werden erst nach Vorschau und meiner Freigabe installiert',
            'Ausgabenlimits pro Schlüssel. Kostenpflichtige Bild- und Videojobs laufen bis zu meiner Freigabe nur als Probelauf, das teuerste Modell starte ich nur von Hand'
          ],
          'stack': [
            'OpenCode',
            'LiteLLM',
            'OpenRouter',
            'Docker Compose',
            'PostgreSQL',
            'Python'
          ]
        },
        'tickets': {
          'icon': 'ticket',
          'status': 'wip',
          'category': 'Full-Stack',
          'title': 'Ticketsystem für die interne IT',
          'summary': 'Eine Web-Anwendung, in der Mitarbeitende IT-Probleme melden und das IT-Team sie in einer gemeinsamen Übersicht bearbeitet.',
          'points': [
            'Automatische Zuweisung nach Fachgebiet und Auslastung mit nachvollziehbarer Begründung',
            'Rollen für Mitarbeitende, IT und Admins, Live-Updates und E-Mail-Benachrichtigungen',
            'Listen- und Boardansicht, Filter, Termine, interne Notizen und dokumentierte Lösungen',
            'Die Anwendungsbasis steht. Wissensdatenbank, KI-Unterstützung und ein Pilot kommen später'
          ],
          'stack': [
            'Node.js',
            'Fastify',
            'TypeScript',
            'PostgreSQL',
            'React',
            'Vite',
            'Docker'
          ]
        },
        'automation': {
          'icon': 'workflow',
          'status': 'wip',
          'category': 'Automatisierung und KI',
          'title': 'Postfach-Automatisierung mit KI',
          'summary': 'n8n-Workflows, die eingehende Service-Anfragen einordnen und interne Vorschläge vorbereiten, ergänzt um ein Dashboard.',
          'points': [
            'Azure OpenAI liefert strukturierte Ergebnisse, die der Workflow vor der Weiterverarbeitung prüft',
            'Vorschläge bleiben intern, ein Mensch prüft sie. Der Workflow selbst verschickt keine Antworten',
            'Workflows entstehen aus einem Generator und werden gegen nachgebaute Schnittstellen getestet',
            'Für das Dashboard gibt es eine Demo mit erfundenen Daten. Pilot, reale Integrationen und Produktivbetrieb stehen noch aus'
          ],
          'stack': [
            'n8n',
            'Azure OpenAI',
            'Microsoft 365',
            'TypeScript',
            'PostgreSQL',
            'Docker'
          ]
        },
        'colvex': {
          'icon': 'globe',
          'status': 'wip',
          'category': 'Web und Betrieb',
          'title': 'colvex: Website und Portal',
          'summary': 'Ein früheres eigenes Projekt, das eine zweisprachige Website, ein Kundenportal und Werkzeuge für Automatisierung und Betrieb verbindet.',
          'points': [
            'Astro-Website auf Deutsch und Englisch mit gemeinsamer visueller Identität',
            'Portal mit Fastify, React und PostgreSQL sowie API- und Browser-Tests',
            'n8n-Workflows, Ubuntu-Server-Einrichtung, Monitoring und Statusseite',
            'Nicht als fertiger Dienst veröffentlicht. Der öffentliche Auftritt ist heute dieses persönliche Portfolio'
          ],
          'stack': [
            'Astro',
            'Fastify',
            'React',
            'PostgreSQL',
            'n8n',
            'Ansible'
          ]
        },
        'portfolio': {
          'icon': 'layout-template',
          'status': 'live',
          'category': 'Web',
          'title': 'Dieses Portfolio',
          'summary': 'Die Website, auf der du gerade bist: meine Projekte, Fähigkeiten und ein kurzer Einblick in meine Arbeit.',
          'points': [
            'Deutsch und Englisch mit Astro und TypeScript. Die Inhalte lassen sich auch ohne JavaScript lesen',
            'Selbst gehostete Fonts, keine Analyse-Skripte und keine eingebetteten Drittanbieter-Inhalte',
            'Responsive Darstellung, Tastaturbedienung und reduzierte Animation bei entsprechender Systemeinstellung',
            'Statischer Build auf Cloudflare und öffentlicher Quellcode mit direkten Links zu den Projekten'
          ],
          'stack': [
            'Astro',
            'TypeScript',
            'CSS',
            'Cloudflare'
          ]
        }
      }
    },
    skills: {
      title: 'Was ich kann',
      intro: 'Aufgebaut wie mein Logo. Durchgezogen ist, was ich bei der Arbeit, im Homelab oder in Projekten einsetze. Gestrichelt ist, was ich in der Berufsschule oder selbst gerade lerne.',
      legend: { practice: 'Praxis', learning: 'Schule und Selbststudium' },
      cells: {
        network: { title: 'Netzwerk', practice: ['Firewalls mit nftables und UFW', 'SSH-Tunnel'], learning: ['Subnetting', 'VLANs und Routing', 'VPN'] },
        linux: { title: 'Linux und Server', practice: ['Ubuntu Server', 'Härtung mit fail2ban', 'Grafana, Prometheus, Loki'], learning: ['Virtualisierung'] },
        windows: { title: 'Windows und Microsoft', practice: ['Active Directory (lokal)', 'Microsoft 365 Admin Center', 'Entra ID', 'Intune'], learning: ['Serverrollen'] },
        automation: { title: 'Automatisierung', practice: ['n8n', 'Webhooks und Zeitpläne', 'Telegram-Bots', 'Claude API'], learning: [] },
        cloud: { title: 'Container und Cloud', practice: ['Docker und Compose', 'Azure', 'Cloudflare'], learning: [] },
        security: { title: 'Security', practice: ['Kali-Lab'], learning: ['Pentest-Tools wie nmap und Burp', 'TryHackMe und Hack The Box'] },
        code: { title: 'Code und Daten', practice: ['Python', 'HTML, CSS und Astro'], learning: ['SQL', 'ER-Modelle und Normalisierung'] },
      },
      center: { title: 'Claude Code und OpenCode', items: ['Genaue Anweisungen', 'Eigenes Agenten-Setup', 'Reviews', 'Härtung'] },
      open: { title: 'Das freie Feld', text: 'Im Logo bleibt ein Feld offen. Als Nächstes kommen hier Infrastructure as Code und mehr Dienste fürs Homelab rein.' },
    },
    about: {
      title: 'Wer ich bin',
      personal: [
        'Am meisten lerne ich, wenn ich etwas selbst baue. Neben Software bastle ich gern an Hardware.',
        'Als Ausgleich gehe ich ins Fitnessstudio, fahre Gravelbike und fotografiere.',
      ],
      workTitle: 'Wie ich arbeite',
      work: [
        'Ich baue viel mit Claude Code und meinem eigenen OpenCode-Setup, in dem getrennte Agenten planen, Code schreiben und prüfen. Ich lege fest, was entsteht, und schreibe die Anweisungen so genau wie möglich, denn davon hängt das Ergebnis ab.',
        'Härtung und Reviews sind bei mir ein fester Schritt. Was der Code tut, verstehe ich meistens. Jede Zeile erklären kann ich noch nicht, daran arbeite ich.',
      ],
      facts: [
        { label: 'Alter', value: '18' },
        { label: 'Standort', value: 'Deutschland' },
        { label: 'Neben dem Code', value: 'Gravelbike, Fitness, Fotografie' },
        { label: 'Ausbildung', value: 'Fachinformatiker Systemintegration, 2. Lehrjahr' },
      ],
    },
    contactSection: {
      title: 'Kontakt',
      heading: 'Schreib mir',
      text: 'Du hast eine Frage zu einem Projekt oder eine Stelle, die passen könnte? Ich antworte gern.',
      email: 'E-Mail',
      github: 'GitHub',
      discord: 'Discord',
      copy: 'Kopieren',
      copied: 'Kopiert',
    },
    notFound: { title: 'Seite nicht gefunden', text: 'Diese Adresse gibt es hier nicht.', back: 'Zur Startseite' },
  },
  en: {
    meta: {
      title: 'colvex | homelab, automation and systems integration',
      description:
        'Portfolio of colvex: projects in homelab, servers, automation, software and monitoring.',
      imageAlt: 'The colvex Raster logo on a dark blue background.',
    },
    a11y: {
      skip: 'Skip to content',
      home: 'colvex, home',
      nav: 'Main navigation',
      langSwitch: 'Language',
      menu: 'Menu',
    },
    nav: { projects: 'Projects', skills: 'Skills', about: 'About', contact: 'Contact' },
    hero: {
      lead: "I'm 18, from Germany, and what I like building most is servers and automations.",
      primary: 'View projects',
      secondary: 'Contact',
    },
    presentation: { details: 'Inside the project', system: 'How my homelab connects', server: 'Foundation', containers: 'Services', monitoring: 'Monitoring', alerts: 'Alerts' },
    projects: {
      'title': 'My projects',
      'intro': 'Things I run and keep working on. Public projects link straight to their code on GitHub.',
      'hint': 'I build many of them with Claude Code and my own OpenCode setup. I set the goal and the structure and check the result myself.',
      'stack': 'Stack',
      'source': 'View source on GitHub',
      'privateSource': 'Private project',
      'status': {
        'wip': 'In progress',
        'prototype': 'Playable prototype',
        'active': 'In use',
        'live': 'Live'
      },
      'items': {
        'homelab': {
          'icon': 'server',
          'status': 'active',
          'category': 'Homelab and operations',
          'title': 'My homelab: servers, services and monitoring',
          'summary': 'My Ubuntu server running Docker Compose, where I bring together self-hosted services, monitoring and automation.',
          'points': [
            'Traefik routes access to the services, and I reach admin interfaces through SSH tunnels',
            'Prometheus, Grafana and Uptime Kuma for metrics and availability, Loki and Alloy for logs',
            'Gitea, n8n and other services live in separate Compose projects with their own configuration',
            'Public templates and scripts for setup, health checks and backups with seven-day retention'
          ],
          'stack': [
            'Ubuntu',
            'Docker Compose',
            'Traefik',
            'Prometheus',
            'Grafana',
            'Loki',
            'n8n',
            'Gitea'
          ]
        },
        'kado': {
          'icon': 'monitor',
          'status': 'wip',
          'category': 'Windows and development',
          'title': 'Kado: Windows for development and AI',
          'summary': 'Build tools that customize an official Windows 11 ISO on my own PC, including branding and a developer environment.',
          'points': [
            'A PowerShell pipeline with DISM, an answer file and post-install scripts. Windows itself is not distributed',
            'Configurable app selection, custom logos and wallpapers, and profiles for system adjustments',
            'A developer stack with WSL 2, Git, PowerShell 7, VS Code, uv, Node.js and Ollama',
            'One ISO build has completed. A VM installation and before-and-after measurements are still pending'
          ],
          'stack': [
            'PowerShell',
            'Windows ADK',
            'DISM',
            'WSL 2',
            'Python',
            'Node.js'
          ]
        },
        'chromefever': {
          'icon': 'gamepad-2',
          'status': 'prototype',
          'category': 'Game development',
          'title': 'Chrome Fever',
          'summary': 'A playable cyberpunk shooter in the browser, set in a rainy neon night market with increasingly difficult enemy waves.',
          'points': [
            'Three.js with no build step, a toon look, bloom, and controls for desktop and touch',
            'Three weapons, Overclock slow motion, cyberware upgrades and a boss every fifth wave',
            'Characters, city, sound effects and music are generated in code rather than loaded from asset files',
            'The prototype is playable. It loads Three.js and its fonts from the network at startup'
          ],
          'stack': [
            'Three.js',
            'JavaScript',
            'WebGL',
            'Web Audio'
          ]
        },
        'claudeskills': {
          'icon': 'library',
          'category': 'AI tools',
          'title': 'Claude Skills',
          'summary': 'My collection of reusable skills for Claude and compatible coding assistants, with instructions, scripts and templates.',
          'points': [
            'Topics range from development and design to automation, marketing and security research',
            'Each skill has its own SKILL.md, with an index to help choose the right one',
            'The collection combines my own additions with imported skills and their license notices',
            'I review skills and their tools before use, because they can run commands and have their own prerequisites'
          ],
          'stack': [
            'Claude',
            'Markdown',
            'Python',
            'JavaScript',
            'Shell'
          ]
        },
        'studio': {
          'icon': 'route',
          'status': 'active',
          'category': 'AI tools',
          'title': 'Creative Studio: my OpenCode setup',
          'summary': 'My own OpenCode setup that I use next to Claude Code. A local router hands each agent role to a model that suits the job.',
          'points': [
            'OpenCode sends requests through a local LiteLLM router, run with Docker Compose, to OpenRouter',
            'Separate agents for roles such as planning, architecture, coding, UI, design and review, each with its own model',
            'Skills come from my own collection and are installed only after a preview and my approval',
            'Spending limits per key. Paid image and video jobs run as a dry run until I approve them, and I only start the most expensive model by hand'
          ],
          'stack': [
            'OpenCode',
            'LiteLLM',
            'OpenRouter',
            'Docker Compose',
            'PostgreSQL',
            'Python'
          ]
        },
        'tickets': {
          'icon': 'ticket',
          'status': 'wip',
          'category': 'Full stack',
          'title': 'Ticket system for internal IT',
          'summary': 'A web application where employees report IT problems and the IT team handles them in a shared workspace.',
          'points': [
            'Automatic assignment by expertise and workload, with a readable explanation',
            'Roles for employees, IT and administrators, live updates and email notifications',
            'List and board views, filters, appointments, internal notes and documented resolutions',
            'The application foundation is in place. A knowledge base, AI assistance and a pilot come later'
          ],
          'stack': [
            'Node.js',
            'Fastify',
            'TypeScript',
            'PostgreSQL',
            'React',
            'Vite',
            'Docker'
          ]
        },
        'automation': {
          'icon': 'workflow',
          'status': 'wip',
          'category': 'Automation and AI',
          'title': 'Mailbox automation with AI',
          'summary': 'n8n workflows that classify incoming service requests and prepare internal suggestions, plus a dashboard.',
          'points': [
            'Azure OpenAI returns structured results that the workflow validates before further processing',
            'Suggestions stay internal and a person reviews them. The workflow itself does not send replies',
            'Workflows are built from a generator and tested against mocked interfaces',
            'The dashboard has a demo with fictitious data. A pilot, real integrations and production operation are still pending'
          ],
          'stack': [
            'n8n',
            'Azure OpenAI',
            'Microsoft 365',
            'TypeScript',
            'PostgreSQL',
            'Docker'
          ]
        },
        'colvex': {
          'icon': 'globe',
          'status': 'wip',
          'category': 'Web and operations',
          'title': 'colvex: website and portal',
          'summary': 'An earlier project of my own, combining a bilingual website, a customer portal and tools for automation and operations.',
          'points': [
            'An Astro website in German and English with a shared visual identity',
            'A portal using Fastify, React and PostgreSQL, with API and browser tests',
            'n8n workflows, Ubuntu server setup, monitoring and a status page',
            'Not launched as a finished service. This personal portfolio is my current public website'
          ],
          'stack': [
            'Astro',
            'Fastify',
            'React',
            'PostgreSQL',
            'n8n',
            'Ansible'
          ]
        },
        'portfolio': {
          'icon': 'layout-template',
          'status': 'live',
          'category': 'Web',
          'title': 'This portfolio',
          'summary': 'The website you are looking at: my projects, skills and a short introduction to how I work.',
          'points': [
            'English and German with Astro and TypeScript. The content stays readable without JavaScript',
            'Self-hosted fonts, no analytics scripts and no embedded third-party content',
            'Responsive layouts, keyboard access and reduced animation when requested by system preferences',
            'A static build on Cloudflare, with public source code and direct links to the projects'
          ],
          'stack': [
            'Astro',
            'TypeScript',
            'CSS',
            'Cloudflare'
          ]
        }
      }
    },
    skills: {
      title: 'What I can do',
      intro: 'Laid out like my logo. Solid means I use it at work, in my homelab or in projects. Dashed means I am learning it at vocational school or on my own.',
      legend: { practice: 'Hands-on', learning: 'School and self-study' },
      cells: {
        network: { title: 'Networking', practice: ['Firewalls with nftables and UFW', 'SSH tunnels'], learning: ['Subnetting', 'VLANs and routing', 'VPN'] },
        linux: { title: 'Linux and servers', practice: ['Ubuntu Server', 'Hardening with fail2ban', 'Grafana, Prometheus, Loki'], learning: ['Virtualisation'] },
        windows: { title: 'Windows and Microsoft', practice: ['Active Directory (on-prem)', 'Microsoft 365 admin center', 'Entra ID', 'Intune'], learning: ['Server roles'] },
        automation: { title: 'Automation', practice: ['n8n', 'Webhooks and schedules', 'Telegram bots', 'Claude API'], learning: [] },
        cloud: { title: 'Containers and cloud', practice: ['Docker and Compose', 'Azure', 'Cloudflare'], learning: [] },
        security: { title: 'Security', practice: ['Kali lab'], learning: ['Pentest tools like nmap and Burp', 'TryHackMe and Hack The Box'] },
        code: { title: 'Code and data', practice: ['Python', 'HTML, CSS and Astro'], learning: ['SQL', 'ER models and normalisation'] },
      },
      center: { title: 'Claude Code and OpenCode', items: ['Precise instructions', 'Own agent setup', 'Reviews', 'Hardening'] },
      open: { title: 'The open cell', text: 'One cell in my logo stays open. Next up: infrastructure as code and more services for my homelab.' },
    },
    about: {
      title: 'Who I am',
      personal: [
        'I learn the most when I build something myself. Besides software, I like tinkering with hardware.',
        'Away from the desk I go to the gym, ride my gravel bike and take photos.',
      ],
      workTitle: 'How I work',
      work: [
        'I build a lot with Claude Code and my own OpenCode setup, where separate agents plan, write and review code. I decide what gets built and write the instructions as precisely as I can, since the result depends on them.',
        'Hardening and reviews are a fixed step for me. I usually understand what the code does. I can\'t explain every line yet, and I\'m working on that.',
      ],
      facts: [
        { label: 'Age', value: '18' },
        { label: 'Based in', value: 'Germany' },
        { label: 'Away from code', value: 'Gravel biking, fitness, photography' },
        { label: 'Training', value: 'IT systems integration, 2nd year' },
      ],
    },
    contactSection: {
      title: 'Contact',
      heading: 'Get in touch',
      text: 'Got a question about a project, or a role that might fit? Send me a message.',
      email: 'Email',
      github: 'GitHub',
      discord: 'Discord',
      copy: 'Copy',
      copied: 'Copied',
    },
    notFound: { title: 'Page not found', text: 'This address does not exist here.', back: 'Back to home' },
  },
};
