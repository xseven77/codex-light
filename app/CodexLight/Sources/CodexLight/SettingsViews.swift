import SwiftUI

struct SettingsView: View {
    @Bindable var settings: AppSettingsStore
    @Bindable var updater: AppUpdateController
    let layout: UsagePanelLayout
    let onClose: () -> Void

    private var titleLeadingPadding: CGFloat {
        layout == .window ? 62 : 0
    }

    private var titleVerticalOffset: CGFloat {
        layout == .window ? -10 : 0
    }

    var body: some View {
        VStack(spacing: 0) {
            header
            ScrollView {
                VStack(alignment: .leading, spacing: 18) {
                    updateSection
                    themeSection
                    refreshSection
                }
                .padding(16)
                .frame(maxWidth: .infinity, alignment: .leading)
            }
            Spacer(minLength: 0)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .top)
        .foregroundStyle(Color.codexInk)
    }

    private var header: some View {
        HStack(spacing: 14) {
            VStack(alignment: .leading, spacing: 3) {
                Text("设置")
                    .font(.system(size: 15, weight: .semibold))
                    .padding(.leading, titleLeadingPadding)
                    .offset(y: titleVerticalOffset)
                Text("更新、主题与自动刷新")
                    .font(.system(size: 12))
                    .foregroundStyle(Color.codexMuted)
            }

            Spacer(minLength: 8)

            IconButton(systemName: "xmark", title: "关闭设置", action: onClose)
        }
        .padding(EdgeInsets(top: 16, leading: 16, bottom: 16, trailing: 16))
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(CodexChromeBackground(intensity: .header))
        .overlay(alignment: .bottom) {
            Rectangle()
                .fill(Color.codexLine.opacity(0.74))
                .frame(height: 1)
        }
        .fixedSize(horizontal: false, vertical: true)
    }

    private var updateSection: some View {
        SettingsSection(title: "软件更新", subtitle: "从 GitHub Releases 检查并安装最新版本") {
            VStack(alignment: .leading, spacing: 12) {
                VStack(alignment: .leading, spacing: 4) {
                    Text("当前版本 \(updater.currentVersion)（\(updater.currentBuild)）")
                        .font(.system(size: 13, weight: .semibold))
                    Text(updater.statusText)
                        .font(.system(size: 12))
                        .foregroundStyle(statusColor)
                        .fixedSize(horizontal: false, vertical: true)
                }

                if case .downloading = updater.phase {
                    ProgressView(value: updater.downloadProgress)
                        .progressViewStyle(.linear)
                        .tint(Color.codexPrimary)
                }

                if case .available = updater.phase, let release = updater.latestRelease {
                    Text(release.name)
                        .font(.system(size: 12, weight: .medium))
                        .foregroundStyle(Color.codexMuted)
                    if !release.releaseNotes.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty {
                        Text(release.releaseNotes)
                            .font(.system(size: 12))
                            .foregroundStyle(Color.codexMuted)
                            .lineLimit(4)
                    }
                }

                HStack(spacing: 8) {
                    Button(action: primaryUpdateAction) {
                        Text(primaryUpdateTitle)
                            .frame(maxWidth: .infinity)
                    }
                    .buttonStyle(PrimaryButtonStyle())
                    .disabled(updater.phase.isBusy)

                    Button(action: updater.openReleasesPage) {
                        Image(systemName: "safari")
                            .font(.system(size: 14, weight: .medium))
                            .frame(width: 36, height: 36)
                    }
                    .buttonStyle(IconButtonStyle())
                    .help("打开 Releases 页面")
                    .accessibilityLabel("打开 Releases 页面")
                }
            }
            .padding(14)
            .frame(maxWidth: .infinity, alignment: .leading)
            .liquidGlassSurface(cornerRadius: 12, tint: Color.codexGlassTint, shadowOpacity: 0.04)
        }
    }

    private var statusColor: Color {
        switch updater.phase {
        case .failed:
            .codexRed
        case .available:
            .codexAmber
        case .upToDate:
            .codexGreen
        default:
            .codexMuted
        }
    }

    private var primaryUpdateTitle: String {
        switch updater.phase {
        case .checking:
            "检查中…"
        case .available:
            "下载并安装"
        case .downloading:
            "下载中…"
        case .installing:
            "安装中…"
        case .failed:
            "重新检查"
        default:
            "检查更新"
        }
    }

    private func primaryUpdateAction() {
        switch updater.phase {
        case .available:
            updater.downloadAndInstall()
        default:
            updater.checkForUpdates()
        }
    }

    private var themeSection: some View {
        SettingsSection(title: "主题", subtitle: "跟随系统，或固定浅色 / 深色") {
            VStack(spacing: 8) {
                ForEach(AppThemePreference.allCases) { option in
                    SettingsOptionRow(
                        title: option.title,
                        systemName: option.symbolName,
                        isSelected: settings.theme == option
                    ) {
                        settings.theme = option
                    }
                }
            }
        }
    }

    private var refreshSection: some View {
        SettingsSection(title: "自动刷新", subtitle: "登录后按设定间隔自动拉取额度") {
            VStack(spacing: 8) {
                ForEach(AutoRefreshInterval.allCases) { option in
                    SettingsOptionRow(
                        title: option.title,
                        systemName: option == .off ? "pause.circle" : "clock",
                        isSelected: settings.autoRefreshInterval == option
                    ) {
                        settings.autoRefreshInterval = option
                    }
                }
            }
        }
    }
}

private struct SettingsSection<Content: View>: View {
    let title: String
    let subtitle: String
    @ViewBuilder let content: Content

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            VStack(alignment: .leading, spacing: 3) {
                Text(title)
                    .font(.system(size: 13, weight: .semibold))
                Text(subtitle)
                    .font(.system(size: 12))
                    .foregroundStyle(Color.codexMuted)
            }

            content
        }
        .frame(maxWidth: .infinity, alignment: .leading)
    }
}

private struct SettingsOptionRow: View {
    let title: String
    let systemName: String
    let isSelected: Bool
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            HStack(spacing: 10) {
                Image(systemName: systemName)
                    .font(.system(size: 13, weight: .semibold))
                    .foregroundStyle(Color.codexMuted)
                    .frame(width: 18)

                Text(title)
                    .font(.system(size: 13, weight: .medium))
                    .foregroundStyle(Color.codexInk)

                Spacer(minLength: 8)

                if isSelected {
                    Image(systemName: "checkmark")
                        .font(.system(size: 12, weight: .bold))
                        .foregroundStyle(Color.codexPrimary)
                }
            }
            .padding(.horizontal, 12)
            .padding(.vertical, 11)
            .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
        .liquidGlassSurface(
            cornerRadius: 10,
            tint: isSelected ? Color.codexPrimary.opacity(0.06) : Color.codexGlassTint,
            shadowOpacity: 0.035
        )
    }
}
