import React from "react";
import "./docs.css";

type Section = {
  id: string;
  title: string;
};

const sections: Section[] = [
  { id: "overview", title: "Overview" },
  { id: "structure", title: "Repository Structure" },
  { id: "workflow", title: "How It Works" },
  { id: "config", title: "Experiment Configuration" },
  { id: "execution", title: "Running the Benchmark" },
  { id: "outputs", title: "Outputs" },
  { id: "tools", title: "Adding a New Tool" },
  { id: "limitations", title: "Limitations" }
];

const DocsPage: React.FC = () => {
  return (
    <div className="docs-container">
      
      <aside className="sidebar">
        <h2 className="sidebar-title">TDS Benchmark</h2>
        <nav>
          {sections.map((section) => (
            <a key={section.id} href={`#${section.id}`} className="sidebar-link">
              {section.title}
            </a>
          ))}
        </nav>
      </aside>

      <main className="content">
        <section id="overview">
          <h1>Overview</h1>
          <p>
            The TDS Benchmark is a framework for evaluating tabular data synthesis tools.
          </p>
        </section>
      </main>

    </div>
  );
};

export default DocsPage;