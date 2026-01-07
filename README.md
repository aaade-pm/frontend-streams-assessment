# Ask Stream – Frontend Assessment

This project is a frontend implementation of the **Ask Stream (ArcStream) dashboard**, designed to demonstrate layout fidelity, interaction design, responsive behavior, and product-driven decision making using modern React and Next.js patterns.

---

## 🛠 Tech Stack

- **Next.js (App Router)**
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **Redux Toolkit** – global UI state management
- **ShadCN** – accessible UI primitives
- **Lucide Icons**
- **React Icons**
- **Motion**

---

## 📁 Project Structure

The project follows a **feature-first, scalable structure**:

- `components/layout` – App shell, navigation, structural layout
- `components/askstream` – Ask Stream–specific components (Ask Bar, cards, stacked cards)
- `components/history` – Bookmarks and history UI
- `components/ui` – Shared, reusable UI primitives
- `store` – Global UI state (icon rail, layout flags)
- `data` – Static JSON used to simulate backend responses

This structure was chosen to ensure **clear separation of concerns** and easy scalability.

---

## 🧱 Core Features Implemented

### Ask Stream Dashboard Layout

- Two-row, four-card layout
- Equal-height cards across rows
- Responsive transitions between stacked and grid layouts
- Clean visual hierarchy and spacing

### Section 2 – Stacked Cards Interaction

- Cards are visually stacked with offset, scale, and depth
- Clicking a card moves it **to the back of the stack**
- The interaction loops infinitely (no card is removed)
- Reduced offsets and scaling on mobile for readability

### History & Bookmarks Panel

- Sidebar history on `xl+` screens
- Dialog-based history on smaller screens
- Expandable history groups
- Active state tracking for bookmarks and history items

---

## ✨ Product Assumptions & Intuitive Enhancements

The following features were **intentionally added** based on product reasoning, even though they were not explicitly defined in the design mockups.

Each assumption is documented below with **clear rationale**.

---

### 1. ArcStream Version Selector (Dropdown)

**What was added:**  
A dropdown in the ArcStream Editor to allow switching between different versions of an ArcStream.

**Assumption:**  
Users may need to compare, revisit, or edit multiple versions of an ArcStream.

**Reasoning:**

- Versioning is common in analytical and AI-assisted tools
- Provides clarity when working with iterative outputs
- Prevents accidental overwrites and confusion
- Aligns with real-world workflows (drafts, revisions, experiments)

---

### 2. Expanding Ask Bar Input with Max Height

**What was added:**  
The Ask Bar input dynamically grows in height as the user types more content, with a defined maximum height.

**Assumption:**  
Users may ask complex or multi-line questions.

**Reasoning:**

- Improves readability while typing longer prompts
- Avoids horizontal scrolling inside inputs
- Maintains layout stability by enforcing a max height
- Matches modern chat, AI, and analytics input patterns

---

### 3. File Upload Trigger via Plus Button

**What was added:**  
A plus (`+`) button inside the Ask Bar to trigger file upload.

**Assumption:**  
Users may want to upload files (documents, datasets, screenshots) as part of their query.

**Reasoning:**

- Common in AI, analytics, and support workflows
- Keeps the primary input uncluttered
- Provides an affordance for advanced input without overwhelming the UI
- Scales naturally for future features (attachments, integrations)

---

### 4. “See More” Action in History Section

**What was added:**  
A “See more” action in the History section that opens a dialog containing the full history list.

**Assumption:**  
Users may want quick access to recent history without leaving the current context.

**Reasoning:**

- Prevents sidebar overcrowding
- Preserves focus on the main task
- Provides a predictable escape hatch for deeper exploration
- Matches established dashboard and analytics UX patterns

---

### 5. Dialog-Based History on Smaller Screens

**What was added:**  
On smaller screens, history is displayed inside a dialog instead of a persistent sidebar.

**Assumption:**  
Sidebar layouts are not practical on constrained viewports.

**Reasoning:**

- Maximizes usable content space
- Avoids horizontal compression
- Improves usability on tablets and smaller laptops
- Keeps interaction consistent across breakpoints

---

### 6. Global Layout State via Redux

**What was added:**  
Global UI state (icon rail expansion, layout behavior) managed using Redux Toolkit.

**Assumption:**  
Layout state affects multiple components and should not rely on prop drilling.

**Reasoning:**

- Prevents deeply nested props
- Keeps layout behavior predictable
- Enables future layout extensions
- Aligns with scalable application architecture

---

## 📱 Responsive Behavior Summary

| Screen Size | Behavior                                 |
| ----------- | ---------------------------------------- |
| `< lg`      | Main content stacks vertically           |
| `lg → xl`   | Main content takes full available width  |
| `≥ xl`      | History panel docks beside main content  |
| Mobile      | Reduced stacked card offsets and scaling |

CSS-first layout decisions were prioritized over JavaScript resize logic.

---

## ♿ Accessibility & UX Considerations

- Semantic HTML structure
- Radix UI primitives ensure keyboard and screen-reader support
- Clear visual hierarchy and spacing
- Click targets sized for accessibility
- Smooth transitions without motion overload

---

## 🧪 Running the Project

```bash
npm install
npm run dev
```
