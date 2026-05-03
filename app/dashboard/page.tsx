'use client';

import { FormEvent, ReactNode, useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardList,
  GraduationCap,
  Lightbulb,
  Rocket,
  Search,
  Sparkles,
  Trash2,
  Users,
} from 'lucide-react';
import Sidebar, { RoadmapView } from '../components/Sidebar';
import { IdeaType, Roadmap, RoadmapPhase, useStore } from '../store/useStore';

const formatDate = (timestamp: number) =>
  new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(timestamp);

const titleCase = (text: string) =>
  text
    .trim()
    .split(/\s+/)
    .slice(0, 8)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

const inferAudience = (idea: string, ideaType: IdeaType) => {
  const normalized = idea.toLowerCase();

  if (normalized.includes('college') || normalized.includes('student')) {
    return 'college students, campus clubs, and early academic adopters';
  }

  if (normalized.includes('health') || normalized.includes('fitness')) {
    return 'health-conscious users, trainers, and wellness communities';
  }

  if (normalized.includes('ai') || normalized.includes('automation')) {
    return 'busy teams and individuals who want faster, automated workflows';
  }

  if (normalized.includes('food') || normalized.includes('restaurant')) {
    return 'local food buyers, small vendors, and repeat neighborhood customers';
  }

  if (ideaType === 'college') {
    return 'students, faculty mentors, project evaluators, and pilot users';
  }

  return 'early adopters with a clear pain point and willingness to try a simpler solution';
};

const buildPhases = (idea: string, ideaType: IdeaType): RoadmapPhase[] => [
  {
    stage: 'validate',
    title: 'Validate the Opportunity',
    timeline: ideaType === 'college' ? 'Week 1' : 'Weeks 1-2',
    goal: 'Prove the problem is real before investing heavily.',
    tasks: [
      {
        title: 'Define the target user',
        detail: `Write a one-page profile of who needs "${idea}" most urgently.`,
      },
      {
        title: 'Run discovery interviews',
        detail:
          ideaType === 'college'
            ? 'Interview 8-10 students, faculty, or local users and capture repeated pain points.'
            : 'Interview 12-15 potential buyers and ask what they use today, what fails, and what they would pay for.',
      },
      {
        title: 'Map competitors and substitutes',
        detail: 'List direct competitors, manual workarounds, and why your approach can be meaningfully better.',
      },
    ],
  },
  {
    stage: 'build',
    title: 'Build the MVP',
    timeline: ideaType === 'college' ? 'Weeks 2-4' : 'Weeks 3-6',
    goal: 'Create the smallest useful version that demonstrates the core promise.',
    tasks: [
      {
        title: 'Choose the core workflow',
        detail: 'Reduce the idea to one primary user journey with a clear start, result, and success moment.',
      },
      {
        title: 'Prototype the experience',
        detail:
          ideaType === 'college'
            ? 'Build a demo with enough polish for evaluation, testing, and a final presentation.'
            : 'Ship a working MVP with onboarding, the main feature, feedback capture, and basic analytics.',
      },
      {
        title: 'Test with real users',
        detail: 'Put the MVP in front of users, observe where they hesitate, and fix only the biggest blockers.',
      },
    ],
  },
  {
    stage: 'launch',
    title: 'Launch a Pilot',
    timeline: ideaType === 'college' ? 'Weeks 5-6' : 'Weeks 7-10',
    goal: 'Get real usage, testimonials, and proof that the project can survive outside the lab.',
    tasks: [
      {
        title: 'Recruit pilot users',
        detail:
          ideaType === 'college'
            ? 'Run the pilot with classmates, a department group, or one local organization.'
            : 'Start with one narrow segment and personally onboard the first 25-50 users.',
      },
      {
        title: 'Create a feedback loop',
        detail: 'Use a form, short calls, or in-app prompts to collect issues, feature requests, and outcome data.',
      },
      {
        title: 'Package the story',
        detail: 'Prepare a crisp pitch: problem, solution, traction, demo, learning, and next milestone.',
      },
    ],
  },
  {
    stage: 'scale',
    title: 'Scale the System',
    timeline: ideaType === 'college' ? 'After submission' : 'Months 3-12',
    goal: 'Turn the validated project into a repeatable product or venture.',
    tasks: [
      {
        title: 'Standardize operations',
        detail: 'Document setup, support, measurement, and delivery so the work is not dependent on one person.',
      },
      {
        title: 'Add monetization or institutional support',
        detail:
          ideaType === 'college'
            ? 'Explore grants, incubation, campus partnerships, open-source adoption, or paid pilots.'
            : 'Test subscriptions, service fees, marketplace take rate, licensing, or enterprise pilots.',
      },
      {
        title: 'Build growth channels',
        detail: 'Use case studies, referrals, partnerships, and niche communities before broad marketing.',
      },
    ],
  },
];

const generateRoadmap = (idea: string, ideaType: IdeaType): Roadmap => {
  const audience = inferAudience(idea, ideaType);
  const name = titleCase(idea);
  const projectLabel = ideaType === 'college' ? 'project' : 'business';

  return {
    id: crypto.randomUUID(),
    idea,
    type: ideaType,
    audience,
    createdAt: Date.now(),
    concept: `${name} is a ${projectLabel} concept that turns a raw idea into a focused solution for ${audience}.`,
    problem: `The current problem is that the target users either solve this manually, ignore it, or use tools that are too broad for the specific job "${idea}" is trying to handle.`,
    solution: `Start with a narrow MVP that solves one high-value workflow, proves the result quickly, and creates a clear reason for users to return.`,
    customers:
      ideaType === 'college'
        ? [
            'Primary users who will test the prototype',
            'Faculty or mentors who can validate feasibility',
            'Organizations that can provide a real-world pilot',
          ]
        : [
            'Early adopters with urgent pain',
            'Small teams or individuals already spending time or money on workarounds',
            'Partners who already reach the target audience',
          ],
    revenue:
      ideaType === 'college'
        ? [
            'Campus pilot or department sponsorship',
            'Open-source adoption with paid customization',
            'Competition, grant, or incubation funding',
          ]
        : [
            'Subscription for repeat use',
            'One-time setup fee for high-touch onboarding',
            'Partnership or licensing model after proof of demand',
          ],
    mvp: [
      'Landing page or proposal that explains the problem, audience, and outcome',
      'Clickable prototype or working demo for the core user journey',
      'Feedback form plus simple analytics for signups, usage, and completion',
      'Pilot plan with success criteria and a fixed test window',
    ],
    metrics:
      ideaType === 'college'
        ? [
            'Prototype completion rate',
            'User feedback score',
            'Number of successful pilot tests',
            'Presentation clarity and demo reliability',
          ]
        : [
            'Qualified signups',
            'Activation rate',
            'Weekly retention',
            'Willingness to pay or pilot conversion',
          ],
    risks: [
      'Problem may be too broad, so start with one specific user segment.',
      'Users may like the idea but not change behavior, so measure actual usage.',
      'MVP scope can expand quickly, so protect the first version from extra features.',
    ],
    phases: buildPhases(idea, ideaType),
  };
};

const roadmapToText = (roadmap: Roadmap) => {
  const phases = roadmap.phases
    .map(
      (phase) =>
        `${phase.title} (${phase.timeline})\nGoal: ${phase.goal}\n${phase.tasks
          .map((task) => `- ${task.title}: ${task.detail}`)
          .join('\n')}`
    )
    .join('\n\n');

  return `${roadmap.concept}\n\nProblem\n${roadmap.problem}\n\nSolution\n${roadmap.solution}\n\nMVP\n${roadmap.mvp
    .map((item) => `- ${item}`)
    .join('\n')}\n\nRoadmap\n${phases}`;
};

const StageIcon = ({ stage }: { stage: RoadmapPhase['stage'] }) => {
  const icons = {
    validate: Search,
    build: ClipboardList,
    launch: Rocket,
    scale: BarChart3,
  };
  const Icon = icons[stage];

  return <Icon size={18} />;
};

export default function Dashboard() {
  const [idea, setIdea] = useState('');
  const [ideaType, setIdeaType] = useState<IdeaType>('business');
  const [activeView, setActiveView] = useState<RoadmapView>('generator');
  const [copied, setCopied] = useState(false);
  const { roadmaps, activeRoadmapId, hasHydrated, addRoadmap, deleteRoadmap, setActiveRoadmap } =
    useStore();

  const activeRoadmap = useMemo(
    () => roadmaps.find((roadmap) => roadmap.id === activeRoadmapId) ?? roadmaps[0],
    [activeRoadmapId, roadmaps]
  );

  const handleGenerate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedIdea = idea.trim();

    if (!trimmedIdea) return;

    addRoadmap(generateRoadmap(trimmedIdea, ideaType));
    setIdea('');
    setActiveView('strategy');
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!activeRoadmap) return;

    await navigator.clipboard.writeText(roadmapToText(activeRoadmap));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const stats = {
    generated: roadmaps.length,
    business: roadmaps.filter((roadmap) => roadmap.type === 'business').length,
    college: roadmaps.filter((roadmap) => roadmap.type === 'college').length,
  };

  return (
    <div className="flex min-h-screen bg-neutral-950 font-sans text-neutral-50 selection:bg-neutral-700">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col p-5 sm:p-8 md:p-12">
        <header className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-neutral-500">
              Idea to execution
            </p>
            <h1 className="mb-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Business Roadmap Generator
            </h1>
            <p className="max-w-2xl text-base leading-7 text-neutral-500 sm:text-lg">
              Turn a startup thought, class project, or product concept into a structured
              validation, MVP, launch, and scale plan.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center sm:min-w-96">
            <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-3">
              <p className="text-2xl font-semibold">{stats.generated}</p>
              <p className="text-xs uppercase tracking-widest text-neutral-500">Roadmaps</p>
            </div>
            <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-3">
              <p className="text-2xl font-semibold">{stats.business}</p>
              <p className="text-xs uppercase tracking-widest text-neutral-500">Business</p>
            </div>
            <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-3">
              <p className="text-2xl font-semibold">{stats.college}</p>
              <p className="text-xs uppercase tracking-widest text-neutral-500">College</p>
            </div>
          </div>
        </header>

        <section className="mb-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <form
            onSubmit={handleGenerate}
            className="rounded-lg border border-neutral-800 bg-neutral-900 p-4 sm:p-5"
          >
            <div className="mb-4 flex rounded-lg border border-neutral-800 bg-neutral-950 p-1">
              {[
                { type: 'business', label: 'Business Idea', icon: BriefcaseBusiness },
                { type: 'college', label: 'College Project', icon: GraduationCap },
              ].map(({ type, label, icon: Icon }) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setIdeaType(type as IdeaType)}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-3 text-sm font-medium transition-colors ${
                    ideaType === type
                      ? 'bg-white text-neutral-950'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                  {label}
                </button>
              ))}
            </div>

            <label className="mb-4 block">
              <span className="mb-2 block text-sm font-medium text-neutral-400">
                Describe the idea
              </span>
              <textarea
                value={idea}
                onChange={(event) => setIdea(event.target.value)}
                placeholder="Example: AI platform that helps college students turn lecture notes into flashcards and weekly study plans"
                className="min-h-36 w-full resize-none rounded-lg border border-neutral-800 bg-neutral-950 p-4 text-base leading-7 outline-none placeholder:text-neutral-600 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500"
              />
            </label>

            <button
              type="submit"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-white px-5 font-semibold text-neutral-950 transition-colors hover:bg-neutral-200 sm:w-auto"
            >
              <Sparkles size={18} />
              Generate roadmap
              <ArrowRight size={18} />
            </button>
          </form>

          <aside className="rounded-lg border border-neutral-800 bg-neutral-900 p-5">
            <h2 className="mb-1 font-semibold">Saved Roadmaps</h2>
            <p className="mb-4 text-sm text-neutral-500">Stored locally in this browser.</p>

            {!hasHydrated ? (
              <p className="text-sm text-neutral-500">Loading roadmaps...</p>
            ) : roadmaps.length === 0 ? (
              <p className="rounded-lg border border-dashed border-neutral-800 p-4 text-sm text-neutral-500">
                Generate your first roadmap to see it here.
              </p>
            ) : (
              <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
                {roadmaps.map((roadmap) => (
                  <div
                    key={roadmap.id}
                    className={`group rounded-lg border p-3 transition-colors ${
                      activeRoadmap?.id === roadmap.id
                        ? 'border-neutral-500 bg-neutral-950'
                        : 'border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveRoadmap(roadmap.id)}
                      className="block w-full text-left"
                    >
                      <p className="line-clamp-2 text-sm font-medium text-neutral-100">
                        {roadmap.idea}
                      </p>
                      <p className="mt-2 text-xs uppercase tracking-widest text-neutral-600">
                        {roadmap.type} · {formatDate(roadmap.createdAt)}
                      </p>
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteRoadmap(roadmap.id)}
                      className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-neutral-600 transition-colors hover:text-red-300"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </aside>
        </section>

        {!activeRoadmap ? (
          <section className="rounded-lg border border-dashed border-neutral-800 bg-neutral-900/30 p-10 text-center">
            <Lightbulb size={34} className="mx-auto mb-4 text-neutral-700" />
            <p className="text-neutral-400">
              Add any business idea or college project idea above to generate a full roadmap.
            </p>
          </section>
        ) : (
          <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="min-w-0">
              <div className="mb-5 flex flex-wrap gap-2">
                {[
                  ['generator', 'Generator'],
                  ['strategy', 'Strategy'],
                  ['roadmap', 'Roadmap'],
                  ['metrics', 'Metrics'],
                ].map(([view, label]) => (
                  <button
                    key={view}
                    type="button"
                    onClick={() => setActiveView(view as RoadmapView)}
                    className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                      activeView === view
                        ? 'border-white bg-white text-neutral-950'
                        : 'border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-white'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {activeView === 'strategy' || activeView === 'generator' ? (
                <div className="space-y-4">
                  <article className="rounded-lg border border-neutral-800 bg-neutral-900 p-5">
                    <p className="mb-2 text-xs uppercase tracking-widest text-neutral-500">
                      Concept
                    </p>
                    <h2 className="mb-4 text-2xl font-semibold">{activeRoadmap.idea}</h2>
                    <p className="leading-7 text-neutral-300">{activeRoadmap.concept}</p>
                  </article>

                  <div className="grid gap-4 md:grid-cols-2">
                    <article className="rounded-lg border border-neutral-800 bg-neutral-900 p-5">
                      <h3 className="mb-3 font-semibold">Problem</h3>
                      <p className="leading-7 text-neutral-400">{activeRoadmap.problem}</p>
                    </article>
                    <article className="rounded-lg border border-neutral-800 bg-neutral-900 p-5">
                      <h3 className="mb-3 font-semibold">Solution</h3>
                      <p className="leading-7 text-neutral-400">{activeRoadmap.solution}</p>
                    </article>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <ListCard
                      title="Target Customers"
                      icon={<Users size={20} />}
                      items={activeRoadmap.customers}
                    />
                    <ListCard
                      title="MVP Scope"
                      icon={<ClipboardList size={20} />}
                      items={activeRoadmap.mvp}
                    />
                  </div>
                </div>
              ) : null}

              {activeView === 'roadmap' ? (
                <div className="space-y-4">
                  {activeRoadmap.phases.map((phase, index) => (
                    <article
                      key={phase.stage}
                      className="rounded-lg border border-neutral-800 bg-neutral-900 p-5"
                    >
                      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex gap-3">
                          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white text-neutral-950">
                            <StageIcon stage={phase.stage} />
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-widest text-neutral-500">
                              Phase {index + 1} · {phase.timeline}
                            </p>
                            <h2 className="text-xl font-semibold">{phase.title}</h2>
                          </div>
                        </div>
                        <p className="max-w-md text-sm leading-6 text-neutral-500">
                          {phase.goal}
                        </p>
                      </div>

                      <div className="space-y-3">
                        {phase.tasks.map((task) => (
                          <div
                            key={task.title}
                            className="rounded-lg border border-neutral-800 bg-neutral-950 p-4"
                          >
                            <h3 className="mb-2 font-medium text-neutral-100">{task.title}</h3>
                            <p className="leading-6 text-neutral-500">{task.detail}</p>
                          </div>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              ) : null}

              {activeView === 'metrics' ? (
                <div className="grid gap-4 md:grid-cols-2">
                  <ListCard
                    title="Success Metrics"
                    icon={<BarChart3 size={20} />}
                    items={activeRoadmap.metrics}
                  />
                  <ListCard
                    title="Revenue or Support"
                    icon={<BriefcaseBusiness size={20} />}
                    items={activeRoadmap.revenue}
                  />
                  <ListCard
                    title="Key Risks"
                    icon={<AlertTriangle size={20} />}
                    items={activeRoadmap.risks}
                  />
                  <article className="rounded-lg border border-neutral-800 bg-neutral-900 p-5">
                    <h3 className="mb-3 flex items-center gap-2 font-semibold">
                      <CheckCircle2 size={20} />
                      Next Best Move
                    </h3>
                    <p className="leading-7 text-neutral-400">
                      Spend the next 48 hours validating the problem with real users. If
                      people cannot describe the pain in their own words, narrow the idea
                      before building.
                    </p>
                  </article>
                </div>
              ) : null}
            </div>

            <aside className="space-y-4">
              <section className="rounded-lg border border-neutral-800 bg-neutral-900 p-5">
                <h2 className="mb-2 font-semibold">Roadmap Summary</h2>
                <p className="mb-4 text-sm leading-6 text-neutral-500">
                  {activeRoadmap.type === 'college'
                    ? 'Optimized for project validation, demo quality, and presentation readiness.'
                    : 'Optimized for market validation, MVP launch, and early business traction.'}
                </p>
                <div className="space-y-3 text-sm">
                  <SummaryRow label="Audience" value={activeRoadmap.audience} />
                  <SummaryRow label="Created" value={formatDate(activeRoadmap.createdAt)} />
                  <SummaryRow label="Phases" value={`${activeRoadmap.phases.length} stages`} />
                </div>
              </section>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-white px-4 font-semibold text-neutral-950 transition-colors hover:bg-neutral-200"
              >
                <ClipboardList size={18} />
                {copied ? 'Copied roadmap' : 'Copy roadmap'}
              </button>
            </aside>
          </section>
        )}
      </main>
    </div>
  );
}

function ListCard({
  title,
  icon,
  items,
}: {
  title: string;
  icon: ReactNode;
  items: string[];
}) {
  return (
    <article className="rounded-lg border border-neutral-800 bg-neutral-900 p-5">
      <h3 className="mb-4 flex items-center gap-2 font-semibold">
        {icon}
        {title}
      </h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 leading-6 text-neutral-400">
            <CheckCircle2 size={17} className="mt-1 shrink-0 text-emerald-400" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-neutral-800 bg-neutral-950 p-3">
      <p className="mb-1 text-xs uppercase tracking-widest text-neutral-600">{label}</p>
      <p className="leading-6 text-neutral-300">{value}</p>
    </div>
  );
}
