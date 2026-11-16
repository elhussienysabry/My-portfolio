// Centralized portfolio data — edit this file to update all content
export const siteConfig = {
  name: 'Elhussieny Sabry',
  title: 'Data Engineer',
  tagline: 'Building reliable data systems — from ingestion to insight.',
  description:
    'I design and build data pipelines, explore database internals, and contribute to open-source data infrastructure. Focused on understanding how data systems work under the hood.',
  email: 'elhussienysabry@gmail.com',
  location: 'Menoufia, Egypt',
  social: {
    github: 'https://github.com/elhussienysabry',
    linkedin: 'https://www.linkedin.com/in/elhussienysabry/',
  },
  cvUrl: '/Elhussieny_Sabry_CV.pdf',
  education: {
    degree: 'Business Information Systems (BIS)',
    institution: 'Faculty of Commerce, Menoufia University',
    country: 'Egypt',
    period: '2024 - 2028',
  },
} as const;

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  tech: string[];
  highlights: string[];
  features: string[];
  githubUrl: string;
  demoUrl?: string;
  category: 'data-engineering' | 'analytics' | 'tools' | 'learning';
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 'retailflow-pipeline',
    title: 'RetailFlow Pipeline',
    subtitle: 'Production-Grade Data Lakehouse Pipeline',
    description:
      'An end-to-end ELT platform for an e-commerce data platform, built with strict schema governance, idempotent warehousing, and continuous observability.',
    longDescription:
      'RetailFlow simulates a real-world enterprise data engineering scenario: ingesting multi-format retail data, validating schemas dynamically, loading into a lakehouse architecture, transforming with dbt, and monitoring pipeline health. The project emphasizes engineering rigor over raw tooling — schema drift detection prevents silent data corruption, idempotent loading patterns enable safe retries and backfills, and automated circuit breakers halt the pipeline when data quality degrades beyond acceptable thresholds.',
    tech: ['Python', 'PostgreSQL', 'DuckDB', 'Parquet', 'dbt', 'Docker', 'pytest', 'GitHub Actions', 'Streamlit'],
    highlights: [
      'Schema drift validation detects column additions, removals, and type mismatches before ingestion',
      'Idempotent loading patterns prevent duplicate records during retries or backfills',
      'Data quality circuit breakers halt ingestion when null rates or constraint violations exceed thresholds',
      'dbt snapshots track slowly-changing dimensions (SCD Type 2) for historical analysis',
      'SLA telemetry monitors execution timing and triggers alerts on breaches',
    ],
    features: [
      'Multi-format data ingestion (CSV, JSON, Parquet)',
      'Schema validation and drift detection engine',
      'Idempotent load with deduplication',
      'dbt transformations with tests and documentation',
      'Operational monitoring dashboard with Streamlit',
      'CI/CD pipeline with GitHub Actions',
      'Data lineage visualization with NetworkX',
    ],
    githubUrl: 'https://github.com/elhussienysabry/retailflow-pipeline',
    category: 'data-engineering',
    featured: true,
  },
  {
    id: 'spark-docker',
    title: 'Spark-Docker Lab',
    subtitle: 'Apache Spark Learning & Engineering Lab',
    description:
      'A hands-on distributed Spark environment using Docker Compose, featuring deep-dive notebooks on execution internals, shuffle optimization, and data engineering patterns.',
    longDescription:
      'Spark-Docker provides a complete local Apache Spark cluster using Docker Compose (Master and Worker architecture), designed for deep learning of Spark internals. It includes structured notebooks covering topics from basic RDD operations to advanced execution plan analysis, shuffle partition tuning, Catalyst optimization, and data skew mitigation. The project reflects a learning-by-building approach to understanding distributed data processing.',
    tech: ['Apache Spark', 'PySpark', 'Docker', 'Docker Compose', 'Jupyter', 'Python', 'Delta Lake'],
    highlights: [
      'Multi-node standalone Spark cluster via Docker Compose (Master + Workers)',
      'Comprehensive notebooks covering Spark execution internals and DAG stages',
      'Performance optimization labs for shuffles, partitioning, and caching',
      'Hands-on exercises simulating real-world big data engineering workloads',
    ],
    features: [
      'One-command cluster setup with Docker Compose',
      'Spark Master and Worker Web UIs accessible locally',
      'Pre-configured Jupyter notebook environment',
      'Structured learning path from basics to execution internals',
      'Performance tuning and execution plan analysis labs',
    ],
    githubUrl: 'https://github.com/elhussienysabry/Spark-Docker',
    category: 'learning',
    featured: true,
  },
  {
    id: 'salespulse',
    title: 'SalesPulse',
    subtitle: 'End-to-End Sales Analytics Platform',
    description:
      'A complete analytics solution featuring deterministic synthetic data generation, validated SQLite ingestion, analytical SQL reporting, and an interactive dashboard.',
    longDescription:
      'SalesPulse demonstrates the full lifecycle of a data analytics project: generating structured synthetic sales datasets with reproducible random seeds, validating and ingesting them into an SQLite database, running analytical SQL queries to compute business KPIs, and presenting insights through an interactive Streamlit dashboard. The focus is on deterministic reproducibility — the same seed always produces the same dataset, making testing and debugging straightforward.',
    tech: ['Python', 'SQL', 'SQLite', 'Pandas', 'Streamlit', 'Plotly'],
    highlights: [
      'Deterministic synthetic data generation for reproducible testing',
      'Validated SQLite ingestion with structural integrity checks',
      'SQL-based reporting engine for business KPI computation',
      'Interactive Streamlit dashboard with real-time multi-dimensional filtering',
      'Export pipeline supporting Excel and CSV formats',
    ],
    features: [
      'Configurable synthetic data generator with seeded determinism',
      'Data validation and cleansing pipeline',
      'Multi-dimensional analytical SQL queries',
      'Interactive dashboard with Plotly charts',
      'Automated KPI aggregation and reporting',
      'Excel and CSV export functionality',
    ],
    githubUrl: 'https://github.com/elhussienysabry/SalesPulse',
    category: 'analytics',
    featured: true,
  },
  {
    id: 'mergemate',
    title: 'MergeMate',
    subtitle: 'Smart File Consolidation & Mapping Utility',
    description:
      'A Python utility for consolidating Excel and CSV files with intelligent column mapping, data validation, and automated reporting.',
    longDescription:
      'MergeMate solves a common data engineering problem: merging files with inconsistent schemas. It features smart column mapping that handles exact matches automatically while surfacing ambiguous matches for manual review. Three configurable policies handle missing columns — fill with blanks, exclude, or reject — giving users control over data completeness. A dual CLI and Streamlit interface shares the same modular core logic, with SHA-256 cryptographic hashing verifying input file immutability.',
    tech: ['Python', 'Pandas', 'Streamlit', 'openpyxl', 'CLI'],
    highlights: [
      'Smart column mapping with normalized header matching',
      'Three configurable policies for missing column handling (fill, exclude, reject)',
      'Data integrity verification via cryptographic content hashing',
      'Dual interface: Command Line (CLI) and interactive Streamlit web app',
    ],
    features: [
      'Automatic column mapping with similarity detection',
      'Custom column renaming and exclusion rules',
      'Missing column policy configuration',
      'Input file integrity verification via SHA-256 hashes',
      'Automated consolidation audit reports',
      'Unified core logic serving both CLI and web app',
    ],
    githubUrl: 'https://github.com/elhussienysabry/MergeMate',
    category: 'tools',
    featured: false,
  },
  {
    id: 'termchat',
    title: 'Termchat',
    subtitle: 'Multi-Client Terminal Chat Server',
    description:
      'A Python-based multi-client chat server built to explore networking fundamentals, socket programming, and concurrency patterns.',
    longDescription:
      'Termchat is a systems learning project focused on understanding how network applications work at the socket level. It implements a multi-client chat server using raw Python TCP socket programming and threading, handling concurrent connections and broadcasting messages between clients. The project demonstrates practical low-level networking and concurrency concepts without relying on high-level frameworks.',
    tech: ['Python', 'Sockets', 'Threading', 'TCP/IP', 'CLI'],
    highlights: [
      'Multi-client support with concurrent connection handling',
      'Threaded message routing and broadcasting between connected clients',
      'Built purely with Python standard library sockets — no external dependencies',
    ],
    features: [
      'TCP socket-based connection management',
      'Multi-threaded client session handling',
      'Real-time message broadcasting',
      'Clean terminal-based interface',
    ],
    githubUrl: 'https://github.com/elhussienysabry/Termchat',
    category: 'tools',
    featured: false,
  },
];

export interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
  color: string;
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Data Engineering',
    icon: 'database',
    skills: ['Python', 'SQL', 'ETL/ELT', 'Data Pipelines', 'Data Quality'],
    color: '#38bdf8',
  },
  {
    title: 'Data Processing',
    icon: 'cpu',
    skills: ['Apache Spark', 'Hadoop', 'HDFS', 'YARN', 'MapReduce'],
    color: '#818cf8',
  },
  {
    title: 'Orchestration',
    icon: 'workflow',
    skills: ['Apache Airflow'],
    color: '#a78bfa',
  },
  {
    title: 'Storage & Databases',
    icon: 'hard-drive',
    skills: ['PostgreSQL', 'DuckDB', 'SQLite', 'Parquet'],
    color: '#34d399',
  },
  {
    title: 'Analytics & Transformation',
    icon: 'bar-chart-3',
    skills: ['dbt', 'Pandas', 'Streamlit', 'Plotly'],
    color: '#fb923c',
  },
  {
    title: 'Infrastructure & Dev',
    icon: 'container',
    skills: ['Docker', 'Git', 'GitHub', 'Linux'],
    color: '#f472b6',
  },
  {
    title: 'Systems Knowledge',
    icon: 'book-open',
    skills: ['Database Internals', 'Distributed Systems', 'Storage Engines', 'Indexing', 'Concurrency Control'],
    color: '#facc15',
  },
];

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  concepts: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'data-pipeline',
    title: 'How a Data Pipeline Works',
    subtitle: 'From Raw Sources to Analytical Tables',
    description:
      'A data pipeline moves data systematically through structured stages: extraction from raw sources, validation for quality and drift, transformation into curated analytical models, and loading into lakehouse storage. Each stage presents failure modes — schema changes, duplicate records, partial writes — that require engineering solutions like ingestion idempotency, circuit breakers, and schema registries.',
    icon: 'arrow-right-left',
    color: '#38bdf8',
    concepts: ['Source Extraction', 'Schema Validation', 'Idempotent Loading', 'Transformation Modeling', 'Data Quality Gates'],
  },
  {
    id: 'database-indexing',
    title: 'Database Indexing & B-Trees',
    subtitle: 'How Databases Find Data in O(log n) Time',
    description:
      'B-Tree indexes organize row pointers in a balanced, multi-way search tree where each disk page contains sorted keys and pointers. A query traverses from the root page to a leaf page in logarithmic disk I/O operations instead of scanning every sequential data page. Understanding page layouts, fill factors, composite key ordering, and covering indexes explains why query performance differs by orders of magnitude.',
    icon: 'git-branch',
    color: '#818cf8',
    concepts: ['B-Tree Structure', 'Disk Page Layout', 'Composite Index Order', 'Index Scan vs. Seq Scan', 'Covering Indexes'],
  },
  {
    id: 'spark-execution',
    title: 'Spark Execution Architecture',
    subtitle: 'DAGs, Stages, and Shuffle Boundaries',
    description:
      'Apache Spark breaks logical computations into physical execution graphs: Actions trigger Jobs, which the DAG Scheduler divides into Stages at shuffle boundaries (wide dependencies like groupBy or join), which are executed as parallel Tasks across worker cores. Understanding narrow vs. wide transformations and partition counts is critical to preventing shuffle bottlenecks and memory spills.',
    icon: 'network',
    color: '#a78bfa',
    concepts: ['DAG Scheduling', 'Narrow vs. Wide Transformations', 'Shuffle Partitions', 'Task Parallelism', 'Catalyst Optimizer'],
  },
  {
    id: 'airflow-architecture',
    title: 'Apache Airflow Architecture',
    subtitle: 'Schedulers, Executors, and Metadata State',
    description:
      'Airflow models workflows as Directed Acyclic Graphs (DAGs). The Scheduler constantly parses DAG definitions, evaluates dependency states in the metadata database, and creates DagRuns and TaskInstances. The Executor (Local, Celery, or Kubernetes) queues tasks to worker processes. This decoupled architecture enables retries, backfills, dynamic task mapping, and SLA monitoring.',
    icon: 'calendar-clock',
    color: '#34d399',
    concepts: ['DAG Parsing Loop', 'Scheduler Heartbeat', 'Executor Queues', 'Task Lifecycle States', 'XCom Data Passing'],
  },
  {
    id: 'schema-evolution',
    title: 'Data Quality & Schema Evolution',
    subtitle: 'Handling Inevitable Schema Changes Safely',
    description:
      'Production schemas inevitably drift: upstream APIs add fields, alter column types, or drop deprecated keys. Resilient pipelines implement automated schema detection at ingestion time. By defining explicit contracts, supporting additive changes, and triggering alerts or quarantine tables for breaking drift, data engineering systems protect downstream marts and BI dashboards from silent corruption.',
    icon: 'shield-check',
    color: '#fb923c',
    concepts: ['Schema Drift Detection', 'Backward Compatibility', 'Data Contracts', 'Quarantine Routing', 'Data Lineage'],
  },
  {
    id: 'distributed-processing',
    title: 'Distributed Data Systems',
    subtitle: 'Partitioning, Replication, and Fault Tolerance',
    description:
      'Distributed systems partition datasets across nodes for scalability and replicate data across racks for fault tolerance. This introduces trade-offs between consistency, availability, and partition tolerance (CAP Theorem). Understanding how consensus protocols (Raft/Paxos) work and how write-ahead logs guarantee durability provides the conceptual foundation for designing resilient big data platforms.',
    icon: 'server',
    color: '#f472b6',
    concepts: ['Data Partitioning', 'Replication Topologies', 'CAP Trade-offs', 'Write-Ahead Logs (WAL)', 'Fault Recovery'],
  },
];

export interface Contribution {
  id: string;
  repository: string;
  prTitle: string;
  prNumber?: number;
  contributionType: string;
  description: string;
  status: 'merged' | 'open' | 'closed' | 'unverified';
  url?: string;
  date?: string;
}

export const contributions: Contribution[] = [
  {
    id: 'airflow-pr',
    repository: 'apache/airflow',
    prTitle: 'PR #75453',
    prNumber: 75453,
    contributionType: 'Open Source Contribution',
    description:
      'Contributed to the Apache Airflow open source project. Inspected scheduler and execution internals. PR reference noted for verification against upstream repository.',
    status: 'unverified',
    url: 'https://github.com/apache/airflow/pull/75453',
    date: '2025',
  },
];

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  imageUrl?: string;
  verified: boolean;
  type: 'achievement' | 'certification';
  description: string;
  badgeColor: string;
}

export const certifications: Certification[] = [
  {
    id: 'nasa-space-apps-2026',
    title: 'NASA Space Apps Challenge 2026',
    issuer: 'National Aeronautics and Space Administration (NASA)',
    date: 'October 2026',
    imageUrl: '/certificates/nasa_space_apps_2026.png',
    verified: true,
    type: 'achievement',
    description:
      'Participated in the global NASA International Space Apps Challenge 2026, collaborating on space data solutions and engineering challenges using open data.',
    badgeColor: '#38bdf8',
  },
  {
    id: 'appsec-practitioner-v2',
    title: 'Certified AppSec Practitioner (CAP) V2',
    issuer: 'The SecOps Group',
    date: '2026',
    verified: true,
    type: 'certification',
    description:
      'Certification validating knowledge of application security principles, defensive architecture, secure data handling, and vulnerability assessment.',
    badgeColor: '#818cf8',
  },
  {
    id: 'cnsp',
    title: 'Certified Network Security Practitioner (CNSP)',
    issuer: 'The SecOps Group',
    date: '2026',
    verified: true,
    type: 'certification',
    description:
      'Professional credential verifying practical understanding of network security, protocols, secure communications, and infrastructure defense.',
    badgeColor: '#34d399',
  },
  {
    id: 'fullstack-dev',
    title: 'Full Stack Web Development',
    issuer: 'Professional Training Program',
    date: '2026',
    verified: true,
    type: 'certification',
    description:
      'Comprehensive program covering modern frontend, backend API architecture, relational database management, and cloud deployment fundamentals.',
    badgeColor: '#fb923c',
  },
  {
    id: 'career-dev-1',
    title: 'Career Development Level 1',
    issuer: 'Professional Development Institute',
    date: '2026',
    verified: true,
    type: 'certification',
    description:
      'Professional development credential focusing on technical communication, business alignment, and collaborative engineering practices.',
    badgeColor: '#a78bfa',
  },
];

export interface TimelineEntry {
  id: string;
  phase: string;
  title: string;
  description: string;
  skills: string[];
  icon: string;
  color: string;
}

export const learningTimeline: TimelineEntry[] = [
  {
    id: 'fundamentals',
    phase: 'Foundation',
    title: 'Programming & Data Fundamentals',
    description: 'Started with Python and foundational computer science principles. Built deep understanding of data structures, algorithmic complexity, and clean code architecture.',
    skills: ['Python', 'Data Structures', 'Algorithmic Thinking'],
    icon: 'code',
    color: '#38bdf8',
  },
  {
    id: 'sql-databases',
    phase: 'Databases',
    title: 'SQL & Database Systems',
    description: 'Mastered relational database modeling, complex SQL analytical queries, indexing mechanisms, and relational integrity. Began studying how databases structure disk storage and handle transactions.',
    skills: ['SQL', 'PostgreSQL', 'SQLite', 'Relational Design'],
    icon: 'database',
    color: '#818cf8',
  },
  {
    id: 'etl-engineering',
    phase: 'Data Engineering',
    title: 'ETL / ELT & Pipeline Architecture',
    description: 'Engineered production-grade data pipelines focusing on multi-source extraction, transformation modeling, schema drift detection, idempotent warehouse loading, and data quality circuit breakers.',
    skills: ['ETL/ELT', 'Data Pipelines', 'Data Quality', 'dbt'],
    icon: 'arrow-right-left',
    color: '#a78bfa',
  },
  {
    id: 'big-data',
    phase: 'Big Data',
    title: 'Big Data Ecosystem',
    description: 'Explored distributed file systems and resource orchestration: HDFS for block storage, YARN for cluster management, and MapReduce paradigms for batch processing execution.',
    skills: ['Hadoop', 'HDFS', 'YARN', 'MapReduce'],
    icon: 'hard-drive',
    color: '#34d399',
  },
  {
    id: 'spark',
    phase: 'Spark',
    title: 'Apache Spark & Distributed Computing',
    description: 'Built distributed standalone Spark clusters with Docker Compose. Analyzed execution internals: DAG compilation, shuffle operations, partition sizing, and Catalyst query optimization.',
    skills: ['Apache Spark', 'PySpark', 'Docker', 'Distributed Systems'],
    icon: 'cpu',
    color: '#fb923c',
  },
  {
    id: 'orchestration',
    phase: 'Orchestration',
    title: 'Workflow Orchestration with Airflow',
    description: 'Designed Directed Acyclic Graphs (DAGs) in Apache Airflow for robust workflow scheduling. Studied scheduler heartbeats, executor architectures, backfills, and task dependency graphs.',
    skills: ['Apache Airflow', 'DAGs', 'Task Lifecycle', 'Observability'],
    icon: 'workflow',
    color: '#f472b6',
  },
  {
    id: 'systems',
    phase: 'Systems',
    title: 'Database Internals & Distributed Systems',
    description: 'Actively studying data system architectures: B-Tree vs. LSM-Tree storage engines, Write-Ahead Logging (WAL), MVCC concurrency control, and distributed consensus algorithms.',
    skills: ['Storage Engines', 'B-Tree Indexing', 'Concurrency Control', 'Distributed Internals'],
    icon: 'book-open',
    color: '#facc15',
  },
];

export const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Open Source', href: '#open-source' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
] as const;
