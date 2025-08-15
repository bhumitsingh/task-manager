# Collaborative Task Planner

A web-based application designed to streamline project management and team collaboration. This tool empowers users to organize their work into distinct projects and manage tasks efficiently.

## Features

- **Project Management**: Create and organize tasks under separate projects, each with its own name and description.
- **AI-Powered Task Generation**: Automatically generate detailed sub-tasks from a high-level prompt using the Gemini API.
- **Task Import**: Import tasks from a pre-formatted JSON file.
- **Automatic Task Distribution**: Distribute tasks among team members using a round-robin assignment method.
- **Detailed Task View**: View task details in a modal window.
- **Real-Time Collaboration**: Built on a real-time database with instant synchronization across all users.
- **Responsive Design**: Mobile-first design using Tailwind CSS.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Firebase account
- Gemini API key (for AI features)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd task-manager
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up Firebase:
   - Create a new Firebase project at https://console.firebase.google.com/
   - Register your web app with Firebase
   - Copy your Firebase configuration
   - Create a `.env` file in the root directory with your Firebase config:
     ```
     REACT_APP_FIREBASE_API_KEY=your_api_key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
     REACT_APP_FIREBASE_PROJECT_ID=your_project_id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     REACT_APP_FIREBASE_APP_ID=your_app_id
     ```

5. Set up Gemini API (optional, for AI features):
   - Get an API key from https://ai.google.dev/
   - Add it to your `.env` file:
     ```
     REACT_APP_GEMINI_API_KEY=your_gemini_api_key
     ```

6. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
task-manager/
├── public/
│   └── index.html
├── src/
│   ├── api/
│   │   └── gemini.js
│   ├── components/
│   │   ├── ProjectManager.jsx
│   │   ├── ProjectList.jsx
│   │   ├── ProjectItem.jsx
│   │   ├── ProjectForm.jsx
│   │   ├── ProjectSelector.jsx
│   │   ├── TaskManager.jsx
│   │   ├── TaskForm.jsx
│   │   ├── TaskList.jsx
│   │   ├── TaskItem.jsx
│   │   ├── TaskModal.jsx
│   │   ├── TaskImport.jsx
│   │   └── TaskDistribution.jsx
│   ├── firebase/
│   │   └── firebase.js
│   ├── hooks/
│   │   ├── useTasks.js
│   │   └── useProjects.js
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
├── .gitignore
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── sample-tasks.json
└── README.md
```

## Technologies Used

- React
- Firebase Firestore (real-time database)
- Firebase Authentication
- Tailwind CSS
- Gemini API (AI features)
- Vite (build tool)

## License

This project is licensed under the MIT License - see the LICENSE file for details.