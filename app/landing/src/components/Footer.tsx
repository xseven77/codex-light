export function Footer() {
  return (
    <footer className="border-t border-border/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <div>Codex Light · macOS menu bar utility</div>
        <div className="flex flex-wrap gap-5">
          <a
            href="https://github.com/xseven77/codex-light"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href="https://github.com/xseven77/codex-light/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            Releases
          </a>
          <a href="#features" className="hover:text-foreground">
            功能
          </a>
        </div>
      </div>
    </footer>
  );
}
