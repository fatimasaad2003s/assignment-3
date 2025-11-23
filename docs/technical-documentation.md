## Technologies Used

### HTML
- Provides the structure of the web pages.
- Defines headers, paragraphs, sections, forms, and links.
- Used to create the Hero, Projects, GitHub Repositories, and Contact sections.
- Includes `id` attributes and `class` names for CSS styling and JavaScript targeting.
- Supports dynamic content insertion for GitHub API projects.

### CSS
- Styles the website with colors, fonts, spacing, and layout.
- Implements responsive design using Flexbox and Grid.
- Handles themes (Light/Dark mode) with smooth transitions.
- Adds animations and hover effects for buttons, images, and project cards.
- Provides fade-in effect for both static and dynamically generated sections and elements.
- Optimized for performance with minimal redundancy and efficient selectors.

### JavaScript
- Adds interactivity to the website.
- Implements Light/Dark mode toggle with LocalStorage support to save user preferences.
- Rotates the theme toggle icon on click.
- Displays a personalized greeting based on the user's name and current time.
- Implements a visit timer that counts time spent on the site.
- Fetches latest 5 GitHub repositories dynamically and displays them with project cards.
- Enables filtering of projects by type (Java, Logisim, Verilog).
- Uses IntersectionObserver to trigger fade-in animations for both static and dynamic elements.
- Handles contact form validation with checks for empty fields and email format.
- Manages state for theme, user name, and project filter selections.

### AI-assisted Tools
- **ChatGPT (OpenAI)** was used to guide the development process.
- Assisted in understanding assignment requirements and breaking them down into tasks.
- Provided troubleshooting advice for dynamic animations and API integration.
- Suggested optimization techniques including merging duplicate API fetches and image compression.
- Offered guidance for LocalStorage usage, state management, and responsive design practices.
- All AI-generated suggestions were reviewed, modified, and fully implemented by the developer for learning and customization purposes.

### Performance & Optimization
- Compressed and resized images to reduce load time.
- Merged duplicate GitHub API requests to improve script efficiency.
- Minimized unnecessary CSS and JavaScript operations.
- Tested site performance using Lighthouse and applied suggested improvements.
