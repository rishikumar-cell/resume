// ─── AI/ML Journey Seed Data ────────────────────────────────────────────────
// This is the initial data. All changes are stored in localStorage.
// To reset to defaults: click "Reset Data" in Admin mode.

export const initialJourneyData = {
  meta: {
    startDate: '2023-06',
    title: 'My AI/ML Engineering Journey',
    subtitle: 'Transforming from Full-Stack Developer → AI/ML Engineer',
    tagline: 'One model, one paper, one project at a time.',
  },

  milestones: [
    {
      id: 'ms1',
      date: '2023-06',
      title: 'Started the AI/ML Journey',
      description:
        'Decided to pivot towards AI/ML. Started with Python fundamentals, NumPy, Pandas — the building blocks of data science.',
      type: 'start',
      status: 'completed',
      tags: ['Python', 'NumPy', 'Pandas', 'Matplotlib'],
    },
    {
      id: 'ms2',
      date: '2023-09',
      title: 'Completed ML Specialization (Andrew Ng)',
      description:
        "Finished Andrew Ng's Machine Learning Specialization on Coursera. Covered supervised/unsupervised learning, gradient descent, neural networks.",
      type: 'course',
      status: 'completed',
      tags: ['Supervised Learning', 'Neural Networks', 'Coursera'],
    },
    {
      id: 'ms3',
      date: '2024-01',
      title: 'First ML Project — Sentiment Analysis API',
      description:
        'Built and deployed a REST API for sentiment analysis using fine-tuned BERT. First real-world ML deployment experience.',
      type: 'project',
      status: 'completed',
      tags: ['NLP', 'HuggingFace', 'FastAPI', 'Docker'],
    },
    {
      id: 'ms4',
      date: '2024-06',
      title: 'Deep Learning Specialization Complete',
      description:
        'Completed deeplearning.ai Deep Learning Specialization — CNNs, RNNs, Sequence Models, and Transformers.',
      type: 'course',
      status: 'completed',
      tags: ['TensorFlow', 'Keras', 'CNN', 'RNN', 'Transformers'],
    },
    {
      id: 'ms5',
      date: '2025-01',
      title: 'Exploring LLMs & GenAI',
      description:
        'Diving deep into Large Language Models, RAG pipelines, LangChain, and AI agent frameworks. Building practical GenAI applications.',
      type: 'achievement',
      status: 'in-progress',
      tags: ['LLM', 'LangChain', 'RAG', 'OpenAI', 'GenAI'],
    },
  ],

  projects: [
    {
      id: 'proj1',
      title: 'Sentiment Analysis API',
      description:
        'Production REST API for real-time text sentiment analysis using a fine-tuned BERT model. Containerised with Docker and deployed on AWS.',
      techStack: ['Python', 'FastAPI', 'HuggingFace Transformers', 'Docker', 'AWS EC2'],
      status: 'completed',
      progress: 100,
      githubUrl: 'https://github.com/rishikumar-cell',
      startDate: '2024-01',
      endDate: '2024-02',
      highlights: [
        '92% accuracy on held-out test set',
        'Sub-50ms average inference latency',
        'Deployed via Docker on AWS EC2',
      ],
      category: 'NLP',
    },
    {
      id: 'proj2',
      title: 'Plant Disease Classifier',
      description:
        'Custom CNN + transfer learning (ResNet50) model to classify 38 plant diseases from leaf images. Includes a Streamlit demo app.',
      techStack: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'Streamlit'],
      status: 'completed',
      progress: 100,
      githubUrl: 'https://github.com/rishikumar-cell',
      startDate: '2024-04',
      endDate: '2024-05',
      highlights: [
        '98.3% validation accuracy',
        'Transfer learning with ResNet50',
        'Deployed Streamlit demo app',
      ],
      category: 'Computer Vision',
    },
    {
      id: 'proj3',
      title: 'RAG Document Assistant',
      description:
        'Retrieval-Augmented Generation system for querying private document knowledge bases. Supports PDF ingestion, vector search, and context-aware chat.',
      techStack: ['Python', 'LangChain', 'OpenAI', 'ChromaDB', 'Streamlit', 'FastAPI'],
      status: 'in-progress',
      progress: 65,
      githubUrl: 'https://github.com/rishikumar-cell',
      startDate: '2025-01',
      endDate: null,
      highlights: [
        'PDF ingestion + semantic chunking',
        'ChromaDB vector store for similarity search',
        'Conversational memory across turns',
      ],
      category: 'GenAI / LLM',
    },
  ],

  skills: [
    { id: 'sk1', name: 'Python', category: 'Core', level: 90 },
    { id: 'sk2', name: 'Data Analysis (Pandas / NumPy)', category: 'Core', level: 88 },
    { id: 'sk3', name: 'Machine Learning', category: 'Core', level: 80 },
    { id: 'sk4', name: 'Deep Learning', category: 'Core', level: 72 },
    { id: 'sk5', name: 'Natural Language Processing', category: 'Specialization', level: 75 },
    { id: 'sk6', name: 'Computer Vision', category: 'Specialization', level: 65 },
    { id: 'sk7', name: 'scikit-learn', category: 'Framework', level: 85 },
    { id: 'sk8', name: 'TensorFlow / Keras', category: 'Framework', level: 72 },
    { id: 'sk9', name: 'PyTorch', category: 'Framework', level: 55 },
    { id: 'sk10', name: 'HuggingFace Transformers', category: 'Framework', level: 70 },
    { id: 'sk11', name: 'LangChain / LLMs', category: 'GenAI', level: 62 },
    { id: 'sk12', name: 'MLOps / Docker', category: 'Deployment', level: 58 },
  ],

  resources: [
    {
      id: 'res1',
      title: 'Machine Learning Specialization',
      type: 'course',
      provider: 'Coursera — Andrew Ng',
      url: 'https://coursera.org/specializations/machine-learning-introduction',
      status: 'completed',
      rating: 5,
      notes: 'Best ML intro available. Strong on intuition and maths both.',
    },
    {
      id: 'res2',
      title: 'Deep Learning Specialization',
      type: 'course',
      provider: 'Coursera — deeplearning.ai',
      url: 'https://coursera.org/specializations/deep-learning',
      status: 'completed',
      rating: 5,
      notes: 'Excellent coverage from basics to Transformers.',
    },
    {
      id: 'res3',
      title: 'Hands-On Machine Learning (3rd Ed.)',
      type: 'book',
      provider: "Aurélien Géron — O'Reilly",
      url: 'https://oreilly.com',
      status: 'completed',
      rating: 5,
      notes: 'Best practical ML book. Covers end-to-end pipelines beautifully.',
    },
    {
      id: 'res4',
      title: 'Attention Is All You Need',
      type: 'paper',
      provider: 'Vaswani et al. — Google Brain',
      url: 'https://arxiv.org/abs/1706.03762',
      status: 'completed',
      rating: 5,
      notes: 'The Transformer paper. Essential. Read it twice at least.',
    },
    {
      id: 'res5',
      title: 'LangChain & RAG Crash Course',
      type: 'video',
      provider: 'YouTube — Patrick Loeber',
      url: 'https://youtube.com',
      status: 'in-progress',
      rating: 4,
      notes: 'Solid practical intro to LangChain chains and agents.',
    },
  ],

  goals: [
    {
      id: 'goal1',
      title: 'Land an AI/ML Engineer Role',
      description:
        'Secure a full-time AI/ML engineering position at a product or research company.',
      deadline: '2026-09',
      progress: 55,
      status: 'in-progress',
      milestones: [
        'Build 5+ strong ML projects',
        'Get AWS ML Specialty certification',
        'Actively network & apply',
        'Ace ML system design interviews',
      ],
    },
    {
      id: 'goal2',
      title: 'Master PyTorch',
      description:
        'Become proficient in PyTorch — from building custom architectures to training loops to advanced techniques.',
      deadline: '2026-06',
      progress: 40,
      status: 'in-progress',
      milestones: [
        'Complete official PyTorch tutorials',
        'Build 3 projects from scratch in PyTorch',
        'Study PyTorch internals & autograd',
      ],
    },
    {
      id: 'goal3',
      title: 'Deploy a Production MLOps System',
      description:
        'Build and ship a complete MLOps pipeline with model versioning, CI/CD, and monitoring.',
      deadline: '2026-12',
      progress: 20,
      status: 'planned',
      milestones: [
        'Learn MLflow for experiment tracking',
        'Set up GitHub Actions CI/CD',
        'Deploy model to cloud (AWS/GCP)',
        'Add monitoring with Grafana',
      ],
    },
  ],
}
