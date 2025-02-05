import { EventFromConvex } from "./types"

const eventTitles = [
  // Meetings & Reviews
  "Team Meeting",
  "Client Presentation",
  "Project Review",
  "Sprint Planning",
  "Code Review",
  "Design Workshop",
  "Stakeholder Update",
  "Training Session",
  "Product Demo",
  "Strategy Discussion",
  "Brainstorming Session",
  "Technical Interview",
  "Architecture Review",
  "Bug Triage",
  "Release Planning",
  "Performance Review",
  "Team Building",
  "Budget Review",
  "Marketing Strategy",
  "Sales Pipeline Review",
  // Technical
  "Database Migration",
  "System Maintenance",
  "Security Assessment",
  "API Integration",
  "Cloud Infrastructure",
  "DevOps Planning",
  "QA Testing Session",
  "Tech Stack Review",
  "Deployment Planning",
  "Monitoring Setup",
  // Development
  "Frontend Sync",
  "Backend Planning",
  "Mobile App Review",
  "UI/UX Workshop",
  "Code Refactoring",
  "Feature Planning",
  "Bug Bash",
  "Code Documentation",
  "Testing Strategy",
  "Performance Optimization",
  // Business & Strategy
  "Quarterly Planning",
  "Market Analysis",
  "Competitor Review",
  "Innovation Workshop",
  "Risk Assessment",
  "Growth Strategy",
  "Customer Feedback",
  "Product Roadmap",
  "Partnership Meeting",
  "Investment Planning",
  // Learning & Development
  "Skill Development",
  "Knowledge Sharing",
  "Mentoring Session",
  "Career Planning",
  "Industry Trends",
  "Best Practices",
  "Tool Training",
  "Leadership Workshop",
  "Certification Prep",
  "New Tech Review"
]

const locations = [
  // Physical Locations
  "Conference Room A",
  "Meeting Room B",
  "Innovation Lab",
  "Training Center",
  "Main Office",
  "Client Site",
  "Collaboration Space",
  "Executive Boardroom",
  "Workshop Room",
  "Tech Hub",
  // Virtual Platforms
  "Virtual - Zoom",
  "Virtual - Teams",
  "Virtual - Google Meet",
  "Virtual - Slack Huddle",
  "Virtual - Discord",
  "Virtual - Webex",
  "Virtual - Skype",
  "Remote Session",
  "Hybrid Meeting Room",
  "Digital Workspace",
  null
]

const projects = [
  "Mobile App Redesign",
  "Backend Migration",
  "Frontend Optimization",
  "DevOps Pipeline",
  "AI Integration",
  "Security Audit",
  "Cloud Migration",
  "Data Analytics",
  "Customer Portal",
  "API Gateway",
  null
]

const descriptions = [
  // Project Related
  "Discussing project progress and next steps",
  "Review of current sprint goals and blockers",
  "Planning upcoming features and improvements",
  "Technical discussion about architecture changes",
  "Team sync about ongoing development work",
  "Evaluating project timeline and resource allocation",
  "Discussion about technical debt and improvements",
  "Review of project dependencies and integrations",
  "Planning for upcoming system upgrades",
  "Analysis of current system performance",
  // Development Process
  "Code quality review and best practices discussion",
  "Planning database schema modifications",
  "API design and documentation review",
  "Discussion about testing strategy and coverage",
  "Review of deployment processes and automation",
  "Security review of new features",
  "Performance optimization strategies",
  "Discussion about logging and monitoring",
  "Review of error handling and resilience",
  "Planning for scale and infrastructure needs",
  // Team & Process
  "Team collaboration and communication review",
  "Process improvement discussion",
  "Knowledge sharing session",
  "Skills development planning",
  "Team workflow optimization",
  "Discussion about development standards",
  "Review of documentation practices",
  "Planning for team training needs",
  "Discussion about tooling and automation",
  "Review of team metrics and KPIs",
  // Business & Strategy
  "Product strategy alignment",
  "Market trends and competition analysis",
  "Customer feedback review and planning",
  "Feature prioritization discussion",
  "ROI analysis of current projects",
  "Risk assessment and mitigation planning",
  "Resource allocation strategy",
  "Budget review and planning",
  "Partnership opportunities discussion",
  "Growth strategy planning",
  // Innovation & Future
  "Innovation workshop and ideation",
  "Emerging technology evaluation",
  "Future architecture planning",
  "Digital transformation strategy",
  "AI and ML implementation planning",
  "Cloud strategy discussion",
  "Mobile-first approach planning",
  "UX improvement strategies",
  "Accessibility compliance review",
  "Sustainability initiatives planning",
  null
]

const notesList = [
  ["Prepare presentation slides", "Review metrics", "Update timeline"],
  ["Bring project documentation", "Schedule follow-up"],
  ["Review previous meeting notes", "Update task board"],
  ["Prepare technical documentation", "Set up development environment"],
  ["Update project roadmap", "Review resource allocation"],
  ["Prepare demo environment", "Test new features"],
  null
]

function randomFromArray<T>(arr: (T | null)[]): T | undefined {
  const item = arr[Math.floor(Math.random() * arr.length)]
  return item === null ? undefined : item
}

function randomDuration(): number {
  // Random duration between 30 mins to 4 hours (in milliseconds)
  return Math.floor(Math.random() * (4 * 60 - 30 + 1) + 30) * 60 * 1000
}

function generateEvent(startTime: number): EventFromConvex {
  const duration = randomDuration()
  const endTime = startTime + duration

  return {
    id: Math.random().toString(36).substring(2, 15),
    title: eventTitles[Math.floor(Math.random() * eventTitles.length)],
    description: randomFromArray(descriptions),
    updatedAt: Date.now(),
    time: {
      startTime,
      endTime
    },
    location: randomFromArray(locations),
    project: randomFromArray(projects),
    notes: randomFromArray(notesList)
  }
}

// Generate dates for different periods
const pastStart = new Date("2025-01-01").getTime()
const pastEnd = new Date("2025-02-07").getTime()

const mainPeriodStart = new Date("2025-02-08").getTime()
const mainPeriodEnd = new Date("2025-04-20").getTime()

const futureStart = new Date("2025-04-21").getTime()
const futureEnd = new Date("2025-06-30").getTime()

function randomTimestamp(start: number, end: number): number {
  return Math.floor(Math.random() * (end - start) + start)
}

// Generate events
const pastEvents = Array.from({ length: 10 }, () =>
  generateEvent(randomTimestamp(pastStart, pastEnd))
)

const mainPeriodEvents = Array.from({ length: 80 }, () =>
  generateEvent(randomTimestamp(mainPeriodStart, mainPeriodEnd))
)

const futureEvents = Array.from({ length: 10 }, () =>
  generateEvent(randomTimestamp(futureStart, futureEnd))
)

export const bigCalendarEvents = [...pastEvents, ...mainPeriodEvents, ...futureEvents]
  .sort((a, b) => a.time.startTime - b.time.startTime)

