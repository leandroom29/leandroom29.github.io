(() => {
  const translations = {
    en: {
      "page.title": "Leandro Orellana — Software Developer",
      "page.description":
        "Leandro Orellana's software development portfolio, focused on mobile apps, backend systems, and artificial intelligence.",
      "bios.aria": "Kalos Systems BIOS",
      "bios.titlebar": "Kalos Systems // BIOS Setup",
      "bios.tagline": "Personal BIOS · Synthwave 84",
      "bios.status": "System status:",
      "bios.poweredOff": "Powered off",
      "bios.languageLabel": "Language",
      "bios.start": "▶ Start system",
      "bios.retry": "Retry startup",
      "bios.continueWithoutAudio": "Continue without audio",
      "bios.startupMessages": "System startup messages",
      "bios.preparing": "Preparing startup",
      "bios.progress": "KalOS startup progress",
      "bios.stageReady": "KALOS BIOS · READY",
      "bios.skip": "Skip startup ↵",
      "bios.noscript": "JavaScript is disabled.",
      "bios.noscriptLink": "Continue to login without animation",
      "boot.powerOnTitle": "POWER ON",
      "boot.powerOnStatus": "Closing power circuit",
      "boot.powerOnStage": "POWER ON",
      "boot.powerOnMessage":
        "Power switch engaged · starting hardware diagnostics",
      "boot.fansTitle": "FANS AND HARD DRIVE",
      "boot.fansStatus": "Spinning up fans · starting HDD",
      "boot.fansStage": "FANS + HDD",
      "boot.fansMessage": "Power supply stable · hard drive motor spinning",
      "boot.floppyTitle": "FLOPPY DRIVE CHECK",
      "boot.floppyStatus": "Checking drive A:",
      "boot.floppyStage": "FLOPPY CHECK",
      "boot.floppyMessage": "BIOS reading floppy drive",
      "boot.postTitle": "POST COMPLETE",
      "boot.postStatus": "Hardware verified · POST OK",
      "boot.postStage": "POST OK",
      "boot.postMessage": "Hardware check passed · beep",
      "boot.diskTitle": "HARD DRIVE READ",
      "boot.diskStatus": "Reading boot sector",
      "boot.diskStage": "BOOT SECTOR",
      "boot.diskMessage": "HDD head reading KALOS.SYS",
      "boot.waitingDisk": "Waiting for disk read to finish",
      "boot.skippedMessage": "Startup manually skipped · opening login",
      "boot.loadedMessage": "KALOS.SYS loaded · login ready",
      "boot.skipped": "Startup skipped",
      "boot.ready": "System ready",
      "boot.readyStage": "KALOS READY",
      "boot.audioError": "Could not play audio/kalos_start.mp3",
      "boot.unsupportedAudio": "unsupported audio format",
      "boot.loadAudioError": "Could not load the audio file",
      "login.aria": "Kalos Systems login",
      "login.subtitle": "Desktop sign-in",
      "login.username": "Username",
      "login.password": "Password",
      "login.signIn": "Sign in",
      "login.quickAccess": "Quick access · fill and sign in",
      "login.invalid": "Invalid credentials. Try quick guest access.",
      "desktop.aria": "Kalos Systems desktop",
      "desktop.label": "Kalos Systems desktop",
      "desktop.fileArea": "Desktop files and folders",
      "desktop.status": "Desktop",
      "desktop.online": "System online",
      "desktop.aboutFile": "About Me.txt",
      "desktop.techFile": "Technologies.txt",
      "desktop.contactFile": "Contact.txt",
      "desktop.projects": "Projects",
      "window.notepad": "Notepad",
      "window.aboutTitle": "About Me.txt — Notepad",
      "window.aboutClose": "Close About Me window",
      "about.greeting": "Hi, I'm Leandro.",
      "about.paragraph1":
        "I'm a Spanish developer focused on mobile applications, backend systems, and data-driven solutions.",
      "about.paragraph2":
        "I work with Kotlin, Flutter, and Python. I'm interested in building scalable products that turn complex ideas into simple experiences.",
      "about.paragraph3":
        "I also explore Java, C#, Docker, Android, and machine learning tools.",
      "window.techTitle": "Technologies.txt — Notepad",
      "window.techClose": "Close Technologies window",
      "tech.heading": "Languages and technologies",
      "tech.languages": "Languages",
      "tech.mobile": "Mobile development",
      "tech.tools": "Tools",
      "tech.interests": "Areas of interest",
      "window.contactTitle": "Contact.txt — Notepad",
      "window.contactClose": "Close Contact window",
      "contact.greeting": "Let's connect.",
      "contact.intro":
        "I'm open to conversations about projects, technology, and new opportunities.",
      "window.projectsTitle": "Projects — File Explorer",
      "window.projectsClose": "Close Projects folder",
      "projects.heading": "My projects",
      "projects.intro": "Open an application to view its details.",
      "projects.aria": "Project applications",
      "window.application": "Application",
      "window.applicationClose": "Close application",
      "project.languages": "Languages and technologies",
      "project.repository": "Open GitHub repository ↗",
      "project.unpublished": "The repository hasn't been published yet.",
      "window.consoleTitle": "kalgrid_cmd.exe — KalGrid Console",
      "window.consoleClose": "Close command console",
      "console.output": "Console output",
      "console.returnHelp": "Press Ctrl + C to return to KalGrid CMD.",
      "console.command": "Command",
      "start.aria": "System applications",
      "start.heading": "Applications",
      "start.console": "Command console",
      "start.settings": "System settings",
      "settings.windowTitle": "settings.exe — System Settings",
      "settings.close": "Close system settings",
      "settings.kicker": "KALOS // DEVICE CONFIGURATION",
      "settings.heading": "System information",
      "settings.description": "Hardware resources assigned to this workstation.",
      "settings.device": "Workstation",
      "settings.deviceValue": "Kalos Neonwave N-84",
      "settings.processor": "Processor",
      "settings.processorValue": "AetherCore Prism X8 · 16 cores / 32 threads · up to 5.2 GHz",
      "settings.memory": "Installed memory",
      "settings.memoryValue": "32 GB · 2 × 16 GB Chromaflux DDR5-6000",
      "settings.availableMemory": "Memory available to KalOS",
      "settings.availableMemoryValue": "31.7 GB usable · 0.3 GB reserved for system hardware",
      "settings.graphics": "Graphics",
      "settings.graphicsValue": "NeonDrive Aurora 16 · 16 GB GDDR6X",
      "settings.storage": "Storage",
      "settings.storageValue": "2 TB · Hyperion Pulse NVMe Gen 5",
      "settings.mainboard": "Mainboard",
      "settings.mainboardValue": "Kalos Starforge Z84 · LumenLink 5.0",
      "settings.network": "Network",
      "settings.networkValue": "Etherwave 10 GbE · SynthFi 7",
      "settings.operatingSystem": "Operating system",
      "settings.operatingSystemValue": "KalOS 84 · Build 1984.10",
      "settings.note": "Simulated workstation specifications · Kalos Systems asset profile",
      "taskbar.openMenu": "Open applications menu",
      "taskbar.openWindows": "Open windows",
      "taskbar.label": "Kalos Systems · Desktop",
      "taskbar.show": "Show {title}",
      "project.open": "Open {name}.exe",
      "project.aerythionDescription":
        "Una plataforma académica de análisis de la calidad del aire urbano. El proyecto combina un flujo de trabajo por lotes de Apache Spark, modelos de scikit-learn, un servicio FastAPI, almacenamiento en PostgreSQL, captación de datos del IoT y un panel de control web que se actualiza mediante Server-Sent Events (SSE).",
      "project.signengineDescription":
        "SignEngine is a secure PDF signing and document-exchange project built around a Java desktop client, a transport/security protocol layer, and a Spring Boot document server.",
      "file.aboutHeading": "ABOUT ME",
      "file.aboutGreeting": "Hi, I'm Leandro.",
      "file.about1":
        "I'm a Spanish developer focused on mobile applications, backend systems, and data-driven solutions.",
      "file.about2":
        "I work with Kotlin, Flutter, and Python. I'm interested in building scalable products that turn complex ideas into simple experiences.",
      "file.about3":
        "I also explore Java, C#, Docker, Android, and machine learning tools.",
      "file.techHeading": "LANGUAGES AND TECHNOLOGIES",
      "file.techLanguages": "Languages: Kotlin, Python, Java, C#",
      "file.techMobile": "Mobile development: Flutter, Android",
      "file.techTools": "Tools: Docker, Git",
      "file.techInterests": "Areas of interest: Machine Learning, Backend",
      "file.contactHeading": "CONTACT",
      "file.email": "Email: lorellana.dev@gmail.com",
      "file.github": "GitHub: https://github.com/leandroom29",
      "file.linkedin":
        "LinkedIn: https://www.linkedin.com/in/leandro-orellana-martos-2998a1331/",
      "cmd.alreadyRunning": "KalGrid CMD is already running.",
      "cmd.launching": "Launching {name}.exe...",
      "cmd.helpTitle": "Available commands:",
      "cmd.helpCd":
        "  cd <path>       Change directory (relative and absolute paths supported).",
      "cmd.helpLs": "  ls [path]       List files and folders.",
      "cmd.helpSkan":
        "  skan <file>     Display a .txt file; press Ctrl+C to return to the console.",
      "cmd.helpExe": "  <name>.exe      Launch a Kalos application.",
      "cmd.helpPwd": "  pwd             Show the current directory.",
      "cmd.helpClear": "  clear           Clear the console.",
      "cmd.usageClear": "Usage: clear",
      "cmd.usagePwd": "Usage: pwd",
      "cmd.usageCd": "Usage: cd <path>",
      "cmd.notFoundDirectory": "Directory or drive not found: {path}",
      "cmd.usageLs": "Usage: ls [path]",
      "cmd.emptyDirectory": "(empty directory)",
      "cmd.usageSkan": "Usage: skan <file.txt>",
      "cmd.fileNotFound": ".txt file not found: {path}",
      "cmd.executableNotFound":
        "Executable not found or path unavailable: {path}",
      "cmd.notExecutable": "{path} is not an executable file.",
      "cmd.notRecognized":
        "Command not recognized: {command}. Type help to see available commands.",
      "cmd.welcome":
        "Kalos Systems virtual console. Type help to see available commands.",
    },
    es: {
      "page.title": "Leandro Orellana — Desarrollador de software",
      "page.description":
        "Portfolio de desarrollo de software de Leandro Orellana, centrado en aplicaciones móviles, sistemas backend e inteligencia artificial.",
      "bios.aria": "BIOS de Kalos Systems",
      "bios.titlebar": "Kalos Systems // Configuración de BIOS",
      "bios.tagline": "BIOS personal · Synthwave 84",
      "bios.status": "Estado del sistema:",
      "bios.poweredOff": "Apagado",
      "bios.languageLabel": "Idioma",
      "bios.start": "▶ Iniciar sistema",
      "bios.retry": "Reintentar arranque",
      "bios.continueWithoutAudio": "Continuar sin audio",
      "bios.startupMessages": "Mensajes de inicio del sistema",
      "bios.preparing": "Preparando el arranque",
      "bios.progress": "Progreso de inicio de KalOS",
      "bios.stageReady": "KALOS BIOS · LISTO",
      "bios.skip": "Omitir arranque ↵",
      "bios.noscript": "JavaScript está desactivado.",
      "bios.noscriptLink": "Continuar al inicio de sesión sin animación",
      "boot.powerOnTitle": "ENCENDIDO",
      "boot.powerOnStatus": "Cerrando circuito de alimentación",
      "boot.powerOnStage": "ENCENDIDO",
      "boot.powerOnMessage":
        "Interruptor activado · iniciando diagnóstico del hardware",
      "boot.fansTitle": "VENTILADORES Y DISCO DURO",
      "boot.fansStatus": "Arrancando ventiladores · iniciando HDD",
      "boot.fansStage": "VENTILADORES + HDD",
      "boot.fansMessage": "Fuente estable · motor del disco duro en marcha",
      "boot.floppyTitle": "COMPROBACIÓN DE DISQUETERA",
      "boot.floppyStatus": "Comprobando unidad A:",
      "boot.floppyStage": "COMPROBACIÓN DE DISQUETERA",
      "boot.floppyMessage": "La BIOS está leyendo la disquetera",
      "boot.postTitle": "POST COMPLETADO",
      "boot.postStatus": "Hardware verificado · POST correcto",
      "boot.postStage": "POST CORRECTO",
      "boot.postMessage": "Comprobación de hardware superada · pitido",
      "boot.diskTitle": "LECTURA DEL DISCO DURO",
      "boot.diskStatus": "Leyendo sector de arranque",
      "boot.diskStage": "SECTOR DE ARRANQUE",
      "boot.diskMessage": "El cabezal del HDD está leyendo KALOS.SYS",
      "boot.waitingDisk": "Esperando a que termine la lectura del disco",
      "boot.skippedMessage":
        "Arranque omitido manualmente · abriendo inicio de sesión",
      "boot.loadedMessage": "KALOS.SYS cargado · inicio de sesión listo",
      "boot.skipped": "Arranque omitido",
      "boot.ready": "Sistema listo",
      "boot.readyStage": "KALOS LISTO",
      "boot.audioError": "No se pudo reproducir audio/kalos_start.mp3",
      "boot.unsupportedAudio": "formato de audio no compatible",
      "boot.loadAudioError": "No se pudo cargar el archivo de audio",
      "login.aria": "Inicio de sesión de Kalos Systems",
      "login.subtitle": "Inicio de sesión del escritorio",
      "login.username": "Usuario",
      "login.password": "Contraseña",
      "login.signIn": "Iniciar sesión",
      "login.quickAccess": "Acceso rápido · completar e iniciar sesión",
      "login.invalid":
        "Credenciales incorrectas. Prueba el acceso rápido de invitado.",
      "desktop.aria": "Escritorio de Kalos Systems",
      "desktop.label": "Escritorio de Kalos Systems",
      "desktop.fileArea": "Archivos y carpetas del escritorio",
      "desktop.status": "Escritorio",
      "desktop.online": "Sistema en línea",
      "desktop.aboutFile": "Sobre mí.txt",
      "desktop.techFile": "Tecnologías.txt",
      "desktop.contactFile": "Contacto.txt",
      "desktop.projects": "Proyectos",
      "window.notepad": "Bloc de notas",
      "window.aboutTitle": "Sobre mí.txt — Bloc de notas",
      "window.aboutClose": "Cerrar ventana Sobre mí",
      "about.greeting": "Hola, soy Leandro.",
      "about.paragraph1":
        "Soy un desarrollador español centrado en aplicaciones móviles, sistemas backend y soluciones basadas en datos.",
      "about.paragraph2":
        "Trabajo con Kotlin, Flutter y Python. Me interesa crear productos escalables que conviertan ideas complejas en experiencias sencillas.",
      "about.paragraph3":
        "También exploro Java, C#, Docker, Android y herramientas de aprendizaje automático.",
      "window.techTitle": "Tecnologías.txt — Bloc de notas",
      "window.techClose": "Cerrar ventana Tecnologías",
      "tech.heading": "Lenguajes y tecnologías",
      "tech.languages": "Lenguajes",
      "tech.mobile": "Desarrollo móvil",
      "tech.tools": "Herramientas",
      "tech.interests": "Áreas de interés",
      "window.contactTitle": "Contacto.txt — Bloc de notas",
      "window.contactClose": "Cerrar ventana Contacto",
      "contact.greeting": "Conectemos.",
      "contact.intro":
        "Estoy abierto a conversar sobre proyectos, tecnología y nuevas oportunidades.",
      "window.projectsTitle": "Proyectos — Explorador de archivos",
      "window.projectsClose": "Cerrar carpeta Proyectos",
      "projects.heading": "Mis proyectos",
      "projects.intro": "Abre una aplicación para ver sus detalles.",
      "projects.aria": "Aplicaciones de proyectos",
      "window.application": "Aplicación",
      "window.applicationClose": "Cerrar aplicación",
      "project.languages": "Lenguajes y tecnologías",
      "project.repository": "Abrir repositorio de GitHub ↗",
      "project.unpublished": "El repositorio aún no se ha publicado.",
      "window.consoleTitle": "kalgrid_cmd.exe — Consola KalGrid",
      "window.consoleClose": "Cerrar consola de comandos",
      "console.output": "Salida de la consola",
      "console.returnHelp": "Pulsa Ctrl + C para volver a KalGrid CMD.",
      "console.command": "Comando",
      "start.aria": "Aplicaciones del sistema",
      "start.heading": "Aplicaciones",
      "start.console": "Consola de comandos",
      "start.settings": "Configuración del sistema",
      "settings.windowTitle": "settings.exe — Configuración del sistema",
      "settings.close": "Cerrar configuración del sistema",
      "settings.kicker": "KALOS // CONFIGURACIÓN DEL EQUIPO",
      "settings.heading": "Información del equipo",
      "settings.description": "Recursos de hardware asignados a esta estación de trabajo.",
      "settings.device": "Estación de trabajo",
      "settings.deviceValue": "Kalos Neonwave N-84",
      "settings.processor": "Procesador",
      "settings.processorValue": "AetherCore Prism X8 · 16 núcleos / 32 hilos · hasta 5,2 GHz",
      "settings.memory": "Memoria instalada",
      "settings.memoryValue": "32 GB · 2 × 16 GB Chromaflux DDR5-6000",
      "settings.availableMemory": "Memoria disponible para KalOS",
      "settings.availableMemoryValue": "31,7 GB utilizables · 0,3 GB reservados para el hardware del sistema",
      "settings.graphics": "Gráficos",
      "settings.graphicsValue": "NeonDrive Aurora 16 · 16 GB GDDR6X",
      "settings.storage": "Almacenamiento",
      "settings.storageValue": "2 TB · Hyperion Pulse NVMe Gen 5",
      "settings.mainboard": "Placa base",
      "settings.mainboardValue": "Kalos Starforge Z84 · LumenLink 5.0",
      "settings.network": "Red",
      "settings.networkValue": "Etherwave 10 GbE · SynthFi 7",
      "settings.operatingSystem": "Sistema operativo",
      "settings.operatingSystemValue": "KalOS 84 · Compilación 1984.10",
      "settings.note": "Especificaciones simuladas · Perfil de equipo de Kalos Systems",
      "taskbar.openMenu": "Abrir menú de aplicaciones",
      "taskbar.openWindows": "Ventanas abiertas",
      "taskbar.label": "Kalos Systems · Escritorio",
      "taskbar.show": "Mostrar {title}",
      "project.open": "Abrir {name}.exe",
      "project.aerythionDescription":
        "Cliente móvil para controlar dispositivos Android de forma remota. Aplicación complementaria del proyecto Dominion.",
      "project.signengineDescription":
        "SignEngine es un proyecto de firma segura de archivos PDF e intercambio de documentos basado en un cliente de escritorio Java, una capa de protocolo de transporte y seguridad, y un servidor de documentos Spring Boot.",
      "file.aboutHeading": "SOBRE MÍ",
      "file.aboutGreeting": "Hola, soy Leandro.",
      "file.about1":
        "Soy un desarrollador español centrado en aplicaciones móviles, sistemas backend y soluciones basadas en datos.",
      "file.about2":
        "Trabajo con Kotlin, Flutter y Python. Me interesa crear productos escalables que conviertan ideas complejas en experiencias sencillas.",
      "file.about3":
        "También exploro Java, C#, Docker, Android y herramientas de aprendizaje automático.",
      "file.techHeading": "LENGUAJES Y TECNOLOGÍAS",
      "file.techLanguages": "Lenguajes: Kotlin, Python, Java, C#",
      "file.techMobile": "Desarrollo móvil: Flutter, Android",
      "file.techTools": "Herramientas: Docker, Git",
      "file.techInterests": "Áreas de interés: Aprendizaje automático, backend",
      "file.contactHeading": "CONTACTO",
      "file.email": "Correo: lorellana.dev@gmail.com",
      "file.github": "GitHub: https://github.com/leandroom29",
      "file.linkedin":
        "LinkedIn: https://www.linkedin.com/in/leandro-orellana-martos-2998a1331/",
      "cmd.alreadyRunning": "KalGrid CMD ya está en ejecución.",
      "cmd.launching": "Iniciando {name}.exe...",
      "cmd.helpTitle": "Comandos disponibles:",
      "cmd.helpCd":
        "  cd <ruta>       Cambia de directorio (admite rutas relativas y absolutas).",
      "cmd.helpLs": "  ls [ruta]       Muestra archivos y carpetas.",
      "cmd.helpSkan":
        "  skan <archivo>  Muestra un archivo .txt; pulsa Ctrl+C para volver a la consola.",
      "cmd.helpExe": "  <nombre>.exe    Inicia una aplicación de Kalos.",
      "cmd.helpPwd": "  pwd             Muestra el directorio actual.",
      "cmd.helpClear": "  clear           Limpia la consola.",
      "cmd.usageClear": "Uso: clear",
      "cmd.usagePwd": "Uso: pwd",
      "cmd.usageCd": "Uso: cd <ruta>",
      "cmd.notFoundDirectory":
        "No se encontró el directorio o la unidad: {path}",
      "cmd.usageLs": "Uso: ls [ruta]",
      "cmd.emptyDirectory": "(directorio vacío)",
      "cmd.usageSkan": "Uso: skan <archivo.txt>",
      "cmd.fileNotFound": "No se encontró el archivo .txt: {path}",
      "cmd.executableNotFound":
        "No se encontró el ejecutable o la ruta no está disponible: {path}",
      "cmd.notExecutable": "{path} no es un archivo ejecutable.",
      "cmd.notRecognized":
        "Comando no reconocido: {command}. Escribe help para ver los comandos disponibles.",
      "cmd.welcome":
        "Consola virtual de Kalos Systems. Escribe help para ver los comandos disponibles.",
    },
  };

  const storageKey = "kalos-language";
  const supportedLanguages = ["en", "es"];
  const queryLanguage = new URLSearchParams(window.location.search).get("lang");
  const storedLanguage = window.localStorage.getItem(storageKey);
  let language = supportedLanguages.includes(queryLanguage)
    ? queryLanguage
    : supportedLanguages.includes(storedLanguage)
      ? storedLanguage
      : "en";

  function translate(key, values = {}) {
    const template = translations[language][key] || translations.en[key] || key;
    return template.replace(/\{(\w+)\}/g, (_, name) =>
      String(values[name] ?? ""),
    );
  }

  function applyLanguage() {
    document.documentElement.lang = language;
    document.title = translate("page.title");
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = translate("page.description");
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      element.textContent = translate(element.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
      element.setAttribute("aria-label", translate(element.dataset.i18nAria));
    });
    const selector = document.querySelector(".language-select");
    if (selector) selector.value = language;
  }

  function setLanguage(nextLanguage) {
    if (!supportedLanguages.includes(nextLanguage)) return;
    language = nextLanguage;
    window.localStorage.setItem(storageKey, language);
    applyLanguage();
    window.dispatchEvent(
      new CustomEvent("kalos-languagechange", { detail: { language } }),
    );
  }

  applyLanguage();
  window.KalosI18n = {
    get language() {
      return language;
    },
    t: translate,
    setLanguage,
  };
})();
