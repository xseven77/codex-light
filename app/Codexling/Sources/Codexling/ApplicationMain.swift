import AppKit

@main
enum CodexlingMain {
    // NSApplication.delegate is weak; keep a strong reference for app lifetime.
    @MainActor
    private static var appDelegate: AppDelegate?

    @MainActor
    static func main() async {
        if CommandLine.arguments.contains("--probe-chatgpt-apis") {
            await runChatGPTAPIProbeCLI()
            return
        }

        let application = NSApplication.shared
        let delegate = AppDelegate()
        appDelegate = delegate
        application.delegate = delegate
        application.run()
    }

    @MainActor
    private static func runChatGPTAPIProbeCLI() async {
        let service = CodexUsageService()
        do {
            let directory = try await service.runChatGPTAPIProbe()
            fputs("API 探测完成：\(directory.path)\n", stderr)
            fputs("摘要：\(directory.appendingPathComponent("manifest.json").path)\n", stderr)
            exit(0)
        } catch {
            fputs("API 探测失败：\(error.localizedDescription)\n", stderr)
            exit(1)
        }
    }
}
