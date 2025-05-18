Jira Story 1
Title: Eliminate any Typing in Wrapper Components
Description:
Audit all wrapper components used in Storybook stories and replace any any typings with accurate, component-specific types. This includes props interfaces, children types, and composition patterns where generics can be applied for precision.

Acceptance Criteria:
	•	All wrapper components have explicit TypeScript types
	•	No any types are present in props, state, or return values
	•	Type coverage verified by IDE and tsc --noEmit
	•	No regression in Storybook rendering or interactivity