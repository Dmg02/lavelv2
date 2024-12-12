# Session Documentation System

## Directory Structure
```
.cursor/
├── prompt.md
└── sessions/
    └── YYYY-MM-DD/
        ├── session1.md
        ├── session2.md
        └── summary.md
```

## Usage Instructions

1. **Starting a New Day**
   ```bash
   # Create a new day directory
   mkdir -p .cursor/sessions/YYYY-MM-DD
   ```

2. **Creating a New Session**
   - Create a new file in the day's directory
   - Name format: `sessionN.md` (where N is the session number for that day)
   - Use the template below

3. **End of Day**
   - Create a `summary.md` in the day's directory
   - List all sessions and their key achievements
   - Note any pending items for next day

## Session Template

```markdown
### Session #[N] [HH:MM-HH:MM]
**Focus**: [One-line description of the main focus]
**Developer**: [@username]
**Status**: [In Progress/Completed/Reviewed] [Use emoji: ⏳ 🚧 ✅ 👀]

#### Changes Made
- [List each significant change]
- [Include file paths in backticks]
- [Mention any dependencies added/removed]

#### Technical Details
```[language]
[Include relevant code snippets]
[Show before/after if applicable]
```

#### Important Considerations
- [List architectural decisions]
- [Document potential impacts]
- [Note any technical debt]
- [Mention future improvements]

#### Related Components
- [List affected components]
- [Include file paths]
- [Mention dependent features]

#### Testing Notes
- [List tested scenarios]
- [Include device/browser details]
- [Document edge cases]
- [Note any known issues]
```

## Daily Summary Template

```markdown
# [YYYY-MM-DD] Development Summary

## Sessions Overview
1. [HH:MM-HH:MM] - [Brief description]
2. [HH:MM-HH:MM] - [Brief description]

## Key Achievements
- [List major accomplishments]
- [Note completed features/fixes]

## Pending Items
- [List items to be addressed]
- [Note blocked items and why]

## Notes for Tomorrow
- [Important considerations]
- [Setup requirements]
```

## When to Document a Session

Document a session when you:
1. Make structural changes to the codebase
2. Implement new features
3. Fix significant bugs
4. Update critical dependencies
5. Make changes that affect multiple components
6. Implement performance improvements
7. Add or modify API endpoints
8. Change configuration or environment settings

## Best Practices

1. **Be Specific**: Include file paths, component names, and version numbers
2. **Show Context**: Explain why changes were made, not just what changed
3. **Think Future**: Document information that would help other developers understand your changes
4. **Track Dependencies**: Note any new packages or version updates
5. **Include Examples**: Add code snippets for complex changes
6. **Link Issues**: Reference related issues or pull requests
7. **Mark Status**: Keep the status updated as changes progress

## Emojis for Status

- ⏳ In Progress
- 🚧 Under Review
- ✅ Completed
- 👀 Needs Review
- 🐛 Bug Fix
- 🚀 Performance Improvement
- 📝 Documentation Update
- 🔒 Security Update

## Example Usage

1. Starting a new day:
```bash
mkdir -p .cursor/sessions/2024-12-09
```

2. Creating first session of the day:
```bash
touch .cursor/sessions/2024-12-09/session1.md
# Then copy the session template and fill it out
```

3. End of day summary:
```bash
touch .cursor/sessions/2024-12-09/summary.md
# Then copy the daily summary template and fill it out
```
