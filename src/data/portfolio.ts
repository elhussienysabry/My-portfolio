// Centralized portfolio data — edit this file to update all content
const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

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
  cvUrl: asset('CV.pdf'),
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
    color: '#2f55ff',
  },
  {
    title: 'Data Processing',
    icon: 'cpu',
    skills: ['Apache Spark', 'Hadoop', 'HDFS', 'YARN', 'MapReduce'],
    color: '#7357ff',
  },
  {
    title: 'Orchestration',
    icon: 'workflow',
    skills: ['Apache Airflow'],
    color: '#7357ff',
  },
  {
    title: 'Storage & Databases',
    icon: 'hard-drive',
    skills: ['PostgreSQL', 'DuckDB', 'SQLite', 'Parquet'],
    color: '#0b9e73',
  },
  {
    title: 'Analytics & Transformation',
    icon: 'bar-chart-3',
    skills: ['dbt', 'Pandas', 'Streamlit', 'Plotly'],
    color: '#ff7a2f',
  },
  {
    title: 'Infrastructure & Dev',
    icon: 'container',
    skills: ['Docker', 'Git', 'GitHub', 'Linux'],
    color: '#e8478c',
  },
  {
    title: 'Systems Knowledge',
    icon: 'book-open',
    skills: ['Database Internals', 'Distributed Systems', 'Storage Engines', 'Indexing', 'Concurrency Control'],
    color: '#e3ac1f',
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
    color: '#2f55ff',
    concepts: ['Source Extraction', 'Schema Validation', 'Idempotent Loading', 'Transformation Modeling', 'Data Quality Gates'],
  },
  {
    id: 'database-indexing',
    title: 'Database Indexing & B-Trees',
    subtitle: 'How Databases Find Data in O(log n) Time',
    description:
      'B-Tree indexes organize row pointers in a balanced, multi-way search tree where each disk page contains sorted keys and pointers. A query traverses from the root page to a leaf page in logarithmic disk I/O operations instead of scanning every sequential data page. Understanding page layouts, fill factors, composite key ordering, and covering indexes explains why query performance differs by orders of magnitude.',
    icon: 'git-branch',
    color: '#7357ff',
    concepts: ['B-Tree Structure', 'Disk Page Layout', 'Composite Index Order', 'Index Scan vs. Seq Scan', 'Covering Indexes'],
  },
  {
    id: 'spark-execution',
    title: 'Spark Execution Architecture',
    subtitle: 'DAGs, Stages, and Shuffle Boundaries',
    description:
      'Apache Spark breaks logical computations into physical execution graphs: Actions trigger Jobs, which the DAG Scheduler divides into Stages at shuffle boundaries (wide dependencies like groupBy or join), which are executed as parallel Tasks across worker cores. Understanding narrow vs. wide transformations and partition counts is critical to preventing shuffle bottlenecks and memory spills.',
    icon: 'network',
    color: '#7357ff',
    concepts: ['DAG Scheduling', 'Narrow vs. Wide Transformations', 'Shuffle Partitions', 'Task Parallelism', 'Catalyst Optimizer'],
  },
  {
    id: 'airflow-architecture',
    title: 'Apache Airflow Architecture',
    subtitle: 'Schedulers, Executors, and Metadata State',
    description:
      'Airflow models workflows as Directed Acyclic Graphs (DAGs). The Scheduler constantly parses DAG definitions, evaluates dependency states in the metadata database, and creates DagRuns and TaskInstances. The Executor (Local, Celery, or Kubernetes) queues tasks to worker processes. This decoupled architecture enables retries, backfills, dynamic task mapping, and SLA monitoring.',
    icon: 'calendar-clock',
    color: '#0b9e73',
    concepts: ['DAG Parsing Loop', 'Scheduler Heartbeat', 'Executor Queues', 'Task Lifecycle States', 'XCom Data Passing'],
  },
  {
    id: 'schema-evolution',
    title: 'Data Quality & Schema Evolution',
    subtitle: 'Handling Inevitable Schema Changes Safely',
    description:
      'Production schemas inevitably drift: upstream APIs add fields, alter column types, or drop deprecated keys. Resilient pipelines implement automated schema detection at ingestion time. By defining explicit contracts, supporting additive changes, and triggering alerts or quarantine tables for breaking drift, data engineering systems protect downstream marts and BI dashboards from silent corruption.',
    icon: 'shield-check',
    color: '#ff7a2f',
    concepts: ['Schema Drift Detection', 'Backward Compatibility', 'Data Contracts', 'Quarantine Routing', 'Data Lineage'],
  },
  {
    id: 'distributed-processing',
    title: 'Distributed Data Systems',
    subtitle: 'Partitioning, Replication, and Fault Tolerance',
    description:
      'Distributed systems partition datasets across nodes for scalability and replicate data across racks for fault tolerance. This introduces trade-offs between consistency, availability, and partition tolerance (CAP Theorem). Understanding how consensus protocols (Raft/Paxos) work and how write-ahead logs guarantee durability provides the conceptual foundation for designing resilient big data platforms.',
    icon: 'server',
    color: '#e8478c',
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
    prTitle: 'Document custom OTel metrics endpoint paths',
    prNumber: 75453,
    contributionType: 'Docs + regression test',
    description:
      'Documented how to configure custom OpenTelemetry metrics endpoint paths on non-default OTLP backends, and added an HTTP regression test verifying the path is preserved.',
    status: 'open',
    url: 'https://github.com/apache/airflow/pull/75453',
    date: 'Oct 2026',
  },
  {
    id: 'pandas-pr',
    repository: 'pandas-dev/pandas',
    prTitle: 'Fix parsing of UTC offsets without a colon or with seconds',
    prNumber: 71490,
    contributionType: 'Bug fix + tests',
    description:
      'Submitted a fix for parsing fixed UTC offsets without a colon or with seconds in timezones.pyx, with regression coverage across tslibs and dtype parsing.',
    status: 'open',
    url: 'https://github.com/pandas-dev/pandas/pull/71490',
    date: 'Oct 2026',
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
    date: 'November 2026',
    imageUrl: asset('certificates/nasa_space_apps_2026.webp'),
    verified: true,
    type: 'achievement',
    description:
      'Participated in the global NASA International Space Apps Challenge 2026, collaborating on space data solutions and engineering challenges using open data.',
    badgeColor: '#00a6c4',
  },
  {
    id: 'appsec-practitioner-v2',
    title: 'Certified AppSec Practitioner (CAP) V2',
    issuer: 'The SecOps Group',
    date: 'April 2025',
    verified: true,
    type: 'certification',
    description:
      'Certification validating knowledge of application security principles, defensive architecture, secure data handling, and vulnerability assessment.',
    badgeColor: '#7357ff',
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
    badgeColor: '#0b9e73',
  },
  {
    id: 'fullstack-dev',
    title: 'Full Stack Web Development',
    issuer: 'Information Technology Institute (ITI)',
    date: 'August 2025',
    verified: true,
    type: 'certification',
    description:
      'Intensive program covering modern frontend development, backend API architecture, relational database management, and deployment fundamentals.',
    badgeColor: '#ff7a2f',
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
    badgeColor: '#e8478c',
  },
];

export type RoadmapStatus = 'completed' | 'explored' | 'current' | 'next' | 'planned';

export interface RoadmapMilestone {
  id: string;
  phase: string;
  title: string;
  description: string;
  skills: string[];
  icon: string;
  color: string;
  status: RoadmapStatus;
  evidence?: string;
  learningObjectives?: string[];
  businessRelevance?: string;
  useCases?: string[];
  connections?: { targetId: string; label: string }[];
}

export const skillEcosystemRoles: Record<string, { role: string; layer: string; relatedProject?: string }> = {
  Python: { role: 'General-purpose data manipulation, ETL scripting, and pipeline automation', layer: 'Compute & Scripting', relatedProject: 'retailflow-pipeline' },
  SQL: { role: 'Declarative data extraction, relational transformations, and analytical aggregations', layer: 'Query Engine', relatedProject: 'salespulse' },
  'ETL/ELT': { role: 'Extraction, transformation, and idempotent loading across lakehouse architectures', layer: 'Pipeline Pattern', relatedProject: 'retailflow-pipeline' },
  'Data Pipelines': { role: 'Automated, observable DAG execution with circuit breakers and schema verification', layer: 'Architecture', relatedProject: 'retailflow-pipeline' },
  'Data Quality': { role: 'Automated schema validation, anomaly detection, null tests, and SLA thresholds', layer: 'Governance', relatedProject: 'retailflow-pipeline' },
  'Apache Spark': { role: 'Distributed in-memory computation, Catalyst optimization, and shuffle execution', layer: 'Distributed Compute', relatedProject: 'spark-docker' },
  Hadoop: { role: 'Foundational distributed storage (HDFS) and compute resource allocation (YARN)', layer: 'Big Data Ecosystem' },
  HDFS: { role: 'Distributed block-level storage with multi-node replication and fault tolerance', layer: 'Storage Engine' },
  YARN: { role: 'Cluster resource negotiation and multi-tenant job scheduling at scale', layer: 'Cluster Management' },
  MapReduce: { role: 'Batch two-stage distributed computation paradigm for large datasets', layer: 'Processing Model' },
  'Apache Airflow': { role: 'Programmatic DAG orchestration, scheduler state machines, and task retries', layer: 'Orchestration' },
  PostgreSQL: { role: 'ACID-compliant relational database with advanced indexing and query optimization', layer: 'Relational Store', relatedProject: 'retailflow-pipeline' },
  DuckDB: { role: 'Embedded columnar analytical OLAP engine with zero-copy vectorized execution', layer: 'Analytical Engine', relatedProject: 'retailflow-pipeline' },
  SQLite: { role: 'Serverless relational database for deterministic analytical queries and testing', layer: 'Embedded Database', relatedProject: 'salespulse' },
  Parquet: { role: 'Columnar storage format with snappy compression, dictionary encoding, and statistics', layer: 'Storage Format', relatedProject: 'retailflow-pipeline' },
  dbt: { role: 'Version-controlled SQL transformations, automated data testing, and lineage graphs', layer: 'Data Modeling', relatedProject: 'retailflow-pipeline' },
  Pandas: { role: 'DataFrame manipulation, time series analysis, and structured file munging', layer: 'Data Analysis', relatedProject: 'mergemate' },
  Streamlit: { role: 'Interactive analytical dashboards and real-time operational telemetry monitoring', layer: 'Visualization', relatedProject: 'retailflow-pipeline' },
  Plotly: { role: 'Interactive charting engine for multi-dimensional business KPI exploratory dashboards', layer: 'Visualization', relatedProject: 'salespulse' },
  Docker: { role: 'Containerized environments for isolated reproducible local clusters and microservices', layer: 'Infrastructure', relatedProject: 'spark-docker' },
  Git: { role: 'Distributed version control and collaboration for infrastructure and pipeline code', layer: 'Developer Tooling' },
  GitHub: { role: 'CI/CD pipeline automation, automated testing, and open-source contribution', layer: 'Developer Tooling' },
  Linux: { role: 'Kernel-level process management, cron jobs, file systems, and bash scripting', layer: 'Operating System' },
  'Database Internals': { role: 'Deep study of storage pages, write-ahead logs (WAL), and query planner execution', layer: 'Core Systems' },
  'Distributed Systems': { role: 'Consensus protocols (Raft/Paxos), partition tolerance, and network fault models', layer: 'Core Systems' },
  'Storage Engines': { role: 'B-Tree vs. LSM-Tree trade-offs for write-heavy vs. read-heavy data workloads', layer: 'Core Systems' },
  Indexing: { role: 'B-Trees, Hash indexes, and composite covering indexes for logarithmic query lookups', layer: 'Database Architecture' },
  'Concurrency Control': { role: 'Multi-Version Concurrency Control (MVCC), transaction isolation, and locking protocols', layer: 'Transaction Management' },
  'Apache Kafka': { role: 'Distributed pub/sub event streaming with partitioned logs and consumer rebalancing', layer: 'Real-Time Streaming (Future Goal)' },
  'Cloud Storage': { role: 'Object storage (S3/GCS/Blob) with lifecycle policies, tiering, and data lakes', layer: 'Cloud Infrastructure (Future Goal)' },
};

/** @deprecated Use roadmapMilestones instead — kept for backward compat */
export interface TimelineEntry {
  id: string;
  phase: string;
  title: string;
  description: string;
  skills: string[];
  icon: string;
  color: string;
}

export const roadmapMilestones: RoadmapMilestone[] = [
  {
    id: 'fundamentals',
    phase: 'Foundation',
    title: 'Programming & Data Fundamentals',
    description: 'Started with Python and foundational computer science principles. Built deep understanding of data structures, algorithmic complexity, and clean code architecture.',
    skills: ['Python', 'Data Structures', 'Algorithmic Thinking'],
    icon: 'code',
    color: '#2f55ff',
    status: 'completed',
    evidence: 'Applied in every pipeline and project on this site — from ingestion scripts to reusable validation utilities.',
    learningObjectives: [
      'Core Python programming and OOP design principles',
      'Data structures and algorithmic complexity (Big-O analysis)',
      'Clean code architecture, modular packaging, and unit testing patterns',
    ],
    businessRelevance: 'Programming fundamentals form the base layer for every data system — from scripting ETL logic to authoring reusable framework code.',
    useCases: ['ETL scripting', 'Data validation logic', 'Automation utilities'],
    connections: [{ targetId: 'sql-databases', label: 'Python + SQL → Foundation for Data Engineering' }],
  },
  {
    id: 'sql-databases',
    phase: 'Databases',
    title: 'SQL & Database Systems',
    description: 'Mastered relational database modeling, complex SQL analytical queries, indexing mechanisms, and relational integrity. Began studying how databases structure disk storage and handle transactions.',
    skills: ['SQL', 'PostgreSQL', 'SQLite', 'Relational Design'],
    icon: 'database',
    color: '#7357ff',
    status: 'completed',
    evidence: 'Relational modeling and analytical SQL used in the RetailFlow and SalesPulse projects.',
    learningObjectives: [
      'Relational modeling and normalization',
      'Complex analytical SQL queries',
      'Index design and query plan analysis',
      'Transaction isolation and integrity',
    ],
    businessRelevance: 'SQL is the universal language of analytical workloads. Understanding how databases execute queries is critical to building performant data systems.',
    useCases: ['Analytical reporting', 'Data warehousing', 'Application backends'],
    connections: [{ targetId: 'fundamentals', label: 'Python + SQL → Data pipeline scripting' }],
  },
  {
    id: 'etl-engineering',
    phase: 'Data Engineering',
    title: 'ETL / ELT & Pipeline Architecture',
    description: 'Engineered production-grade data pipelines focusing on multi-source extraction, transformation modeling, schema drift detection, idempotent warehouse loading, and data quality circuit breakers.',
    skills: ['ETL/ELT', 'Data Pipelines', 'Data Quality', 'dbt'],
    icon: 'arrow-right-left',
    color: '#7357ff',
    status: 'completed',
    evidence: 'RetailFlow Pipeline — an 11-step ELT build with schema checks, idempotent loads and quality gates.',
    learningObjectives: [
      'Multi-source data extraction patterns',
      'Schema drift detection at ingestion time',
      'Idempotent load strategies',
      'dbt transformation modeling and testing',
      'Data quality circuit breakers',
    ],
    businessRelevance: 'Reliable data pipelines are the backbone of analytics. Schema validation and idempotent loading prevent the silent data corruption that breaks downstream reports.',
    useCases: ['Enterprise data platforms', 'BI and reporting infrastructure', 'Data lake ingestion'],
    connections: [{ targetId: 'sql-databases', label: 'SQL + ETL → Warehouse loading' }],
  },
  {
    id: 'big-data',
    phase: 'Big Data',
    title: 'Hadoop Ecosystem',
    description: 'Explored distributed file systems and resource orchestration: HDFS for block storage, YARN for cluster management, and MapReduce paradigms for batch processing execution.',
    skills: ['Hadoop', 'HDFS', 'YARN', 'MapReduce'],
    icon: 'hard-drive',
    color: '#0b9e73',
    status: 'explored',
    evidence: 'Studied HDFS block storage, YARN scheduling and MapReduce — concepts explored, not run as a production cluster.',
    learningObjectives: [
      'HDFS block storage architecture',
      'YARN resource management',
      'MapReduce execution model',
      'Data locality and rack awareness',
    ],
    businessRelevance: 'The Hadoop ecosystem introduced the distributed storage and processing paradigms that power modern big data infrastructure.',
    useCases: ['Batch data processing', 'Distributed storage', 'Cluster resource management'],
    connections: [{ targetId: 'etl-engineering', label: 'ETL at scale → Distributed processing' }],
  },
  {
    id: 'spark',
    phase: 'Spark',
    title: 'Apache Spark & Distributed Computing',
    description: 'Built distributed standalone Spark clusters with Docker Compose. Analyzed execution internals: DAG compilation, shuffle operations, partition sizing, and Catalyst query optimization.',
    skills: ['Apache Spark', 'PySpark', 'Docker', 'Distributed Systems'],
    icon: 'cpu',
    color: '#ff7a2f',
    status: 'completed',
    evidence: 'Spark-Docker Lab — a working standalone cluster with DAG, shuffle and Catalyst optimization exercises.',
    learningObjectives: [
      'Spark execution architecture (DAGs, Stages, Tasks)',
      'Shuffle mechanics and partition tuning',
      'Catalyst optimizer and query planning',
      'Docker-based cluster deployment',
    ],
    businessRelevance: 'Spark is the dominant engine for large-scale data processing, enabling batch and streaming workloads with unified APIs.',
    useCases: ['Large-scale data transformations', 'Machine learning pipelines', 'Streaming analytics'],
    connections: [
      { targetId: 'big-data', label: 'Hadoop → Spark: next-gen memory-speed compute' },
      { targetId: 'kafka', label: 'Apache Spark + Apache Kafka → Real-Time Stream Processing' },
    ],
  },
  {
    id: 'orchestration',
    phase: 'Orchestration',
    title: 'Workflow Orchestration with Airflow',
    description: 'Designed Directed Acyclic Graphs (DAGs) in Apache Airflow for robust workflow scheduling. Studied scheduler heartbeats, executor architectures, backfills, and task dependency graphs.',
    skills: ['Apache Airflow', 'DAGs', 'Task Lifecycle', 'Observability'],
    icon: 'workflow',
    color: '#e8478c',
    status: 'explored',
    evidence: 'Studied scheduler and executor architecture, and contributed a docs + regression test to Apache Airflow (PR #75453).',
    learningObjectives: [
      'DAG design and dependency modeling',
      'Scheduler internals and heartbeat loops',
      'Executor architectures (Local, Celery, Kubernetes)',
      'Backfill, retry, and SLA monitoring',
    ],
    businessRelevance: 'Orchestration is what transforms individual scripts into observable, retryable, production-grade workflows.',
    useCases: ['Pipeline scheduling', 'SLA monitoring', 'Cross-system data orchestration'],
    connections: [
      { targetId: 'etl-engineering', label: 'Airflow orchestrates ETL pipelines' },
      { targetId: 'kafka', label: 'Airflow + Kafka → Orchestrated real-time streaming' },
    ],
  },
  {
    id: 'systems',
    phase: 'Systems',
    title: 'Database Internals & Distributed Systems',
    description: 'Actively studying data system architectures: B-Tree vs. LSM-Tree storage engines, Write-Ahead Logging (WAL), MVCC concurrency control, and distributed consensus algorithms.',
    skills: ['Storage Engines', 'B-Tree Indexing', 'Concurrency Control', 'Distributed Internals'],
    icon: 'book-open',
    color: '#e3ac1f',
    status: 'current',
    evidence: 'Active study — B-Tree/LSM storage, WAL, MVCC and consensus — applied to query and storage decisions in projects.',
    learningObjectives: [
      'B-Tree vs. LSM-Tree storage engine trade-offs',
      'Write-Ahead Logging and crash recovery',
      'MVCC and transaction isolation',
      'Distributed consensus (Raft, Paxos)',
      'CAP theorem and partition tolerance',
    ],
    businessRelevance: 'Understanding how systems work internally is what separates troubleshooting from guessing. These fundamentals explain why queries are slow and how data can be lost.',
    useCases: ['System design decisions', 'Performance debugging', 'Architecture reviews'],
    connections: [{ targetId: 'sql-databases', label: 'SQL → Deep dive into engine internals' }],
  },
  {
    id: 'kafka',
    phase: 'Streaming',
    title: 'Apache Kafka — Distributed Event Streaming',
    description: 'Learn Apache Kafka as a distributed event streaming platform and understand how it supports real-time data pipelines and event-driven architectures.',
    skills: ['Apache Kafka', 'Event Streaming', 'Real-Time Pipelines', 'Pub/Sub'],
    icon: 'radio',
    color: '#00a6c4',
    status: 'next',
    learningObjectives: [
      'Event Streaming Fundamentals',
      'Producers and Consumers',
      'Topics and Partitions',
      'Brokers and Clusters',
      'Consumer Groups',
      'Offsets and Consumer Rebalancing',
      'Replication and Fault Tolerance',
      'Delivery Semantics (at-least-once, exactly-once)',
      'Kafka Architecture and Internals',
      'Kafka Integration with Apache Spark and Airflow',
      'Building a Practical Real-Time Data Pipeline',
    ],
    businessRelevance: 'Kafka enables real-time event ingestion, decoupled services, scalable data pipelines, and near-real-time analytics — the foundation of modern event-driven data infrastructure.',
    useCases: [
      'Real-time event ingestion',
      'Decoupled microservice communication',
      'Change Data Capture (CDC)',
      'Stream processing with Spark Structured Streaming',
    ],
    connections: [
      { targetId: 'spark', label: 'Apache Spark + Apache Kafka → Real-Time Stream Processing' },
      { targetId: 'orchestration', label: 'Airflow + Kafka → Orchestrated streaming' },
      { targetId: 'cloud-storage', label: 'Kafka → Cloud Storage → Scalable Data Lake' },
    ],
  },
  {
    id: 'cloud-storage',
    phase: 'Cloud',
    title: 'Cloud Storage & Cloud Data Infrastructure',
    description: 'Understand cloud-based object storage and how modern data engineering platforms use cloud infrastructure for scalable and cost-effective data storage.',
    skills: ['Object Storage', 'AWS S3', 'Azure Blob', 'GCS', 'Data Lake Architecture'],
    icon: 'cloud',
    color: '#9a7bff',
    status: 'planned',
    learningObjectives: [
      'Object Storage Fundamentals',
      'Buckets and Objects',
      'Amazon S3 Concepts',
      'Azure Blob Storage',
      'Google Cloud Storage',
      'Data Lake Architecture',
      'Parquet and Columnar Storage',
      'Storage Classes and Lifecycle Policies',
      'Access Control and IAM Fundamentals',
      'Data Lake vs Data Warehouse',
      'Cloud Storage Integration with Spark and Data Pipelines',
      'Cost, Scalability, Durability, and Performance Trade-offs',
    ],
    businessRelevance: 'Cloud storage supports scalable data lakes, analytical workloads, data retention, and cost-efficient storage infrastructure — the modern standard for enterprise data platforms.',
    useCases: [
      'Scalable data lake architecture',
      'Cold/warm/hot storage tiering',
      'Cross-cloud data portability',
      'Columnar analytics with Parquet + Spark',
    ],
    connections: [
      { targetId: 'kafka', label: 'Kafka → Cloud Storage → Scalable Data Lake' },
      { targetId: 'spark', label: 'Cloud Storage + Parquet + Spark → Scalable Data Lake Architecture' },
    ],
  },
];

/** @deprecated Backward compat alias */
export const learningTimeline: TimelineEntry[] = roadmapMilestones.map((m) => ({
  id: m.id,
  phase: m.phase,
  title: m.title,
  description: m.description,
  skills: m.skills,
  icon: m.icon,
  color: m.color,
}));

export const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Open Source', href: '#open-source' },
  { label: 'Roadmap', href: '#journey' },
  { label: 'Play', href: '#play' },
  { label: 'Contact', href: '#contact' },
] as const;
