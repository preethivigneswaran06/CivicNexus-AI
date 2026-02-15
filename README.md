# CivicNexus AI – Real-Time Multi-Agent Civic Governance Platform

CivicNexus AI is a real-time AI governance assistant that dynamically understands citizens and orchestrates public services. It transforms traditional civic kiosks into intelligent, accessible touchpoints for communities.

## Features

- **Real-time Multi-Agent Orchestration**: Uses Google Gemini to plan and execute tasks via specialized agents.
- **Dynamic Routing**: No hardcoded rules; AI decides the best department and urgency.
- **RAG-based Policy Assistance**: Vectors search through policy documents to give accurate answers.
- **Inclusion & Accessibility**: Adapts tone and UI for senior citizens and low-literacy users.
- **Modern UI**: Professional React interface with glassmorphism and smooth animations.

## Architecture

### Backend
- **Framework**: FastAPI (Async)
- **AI**: Google Gemini API
- **Vector Store**: FAISS
- **Embeddings**: Sentence Transformers

### Frontend
- **Framework**: React (Vite)
- **Styling**: Tailwind CSS
- **State/Routing**: React Router, Axios

## Tech Stack

### Frontend
-   **Framework**: React 18 (Vite)
-   **Styling**: Tailwind CSS 3
-   **Icons**: Lucide React
-   **Animations**: Framer Motion
-   **Routing**: React Router 6
-   **Visualization**: Recharts
-   **HTTP Client**: Axios

### Backend
-   **Framework**: FastAPI (Python)
-   **AI Engine**: Google Gemini Pro (via `google-generativeai`)
-   **Vector DB**: FAISS (for Policy RAG)
-   **Embeddings**: Sentence Transformers (`all-MiniLM-L6-v2`)
-   **Server**: Uvicorn

## Setup Instructions

### Backend

1.  Navigate to `backend/`
2.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
3.  Set up environment variables:
    - Copy `.env.example` to `.env`
    - Add your `GEMINI_API_KEY`
4.  Run the server:
    ```bash
    uvicorn main:app --reload
    ```

### Frontend

1.  Navigate to `frontend/`
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```

## License

MIT
