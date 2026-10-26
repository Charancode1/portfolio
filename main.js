/**
 * CHARAN K — THE ENGINEER'S WORKBENCH
 * Interactive Digital Playground Scripts
 */

(function () {
  'use strict';

  // -------------------------------------------------------------------------
  // 1. Navigation Dock: ScrollSpy & Mobile Toggle
  // -------------------------------------------------------------------------
  const dockLinks = document.querySelectorAll('.dock-item a[href^="#"]');
  const sections = document.querySelectorAll('section[id]');
  const mobileToggle = document.getElementById('mobileDockToggle');
  const dockLinksContainer = document.getElementById('dockLinks');

  function updateActiveDock() {
    const scrollPos = window.scrollY + 160;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        dockLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveDock, { passive: true });

  if (mobileToggle && dockLinksContainer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = dockLinksContainer.classList.toggle('is-mobile-open');
      mobileToggle.textContent = isOpen ? 'CLOSE' : 'MENU';
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    dockLinks.forEach(l => {
      l.addEventListener('click', () => {
        dockLinksContainer.classList.remove('is-mobile-open');
        mobileToggle.textContent = 'MENU';
      });
    });
  }

  // -------------------------------------------------------------------------
  // 2. Interactive Dispatch Pipeline Simulator (Hero)
  // -------------------------------------------------------------------------
  const pipelineSteps = document.querySelectorAll('.pipeline-step-btn');
  const pipelineOutput = document.getElementById('pipelineDescOutput');

  const pipelineDescriptions = {
    '1': '<strong>01. Problem Scoping:</strong> Translating stakeholder ambiguity and operational friction into formal technical requirements, system boundaries, and success metrics.',
    '2': '<strong>02. Architecture & Schemas:</strong> Designing full-stack system architecture, database schemas, REST APIs, and microservices.',
    '3': '<strong>03. Systems & AI Build:</strong> Developing agentic tool-use loops, RAG pipelines, and ML models using PyTorch, Hugging Face, Node.js, Next.js, and TypeScript.',
    '4': '<strong>04. Deployment & Orchestration:</strong> Packaging with Docker, orchestrating on Kubernetes (AWS EC2,AWS EKS, Cloudflare), and optimizing edge ML on Raspberry Pi.',
    '5': '<strong>05. Production Lifecycle:</strong> Managing live production operations, automated CI/CD deployments, security secrets, reliability, and monitoring.'
  };

  pipelineSteps.forEach(btn => {
    btn.addEventListener('click', () => {
      pipelineSteps.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const step = btn.getAttribute('data-step');
      if (pipelineOutput && pipelineDescriptions[step]) {
        pipelineOutput.innerHTML = pipelineDescriptions[step];
      }
    });
  });

  // -------------------------------------------------------------------------
  // 3. Interactive Workstation Blueprint Tabs (Experience)
  // -------------------------------------------------------------------------
  const blueprintTabs = document.querySelectorAll('.blueprint-tab-btn');
  blueprintTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const parent = tab.closest('.experience-blueprint-box');
      if (!parent) return;

      const groupTabs = parent.querySelectorAll('.blueprint-tab-btn');
      const panels = parent.querySelectorAll('.blueprint-panel-content');
      const targetId = tab.getAttribute('data-target');

      groupTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      panels.forEach(p => {
        if (p.getAttribute('id') === targetId) {
          p.style.display = 'block';
        } else {
          p.style.display = 'none';
        }
      });
    });
  });

  // -------------------------------------------------------------------------
  // 4. Interactive Agent Reasoning Loop Simulator (Autonomous Research Agent)
  // -------------------------------------------------------------------------
  const agentNodes = document.querySelectorAll('.agent-node-btn');
  const agentConsoleLog = document.getElementById('agentConsoleLog');
  const simTriggerBtn = document.getElementById('simTriggerBtn');

  const agentStepsData = [
    { tag: 'STEP 1: OBJECTIVE DECOMPOSITION', log: '🧠 Reasoning loop initiated: Decomposing complex objective into sub-tasks via Chain-of-Thought planning...' },
    { tag: 'STEP 2: TOOL USE & RETRIEVAL', log: '🌐 Executing web & research APIs: Scraping unstructured papers, indexing semantic embeddings in FAISS...' },
    { tag: 'STEP 3: EVALUATION GATE', log: '⚖️ Running agent evals: Hallucination score = 0.02, Retrieval precision = 96.4%. Confidence threshold met.' },
    { tag: 'STEP 4: KNOWLEDGE PERSISTENCE', log: '💾 Knowledge graph expanded: Committing structured synthesis to self-growing vectorized knowledge base.' }
  ];

  let currentAgentIndex = 0;

  function selectAgentStep(index) {
    currentAgentIndex = index;
    agentNodes.forEach((node, i) => {
      if (i === index) node.classList.add('active');
      else node.classList.remove('active');
    });
    if (agentConsoleLog) {
      agentConsoleLog.innerHTML = `<span>${agentStepsData[index].log}</span>`;
    }
  }

  agentNodes.forEach((node, idx) => {
    node.addEventListener('click', () => selectAgentStep(idx));
  });

  if (simTriggerBtn) {
    simTriggerBtn.addEventListener('click', () => {
      const nextIndex = (currentAgentIndex + 1) % agentStepsData.length;
      selectAgentStep(nextIndex);
    });
  }

  // -------------------------------------------------------------------------
  // 5. Interactive Medical Screening Inspector (GlaucoVision)
  // -------------------------------------------------------------------------
  const medicalBtns = document.querySelectorAll('.medical-toggle-btn');
  const retinaArt = document.getElementById('retinaEyeArt');
  const cupOverlay = document.getElementById('retinaCupOverlay');
  const medicalCaption = document.getElementById('medicalCaption');

  if (medicalBtns.length > 0 && retinaArt && cupOverlay) {
    medicalBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        medicalBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const mode = btn.getAttribute('data-mode');

        if (mode === 'raw') {
          cupOverlay.style.display = 'none';
          retinaArt.style.filter = 'none';
          if (medicalCaption) medicalCaption.textContent = 'RAW RETINAL SCAN (LIMITED LABELED DATA)';
        } else if (mode === 'segmented') {
          cupOverlay.style.display = 'block';
          retinaArt.style.filter = 'contrast(1.2)';
          if (medicalCaption) medicalCaption.textContent = 'U-NET SEGMENTATION (OPTIC DISC & CUP BOUNDARIES)';
        } else if (mode === 'cdr') {
          cupOverlay.style.display = 'block';
          cupOverlay.style.borderColor = '#38BDF8';
          retinaArt.style.filter = 'hue-rotate(30deg)';
          if (medicalCaption) medicalCaption.textContent = 'CUP-TO-DISC RATIO (CDR) EXTRACTED: 0.68 → VAE-CNN CLASSIFIED';
        }
      });
    });
  }

  // -------------------------------------------------------------------------
  // 6. Interactive Cloud Topology (Voyage Analytics Platform)
  // -------------------------------------------------------------------------
  const topPills = document.querySelectorAll('.top-node-pill');
  const topLog = document.getElementById('topologyLog');

  const topLogs = {
    'sql': '📊 SQL Feature Engineering: Aggregating temporal features across tabular data pipelines.',
    'mlflow': '🧪 MLflow Tracking: Logging hyperparams, model artifacts, and evaluation metrics.',
    'flask': '⚡ Flask REST Inference: Containerized microservice serving real-time predictions.',
    'k8s': '☸️ Kubernetes (Minikube): Orchestrating pods, service mesh, and scaling containers.',
    'streamlit': '📈 Streamlit Dashboard: Interactive user interface for model visualization.'
  };

  topPills.forEach(pill => {
    pill.addEventListener('click', () => {
      topPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const node = pill.getAttribute('data-node');
      if (topLog && topLogs[node]) {
        topLog.textContent = topLogs[node];
      }
    });
  });

  // -------------------------------------------------------------------------
  // 7. Interactive Temporal Graph Neural Network Canvas (Research Desk)
  // -------------------------------------------------------------------------
  const canvas = document.getElementById('stockGraphCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H;
    let isPaused = false;
    let hoveredNode = null;

    const pauseBtn = document.getElementById('pauseGraphBtn');
    const pulseBtn = document.getElementById('pulseGraphBtn');
    const graphStatus = document.getElementById('graphStatusText');

    function resizeGraph() {
      W = canvas.width = canvas.parentElement.clientWidth * (window.devicePixelRatio || 1);
      H = canvas.height = 280 * (window.devicePixelRatio || 1);
    }
    resizeGraph();
    window.addEventListener('resize', resizeGraph);

    // 8 BSE Stock Nodes representing the financial network
    const stockSymbols = ['TCS', 'INFY', 'RELIANCE', 'HDFC', 'ICICI', 'LT', 'BHARTI', 'ITC'];
    let nodes = [];

    function initGraphNodes() {
      nodes = stockSymbols.map((sym, i) => {
        const angle = (i / stockSymbols.length) * Math.PI * 2;
        const radius = Math.min(W, H) * 0.32;
        return {
          sym,
          x: W / 2 + Math.cos(angle) * radius,
          y: H / 2 + Math.sin(angle) * radius,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: 18 * (window.devicePixelRatio || 1),
          highlight: false
        };
      });
    }
    initGraphNodes();

    let pulseWave = 0;
    let isPulsing = false;

    if (pauseBtn) {
      pauseBtn.addEventListener('click', () => {
        isPaused = !isPaused;
        pauseBtn.textContent = isPaused ? 'RESUME SIM' : 'FREEZE SIM';
        if (graphStatus) graphStatus.textContent = isPaused ? 'STATUS: FROZEN' : 'STATUS: LIVE GAT-GRU ATTENTION';
      });
    }

    if (pulseBtn) {
      pulseBtn.addEventListener('click', () => {
        isPulsing = true;
        pulseWave = 0;
        if (graphStatus) graphStatus.textContent = 'GRANGER CAUSALITY F-TEST PULSE INJECTED';
        setTimeout(() => {
          if (graphStatus && !isPaused) graphStatus.textContent = 'STATUS: DYNAMIC GRAPH NETWORK (704 BSE STOCKS)';
        }, 2500);
      });
    }

    // Mouse Interaction
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = (e.clientX - rect.left) * (window.devicePixelRatio || 1);
      const mouseY = (e.clientY - rect.top) * (window.devicePixelRatio || 1);

      hoveredNode = null;
      nodes.forEach(n => {
        const d = Math.hypot(n.x - mouseX, n.y - mouseY);
        if (d < n.radius + 6) {
          hoveredNode = n;
        }
      });
    });

    function drawGraph() {
      ctx.clearRect(0, 0, W, H);

      // Draw subtle background grid
      ctx.strokeStyle = 'rgba(147, 197, 253, 0.05)';
      ctx.lineWidth = 1;
      const step = 40 * (window.devicePixelRatio || 1);
      for (let x = 0; x < W; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }

      // Update positions if not paused
      if (!isPaused) {
        nodes.forEach(n => {
          n.x += n.vx;
          n.y += n.vy;
          const pad = n.radius + 10;
          if (n.x < pad || n.x > W - pad) n.vx *= -1;
          if (n.y < pad || n.y > H - pad) n.vy *= -1;
        });
      }

      // Draw Granger Causal Edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          const maxDist = Math.min(W, H) * 0.7;

          if (dist < maxDist) {
            const isConnectedToHover = hoveredNode && (hoveredNode === a || hoveredNode === b);
            const alpha = isConnectedToHover ? 0.75 : (1 - dist / maxDist) * 0.35;
            ctx.strokeStyle = isConnectedToHover ? '#F97316' : `rgba(147, 197, 253, ${alpha})`;
            ctx.lineWidth = isConnectedToHover ? 2.5 : 1.2;

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Draw Granger Pulse Wave
      if (isPulsing) {
        pulseWave += 4 * (window.devicePixelRatio || 1);
        ctx.strokeStyle = 'rgba(249, 115, 22, 0.6)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(W / 2, H / 2, pulseWave, 0, Math.PI * 2);
        ctx.stroke();
        if (pulseWave > Math.max(W, H)) {
          isPulsing = false;
        }
      }

      // Draw Stock Nodes
      nodes.forEach(n => {
        const isHover = (hoveredNode === n);
        ctx.beginPath();
        ctx.arc(n.x, n.y, isHover ? n.radius * 1.25 : n.radius, 0, Math.PI * 2);
        ctx.fillStyle = isHover ? '#EA580C' : '#1E3A8A';
        ctx.fill();

        ctx.strokeStyle = isHover ? '#FED7AA' : '#60A5FA';
        ctx.lineWidth = 2 * (window.devicePixelRatio || 1);
        ctx.stroke();

        // Label
        ctx.font = `bold ${10 * (window.devicePixelRatio || 1)}px 'JetBrains Mono', monospace`;
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(n.sym, n.x, n.y);
      });

      // Hover Tooltip
      if (hoveredNode) {
        ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
        ctx.strokeStyle = '#F97316';
        ctx.lineWidth = 1;
        const boxW = 200 * (window.devicePixelRatio || 1);
        const boxH = 46 * (window.devicePixelRatio || 1);
        const bx = Math.min(W - boxW - 10, Math.max(10, hoveredNode.x - boxW / 2));
        const by = Math.max(10, hoveredNode.y - hoveredNode.radius - boxH - 8);

        ctx.fillRect(bx, by, boxW, boxH);
        ctx.strokeRect(bx, by, boxW, boxH);

        ctx.fillStyle = '#FED7AA';
        ctx.font = `${9 * (window.devicePixelRatio || 1)}px 'JetBrains Mono', monospace`;
        ctx.textAlign = 'left';
        ctx.fillText(`EQUITY: ${hoveredNode.sym} (BSE: 704)`, bx + 8, by + 14);
        ctx.fillStyle = '#E2E8F0';
        ctx.fillText(`Granger F-Test: p < 0.05 | GAT: 0.82`, bx + 8, by + 32);
      }

      requestAnimationFrame(drawGraph);
    }
    requestAnimationFrame(drawGraph);
  }

  // -------------------------------------------------------------------------
  // 8. Copy to Clipboard Utility with Tactile Feedback
  // -------------------------------------------------------------------------
  const copyButtons = document.querySelectorAll('.copy-mini-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.getAttribute('data-copy');
      if (!val) return;
      navigator.clipboard.writeText(val).then(() => {
        const orig = btn.textContent;
        btn.textContent = 'COPIED! ✓';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = orig;
          btn.classList.remove('copied');
        }, 2200);
      }).catch(err => {
        console.error('Copy failed:', err);
      });
    });
  });

  // Initial update
  updateActiveDock();
})();
