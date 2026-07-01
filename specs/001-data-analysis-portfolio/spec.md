# Specification: Data Analysis Portfolio

## Goal
Create a premium, responsive, and fully functional portfolio website to display data analysis projects. The website features a futuristic interactive video/particle intro at the entrance, a filtering project showcase grid, interactive detail modals with SVG-based data visualizations, and a dark/light mode toggle with warm (amber/orange) and cold (deep blue/teal) futuristic design systems.

## Assumptions & Exclusions
- The application will be built as a single-page app (SPA) using semantic HTML5, modern Vanilla CSS (with CSS variables for theme mapping), and Vanilla JS to keep loading times under 1 second.
- The "animated video at the entrance" will consist of a high-performance background canvas rendering an interactive particle node grid simulating data flows, combined with a background video element, ensuring smooth 60fps animations.
- Project details are loaded dynamically from a local structured JSON data model. No database or API server is required.

## Functional Requirements
- **FR-1: Entrance Hero (Interactive Intro)**: Displays a full-screen landing view with a looping cinematic video background combined with a canvas-based interactive particle network. Shows a prominent title, subtitle, and an "Explore Portfolio" call-to-action button that transitions the view down to the main content.
- **FR-2: Dynamic Portfolio Grid**: Displays project cards with tags, descriptions, and visual covers. Users can filter projects by category (e.g., Python, SQL, Machine Learning, Data Viz) with smooth layout transitions.
- **FR-3: Night Mode Toggle**: Includes a floating toggle button. 
  - *Light Mode (Clean/Warm)*: Soft cream background (`#FDFBF7`), clean slate-gray borders, warm charcoal text, and amber accents.
  - *Dark Mode (Cold/Futuristic)*: Deep space blue-black background (`#070A13`), glowing cyan/teal details, and glowing warm orange/amber accents.
- **FR-4: Interactive Project Drill-Down (Modal)**: Clicking a project card triggers a smooth overlay modal displaying comprehensive project insights, key data metrics, structured code snippets, and an interactive SVG chart demonstrating the user's data visualization skills.
- **FR-5: Contact Form & Socials**: Contains a functional contact section with input validation (name, email, message) and custom micro-animations for inputs and submission.

## Success Criteria
- **SC-1: High Performance**: FCP (First Contentful Paint) under 1.2s on desktop, and entrance animations run at a stable 60fps on modern mobile and desktop devices.
- **SC-2: Accessible Design**: Contrast ratios for all text in both light and dark modes exceed 4.5:1 (WCAG AA standard). Interactive elements feature distinct focus outlines.
- **SC-3: Responsive Layout**: The portfolio renders perfectly across mobile (>=375px), tablet (>=768px), and desktop (>=1024px) screens.

## User Scenarios
### Scenario 1: Exploring Projects
1. A recruiter visits the site and is welcomed by a dark, glowing futuristic particle video entrance.
2. They move their mouse, and the particles interact with their cursor, simulating a neural network.
3. They click "Explore Portfolio"; the hero view slides up, and the project grid scrolls smoothly into view.
4. They click "Machine Learning" in the category filter; the grid animations filter down to only show ML-related cards.

### Scenario 2: Toggling Themes
1. The user clicks the floating theme switch.
2. The site smoothly switches from dark mode to a clean, warm light mode with soft shadows and readable contrast.
3. The choice is stored in localStorage so it persists on page reload.

### Scenario 3: Drill-Down Analytics
1. The user clicks on the "Customer Cohort Analysis" card.
2. A sleek glassmorphic modal opens with a fade-in scale animation.
3. The modal displays a summary of the project, including a custom interactive SVG bar chart. Hovering over the chart bars reveals tooltips showing data points.

## Key Entities
- **Project**:
  - `id`: unique string identifier (e.g., `proj-001`)
  - `title`: string project name
  - `category`: string filter type (`python`, `sql`, `ml`, `viz`)
  - `shortDesc`: brief summary for the card
  - `longDesc`: deep-dive text for the modal
  - `tags`: list of strings (e.g., `["Pandas", "Scikit-Learn"]`)
  - `metric`: string showing the key project achievement (e.g., `94.2% Accuracy` or `+$12K Revenue`)
  - `chartData`: array of objects representing chart data points (e.g., `{ label: "Q1", value: 120 }`)
