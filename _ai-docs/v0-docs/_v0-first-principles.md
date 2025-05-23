https://v0.dev/docs

Blocks
Blocks are unique content types which unlock new functionality in v0. When v0 generates a Block, you’ll see the Block’s content in a new window on the right of your chat UI. v0 currently supports two kinds of Blocks.

UI Generation Block
UI Generation Blocks allows v0 to generate client-side UI components in React, Vue, Svelte, and HTML with CSS. You can copy or download the code for these generations as well as install them directly into your codebase via the shadcn CLI. You can also scaffold an entirely new Next.js project from your component via the CLI.

The components v0 generates can include any client-side JavaScript, including calling browser APIs and fetching from external data sources. Just as while writing v0 can also use third-party libraries in its generations including react-three-fiber for 3D graphics.

Code Execution Block
Code Execution Blocks allow v0 to write and execute simple JavaScript code. This is particularly useful for writing and testing functions in isolation. v0 can write test cases in addition to its code output so you can ensure v0-generated code is useful.

Projects
Projects allow you to organize your chats into groups. You can also use Projects to bring your own data sources to v0. You can do so by uploading Sources to your Project, which can then be retrieved by v0 in any chats created within that Project. Projects also support adding custom instructions — you can ensure that v0 responds in a particular way, has additional context from your use cases, or has better understanding of the new data it has access to.

Billing
Please view billing and pricing information at v0.dev/pricing.

How to Use the Generated Code
Once the code is generated and integrated into your React application, you can use it like any other React component.

Components
Check out the shadcn/ui documentation for more information on the usage of the components.

Links, Images and Fonts
Please visit the documentation for Next.js Link, Next.js Image, and Next.js Font for more information on how to use these components.

Production Guidelines
Before moving your v0 generated code into production, keep the following in mind:

Testing for Accessibility: Ensure that your UI is accessible by testing with tools like axe and Lighthouse.
Ensuring Security: Regularly check your code for potential security issues. Use tools like Snyk to identify and fix vulnerabilities.
Accessibility
shadcn/ui uses Radix Primitives and pays great attention to accessibility, adhering to the WAI-ARIA authoring practices guidelines and undergoing testing across modern browsers and common assistive technologies. These components are designed to address the complex aspects of accessibility, such as aria and role attributes, focus management, and keyboard navigation. As such, users can trust that the components conform to the expected accessibility design patterns.

Specifically, these components adhere to WAI-ARIA semantics to provide meaning for custom UI patterns, ensuring they are readable by assistive tools. The library also provides abstractions for accessible labels and focus management, making it easier for developers to create accessible applications. Meanwhile, keyboard navigation is also supported in line with WAI-ARIA practices. To learn more about the accessibility features of Radix Primitives, please refer to their full documentation.

Even though shadcn/ui is built on accessibile primitives, you should still test your UI for accessibility. We recommend using tools like axe and Lighthouse to test your UI for accessibility issues. Automated tooling isn't enough, you should still be manually testing output. It's possible the AI generated code may need accessibility improvements.

If you see accessibility opportunities in the generated code output, please let us know.

Upcoming Features
We're continually enhancing v0 with new features. If you have suggestions on features you'd like to see, please let us know.

Getting Support
Got issues or suggestions?

Contact Us: Share your thoughts with us
Community Forums: Join our community on our forums to discuss v0, share insights, and learn from other developers.