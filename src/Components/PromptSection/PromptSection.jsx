import React, { useMemo, useState } from "react";
import {
  Sparkles,
  Code2,
  BookOpen,
  WandSparkles,
  ClipboardCheck,
  FlaskConical,
  Search,
  GraduationCap,
  BrainCircuit,
  Copy,
  Check,
  ChevronRight,
  ChevronDown,
  RotateCcw,
  Lightbulb,
  Target,
  Layers,
  ShieldCheck,
  Zap,
  Menu,
  X,
} from "lucide-react";
import "./PromptSection.css";

const MODULES = [
  { id: "generator", title: "Component Generator", subtitle: "Create React components", icon: Code2 },
  { id: "best-practices", title: "Best Practices 2026", subtitle: "Professional React standards", icon: Sparkles },
  { id: "review", title: "Component Review", subtitle: "Review and improve code", icon: Search },
  { id: "ready-code", title: "Ready-to-Implement", subtitle: "Build a practical solution", icon: WandSparkles },
  { id: "checklist", title: "Quality Checklist", subtitle: "Validate every component", icon: ClipboardCheck },
  { id: "ab-testing", title: "A/B Testing", subtitle: "Compare two versions", icon: FlaskConical },
  { id: "examples", title: "Component Examples", subtitle: "Learn from examples", icon: Layers },
  { id: "beginner", title: "Beginner Guide", subtitle: "Learn React components", icon: GraduationCap },
  { id: "advanced", title: "Advanced Techniques", subtitle: "Level up your skills", icon: BrainCircuit },
];

const CHECKLIST = [
  {
    title: "Before you start",
    items: [
      "Define the component's purpose",
      "Identify the target audience",
      "Understand the use case",
      "Choose the expected outcome",
      "Define the project constraints",
    ],
  },
  {
    title: "Core component elements",
    items: [
      "Use clear and reusable component structure",
      "Keep props predictable and well named",
      "Handle loading, empty and error states",
      "Use semantic and accessible HTML",
      "Separate logic from presentation when useful",
      "Keep styling consistent with the project",
    ],
  },
  {
    title: "Quality checks",
    items: [
      "Check responsive layouts",
      "Check keyboard navigation",
      "Check performance and unnecessary renders",
      "Check edge cases and invalid input",
      "Check console for errors and warnings",
      "Verify component behavior",
    ],
  },
  {
    title: "Final review",
    items: [
      "Review naming and readability",
      "Remove unused code",
      "Check maintainability",
      "Document important props",
      "Test the final implementation",
    ],
  },
];

const BEST_PRACTICES = [
  {
    number: "01",
    title: "Build small, focused components",
    description:
      "Give each component one clear responsibility. Split complex interfaces into smaller pieces that can be understood, tested and reused.",
  },
  {
    number: "02",
    title: "Design predictable component APIs",
    description:
      "Use clear prop names, sensible defaults and explicit variants. Avoid components that accept too many unrelated responsibilities.",
  },
  {
    number: "03",
    title: "Use state intentionally",
    description:
      "Keep state as close as practical to where it is used. Avoid duplicated state and derive values when they can be calculated.",
  },
  {
    number: "04",
    title: "Prioritize accessibility",
    description:
      "Use semantic HTML, labels, keyboard support, visible focus states and appropriate ARIA attributes where needed.",
  },
  {
    number: "05",
    title: "Measure before optimizing",
    description:
      "Profile real performance issues before adding memoization. Optimize expensive work and avoid unnecessary complexity.",
  },
];

const EXAMPLES = [
  {
    title: "Product Card",
    type: "E-commerce",
    description: "Displays product information, price, image and a clear purchase action.",
    good: "Reusable product data, clear visual hierarchy, accessible action buttons.",
    bad: "Hardcoded product details, unclear button labels, missing image fallback.",
    takeaway: "Keep product data separate from the card's presentation.",
  },
  {
    title: "Navigation Bar",
    type: "Website UI",
    description: "Provides consistent navigation between the main sections of a website.",
    good: "Responsive layout, semantic links, clear active state and keyboard support.",
    bad: "Too many nested conditions, inaccessible dropdowns, unclear mobile behavior.",
    takeaway: "Treat desktop and mobile navigation as one coherent experience.",
  },
  {
    title: "Form Component",
    type: "User Input",
    description: "Collects user information and provides validation feedback.",
    good: "Associated labels, understandable errors, clear submission state.",
    bad: "Validation only after submission, missing error descriptions, no loading state.",
    takeaway: "Make the form's current state obvious to the user.",
  },
];

const BEGINNER_STEPS = [
  {
    title: "What is a React component?",
    text: "A component is a reusable piece of interface. It can receive data through props and return JSX describing what should appear on screen.",
  },
  {
    title: "Understand the basic terminology",
    text: "JSX describes the UI, props pass information into a component, state stores changing information, and events respond to user actions.",
  },
  {
    title: "Create your first component",
    text: "Start with a small function component, return JSX, import it into another file and render it inside your application.",
  },
  {
    title: "Make it reusable",
    text: "Replace hardcoded values with props. Keep the component focused and use sensible defaults for optional properties.",
  },
];

const ADVANCED_TOPICS = [
  {
    title: "Composition patterns",
    text: "Build flexible interfaces by combining smaller components instead of creating one component with many unrelated modes.",
  },
  {
    title: "Custom hooks",
    text: "Extract reusable stateful logic into custom hooks when the same behavior is needed in multiple components.",
  },
  {
    title: "Performance profiling",
    text: "Use profiling tools to identify expensive renders. Apply memoization only when it solves a measured problem.",
  },
  {
    title: "Design systems",
    text: "Create consistent tokens, variants and component APIs so a growing application remains visually and technically coherent.",
  },
  {
    title: "Testing strategy",
    text: "Test user-visible behavior, important edge cases and accessibility rather than relying only on implementation details.",
  },
];

const buildPrompt = (data) => {
  return `ROLE
Act as an expert React.js developer, component architect and coding mentor.

TASK
Create a professional React component based on the following requirements.

PROJECT DETAILS
Industry / niche: ${data.industry || "Not specified"}
Component use case: ${data.useCase || "Not specified"}
Target audience: ${data.audience || "Not specified"}
Main goal: ${data.goal || "Not specified"}
Tone / visual direction: ${data.tone || "Modern and professional"}
Expected complexity: ${data.complexity || "Professional"}
Preferred styling: ${data.styling || "CSS Modules"}
Additional requirements: ${data.extra || "None specified"}

REQUIREMENTS
1. Analyze the use case before writing code.
2. Recommend a suitable component structure.
3. Generate clean, reusable and maintainable React code.
4. Explain the important props, state and event handlers.
5. Include responsive behavior and accessibility considerations.
6. Handle loading, empty and error states where relevant.
7. Explain how to integrate the component into an existing React project.
8. Identify common mistakes and how to avoid them.
9. Include a practical implementation checklist.
10. Suggest meaningful tests and ways to measure success.

OUTPUT FORMAT
- Requirement analysis
- Recommended architecture
- Complete implementation
- Styling
- Integration instructions
- Quality checklist
- Improvement opportunities

IMPORTANT
Do not invent project files, APIs or dependencies. Clearly identify assumptions and provide complete code for every file required.`;
};

function PromptSection() {
  const [activeModule, setActiveModule] = useState("generator");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [expandedBeginner, setExpandedBeginner] = useState(0);
  const [checkedItems, setCheckedItems] = useState({});
  const [versionA, setVersionA] = useState("A simple component with basic props and minimal styling.");
  const [versionB, setVersionB] = useState("A reusable component with variants, responsive styling and accessibility support.");
  const [abGoal, setAbGoal] = useState("Improve usability and conversion");
  const [reviewCode, setReviewCode] = useState("");
  const [reviewAudience, setReviewAudience] = useState("Intermediate React developers");
  const [form, setForm] = useState({
    industry: "",
    useCase: "",
    audience: "",
    goal: "",
    tone: "Modern and premium",
    complexity: "Professional",
    styling: "CSS Modules",
    extra: "",
  });

  const generatedPrompt = useMemo(() => buildPrompt(form), [form]);

  const totalChecklistItems = CHECKLIST.reduce(
    (total, group) => total + group.items.length,
    0
  );
  const completedItems = Object.values(checkedItems).filter(Boolean).length;
  const progress = Math.round((completedItems / totalChecklistItems) * 100);

  const updateForm = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
      window.prompt("Copy your text:", text);
    }
  };

  const toggleChecklist = (key) => {
    setCheckedItems((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  };

  const selectModule = (id) => {
    setActiveModule(id);
    setMobileMenuOpen(false);
  };

  const moduleTitle =
    MODULES.find((module) => module.id === activeModule)?.title || "Workspace";

  const reviewPrompt = `Act as a senior React component reviewer.

Review the following code for: effectiveness, impact, clarity, structure, reusability, accessibility, responsiveness, performance and maintainability.

Target audience: ${reviewAudience}

CODE TO REVIEW:
${reviewCode || "[Paste your React component code here]"}

Provide:
1. Overall assessment
2. What works well
3. Problems and risks
4. Specific improvements
5. A complete improved version
6. Explanation of the changes
7. A final quality checklist.`;

  const abPrompt = `Act as a UX and React component experimentation specialist.

EXPERIMENT GOAL:
${abGoal}

VERSION A:
${versionA}

VERSION B:
${versionB}

Compare both versions. Explain their differences, strengths and weaknesses, expected user impact, and possible risks.

Then define:
- The primary success metric
- Secondary metrics
- A fair testing method
- What evidence would support choosing A or B
- How to interpret inconclusive results.

Do not claim a winner without actual test data.`;

  const readyPrompt = `Act as an expert React developer.

Create a ready-to-implement React component for this project.

Industry / niche: ${form.industry || "[Specify industry]"}
Use case: ${form.useCase || "[Describe use case]"}
Audience: ${form.audience || "[Specify audience]"}
Desired outcome: ${form.goal || "[Specify outcome]"}
Timeline: [Specify timeline]
Technical constraints: [Specify constraints]

Deliver complete files, responsive CSS, accessibility support, integration instructions, testing guidance and a final implementation checklist. Clearly state assumptions.`;

  const renderModule = () => {
    switch (activeModule) {
      case "generator":
        return (
          <div className="ps-module-content">
            <div className="ps-module-heading">
              <span className="ps-eyebrow">BUILD SOMETHING GREAT</span>
              <h2>React Component Generator</h2>
              <p>Describe your project and create a detailed prompt for your next React component.</p>
            </div>

            <div className="ps-form-grid">
              <label className="ps-field">
                <span>Industry / niche</span>
                <input name="industry" value={form.industry} onChange={updateForm} placeholder="e.g. Fashion, e-commerce, education" />
              </label>
              <label className="ps-field">
                <span>Component use case</span>
                <input name="useCase" value={form.useCase} onChange={updateForm} placeholder="e.g. Product card, dashboard widget" />
              </label>
              <label className="ps-field">
                <span>Target audience</span>
                <input name="audience" value={form.audience} onChange={updateForm} placeholder="Who will use this component?" />
              </label>
              <label className="ps-field">
                <span>Main goal</span>
                <input name="goal" value={form.goal} onChange={updateForm} placeholder="What should it achieve?" />
              </label>
              <label className="ps-field">
                <span>Visual tone</span>
                <select name="tone" value={form.tone} onChange={updateForm}>
                  <option>Modern and premium</option>
                  <option>Minimal and clean</option>
                  <option>Bold and creative</option>
                  <option>Corporate and professional</option>
                  <option>Friendly and playful</option>
                </select>
              </label>
              <label className="ps-field">
                <span>Complexity</span>
                <select name="complexity" value={form.complexity} onChange={updateForm}>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Professional</option>
                  <option>Advanced</option>
                </select>
              </label>
              <label className="ps-field">
                <span>Styling preference</span>
                <select name="styling" value={form.styling} onChange={updateForm}>
                  <option>CSS Modules</option>
                  <option>Regular CSS</option>
                  <option>Tailwind CSS</option>
                  <option>Styled Components</option>
                </select>
              </label>
              <label className="ps-field ps-field-full">
                <span>Additional requirements</span>
                <textarea name="extra" value={form.extra} onChange={updateForm} rows="3" placeholder="Describe extra features, restrictions or project details..." />
              </label>
            </div>

            <div className="ps-output-card">
              <div className="ps-output-header">
                <div>
                  <span className="ps-eyebrow">GENERATED INSTRUCTION</span>
                  <h3>Your component prompt</h3>
                </div>
                <button className="ps-copy-button" onClick={() => copyText(generatedPrompt)}>
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? "Copied" : "Copy prompt"}
                </button>
              </div>
              <pre className="ps-prompt-output">{generatedPrompt}</pre>
            </div>
          </div>
        );

      case "best-practices":
        return (
          <div className="ps-module-content">
            <div className="ps-module-heading">
              <span className="ps-eyebrow">WRITE BETTER REACT</span>
              <h2>React Best Practices</h2>
              <p>Five practical principles for building maintainable React interfaces.</p>
            </div>
            <div className="ps-practice-list">
              {BEST_PRACTICES.map((item) => (
                <article className="ps-practice-card" key={item.number}>
                  <span className="ps-practice-number">{item.number}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="ps-info-panel">
              <Lightbulb size={21} />
              <div>
                <h3>Remember</h3>
                <p>There is no universal component architecture. Choose patterns based on your application's needs, team and measured constraints.</p>
              </div>
            </div>
          </div>
        );

      case "review":
        return (
          <div className="ps-module-content">
            <div className="ps-module-heading">
              <span className="ps-eyebrow">IMPROVE YOUR CODE</span>
              <h2>Component Review</h2>
              <p>Prepare a structured review prompt for an existing React component.</p>
            </div>
            <label className="ps-field">
              <span>Target audience</span>
              <input value={reviewAudience} onChange={(event) => setReviewAudience(event.target.value)} />
            </label>
            <label className="ps-field ps-review-code">
              <span>Paste your React component code</span>
              <textarea rows="12" value={reviewCode} onChange={(event) => setReviewCode(event.target.value)} placeholder={"import React from 'react';\n\nfunction MyComponent() {\n  return <div>Hello world</div>;\n}\n\nexport default MyComponent;"} />
            </label>
            <div className="ps-output-card">
              <div className="ps-output-header">
                <div>
                  <span className="ps-eyebrow">REVIEW INSTRUCTIONS</span>
                  <h3>Code review prompt</h3>
                </div>
                <button className="ps-copy-button" onClick={() => copyText(reviewPrompt)}>
                  <Copy size={16} /> Copy prompt
                </button>
              </div>
              <pre className="ps-prompt-output">{reviewPrompt}</pre>
            </div>
          </div>
        );

      case "ready-code":
        return (
          <div className="ps-module-content">
            <div className="ps-module-heading">
              <span className="ps-eyebrow">FROM IDEA TO IMPLEMENTATION</span>
              <h2>Ready-to-Implement Component</h2>
              <p>Use your project details to prepare a complete implementation request.</p>
            </div>
            <div className="ps-ready-steps">
              {["Define the use case", "Specify the expected outcome", "Set technical constraints", "Generate complete files", "Integrate and test"].map((step, index) => (
                <div className="ps-ready-step" key={step}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{step}</p>
                  <Check size={17} />
                </div>
              ))}
            </div>
            <div className="ps-output-card">
              <div className="ps-output-header">
                <div>
                  <span className="ps-eyebrow">IMPLEMENTATION BRIEF</span>
                  <h3>Ready-to-use prompt</h3>
                </div>
                <button className="ps-copy-button" onClick={() => copyText(readyPrompt)}>
                  <Copy size={16} /> Copy prompt
                </button>
              </div>
              <pre className="ps-prompt-output">{readyPrompt}</pre>
            </div>
          </div>
        );

      case "checklist":
        return (
          <div className="ps-module-content">
            <div className="ps-module-heading">
              <span className="ps-eyebrow">QUALITY CONTROL</span>
              <h2>Component Quality Checklist</h2>
              <p>Track the important steps before shipping your component.</p>
            </div>
            <div className="ps-progress-card">
              <div className="ps-progress-top">
                <div>
                  <strong>{progress}%</strong>
                  <span> completed</span>
                </div>
                <span>{completedItems} / {totalChecklistItems} checks</span>
              </div>
              <div className="ps-progress-track">
                <div style={{ width: `${progress}%` }} />
              </div>
              <button className="ps-reset-button" onClick={() => setCheckedItems({})}>
                <RotateCcw size={14} /> Reset checklist
              </button>
            </div>
            <div className="ps-check-groups">
              {CHECKLIST.map((group, groupIndex) => (
                <section className="ps-check-group" key={group.title}>
                  <h3>{group.title}</h3>
                  {group.items.map((item, itemIndex) => {
                    const key = `${groupIndex}-${itemIndex}`;
                    return (
                      <label className={`ps-check-item ${checkedItems[key] ? "is-checked" : ""}`} key={key}>
                        <input type="checkbox" checked={!!checkedItems[key]} onChange={() => toggleChecklist(key)} />
                        <span className="ps-custom-check"><Check size={13} /></span>
                        <span>{item}</span>
                      </label>
                    );
                  })}
                </section>
              ))}
            </div>
          </div>
        );

      case "ab-testing":
        return (
          <div className="ps-module-content">
            <div className="ps-module-heading">
              <span className="ps-eyebrow">TEST AND LEARN</span>
              <h2>A/B Component Testing</h2>
              <p>Describe two approaches and prepare a fair comparison experiment.</p>
            </div>
            <label className="ps-field">
              <span>Experiment goal</span>
              <input value={abGoal} onChange={(event) => setAbGoal(event.target.value)} />
            </label>
            <div className="ps-ab-grid">
              <label className="ps-field ps-ab-version">
                <span><b>A</b> Version A</span>
                <textarea rows="7" value={versionA} onChange={(event) => setVersionA(event.target.value)} />
              </label>
              <label className="ps-field ps-ab-version">
                <span><b>B</b> Version B</span>
                <textarea rows="7" value={versionB} onChange={(event) => setVersionB(event.target.value)} />
              </label>
            </div>
            <div className="ps-info-panel">
              <Target size={21} />
              <div>
                <h3>Measure real outcomes</h3>
                <p>Compare the same audience and conditions. Possible metrics include task completion, conversion, errors and time to complete a task.</p>
              </div>
            </div>
            <button className="ps-primary-button" onClick={() => copyText(abPrompt)}>
              <Copy size={17} /> Copy A/B testing prompt
            </button>
          </div>
        );

      case "examples":
        return (
          <div className="ps-module-content">
            <div className="ps-module-heading">
              <span className="ps-eyebrow">LEARN BY EXAMPLE</span>
              <h2>Component Examples & Analysis</h2>
              <p>Explore common components and the decisions that make them effective.</p>
            </div>
            <div className="ps-example-grid">
              {EXAMPLES.map((example) => (
                <article className="ps-example-card" key={example.title}>
                  <span className="ps-example-type">{example.type}</span>
                  <h3>{example.title}</h3>
                  <p>{example.description}</p>
                  <div className="ps-example-detail">
                    <strong><Check size={14} /> Effective</strong>
                    <p>{example.good}</p>
                  </div>
                  <div className="ps-example-detail ps-example-warning">
                    <strong><ShieldCheck size={14} /> Watch out for</strong>
                    <p>{example.bad}</p>
                  </div>
                  <div className="ps-example-takeaway">
                    <strong>Key takeaway</strong>
                    <p>{example.takeaway}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        );

      case "beginner":
        return (
          <div className="ps-module-content">
            <div className="ps-module-heading">
              <span className="ps-eyebrow">START WITH THE BASICS</span>
              <h2>React Beginner Guide</h2>
              <p>Understand the fundamentals and build your first reusable components.</p>
            </div>
            <div className="ps-learning-list">
              {BEGINNER_STEPS.map((step, index) => (
                <article className={`ps-learning-item ${expandedBeginner === index ? "is-open" : ""}`} key={step.title}>
                  <button onClick={() => setExpandedBeginner(expandedBeginner === index ? -1 : index)}>
                    <span className="ps-learning-number">0{index + 1}</span>
                    <strong>{step.title}</strong>
                    <ChevronDown size={18} />
                  </button>
                  {expandedBeginner === index && <p>{step.text}</p>}
                </article>
              ))}
            </div>
            <div className="ps-info-panel">
              <BookOpen size={21} />
              <div>
                <h3>Suggested learning path</h3>
                <p>Learn JavaScript fundamentals, JSX, props, state, events, hooks and component composition. Then practice by building small real-world interfaces.</p>
              </div>
            </div>
          </div>
        );

      case "advanced":
        return (
          <div className="ps-module-content">
            <div className="ps-module-heading">
              <span className="ps-eyebrow">FOR EXPERIENCED DEVELOPERS</span>
              <h2>Advanced React Techniques</h2>
              <p>Explore patterns and engineering practices for larger React applications.</p>
            </div>
            <div className="ps-advanced-grid">
              {ADVANCED_TOPICS.map((topic, index) => (
                <article className="ps-advanced-card" key={topic.title}>
                  <span>0{index + 1}</span>
                  <h3>{topic.title}</h3>
                  <p>{topic.text}</p>
                </article>
              ))}
            </div>
            <div className="ps-info-panel">
              <Zap size={21} />
              <div>
                <h3>Professional mindset</h3>
                <p>Choose architecture based on evidence, keep complexity under control and optimize for the people who maintain the application.</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="ps-section" id="react-component-studio">
      <div className="ps-container">
        <div className="ps-hero">
          <div className="ps-hero-glow" />
          <div className="ps-hero-content">
            <span className="ps-hero-label"><Sparkles size={14} /> LANADA DEVELOPER STUDIO</span>
            <h1>Build Better <span>React Components.</span></h1>
            <p>A practical workspace for planning, creating, reviewing and improving React components.</p>
            <div className="ps-hero-stats">
              <div><strong>09</strong><span>Learning modules</span></div>
              <div><strong>01</strong><span>Interactive workspace</span></div>
              <div><strong>∞</strong><span>Ideas to build</span></div>
            </div>
          </div>
          <div className="ps-hero-art" aria-hidden="true">
            <div className="ps-orbit ps-orbit-one" />
            <div className="ps-orbit ps-orbit-two" />
            <div className="ps-code-tile"><Code2 size={52} /></div>
            <div className="ps-floating-icon ps-floating-one"><Sparkles size={20} /></div>
            <div className="ps-floating-icon ps-floating-two"><Layers size={20} /></div>
          </div>
        </div>

        <div className="ps-workspace">
          <div className="ps-mobile-toolbar">
            <span><Menu size={17} /> {moduleTitle}</span>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle modules">
              {mobileMenuOpen ? <X size={19} /> : <ChevronDown size={19} />}
            </button>
          </div>

          <aside className={`ps-sidebar ${mobileMenuOpen ? "ps-sidebar-open" : ""}`}>
            <div className="ps-sidebar-heading">
              <span>YOUR WORKSPACE</span>
              <small>COMPONENT LAB</small>
            </div>
            <nav className="ps-module-nav" aria-label="React learning modules">
              {MODULES.map((module, index) => {
                const Icon = module.icon;
                return (
                  <button
                    key={module.id}
                    className={`ps-nav-item ${activeModule === module.id ? "active" : ""}`}
                    onClick={() => selectModule(module.id)}
                  >
                    <span className="ps-nav-icon"><Icon size={18} /></span>
                    <span className="ps-nav-text">
                      <strong>{module.title}</strong>
                      <small>{module.subtitle}</small>
                    </span>
                    <span className="ps-nav-index">{String(index + 1).padStart(2, "0")}</span>
                  </button>
                );
              })}
            </nav>
            <div className="ps-sidebar-note">
              <Lightbulb size={17} />
              <p>Good components start with clear requirements and thoughtful decisions.</p>
            </div>
          </aside>

          <main className="ps-main-panel">
            <div className="ps-panel-topbar">
              <div><span className="ps-live-dot" /> COMPONENT WORKSPACE</div>
              <span>MODULE {String(MODULES.findIndex((item) => item.id === activeModule) + 1).padStart(2, "0")} / 09</span>
            </div>
            {renderModule()}
          </main>
        </div>

        <div className="ps-bottom-banner">
          <div className="ps-bottom-icon"><BrainCircuit size={25} /></div>
          <div>
            <h3>Have an idea? Turn it into a component.</h3>
            <p>Start with the Generator, define your requirements and prepare a clear implementation brief.</p>
          </div>
          <button onClick={() => selectModule("generator")}>Start building <ChevronRight size={17} /></button>
        </div>
        <p className="ps-disclaimer">This is a front-end learning and prompt-building workspace. Code analysis and AI generation require a connected AI service or backend.</p>
      </div>
    </section>
  );
}

export default PromptSection;