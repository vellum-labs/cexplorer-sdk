import type { Meta, StoryObj } from "@storybook/react";

const Welcome = () => {
  return (
    <div
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
            the biggest and most featured blockchain explorer.
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

      {/* Installation */}
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
          Installation
        </h2>
        <p style={{ fontSize: "1rem", color: "#555", marginBottom: "24px" }}>
          Install the library using your preferred package manager:
        </p>

        <div style={{ marginBottom: "24px" }}>
          <h4
            style={{
              fontSize: "1.1rem",
              fontWeight: "600",
              color: "#333",
              marginBottom: "8px",
            }}
          >
            NPM
          </h4>
          <pre
            style={{
              backgroundColor: "#f8f9fa",
              padding: "16px",
              borderRadius: "8px",
              border: "1px solid #e9ecef",
              overflow: "auto",
              fontSize: "0.9rem",
              fontFamily: "Monaco, Consolas, monospace",
            }}
          >
            npm install @vellumlabs/cexplorer-sdk
          </pre>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <h4
            style={{
              fontSize: "1.1rem",
              fontWeight: "600",
              color: "#333",
              marginBottom: "8px",
            }}
          >
            Yarn
          </h4>
          <pre
            style={{
              backgroundColor: "#f8f9fa",
              padding: "16px",
              borderRadius: "8px",
              border: "1px solid #e9ecef",
              overflow: "auto",
              fontSize: "0.9rem",
              fontFamily: "Monaco, Consolas, monospace",
            }}
          >
            yarn add @vellumlabs/cexplorer-sdk
          </pre>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <h4
            style={{
              fontSize: "1.1rem",
              fontWeight: "600",
              color: "#333",
              marginBottom: "8px",
            }}
          >
            PNPM
          </h4>
          <pre
            style={{
              backgroundColor: "#f8f9fa",
              padding: "16px",
              borderRadius: "8px",
              border: "1px solid #e9ecef",
              overflow: "auto",
              fontSize: "0.9rem",
              fontFamily: "Monaco, Consolas, monospace",
            }}
          >
            pnpm add @vellumlabs/cexplorer-sdk
          </pre>
        </div>
      </section>

      {/* Quick Start */}
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
          Quick Start
        </h2>
        <p style={{ fontSize: "1rem", color: "#555", marginBottom: "16px" }}>
          Import the components you need and start building:
        </p>
        <pre
          style={{
            backgroundColor: "#f8f9fa",
            padding: "20px",
            borderRadius: "8px",
            border: "1px solid #e9ecef",
            overflow: "auto",
            fontSize: "0.9rem",
            fontFamily: "Monaco, Consolas, monospace",
            lineHeight: "1.5",
          }}
        >
          {`import { Button, Table, ThemeProvider } from '@vellumlabs/cexplorer-sdk';
import '@vellumlabs/cexplorer-sdk/dist/styles.css';

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <Button
        variant="primary"
        size="md"
        label="Get Started"
      />
    </ThemeProvider>
  );
}`}
        </pre>
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
    </div>
  );
};

const meta = {
  title: "Getting Started",
  component: Welcome,
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    actions: { disable: true },
    options: {
      showPanel: false,
    },
  },
} satisfies Meta<typeof Welcome>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GettingStarted: Story = {};
