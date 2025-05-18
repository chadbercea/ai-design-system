Jira Story 2
Title: Tighten Typing for Event Handlers in Storybook Stories
Description:
Review all event handlers (e.g. onClick, onChange, onSubmit) in Storybook stories and assign the appropriate DOM or MUI event types. Replace implicit or incorrect typings with exact handler signatures for better IntelliSense and error detection.

Acceptance Criteria:
	•	All event handlers have proper TypeScript typing (e.g. React.ChangeEvent<HTMLInputElement>)
	•	No functions use implicit any or broad Function types
	•	Confirm that event handlers are correctly typed in both story props and component definitions
	•	Story functionality remains unchanged