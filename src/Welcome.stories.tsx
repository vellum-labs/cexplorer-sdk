import type { Meta, StoryObj } from "@storybook/react";

const Welcome = () => {
  return (
    <section
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "40px 20px",
        fontFamily: "Inter, sans-serif",
        lineHeight: "1.6",
      }}
    >
      {/* Hero Section */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "80px",
          padding: "60px 20px",
          background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
          borderRadius: "24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "relative", zIndex: 2 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
              marginBottom: "32px",
              flexWrap: "wrap",
            }}
          >
            <img
              src='./logo-icon.png'
              alt='Cexplorer'
              style={{ width: "80px", height: "80px" }}
            />
            <div>
              <h1
                style={{
                  fontSize: "3.5rem",
                  fontWeight: "800",
                  marginBottom: "8px",
                  background:
                    "linear-gradient(135deg, #0094d4 0%, #0284c7 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                Cexplorer SDK
              </h1>
            </div>
          </div>
          <p
            style={{
              fontSize: "1.5rem",
              color: "#64748b",
              marginBottom: "40px",
              fontWeight: "500",
            }}
          >
            Professional React components for blockchain applications
          </p>
          <div
            style={{
              display: "flex",
              gap: "20px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href='https://github.com/vellum-labs/cexplorer-sdk'
              target='_blank'
              rel='noopener noreferrer'
              style={{
                padding: "16px 32px",
                background: "linear-gradient(135deg, #0094d4 0%, #0284c7 100%)",
                color: "white",
                textDecoration: "none",
                borderRadius: "12px",
                fontWeight: "600",
                fontSize: "1.1rem",
                boxShadow: "0 10px 25px rgba(0, 148, 212, 0.3)",
                transition: "all 0.3s ease",
                border: "none",
              }}
            >
              📦 View on GitHub
            </a>
            <a
              href='https://npmjs.com/package/@vellumlabs/cexplorer-sdk'
              target='_blank'
              rel='noopener noreferrer'
              style={{
                padding: "16px 32px",
                backgroundColor: "#ffffff",
                color: "#0f172a",
                textDecoration: "none",
                borderRadius: "12px",
                fontWeight: "600",
                fontSize: "1.1rem",
                border: "2px solid #e2e8f0",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease",
              }}
            >
              📚 NPM Package
            </a>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            top: "-50%",
            right: "-20%",
            width: "400px",
            height: "400px",
            background:
              "linear-gradient(45deg, rgba(0, 148, 212, 0.1) 0%, rgba(2, 132, 199, 0.1) 100%)",
            borderRadius: "50%",
            zIndex: 1,
          }}
        />
      </div>

      {/* About Project */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "60px",
          marginBottom: "80px",
          alignItems: "center",
        }}
      >
        <div>
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: "700",
              color: "#0f172a",
              marginBottom: "24px",
            }}
          >
            About the Project
          </h2>
          <p
            style={{
              fontSize: "1.2rem",
              color: "#64748b",
              marginBottom: "24px",
              lineHeight: "1.7",
            }}
          >
            <strong>Cexplorer SDK</strong> is a comprehensive React component
            library designed specifically for blockchain and cryptocurrency
            applications. Built with TypeScript by the team behind Cexplorer -
            one of the biggest and most featured blockchain explorer.
          </p>
          <p
            style={{
              fontSize: "1.1rem",
              color: "#64748b",
              marginBottom: "32px",
              lineHeight: "1.7",
            }}
          >
            Serving the Cardano community since ITN 2019, we bring our expertise
            in blockchain data visualization to this professional component
            library.
          </p>

          {/* Vellum Labs Section */}
          <div
            style={{
              background: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
              padding: "24px",
              borderRadius: "16px",
              border: "1px solid #e2e8f0",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "16px",
              }}
            >
              <img
                src='./vellum-labs.jpg'
                alt='Vellum Labs'
                style={{ width: "48px", height: "48px" }}
              />
              <div>
                <h3
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: "600",
                    color: "#0f172a",
                    margin: "0",
                  }}
                >
                  Powered by Vellum Labs
                </h3>
                <p
                  style={{ fontSize: "0.9rem", color: "#64748b", margin: "0" }}
                >
                  Innovation in blockchain technology
                </p>
              </div>
            </div>
            <p
              style={{
                fontSize: "1rem",
                color: "#64748b",
                margin: "0",
                lineHeight: "1.6",
              }}
            >
              Vellum Labs is the development team behind Cexplorer.io, committed
              to building open-source tools that empower the blockchain
              community with accessible and intuitive interfaces.
            </p>
          </div>
        </div>

        <div>
          <div
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
              padding: "32px",
              borderRadius: "20px",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
              border: "1px solid #e2e8f0",
            }}
          >
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                color: "#0f172a",
                marginBottom: "24px",
                textAlign: "center",
              }}
            >
              ✨ Key Features
            </h3>
            <div style={{ display: "grid", gap: "16px" }}>
              {[
                {
                  icon: "🎨",
                  title: "Modern Design System",
                  desc: "Clean, consistent components",
                },
                {
                  icon: "🌙",
                  title: "Theme Support",
                  desc: "Light & dark modes built-in",
                },
                {
                  icon: "📱",
                  title: "Responsive Design",
                  desc: "Mobile-first approach",
                },
                {
                  icon: "♿",
                  title: "Accessibility",
                  desc: "WCAG compliant components",
                },
                {
                  icon: "🔧",
                  title: "Customizable",
                  desc: "Highly configurable & extensible",
                },
                {
                  icon: "📊",
                  title: "Advanced Tables",
                  desc: "Filtering, pagination, infinite scroll",
                },
                {
                  icon: "🎯",
                  title: "TypeScript",
                  desc: "Full type definitions included",
                },
                {
                  icon: "⚡",
                  title: "Performance",
                  desc: "Optimized for production use",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <span style={{ fontSize: "1.2rem" }}>{feature.icon}</span>
                  <div>
                    <div
                      style={{
                        fontWeight: "600",
                        color: "#0f172a",
                        fontSize: "0.95rem",
                      }}
                    >
                      {feature.title}
                    </div>
                    <div style={{ color: "#64748b", fontSize: "0.85rem" }}>
                      {feature.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Installation Section */}
      <section style={{ marginBottom: "80px" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: "700",
              color: "#0f172a",
              marginBottom: "16px",
            }}
          >
            🚀 Quick Installation
          </h2>
          <p style={{ fontSize: "1.2rem", color: "#64748b" }}>
            Get started with Cexplorer SDK in seconds
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
            marginBottom: "48px",
          }}
        >
          {[
            {
              manager: "npm",
              command: "npm install @vellumlabs/cexplorer-sdk",
              icon: "📦",
              color: "#cb3837",
            },
            {
              manager: "yarn",
              command: "yarn add @vellumlabs/cexplorer-sdk",
              icon: "🧶",
              color: "#2c8ebb",
            },
            {
              manager: "pnpm",
              command: "pnpm add @vellumlabs/cexplorer-sdk",
              icon: "⚡",
              color: "#f69220",
            },
          ].map((pkg, index) => (
            <div
              key={index}
              style={{
                background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
                padding: "24px",
                borderRadius: "12px",
                border: "1px solid #475569",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "16px",
                }}
              >
                <span style={{ fontSize: "1.2rem" }}>{pkg.icon}</span>
                <h4
                  style={{
                    color: "#f1f5f9",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    margin: "0",
                  }}
                >
                  {pkg.manager.toUpperCase()}
                </h4>
                <div
                  style={{
                    marginLeft: "auto",
                    width: "8px",
                    height: "8px",
                    backgroundColor: pkg.color,
                    borderRadius: "50%",
                  }}
                />
              </div>
              <div
                style={{
                  background: "rgba(15, 23, 42, 0.8)",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  border: "1px solid #475569",
                }}
              >
                <code
                  style={{
                    color: "#22d3ee",
                    fontSize: "0.95rem",
                    fontFamily: "Monaco, Consolas, monospace",
                    fontWeight: "500",
                  }}
                >
                  {pkg.command}
                </code>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Start Code */}
      <div
        style={{
          background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
          padding: "32px",
          borderRadius: "16px",
          border: "1px solid #475569",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            display: "flex",
            gap: "6px",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              backgroundColor: "#ef4444",
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              width: "12px",
              height: "12px",
              backgroundColor: "#f59e0b",
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              width: "12px",
              height: "12px",
              backgroundColor: "#10b981",
              borderRadius: "50%",
            }}
          />
        </div>
        <h3
          style={{
            color: "#f1f5f9",
            fontSize: "1.3rem",
            fontWeight: "600",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span>⚡</span> Quick Start Example
        </h3>
        <div
          style={{
            background: "rgba(15, 23, 42, 0.8)",
            padding: "20px",
            borderRadius: "8px",
            border: "1px solid #475569",
          }}
        >
          <pre
            style={{
              color: "#e2e8f0",
              fontSize: "0.9rem",
              fontFamily: "Monaco, Consolas, monospace",
              lineHeight: "1.6",
              margin: "0",
              overflow: "auto",
            }}
          >
            <code>
              <span style={{ color: "#c084fc" }}>import</span>{" "}
              <span style={{ color: "#a78bfa" }}>{"{"}</span>{" "}
              <span style={{ color: "#22d3ee" }}>Button</span>,{" "}
              <span style={{ color: "#22d3ee" }}>Table</span>,{" "}
              <span style={{ color: "#22d3ee" }}>ThemeProvider</span>{" "}
              <span style={{ color: "#a78bfa" }}>{"}"}</span>{" "}
              <span style={{ color: "#c084fc" }}>from</span>{" "}
              <span style={{ color: "#34d399" }}>
                '@vellumlabs/cexplorer-sdk'
              </span>
              ;{"\n"}
              <span style={{ color: "#c084fc" }}>import</span>{" "}
              <span style={{ color: "#34d399" }}>
                '@vellumlabs/cexplorer-sdk/dist/styles.css'
              </span>
              ;{"\n\n"}
              <span style={{ color: "#c084fc" }}>function</span>{" "}
              <span style={{ color: "#fbbf24" }}>App</span>
              <span style={{ color: "#a78bfa" }}>()</span>{" "}
              <span style={{ color: "#a78bfa" }}>{"{"}</span>
              {"\n"}
              {"  "}
              <span style={{ color: "#c084fc" }}>return</span>{" "}
              <span style={{ color: "#a78bfa" }}>(</span>
              {"\n"}
              {"    "}
              <span style={{ color: "#a78bfa" }}>{"<"}</span>
              <span style={{ color: "#22d3ee" }}>ThemeProvider</span>{" "}
              <span style={{ color: "#fbbf24" }}>defaultTheme</span>
              <span style={{ color: "#a78bfa" }}>=</span>
              <span style={{ color: "#34d399" }}>"light"</span>
              <span style={{ color: "#a78bfa" }}>{">"}</span>
              {"\n"}
              {"      "}
              <span style={{ color: "#a78bfa" }}>{"<"}</span>
              <span style={{ color: "#22d3ee" }}>Button</span>
              {"\n"}
              {"        "}
              <span style={{ color: "#fbbf24" }}>variant</span>
              <span style={{ color: "#a78bfa" }}>=</span>
              <span style={{ color: "#34d399" }}>"primary"</span>
              {"\n"}
              {"        "}
              <span style={{ color: "#fbbf24" }}>size</span>
              <span style={{ color: "#a78bfa" }}>=</span>
              <span style={{ color: "#34d399" }}>"md"</span>
              {"\n"}
              {"        "}
              <span style={{ color: "#fbbf24" }}>label</span>
              <span style={{ color: "#a78bfa" }}>=</span>
              <span style={{ color: "#34d399" }}>"Get Started"</span>
              {"\n"}
              {"      "}
              <span style={{ color: "#a78bfa" }}>{"/"}</span>
              <span style={{ color: "#a78bfa" }}>{">"}</span>
              {"\n"}
              {"    "}
              <span style={{ color: "#a78bfa" }}>{"</"}</span>
              <span style={{ color: "#22d3ee" }}>ThemeProvider</span>
              <span style={{ color: "#a78bfa" }}>{">"}</span>
              {"\n"}
              {"  "}
              <span style={{ color: "#a78bfa" }}>)</span>;{"\n"}
              <span style={{ color: "#a78bfa" }}>{"}"}</span>
            </code>
          </pre>
        </div>
      </div>

      {/* Components Table */}
      <section style={{ marginBottom: "80px" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: "700",
              color: "#0f172a",
              marginBottom: "16px",
            }}
          >
            🧩 Available Components
          </h2>
          <p style={{ fontSize: "1.2rem", color: "#64748b" }}>
            Explore our comprehensive component library
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "24px",
          }}
        >
          {[
            {
              name: "Button",
              category: "Core",
              description:
                "Interactive buttons with multiple variants and sizes for user actions",
              link: "/?path=/docs/core-button--docs",
              icon: "🔘",
              color: "#3b82f6",
            },
            {
              name: "Table",
              category: "Data Display",
              description:
                "Advanced data tables with filtering, pagination and infinite scroll",
              link: "/?path=/docs/data-display-table--docs",
              icon: "📊",
              color: "#10b981",
            },
            {
              name: "Pagination",
              category: "Navigation",
              description:
                "Navigate through large data sets with elegant pagination controls",
              link: "/?path=/docs/navigation-pagination--docs",
              icon: "📄",
              color: "#f59e0b",
            },
            {
              name: "LoadingSkeleton",
              category: "Feedback",
              description:
                "Beautiful loading state placeholders for smooth content transitions",
              link: "/?path=/docs/feedback-loadingskeleton--docs",
              icon: "⏳",
              color: "#8b5cf6",
            },
            {
              name: "NoResultsFound",
              category: "Feedback",
              description:
                "Elegant empty state messaging for better user experience",
              link: "/?path=/docs/feedback-noresultsfound--docs",
              icon: "🔍",
              color: "#06b6d4",
            },
            {
              name: "FunnelFilter",
              category: "Overlays",
              description:
                "Advanced filtering interface with custom content support",
              link: "/?path=/docs/overlays-funnelfilter--docs",
              icon: "🔽",
              color: "#ef4444",
            },
          ].map((component, index) => (
            <a
              key={index}
              href={component.link}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                  padding: "24px",
                  borderRadius: "16px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  height: "100%",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = `0 8px 25px ${component.color}33`;
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.borderColor = component.color + "40";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow =
                    "0 4px 15px rgba(0, 0, 0, 0.05)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "#e2e8f0";
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-20px",
                    right: "-20px",
                    width: "60px",
                    height: "60px",
                    background: `${component.color}10`,
                    borderRadius: "50%",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    style={{
                      background: `${component.color}15`,
                      padding: "8px",
                      borderRadius: "10px",
                      border: `1px solid ${component.color}30`,
                    }}
                  >
                    <span style={{ fontSize: "1.2rem" }}>{component.icon}</span>
                  </div>
                  <div>
                    <h3
                      style={{
                        color: "#0f172a",
                        fontSize: "1.2rem",
                        fontWeight: "600",
                        margin: "0",
                      }}
                    >
                      {component.name}
                    </h3>
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: component.color,
                        fontWeight: "500",
                        background: `${component.color}15`,
                        padding: "2px 8px",
                        borderRadius: "6px",
                        border: `1px solid ${component.color}30`,
                      }}
                    >
                      {component.category}
                    </span>
                  </div>
                </div>
                <p
                  style={{
                    color: "#64748b",
                    fontSize: "0.95rem",
                    lineHeight: "1.5",
                    margin: "0",
                  }}
                >
                  {component.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Resources & Links */}
      <section style={{ marginBottom: "48px" }}>
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "600",
            color: "#333",
            marginBottom: "24px",
            borderBottom: "2px solid #0094d4",
            paddingBottom: "8px",
          }}
        >
          Resources & Links
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "24px",
          }}
        >
          <div>
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                color: "#333",
                marginBottom: "16px",
              }}
            >
              Development
            </h3>
            <ul
              style={{
                fontSize: "1rem",
                color: "#555",
                paddingLeft: "0",
                listStyle: "none",
              }}
            >
              <li style={{ marginBottom: "8px" }}>
                <a
                  href='https://github.com/vellum-labs/cexplorer-sdk'
                  target='_blank'
                  rel='noopener noreferrer'
                  style={{ color: "#0094d4", textDecoration: "none" }}
                >
                  📦 GitHub Repository
                </a>
              </li>
              <li style={{ marginBottom: "8px" }}>
                <a
                  href='https://github.com/vellum-labs/cexplorer-sdk/issues'
                  target='_blank'
                  rel='noopener noreferrer'
                  style={{ color: "#0094d4", textDecoration: "none" }}
                >
                  🐛 Report Issues
                </a>
              </li>
              <li style={{ marginBottom: "8px" }}>
                <a
                  href='https://github.com/vellum-labs/cexplorer-sdk/discussions'
                  target='_blank'
                  rel='noopener noreferrer'
                  style={{ color: "#0094d4", textDecoration: "none" }}
                >
                  💬 Discussions
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                color: "#333",
                marginBottom: "16px",
              }}
            >
              Package Registry
            </h3>
            <ul
              style={{
                fontSize: "1rem",
                color: "#555",
                paddingLeft: "0",
                listStyle: "none",
              }}
            >
              <li style={{ marginBottom: "8px" }}>
                <a
                  href='https://npmjs.com/package/@vellumlabs/cexplorer-sdk'
                  target='_blank'
                  rel='noopener noreferrer'
                  style={{ color: "#0094d4", textDecoration: "none" }}
                >
                  📦 NPM Package
                </a>
              </li>
              <li style={{ marginBottom: "8px" }}>
                <a
                  href='https://github.com/vellum-labs/cexplorer-sdk/releases'
                  target='_blank'
                  rel='noopener noreferrer'
                  style={{ color: "#0094d4", textDecoration: "none" }}
                >
                  🏷️ Releases
                </a>
              </li>
              <li style={{ marginBottom: "8px" }}>
                <a
                  href='https://github.com/vellum-labs/cexplorer-sdk/blob/main/CHANGELOG.md'
                  target='_blank'
                  rel='noopener noreferrer'
                  style={{ color: "#0094d4", textDecoration: "none" }}
                >
                  📝 Changelog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                color: "#333",
                marginBottom: "16px",
              }}
            >
              Community
            </h3>
            <ul
              style={{
                fontSize: "1rem",
                color: "#555",
                paddingLeft: "0",
                listStyle: "none",
              }}
            >
              <li style={{ marginBottom: "8px" }}>
                <a
                  href='https://twitter.com/cexplorer_io'
                  target='_blank'
                  rel='noopener noreferrer'
                  style={{ color: "#0094d4", textDecoration: "none" }}
                >
                  🐦 Twitter
                </a>
              </li>
              <li style={{ marginBottom: "8px" }}>
                <a
                  href='https://t.me/cexplorer'
                  target='_blank'
                  rel='noopener noreferrer'
                  style={{ color: "#0094d4", textDecoration: "none" }}
                >
                  💬 Telegram
                </a>
              </li>
              <li style={{ marginBottom: "8px" }}>
                <a
                  href='mailto:support@cexplorer.io'
                  style={{ color: "#0094d4", textDecoration: "none" }}
                >
                  📧 Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: "32px 0",
          borderTop: "1px solid #e9ecef",
          marginTop: "48px",
          color: "#666",
        }}
      >
        <p style={{ fontSize: "0.9rem", marginBottom: "8px" }}>
          Built with ❤️ by the Cexplorer team
        </p>
        <p style={{ fontSize: "0.8rem" }}>
          © 2024 Cexplorer. Licensed under Apache-2.0.
        </p>
      </footer>
    </section>
  );
};

const meta = {
  title: "Getting Started",
  component: Welcome,
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    actions: { disable: true },
    docs: { disable: true },
    options: {
      showPanel: false,
      showToolbar: true,
      showTabs: false,
    },
  },
} satisfies Meta<typeof Welcome>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GettingStarted: Story = {};
