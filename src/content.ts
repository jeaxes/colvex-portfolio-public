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
export type ProjectId = 'homelab' | 'tickets' | 'automation' | 'colvex' | 'portfolio' | 'chromefever' | 'kado';

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

/** wip = still being built; the card shows a status badge. Finished projects leave it out. */
export type ProjectStatus = 'wip';

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
  meta: { title: string; description: string };
  a11y: { skip: string; home: string; nav: string; langSwitch: string; menu: string };
  nav: { projects: string; skills: string; about: string; contact: string };
  hero: { lead: string; primary: string; secondary: string };
  presentation: { details: string; system: string; server: string; containers: string; monitoring: string; alerts: string };
  projects: {
    title: string;
    intro: string;
    hint: string;
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
  contactSection: { title: string; heading: string; text: string; email: string; github: string; discord: string };
  notFound: { title: string; text: string; back: string };
}

export const copy: Record<Lang, Copy> = {
  de: {
    meta: {
      title: 'colvex | Homelab, Automatisierung und Systemintegration',
      description:
        'Portfolio von colvex: Projekte rund um Homelab, Server, Automatisierung, Software und Monitoring.',
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
      title: 'Meine Projekte',
      intro: 'Woran ich baue und gebaut habe. Alle Projekte liegen in meinem GitHub.',
      hint: 'Viele Projekte baue ich mit Claude Code. Ziel, Aufbau und Prüfung kommen von mir.',
      status: { wip: 'Im Bau' },
      items: {
        homelab: {
          icon: 'server',
          category: 'Homelab',
          title: 'Server mit Monitoring und Automatisierung',
          summary: 'Ein Ubuntu-Server als VM mit Docker Compose, den ich selbst aufgebaut habe und betreibe.',
          points: [
            'Traefik mit eigener CA und IP-Allowlist, Admin-Oberflächen wie Portainer und Grafana nur über SSH-Tunnel',
            'Monitoring mit Prometheus, Alertmanager, Grafana, Loki und Uptime Kuma',
            'n8n meldet Störungen kurz per Telegram und legt Details als Gitea-Issue ab',
            'Tägliches Backup per Skript, sieben Tage Aufbewahrung, die meisten Images per Digest gepinnt',
          ],
          stack: ['Ubuntu', 'Docker Compose', 'Traefik', 'Prometheus', 'Grafana', 'Loki', 'n8n', 'Gitea'],
        },
        tickets: {
          icon: 'ticket',
          status: 'wip',
          category: 'Full-Stack',
          title: 'Ticketsystem für die interne IT',
          summary: 'Mitarbeitende melden IT-Probleme im Browser, das IT-Team arbeitet sie in einer gemeinsamen Liste ab.',
          points: [
            'Neue Tickets werden nach Fachgebiet und Auslastung zugewiesen, mit nachvollziehbarer Begründung',
            'Rollen für Mitarbeitende, IT und Admins, Updates in Echtzeit, Mail-Benachrichtigungen',
            'Anmeldung mit Argon2id, Pflicht-2FA und optionalen Passkeys',
            'Stand: Stufe 1 von 4 ist umgesetzt, Wissensdatenbank, KI-Assistent und Pilot stehen noch aus',
          ],
          stack: ['Node.js', 'Fastify', 'TypeScript', 'PostgreSQL', 'React', 'Vite', 'Docker'],
        },
        automation: {
          icon: 'workflow',
          status: 'wip',
          category: 'Automatisierung und KI',
          title: 'Postfach-Automatisierung mit KI',
          summary: 'Planung und erste Umsetzung von n8n-Workflows mit Azure OpenAI, dazu ein Dashboard für die Abteilungen.',
          points: [
            'Ein Workflow liest das Service-Postfach, lässt die KI per JSON-Schema einordnen und legt einen Vorschlag an',
            'Geplant ist ein Pilot im Schattenbetrieb: Nichts geht nach außen, ein Mensch prüft jeden Vorschlag',
            'Die Workflows entstehen aus einem Build-Skript, ein End-to-End-Test gegen nachgebaute Dienste bestand 31 von 31 Prüfungen',
            'Noch auf keiner VM installiert und nicht im Betrieb, das Dashboard gibt es bisher als Demo mit erfundenen Daten',
          ],
          stack: ['n8n', 'Azure OpenAI', 'Microsoft 365', 'PowerShell', 'Docker'],
        },
        colvex: {
          icon: 'globe',
          status: 'wip',
          category: 'Web und Betrieb',
          title: 'colvex',
          summary: 'Mein früheres eigenes Projekt: eine zweisprachige Website mit Portal, Automatisierungen und Server-Einrichtung.',
          points: [
            'Website mit Astro 7 auf Deutsch und Englisch, 39 Seiten',
            'Portal mit Fastify, React und Pflicht-2FA, 28 API-Tests laufen in der CI gegen PostgreSQL, dazu Playwright-E2E-Tests',
            'Elf n8n-Workflows, Server-Standard für Ubuntu 24.04, Monitoring mit Statusseite',
            'Noch nicht online: Impressumsdaten fehlen, die CI scheitert gerade an der Seitenprüfung und an npm audit',
          ],
          stack: ['Astro', 'Fastify', 'PostgreSQL', 'n8n', 'Ansible', 'Gatus'],
        },
        portfolio: {
          icon: 'layout-template',
          category: 'Web',
          title: 'Dieses Portfolio',
          summary: 'Diese Website. Der Code liegt auf GitHub.',
          points: [
            'Statisch mit Astro, auf Deutsch und Englisch, lesbar auch ohne JavaScript',
            'Strikte Content-Security-Policy ohne Inline-Code',
            'Öffentliches Repository ohne private Daten oder Zugangsdaten',
          ],
          stack: ['Astro', 'TypeScript', 'CSS', 'Cloudflare'],
        },
        chromefever: {
          icon: 'gamepad-2',
          status: 'wip',
          category: 'Spieleentwicklung',
          title: 'Chrome Fever',
          summary: 'Ein Cyberpunk-Shooter als spielbarer Prototyp im Browser. Gekämpft wird auf einem verregneten Neon-Nachtmarkt.',
          points: [
            'Three.js ohne Build-Schritt, mit Toon-Look, Bloom und Steuerung für Desktop und Touch',
            'Gegnerwellen, alle fünf Wellen ein Boss, drei Waffen und nach jeder Welle ein Upgrade',
            'Figuren, Stadt, Sound und Musik entstehen im Code, vier Grafik-Presets für schwächere Rechner',
          ],
          stack: ['Three.js', 'JavaScript', 'Web Audio'],
        },
        kado: {
          icon: 'palette',
          status: 'wip',
          category: 'Design und Tools',
          title: 'Kado',
          summary: 'Ein eigenes, angepasstes Windows 11. Bisher stehen die visuelle Identität und die Pipeline, die alle Assets erzeugt.',
          points: [
            'Design-Tokens als JSON, daraus werden CSS und Grafiken gebaut',
            'Build-Skripte in Python und Node.js erzeugen Logos, Wallpaper und System-Assets',
            'Der ISO-Build mit DISM, Antwortdatei und Nachinstallation liegt in einem offenen Pull Request: Ein Build lief mit einem älteren Stand durch, der Test in einer VM fehlt noch',
          ],
          stack: ['Python', 'Pillow', 'Node.js', 'Playwright', 'PowerShell'],
        },
      },
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
      center: { title: 'Claude Code', items: ['Genaue Anweisungen', 'Reviews', 'Härtung'] },
      open: { title: 'Das freie Feld', text: 'Im Logo bleibt ein Feld offen. Als Nächstes kommen hier Infrastructure as Code und mehr Dienste fürs Homelab rein.' },
    },
    about: {
      title: 'Wer ich bin',
      personal: [
        'Ich bin 18, komme aus Deutschland und lerne am liebsten, indem ich Dinge baue. Neben Software beschäftige ich mich gern mit Hardware.',
        'Ausgleich finde ich beim Fitness, auf dem Gravelbike und beim Fotografieren.',
      ],
      workTitle: 'Wie ich arbeite',
      work: [
        'Ich baue viel mit Claude Code. Ich lege fest, was entstehen soll, und schreibe die Anweisungen dafür so genau wie möglich. Von der Qualität dieser Anweisungen hängt ab, wie gut das Ergebnis wird.',
        'Härtung und Reviews gehören bei mir fest dazu, damit alles sicher bleibt. Was der Code tut, verstehe ich meistens. Jede Zeile im Detail erklären kann ich noch nicht, und daran arbeite ich.',
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
      text: 'Fragen zu einem Projekt oder Lust, mich kennenzulernen? Ich freue mich über eine Nachricht.',
      email: 'E-Mail',
      github: 'GitHub',
      discord: 'Discord',
    },
    notFound: { title: 'Seite nicht gefunden', text: 'Diese Adresse gibt es hier nicht.', back: 'Zur Startseite' },
  },
  en: {
    meta: {
      title: 'colvex | homelab, automation and systems integration',
      description:
        'Portfolio of colvex: projects in homelab, servers, automation, software and monitoring.',
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
      title: 'My projects',
      intro: 'What I build and have built. Every project lives on my GitHub.',
      hint: 'I build many of these with Claude Code. The goals, structure and review come from me.',
      status: { wip: 'In progress' },
      items: {
        homelab: {
          icon: 'server',
          category: 'Homelab',
          title: 'Server with monitoring and automation',
          summary: 'An Ubuntu server VM running Docker Compose that I set up and run myself.',
          points: [
            'Traefik with its own CA and an IP allowlist, admin interfaces like Portainer and Grafana only through SSH tunnels',
            'Monitoring with Prometheus, Alertmanager, Grafana, Loki and Uptime Kuma',
            'n8n sends short alerts via Telegram and files the details as Gitea issues',
            'Daily backup script, seven days of retention, most images pinned by digest',
          ],
          stack: ['Ubuntu', 'Docker Compose', 'Traefik', 'Prometheus', 'Grafana', 'Loki', 'n8n', 'Gitea'],
        },
        tickets: {
          icon: 'ticket',
          status: 'wip',
          category: 'Full stack',
          title: 'Ticket system for internal IT',
          summary: 'Employees report IT problems in the browser, and the IT team works through them in a shared queue.',
          points: [
            'New tickets are assigned by expertise and workload, with a readable explanation',
            'Roles for employees, IT and admins, real-time updates, email notifications',
            'Login with Argon2id, mandatory 2FA and optional passkeys',
            'Status: stage 1 of 4 is done, the knowledge base, AI assistant and pilot are still open',
          ],
          stack: ['Node.js', 'Fastify', 'TypeScript', 'PostgreSQL', 'React', 'Vite', 'Docker'],
        },
        automation: {
          icon: 'workflow',
          status: 'wip',
          category: 'Automation and AI',
          title: 'Mailbox automation with AI',
          summary: 'Planning and first steps for n8n workflows with Azure OpenAI, plus a dashboard for the departments.',
          points: [
            'One workflow reads the service mailbox, lets the AI classify it against a JSON schema and creates a suggestion',
            'A shadow pilot is planned: nothing goes out, and a person reviews every suggestion',
            'The workflows come from a build script, and an end-to-end test against mocked services passed 31 of 31 checks',
            'Not installed on a VM or in production yet, the dashboard exists as a demo with fictitious data so far',
          ],
          stack: ['n8n', 'Azure OpenAI', 'Microsoft 365', 'PowerShell', 'Docker'],
        },
        colvex: {
          icon: 'globe',
          status: 'wip',
          category: 'Web and operations',
          title: 'colvex',
          summary: 'An earlier project of my own: a bilingual website with a portal, automations and server setup.',
          points: [
            'Website with Astro 7 in German and English, 39 pages',
            'Portal with Fastify, React and mandatory 2FA, 28 API tests run against PostgreSQL in CI, plus Playwright end-to-end tests',
            'Eleven n8n workflows, an Ubuntu 24.04 server baseline, monitoring with a status page',
            'Not online yet: the imprint details are missing, and CI currently fails on the site check and npm audit',
          ],
          stack: ['Astro', 'Fastify', 'PostgreSQL', 'n8n', 'Ansible', 'Gatus'],
        },
        portfolio: {
          icon: 'layout-template',
          category: 'Web',
          title: 'This portfolio',
          summary: 'This website. The code is on GitHub.',
          points: [
            'Static Astro site in English and German, readable without JavaScript',
            'Strict Content Security Policy with no inline code',
            'Public repository with no private data or credentials',
          ],
          stack: ['Astro', 'TypeScript', 'CSS', 'Cloudflare'],
        },
        chromefever: {
          icon: 'gamepad-2',
          status: 'wip',
          category: 'Game development',
          title: 'Chrome Fever',
          summary: 'A cyberpunk shooter, playable as a browser prototype. You fight in a rainy neon night market.',
          points: [
            'Three.js with no build step, a toon look, bloom and controls for desktop and touch',
            'Enemy waves, a boss every fifth wave, three weapons and an upgrade after each wave',
            'Characters, city, sound and music are generated in code, four graphics presets for weaker machines',
          ],
          stack: ['Three.js', 'JavaScript', 'Web Audio'],
        },
        kado: {
          icon: 'palette',
          status: 'wip',
          category: 'Design and tools',
          title: 'Kado',
          summary: 'My own customized Windows 11. So far the visual identity and the pipeline that generates every asset are done.',
          points: [
            'Design tokens as JSON, turned into CSS and graphics',
            'Build scripts in Python and Node.js generate logos, wallpapers and system assets',
            'The ISO build with DISM, an answer file and post-install scripts sits in an open pull request: one build ran through on an earlier state, the VM install test is still open',
          ],
          stack: ['Python', 'Pillow', 'Node.js', 'Playwright', 'PowerShell'],
        },
      },
    },
    skills: {
      title: 'What I can do',
      intro: 'Laid out like my logo. Solid means I use it at work, in my homelab or in projects. Dashed means I am learning it at vocational school or on my own.',
      legend: { practice: 'hands-on', learning: 'school and self-study' },
      cells: {
        network: { title: 'Networking', practice: ['Firewalls with nftables and UFW', 'SSH tunnels'], learning: ['Subnetting', 'VLANs and routing', 'VPN'] },
        linux: { title: 'Linux and servers', practice: ['Ubuntu Server', 'Hardening with fail2ban', 'Grafana, Prometheus, Loki'], learning: ['Virtualisation'] },
        windows: { title: 'Windows and Microsoft', practice: ['Active Directory (on-prem)', 'Microsoft 365 admin center', 'Entra ID', 'Intune'], learning: ['Server roles'] },
        automation: { title: 'Automation', practice: ['n8n', 'Webhooks and schedules', 'Telegram bots', 'Claude API'], learning: [] },
        cloud: { title: 'Containers and cloud', practice: ['Docker and Compose', 'Azure', 'Cloudflare'], learning: [] },
        security: { title: 'Security', practice: ['Kali lab'], learning: ['Pentest tools like nmap and Burp', 'TryHackMe and Hack The Box'] },
        code: { title: 'Code and data', practice: ['Python', 'HTML, CSS and Astro'], learning: ['SQL', 'ER models and normalisation'] },
      },
      center: { title: 'Claude Code', items: ['Precise instructions', 'Reviews', 'Hardening'] },
      open: { title: 'The open cell', text: 'One cell in my logo stays open. Next up: infrastructure as code and more services for my homelab.' },
    },
    about: {
      title: 'Who I am',
      personal: [
        'I am 18, from Germany, and I learn best by building things. Besides software, I like working with hardware.',
        'To balance things out, I do fitness, ride my gravel bike and take photos.',
      ],
      workTitle: 'How I work',
      work: [
        'I build a lot with Claude Code. I decide what should be built and write the instructions as precisely as I can. The quality of those instructions decides how good the result gets.',
        'Hardening and reviews are a fixed part of my process so that everything stays secure. I usually understand what the code does. I cannot yet explain every line in detail, and I am working on that.',
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
      text: 'Questions about a project, or want to get to know me? I am happy to hear from you.',
      email: 'Email',
      github: 'GitHub',
      discord: 'Discord',
    },
    notFound: { title: 'Page not found', text: 'This address does not exist here.', back: 'Back to home' },
  },
};
