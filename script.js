/**
 * BIODATA PORTFOLIO STUDIO - REALTIME ENGINE (BENTO EDITION)
 * Pure Vanilla JavaScript (ES6+) - 100% Client-Side
 * No Python, No Frameworks, No Backend Required.
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'portfolio_studio_bento_v3';

  // High quality silhouette avatar SVG Data URI
  const DEFAULT_AVATAR_SVG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 160'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%236366F1'/%3E%3Cstop offset='100%25' stop-color='%238B5CF6'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='160' height='160' fill='%23EEF2FF'/%3E%3Ccircle cx='80' cy='62' r='30' fill='url(%23grad)' opacity='0.9'/%3E%3Cpath d='M25 142 C 25 108, 52 98, 80 98 C 108 98, 135 108, 135 142 Z' fill='url(%23grad)' opacity='0.9'/%3E%3C/svg%3E";

  // Initial High-End Bento Portfolio Data
  const INITIAL_PORTFOLIO_DATA = {
    theme: 'light',
    accent: 'indigo',
    fullname: 'Arni Yuniarni',
    role: 'Mahasiswa Teknik Informatika',
    location: 'Bekasi, Indonesia',
    statusBadge: 'Terbuka untuk Kerja & Kolaborasi',
    bio: 'Mahasiswa Teknik Informatika yang antusias di bidang Web Development dan UI/UX Design. Berdedikasi untuk merancang antarmuka aplikasi yang estetis, responsif, dan memberikan pengalaman pengguna yang optimal.',
    photo: DEFAULT_AVATAR_SVG,

    // Bento Metrics
    stat1Val: '3.86',
    stat1Lbl: 'IPK Kumulatif',
    stat2Val: '3+',
    stat2Lbl: 'Proyek Selesai',
    stat3Val: '6+',
    stat3Lbl: 'Tahun Pengalaman',
    stat4Val: '100%',
    stat4Lbl: 'Komitmen Kualitas',

    // Skills
    skills: [
      'React.js',
      'TypeScript',
      'Node.js & Express',
      'UI/UX Figma',
      'TailwindCSS',
      'RESTful APIs',
      'Python',
      'PostgreSQL',
      'Next.js',
      'Git & CI/CD'
    ],

    // Featured Projects
    projects: [
      {
        id: 1,
        title: 'EduPulse - Smart Learning Management System',
        category: 'EdTech & Web App',
        description: 'Platform manajemen pembelajaran interaktif terintegrasi dengan modul kuis real-time, analitik nilai otomatis, dan antarmuka gamifikasi.',
        tags: ['React.js', 'Node.js', 'PostgreSQL', 'TailwindCSS'],
        demoUrl: 'https://example.com/edupulse',
        githubUrl: 'https://github.com/arniyuniarni/edupulse',
        gradient: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)'
      },
      {
        id: 2,
        title: 'FinTrack - Glassmorphic Financial Matrix',
        category: 'Fintech & Dashboard',
        description: 'Dashboard finansial berbasis glassmorphism untuk memantau arus kas, visualisasi grafik pengeluaran bulanan, dan estimasi budget otomatis.',
        tags: ['TypeScript', 'Chart.js', 'Vanilla CSS', 'REST API'],
        demoUrl: 'https://example.com/fintrack',
        githubUrl: 'https://github.com/arniyuniarni/fintrack',
        gradient: 'linear-gradient(135deg, #0284C7 0%, #0D9488 100%)'
      },
      {
        id: 3,
        title: 'Aura UI - Accessible Design System',
        category: 'Design System & Open Source',
        description: 'Kumpulan komponen UI ramah aksesibilitas dengan dukungan micro-animations, mode gelap otomatis, dan dokumentasi interaktif lengkap.',
        tags: ['Figma', 'CSS Architecture', 'Accessibility', 'Tokens'],
        demoUrl: 'https://example.com/auraui',
        githubUrl: 'https://github.com/arniyuniarni/auraui',
        gradient: 'linear-gradient(135deg, #E11D48 0%, #F43F5E 100%)'
      }
    ],

    // Timeline
    timeline: [
      {
        id: 1,
        role: 'Operator Produksi',
        institution: 'PT Denso Indonesia',
        period: '2021 - 2023',
        description: 'Melakukan perakitan komponen otomotif dengan menjaga kualitas dan standar perusahaan.'
      },
      {
        id: 2,
        role: 'Operator Produksi',
        institution: 'PT Katolec Indonesia',
        period: '2024 - Sekarang',
        description: 'Melakukan perakitan komponen elektronik dengan menjaga kualitas dan standar perusahaan.'
      },
      {
        id: 3,
        role: 'S1 Teknik Informatika',
        institution: 'Universitas Pelita Bangsa',
        period: '2024 - Sekarang',
        description: 'Fokus pada Kecerdasan Buatan, Machine Learning, dan Algoritma. IPK berjalan 3.86/4.00.'
      }
    ],

    // Contact
    email: 'arniyuniarnie442@gmail.com',
    whatsapp: '+6285679722433',
    github: 'https://github.com/arnyynarn',
    linkedin: 'https://www.linkedin.com/in/arni-yuniarni-0ba845198',
    website: 'https://arniyuniarni.github.io/'
  };

  // State
  let portfolioData = JSON.parse(JSON.stringify(INITIAL_PORTFOLIO_DATA));
  let autosaveTimer = null;
  let typewriterTimer = null;
  let currentTargetRole = '';

  // ==========================================================================
  // 1. DOM REFERENCES
  // ==========================================================================

  const workspace = document.getElementById('studio-workspace');
  const btnToggleView = document.getElementById('btn-toggle-view');
  const toggleViewText = document.getElementById('toggle-view-text');
  const btnThemeToggle = document.getElementById('btn-theme-toggle');
  const themeIconSun = document.getElementById('theme-icon-sun');
  const themeIconMoon = document.getElementById('theme-icon-moon');
  const accentDots = document.querySelectorAll('.accent-dot');
  const saveStatusPill = document.getElementById('save-status-pill');
  const saveStatusText = document.getElementById('save-status-text');
  const appControlBar = document.querySelector('.app-control-bar');
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileNavPanel = document.getElementById('mobile-nav-panel');
  const mobileViewText = document.getElementById('mobile-view-text');

  const btnExportHtml = document.getElementById('btn-export-html');
  const btnPrintCv = document.getElementById('btn-print-cv');
  const btnResetData = document.getElementById('btn-reset-data');

  // Editor Inputs
  const inputFullname = document.getElementById('input-fullname');
  const inputRole = document.getElementById('input-role');
  const inputLocation = document.getElementById('input-location');
  const inputStatusBadge = document.getElementById('input-status-badge');
  const inputBio = document.getElementById('input-bio');

  const photoFileInput = document.getElementById('photo-file-input');
  const editorAvatarImg = document.getElementById('editor-avatar-img');
  const btnUploadAvatar = document.getElementById('btn-upload-avatar');
  const btnRemoveAvatar = document.getElementById('btn-remove-avatar');

  // Stats Inputs
  const inputStat1Val = document.getElementById('input-stat-1-val');
  const inputStat1Lbl = document.getElementById('input-stat-1-lbl');
  const inputStat2Val = document.getElementById('input-stat-2-val');
  const inputStat2Lbl = document.getElementById('input-stat-2-lbl');
  const inputStat3Val = document.getElementById('input-stat-3-val');
  const inputStat3Lbl = document.getElementById('input-stat-3-lbl');
  const inputStat4Val = document.getElementById('input-stat-4-val');
  const inputStat4Lbl = document.getElementById('input-stat-4-lbl');

  // Skills
  const skillsTagList = document.getElementById('skills-tag-list');
  const skillInputField = document.getElementById('skill-input');
  const quickSkillChips = document.querySelectorAll('.quick-skills-suggest .btn-chip');

  // Dynamic Lists Editor
  const projectsEditorList = document.getElementById('projects-editor-list');
  const btnAddProject = document.getElementById('btn-add-project');
  const timelineEditorList = document.getElementById('timeline-editor-list');
  const btnAddTimeline = document.getElementById('btn-add-timeline');

  // Contact Inputs
  const inputEmail = document.getElementById('input-email');
  const inputWhatsapp = document.getElementById('input-whatsapp');
  const inputGithub = document.getElementById('input-github');
  const inputLinkedin = document.getElementById('input-linkedin');
  const inputWebsite = document.getElementById('input-website');

  // Live Bento Preview Elements
  const pDisplayAvatar = document.getElementById('p-display-avatar');
  const pDisplayStatus = document.getElementById('p-display-status');
  const pDisplayLocation = document.getElementById('p-display-location');
  const pDisplayName = document.getElementById('p-display-name');
  const pDisplayRole = document.getElementById('p-display-role');
  const pDisplayBio = document.getElementById('p-display-bio');
  const pCtaContact = document.getElementById('p-cta-contact');
  const pDisplaySocials = document.getElementById('p-display-socials');

  const pDisplayStat1Val = document.getElementById('p-display-stat-1-val');
  const pDisplayStat1Lbl = document.getElementById('p-display-stat-1-lbl');
  const pDisplayStat2Val = document.getElementById('p-display-stat-2-val');
  const pDisplayStat2Lbl = document.getElementById('p-display-stat-2-lbl');
  const pDisplayStat3Val = document.getElementById('p-display-stat-3-val');
  const pDisplayStat3Lbl = document.getElementById('p-display-stat-3-lbl');
  const pDisplayStat4Val = document.getElementById('p-display-stat-4-val');
  const pDisplayStat4Lbl = document.getElementById('p-display-stat-4-lbl');

  const pDisplaySkills = document.getElementById('p-display-skills');
  const pDisplayProjects = document.getElementById('p-display-projects');
  const pDisplayTimeline = document.getElementById('p-display-timeline');

  const pDisplayContactEmail = document.getElementById('p-display-contact-email');
  const pTextEmail = document.getElementById('p-text-email');
  const pDisplayContactWa = document.getElementById('p-display-contact-wa');
  const pTextWa = document.getElementById('p-text-wa');

  const toastContainer = document.getElementById('toast-container');

  // ==========================================================================
  // 2. TOAST NOTIFICATION SYSTEM
  // ==========================================================================

  function showToast(title, message, icon = '✦', duration = 3200) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <div class="toast-content">
        <div class="toast-title">${escapeHtml(title)}</div>
        <div class="toast-msg">${escapeHtml(message)}</div>
      </div>
    `;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-hide');
      setTimeout(() => toast.remove(), 350);
    }, duration);
  }

  function escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/[&<>"']/g, function (m) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m];
    });
  }

  // ==========================================================================
  // 3. THEME & ACCENT MANAGEMENT
  // ==========================================================================

  function setAccentColor(colorName) {
    portfolioData.accent = colorName;
    document.body.setAttribute('data-accent', colorName);

    accentDots.forEach((dot) => {
      if (dot.getAttribute('data-color') === colorName) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    scheduleAutosave();
  }

  function toggleThemeMode() {
    const currentTheme = document.body.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyThemeMode(nextTheme);
    scheduleAutosave();
  }

  function applyThemeMode(theme) {
    portfolioData.theme = theme;
    document.body.setAttribute('data-theme', theme);

    if (theme === 'dark') {
      themeIconSun.classList.add('hidden');
      themeIconMoon.classList.remove('hidden');
    } else {
      themeIconSun.classList.remove('hidden');
      themeIconMoon.classList.add('hidden');
    }
  }

  // ==========================================================================
  // 4. REALTIME DATA SYNC & BENTO PREVIEW RENDERING
  // ==========================================================================

  function updatePreview() {
    // 1. Hero Content
    pDisplayName.textContent = portfolioData.fullname || 'Nama Anda';

    // Typewriter effect for role
    const targetRole = portfolioData.role || 'Profesi & Minat Utama';
    if (currentTargetRole !== targetRole) {
      currentTargetRole = targetRole;
      pDisplayRole.textContent = '';
      clearTimeout(typewriterTimer);

      let charIndex = 0;
      function typeNextChar() {
        if (charIndex < targetRole.length) {
          pDisplayRole.textContent += targetRole.charAt(charIndex);
          charIndex++;
          typewriterTimer = setTimeout(typeNextChar, 40 + Math.random() * 40); // 40-80ms per char
        }
      }
      typeNextChar();
    }
    pDisplayLocation.textContent = portfolioData.location || 'Lokasi';
    pDisplayStatus.textContent = portfolioData.statusBadge || 'Tersedia';
    pDisplayBio.textContent = portfolioData.bio || 'Tuliskan ringkasan profil Anda...';

    // Avatar
    const avatarSrc = portfolioData.photo || DEFAULT_AVATAR_SVG;
    pDisplayAvatar.src = avatarSrc;
    editorAvatarImg.src = avatarSrc;

    // Contact in Hero CTA
    if (portfolioData.whatsapp) {
      const cleanWa = portfolioData.whatsapp.replace(/\D/g, '');
      pCtaContact.href = `https://wa.me/${cleanWa}`;
    } else if (portfolioData.email) {
      pCtaContact.href = `mailto:${portfolioData.email}`;
    } else {
      pCtaContact.href = '#p-contact';
    }

    // Social Pills
    renderSocialPills();

    // 2. Bento Metrics
    pDisplayStat1Val.textContent = portfolioData.stat1Val || '0';
    pDisplayStat1Lbl.textContent = portfolioData.stat1Lbl || 'Metrik 1';
    pDisplayStat2Val.textContent = portfolioData.stat2Val || '0';
    pDisplayStat2Lbl.textContent = portfolioData.stat2Lbl || 'Metrik 2';
    pDisplayStat3Val.textContent = portfolioData.stat3Val || '0';
    pDisplayStat3Lbl.textContent = portfolioData.stat3Lbl || 'Metrik 3';
    pDisplayStat4Val.textContent = portfolioData.stat4Val || '0';
    pDisplayStat4Lbl.textContent = portfolioData.stat4Lbl || 'Metrik 4';

    // 3. Skills Cloud
    renderSkillsPreview();

    // 4. Projects Modern Grid
    renderProjectsPreview();

    // 5. Timeline Flow
    renderTimelinePreview();

    // 6. Contact Section
    pTextEmail.textContent = portfolioData.email || 'belum-diisi@email.com';
    pDisplayContactEmail.href = `mailto:${portfolioData.email || ''}`;

    pTextWa.textContent = portfolioData.whatsapp || '+62 ...';
    const cleanWaOnly = (portfolioData.whatsapp || '').replace(/\D/g, '');
    pDisplayContactWa.href = cleanWaOnly ? `https://wa.me/${cleanWaOnly}` : '#';

    scheduleAutosave();
  }

  function renderSocialPills() {
    pDisplaySocials.innerHTML = '';

    const socials = [
      { key: 'github', label: 'GitHub', icon: '⚡' },
      { key: 'linkedin', label: 'LinkedIn', icon: '💼' },
      { key: 'website', label: 'Website', icon: '🌐' }
    ];

    socials.forEach(({ key, label, icon }) => {
      const url = portfolioData[key];
      if (url && url.trim().length > 0) {
        const a = document.createElement('a');
        a.className = 'social-glass-pill';
        a.href = url.startsWith('http') ? url : `https://${url}`;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.innerHTML = `<span>${icon}</span> <span>${label}</span>`;
        pDisplaySocials.appendChild(a);
      }
    });
  }

  function renderSkillsPreview() {
    pDisplaySkills.innerHTML = '';
    portfolioData.skills.forEach((skill) => {
      const pill = document.createElement('div');
      pill.className = 'skill-pill-modern';
      pill.innerHTML = `<span class="skill-live-dot"></span><span>${escapeHtml(skill)}</span>`;
      pDisplaySkills.appendChild(pill);
    });
  }

  function renderProjectsPreview() {
    pDisplayProjects.innerHTML = '';
    if (!portfolioData.projects || portfolioData.projects.length === 0) {
      pDisplayProjects.innerHTML = '<p style="color:var(--text-muted);font-size:0.9rem;">Belum ada proyek yang ditambahkan.</p>';
      return;
    }

    portfolioData.projects.forEach((proj) => {
      const card = document.createElement('div');
      card.className = 'project-card-modern';

      const tagHtml = (proj.tags || []).map(t => `<span class="tech-tag-pill">${escapeHtml(t)}</span>`).join('');

      const demoBtn = proj.demoUrl
        ? `<a href="${escapeHtml(proj.demoUrl)}" target="_blank" rel="noopener noreferrer" class="btn-project-link">
             <span>Live Demo</span>
             <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
           </a>`
        : '';

      const gitBtn = proj.githubUrl
        ? `<a href="${escapeHtml(proj.githubUrl)}" target="_blank" rel="noopener noreferrer" class="btn-project-link">
             <span>Source Code</span>
             <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
           </a>`
        : '';

      card.innerHTML = `
        <div class="project-banner-modern" style="background:${proj.gradient || 'linear-gradient(135deg, var(--accent) 0%, #7C3AED 100%)'}">
          <svg class="project-banner-pattern" viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <circle cx="50" cy="50" r="40" stroke-width="2"></circle>
            <polygon points="50,20 80,75 20,75" stroke-width="2"></polygon>
          </svg>
          <span class="project-badge-type">${escapeHtml(proj.category || 'Proyek')}</span>
        </div>
        <div class="project-body-modern">
          <h3 class="project-title-modern">${escapeHtml(proj.title || 'Judul Proyek')}</h3>
          <p class="project-desc-modern">${escapeHtml(proj.description || 'Deskripsi inovasi dan fitur proyek...')}</p>
          <div class="project-tech-tags">${tagHtml}</div>
          <div class="project-footer-links">
            ${demoBtn}
            ${gitBtn}
          </div>
        </div>
      `;
      pDisplayProjects.appendChild(card);
    });
  }

  function renderTimelinePreview() {
    pDisplayTimeline.innerHTML = '';
    if (!portfolioData.timeline || portfolioData.timeline.length === 0) {
      pDisplayTimeline.innerHTML = '<p style="color:var(--text-muted);font-size:0.9rem;">Belum ada riwayat yang ditambahkan.</p>';
      return;
    }

    portfolioData.timeline.forEach((item) => {
      const node = document.createElement('div');
      node.className = 'timeline-modern-node';
      node.innerHTML = `
        <div class="timeline-pulse-node"></div>
        <div class="timeline-glass-card">
          <div class="timeline-card-top">
            <span class="timeline-role-text">${escapeHtml(item.role || 'Posisi')}</span>
            <span class="timeline-period-pill">${escapeHtml(item.period || 'Periode')}</span>
          </div>
          <div class="timeline-institution">${escapeHtml(item.institution || 'Instansi / Perusahaan')}</div>
          <p class="timeline-desc-text">${escapeHtml(item.description || '')}</p>
        </div>
      `;
      pDisplayTimeline.appendChild(node);
    });
  }

  // ==========================================================================
  // 5. EDITOR FORM POPULATION & EVENTS
  // ==========================================================================

  function populateEditorForm() {
    inputFullname.value = portfolioData.fullname;
    inputRole.value = portfolioData.role;
    inputLocation.value = portfolioData.location;
    inputStatusBadge.value = portfolioData.statusBadge;
    inputBio.value = portfolioData.bio;

    inputStat1Val.value = portfolioData.stat1Val;
    inputStat1Lbl.value = portfolioData.stat1Lbl;
    inputStat2Val.value = portfolioData.stat2Val;
    inputStat2Lbl.value = portfolioData.stat2Lbl;
    inputStat3Val.value = portfolioData.stat3Val;
    inputStat3Lbl.value = portfolioData.stat3Lbl;
    inputStat4Val.value = portfolioData.stat4Val;
    inputStat4Lbl.value = portfolioData.stat4Lbl;

    inputEmail.value = portfolioData.email;
    inputWhatsapp.value = portfolioData.whatsapp;
    inputGithub.value = portfolioData.github;
    inputLinkedin.value = portfolioData.linkedin;
    inputWebsite.value = portfolioData.website;

    renderSkillsEditor();
    renderProjectsEditor();
    renderTimelineEditor();
  }

  // Skills Tag Editor
  function renderSkillsEditor() {
    skillsTagList.innerHTML = '';
    portfolioData.skills.forEach((skill, idx) => {
      const item = document.createElement('span');
      item.className = 'skill-tag-item';
      item.innerHTML = `
        <span>${escapeHtml(skill)}</span>
        <button type="button" class="skill-tag-remove" data-index="${idx}" aria-label="Hapus skill">&times;</button>
      `;
      skillsTagList.appendChild(item);
    });
  }

  function addSkill(skillName) {
    const trimmed = skillName.trim().replace(/^,+|,+$/g, '');
    if (!trimmed) return;
    if (portfolioData.skills.map(s => s.toLowerCase()).includes(trimmed.toLowerCase())) {
      showToast('Keahlian Sudah Ada', `"${trimmed}" sudah terdaftar.`, 'ℹ️');
      return;
    }
    portfolioData.skills.push(trimmed);
    renderSkillsEditor();
    updatePreview();
  }

  skillInputField.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addSkill(skillInputField.value);
      skillInputField.value = '';
    } else if (e.key === 'Backspace' && skillInputField.value === '' && portfolioData.skills.length > 0) {
      portfolioData.skills.pop();
      renderSkillsEditor();
      updatePreview();
    }
  });

  skillsTagList.addEventListener('click', (e) => {
    const btn = e.target.closest('.skill-tag-remove');
    if (btn) {
      const idx = parseInt(btn.getAttribute('data-index'), 10);
      portfolioData.skills.splice(idx, 1);
      renderSkillsEditor();
      updatePreview();
    }
  });

  quickSkillChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      addSkill(chip.getAttribute('data-skill'));
    });
  });

  // Projects Editor List
  function renderProjectsEditor() {
    projectsEditorList.innerHTML = '';
    portfolioData.projects.forEach((proj, idx) => {
      const card = document.createElement('div');
      card.className = 'item-editor-card';
      card.innerHTML = `
        <div class="item-editor-header">
          <span class="item-editor-title">Proyek #${idx + 1}: ${escapeHtml(proj.title || 'Tanpa Judul')}</span>
          <button type="button" class="btn-item-delete" data-proj-index="${idx}">Hapus</button>
        </div>
        <div class="form-group">
          <label class="field-label">Judul Proyek</label>
          <input type="text" class="form-input proj-title-input" data-idx="${idx}" value="${escapeHtml(proj.title)}">
        </div>
        <div class="form-grid-2">
          <div class="form-group">
            <label class="field-label">Kategori / Tipe</label>
            <input type="text" class="form-input proj-cat-input" data-idx="${idx}" value="${escapeHtml(proj.category)}">
          </div>
          <div class="form-group">
            <label class="field-label">Teknologi (Pisahkan koma)</label>
            <input type="text" class="form-input proj-tags-input" data-idx="${idx}" value="${escapeHtml((proj.tags || []).join(', '))}">
          </div>
        </div>
        <div class="form-group">
          <label class="field-label">Deskripsi Singkat</label>
          <textarea class="form-input form-textarea proj-desc-input" rows="2" data-idx="${idx}">${escapeHtml(proj.description)}</textarea>
        </div>
        <div class="form-grid-2">
          <div class="form-group">
            <label class="field-label">Tautan Demo (URL)</label>
            <input type="url" class="form-input proj-demo-input" data-idx="${idx}" value="${escapeHtml(proj.demoUrl || '')}">
          </div>
          <div class="form-group">
            <label class="field-label">Tautan GitHub (URL)</label>
            <input type="url" class="form-input proj-git-input" data-idx="${idx}" value="${escapeHtml(proj.githubUrl || '')}">
          </div>
        </div>
      `;
      projectsEditorList.appendChild(card);
    });
  }

  projectsEditorList.addEventListener('input', (e) => {
    const idx = parseInt(e.target.getAttribute('data-idx'), 10);
    if (isNaN(idx) || !portfolioData.projects[idx]) return;

    if (e.target.classList.contains('proj-title-input')) {
      portfolioData.projects[idx].title = e.target.value;
      const titleSpan = e.target.closest('.item-editor-card').querySelector('.item-editor-title');
      if (titleSpan) titleSpan.textContent = `Proyek #${idx + 1}: ${e.target.value || 'Tanpa Judul'}`;
    } else if (e.target.classList.contains('proj-cat-input')) {
      portfolioData.projects[idx].category = e.target.value;
    } else if (e.target.classList.contains('proj-tags-input')) {
      portfolioData.projects[idx].tags = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
    } else if (e.target.classList.contains('proj-desc-input')) {
      portfolioData.projects[idx].description = e.target.value;
    } else if (e.target.classList.contains('proj-demo-input')) {
      portfolioData.projects[idx].demoUrl = e.target.value;
    } else if (e.target.classList.contains('proj-git-input')) {
      portfolioData.projects[idx].githubUrl = e.target.value;
    }

    updatePreview();
  });

  projectsEditorList.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-item-delete')) {
      const idx = parseInt(e.target.getAttribute('data-proj-index'), 10);
      portfolioData.projects.splice(idx, 1);
      renderProjectsEditor();
      updatePreview();
      showToast('Proyek Dihapus', 'Daftar proyek diperbarui.', '🗑️');
    }
  });

  btnAddProject.addEventListener('click', () => {
    const newId = Date.now();
    const gradients = [
      'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
      'linear-gradient(135deg, #0284C7 0%, #0D9488 100%)',
      'linear-gradient(135deg, #E11D48 0%, #F43F5E 100%)',
      'linear-gradient(135deg, #D97706 0%, #EA580C 100%)',
      'linear-gradient(135deg, #059669 0%, #10B981 100%)'
    ];
    const pickedGradient = gradients[portfolioData.projects.length % gradients.length];

    portfolioData.projects.push({
      id: newId,
      title: 'Proyek Baru Saya',
      category: 'Web Application',
      description: 'Deskripsi inovasi, fitur utama, dan solusi yang diimplementasikan.',
      tags: ['TypeScript', 'Next.js', 'TailwindCSS'],
      demoUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      gradient: pickedGradient
    });

    renderProjectsEditor();
    updatePreview();
    showToast('Proyek Baru Ditambahkan', 'Silakan lengkapi informasi pada kartu proyek.', '🚀');
  });

  // Timeline Editor List
  function renderTimelineEditor() {
    timelineEditorList.innerHTML = '';
    portfolioData.timeline.forEach((item, idx) => {
      const card = document.createElement('div');
      card.className = 'item-editor-card';
      card.innerHTML = `
        <div class="item-editor-header">
          <span class="item-editor-title">Riwayat #${idx + 1}: ${escapeHtml(item.role || 'Posisi')}</span>
          <button type="button" class="btn-item-delete" data-time-index="${idx}">Hapus</button>
        </div>
        <div class="form-grid-2">
          <div class="form-group">
            <label class="field-label">Posisi / Gelar</label>
            <input type="text" class="form-input time-role-input" data-idx="${idx}" value="${escapeHtml(item.role)}">
          </div>
          <div class="form-group">
            <label class="field-label">Periode Waktu</label>
            <input type="text" class="form-input time-period-input" data-idx="${idx}" value="${escapeHtml(item.period)}">
          </div>
        </div>
        <div class="form-group">
          <label class="field-label">Instansi / Perusahaan</label>
          <input type="text" class="form-input time-inst-input" data-idx="${idx}" value="${escapeHtml(item.institution)}">
        </div>
        <div class="form-group">
          <label class="field-label">Deskripsi Kontribusi</label>
          <textarea class="form-input form-textarea time-desc-input" rows="2" data-idx="${idx}">${escapeHtml(item.description)}</textarea>
        </div>
      `;
      timelineEditorList.appendChild(card);
    });
  }

  timelineEditorList.addEventListener('input', (e) => {
    const idx = parseInt(e.target.getAttribute('data-idx'), 10);
    if (isNaN(idx) || !portfolioData.timeline[idx]) return;

    if (e.target.classList.contains('time-role-input')) {
      portfolioData.timeline[idx].role = e.target.value;
      const titleSpan = e.target.closest('.item-editor-card').querySelector('.item-editor-title');
      if (titleSpan) titleSpan.textContent = `Riwayat #${idx + 1}: ${e.target.value || 'Posisi'}`;
    } else if (e.target.classList.contains('time-period-input')) {
      portfolioData.timeline[idx].period = e.target.value;
    } else if (e.target.classList.contains('time-inst-input')) {
      portfolioData.timeline[idx].institution = e.target.value;
    } else if (e.target.classList.contains('time-desc-input')) {
      portfolioData.timeline[idx].description = e.target.value;
    }

    updatePreview();
  });

  timelineEditorList.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-item-delete')) {
      const idx = parseInt(e.target.getAttribute('data-time-index'), 10);
      portfolioData.timeline.splice(idx, 1);
      renderTimelineEditor();
      updatePreview();
      showToast('Riwayat Dihapus', 'Daftar pengalaman diperbarui.', '🗑️');
    }
  });

  btnAddTimeline.addEventListener('click', () => {
    const newId = Date.now();
    portfolioData.timeline.push({
      id: newId,
      role: 'Posisi / Tanggung Jawab Baru',
      institution: 'Nama Perusahaan / Organisasi',
      period: '2024 - Sekarang',
      description: 'Uraikan tanggung jawab, inisiatif, dan pencapaian selama periode ini.'
    });

    renderTimelineEditor();
    updatePreview();
    showToast('Riwayat Ditambahkan', 'Silakan lengkapi detail pengalaman baru Anda.', '💼');
  });

  // ==========================================================================
  // 6. PHOTO / AVATAR UPLOAD (BASE64)
  // ==========================================================================

  btnUploadAvatar.addEventListener('click', () => {
    photoFileInput.click();
  });

  photoFileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      handlePhotoFile(e.target.files[0]);
    }
  });

  btnRemoveAvatar.addEventListener('click', () => {
    portfolioData.photo = DEFAULT_AVATAR_SVG;
    photoFileInput.value = '';
    updatePreview();
    showToast('Avatar Default', 'Foto profil dikembalikan ke siluet bawaan.', 'ℹ️');
  });

  function handlePhotoFile(file) {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Format Tidak Valid', 'Mohon unggah berkas gambar (PNG, JPG, WebP).', '⚠️');
      return;
    }

    const maxSize = 2.5 * 1024 * 1024; // 2.5MB
    if (file.size > maxSize) {
      showToast('Ukuran Terlalu Besar', 'Maksimal ukuran foto adalah 2.5MB.', '⚠️');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      portfolioData.photo = e.target.result;
      updatePreview();
      showToast('Foto Berhasil Diperbarui', 'Pas foto profil langsung terpasang pada Bento Hero.', '✨');
    };
    reader.readAsDataURL(file);
  }

  // ==========================================================================
  // 7. INPUT LISTENERS (REALTIME MIRRORING)
  // ==========================================================================

  const directInputsMap = [
    { el: inputFullname, key: 'fullname' },
    { el: inputRole, key: 'role' },
    { el: inputLocation, key: 'location' },
    { el: inputStatusBadge, key: 'statusBadge' },
    { el: inputBio, key: 'bio' },
    { el: inputStat1Val, key: 'stat1Val' },
    { el: inputStat1Lbl, key: 'stat1Lbl' },
    { el: inputStat2Val, key: 'stat2Val' },
    { el: inputStat2Lbl, key: 'stat2Lbl' },
    { el: inputStat3Val, key: 'stat3Val' },
    { el: inputStat3Lbl, key: 'stat3Lbl' },
    { el: inputStat4Val, key: 'stat4Val' },
    { el: inputStat4Lbl, key: 'stat4Lbl' },
    { el: inputEmail, key: 'email' },
    { el: inputWhatsapp, key: 'whatsapp' },
    { el: inputGithub, key: 'github' },
    { el: inputLinkedin, key: 'linkedin' },
    { el: inputWebsite, key: 'website' }
  ];

  directInputsMap.forEach(({ el, key }) => {
    if (!el) return;
    el.addEventListener('input', () => {
      portfolioData[key] = el.value;
      updatePreview();
    });
  });

  // Accordion Toggle
  document.querySelectorAll('.accordion-trigger').forEach((trigger) => {
    trigger.addEventListener('click', function () {
      const item = this.closest('.accordion-item');
      item.classList.toggle('active');
    });
  });

  // Accent Switcher Events
  accentDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const col = dot.getAttribute('data-color');
      setAccentColor(col);
    });
  });

  // Theme Toggle Event
  btnThemeToggle.addEventListener('click', toggleThemeMode);

  function syncMobileViewLabel() {
    const isFull = workspace.classList.contains('full-view');
    if (toggleViewText) toggleViewText.textContent = isFull ? 'Kembali ke Editor' : 'Tampilan Penuh';
    if (mobileViewText) mobileViewText.textContent = isFull ? 'Kembali ke Editor' : 'Tampilan Penuh';
  }

  // Toggle View Mode (Split Studio vs Fullscreen Portfolio)
  btnToggleView.addEventListener('click', () => {
    workspace.classList.toggle('full-view');
    syncMobileViewLabel();
    const isFull = workspace.classList.contains('full-view');
    showToast(isFull ? 'Tampilan Penuh Aktif' : 'Mode Editor Aktif', isFull ? 'Portofolio ditampilkan dalam ukuran layar penuh.' : 'Panel editor dibuka kembali.', '👀');
  });

  function toggleMobileNav() {
    if (!appControlBar || !mobileMenuToggle || !mobileNavPanel) return;
    const isOpen = appControlBar.classList.toggle('mobile-menu-open');
    mobileMenuToggle.setAttribute('aria-expanded', String(isOpen));
    mobileNavPanel.setAttribute('aria-hidden', String(!isOpen));
  }

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', toggleMobileNav);
  }

  if (mobileNavPanel) {
    mobileNavPanel.addEventListener('click', (event) => {
      const target = event.target.closest('[data-mobile-action]');
      if (!target) return;

      const action = target.dataset.mobileAction;
      if (action === 'toggle-view') btnToggleView.click();
      if (action === 'export-html') btnExportHtml.click();
      if (action === 'print-cv') btnPrintCv.click();
      if (action === 'reset-data') btnResetData.click();

      toggleMobileNav();
    });
  }

  document.addEventListener('click', (event) => {
    if (!appControlBar || !mobileMenuToggle || !mobileNavPanel) return;
    const clickedInside = appControlBar.contains(event.target);
    if (!clickedInside && appControlBar.classList.contains('mobile-menu-open')) {
      appControlBar.classList.remove('mobile-menu-open');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
      mobileNavPanel.setAttribute('aria-hidden', 'true');
    }
  });

  // Print CV
  btnPrintCv.addEventListener('click', () => {
    showToast('Menyiapkan Lembar Cetak', 'Membuka dialog cetak PDF resume portofolio...', '🖨️');
    setTimeout(() => window.print(), 200);
  });

  // Reset to default
  btnResetData.addEventListener('click', () => {
    if (confirm('Apakah Anda yakin ingin mengembalikan seluruh data portofolio ke contoh bawaan?')) {
      portfolioData = JSON.parse(JSON.stringify(INITIAL_PORTFOLIO_DATA));
      localStorage.removeItem(STORAGE_KEY);
      applyThemeMode(portfolioData.theme);
      setAccentColor(portfolioData.accent);
      populateEditorForm();
      updatePreview();
      showToast('Data Direset', 'Portofolio dikembalikan ke data awal.', '🔄');
    }
  });

  // ==========================================================================
  // 8. AUTOSAVE LOCALSTORAGE
  // ==========================================================================

  function scheduleAutosave() {
    if (saveStatusPill) saveStatusPill.className = 'save-status-pill saving';
    if (saveStatusText) saveStatusText.textContent = 'Menyimpan...';

    clearTimeout(autosaveTimer);
    autosaveTimer = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolioData));
        if (saveStatusPill) saveStatusPill.className = 'save-status-pill';
        if (saveStatusText) {
          const now = new Date();
          const time = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
          saveStatusText.textContent = `Tersimpan otomatis (${time})`;
        }
      } catch (err) {
        console.warn('LocalStorage error:', err);
      }
    }, 350);
  }

  function loadSavedData() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        portfolioData = Object.assign({}, INITIAL_PORTFOLIO_DATA, parsed);
      }
    } catch (err) {
      console.warn('Failed to parse stored portfolio:', err);
    }

    applyThemeMode(portfolioData.theme || 'light');
    setAccentColor(portfolioData.accent || 'indigo');
    populateEditorForm();
    updatePreview();
  }

  // ==========================================================================
  // 9. EXPORT STANDALONE HTML (ZERO SERVER / ZERO PYTHON)
  // ==========================================================================

  btnExportHtml.addEventListener('click', () => {
    fetch('style.css')
      .then(res => res.text())
      .then(cssContent => {
        buildAndDownloadStandaloneHtml(cssContent);
      })
      .catch(() => {
        let cssText = '';
        try {
          for (let sheet of document.styleSheets) {
            for (let rule of sheet.cssRules) {
              cssText += rule.cssText + '\n';
            }
          }
        } catch (e) {
          console.warn('Could not read styleSheets directly:', e);
        }
        buildAndDownloadStandaloneHtml(cssText);
      });
  });

  function buildAndDownloadStandaloneHtml(cssContent) {
    const canvasClone = document.getElementById('portfolio-canvas').cloneNode(true);

    const standaloneHtml = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portofolio - ${escapeHtml(portfolioData.fullname)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Outfit:wght@500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    ${cssContent}
    body {
      padding: 50px 24px 90px;
    }
    .portfolio-canvas {
      max-width: 960px;
      margin: 0 auto;
    }
  </style>
</head>
<body data-theme="${escapeHtml(portfolioData.theme)}" data-accent="${escapeHtml(portfolioData.accent)}">
  <div class="bg-mesh-canvas" aria-hidden="true"></div>
  <div class="bg-grid-overlay" aria-hidden="true"></div>
  <div class="ambient-glow orb-1" aria-hidden="true"></div>
  <div class="ambient-glow orb-2" aria-hidden="true"></div>
  <div class="ambient-glow orb-3" aria-hidden="true"></div>
  
  <div class="portfolio-canvas">
    ${canvasClone.innerHTML}
  </div>
</body>
</html>`;

    const blob = new Blob([standaloneHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const safeName = (portfolioData.fullname || 'portofolio').toLowerCase().replace(/[^a-z0-9]/g, '-');
    link.href = url;
    link.download = `portofolio-${safeName}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast('Unduhan Berhasil!', 'Berkas HTML web mandiri siap dibuka di mana saja tanpa server.', '🎉', 4500);
  }

  // ==========================================================================
  // 10. INITIALIZATION
  // ==========================================================================

  function init() {
    loadSavedData();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
