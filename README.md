# ⚒️ MetaMind — Metallurgy AI Assistant

An AI-powered assistant specialized in **Metallurgy and Materials Engineering**, built with RAG (Retrieval-Augmented Generation) architecture. MetaMind answers questions grounded in real metallurgy textbooks, lecture notes, and research papers — with source citations.

[![Clean UI](https://i.postimg.cc/8CGTS9g8/Screenshot-2026-06-04-083941.png)](https://postimg.cc/K10679YQ)

[![Answer Interface](https://i.postimg.cc/prhw8JMH/Screenshot-2026-06-04-084313.png)](https://postimg.cc/T5xNvmP7)

---

## 🚀 Features

- **RAG Pipeline** — Answers grounded in actual metallurgy books and research papers
- **Source Citations** — Every answer cites the source file and page number
- **Multi-document Knowledge Base** — 22 books, class notes, PPTs, and 20 research papers
- **Scanned PDF Support** — OCR-based ingestion for scanned textbooks using Tesseract
- **Clean Chat UI** — Next.js frontend with dark theme, chat history, and suggestion cards
- **Fast API Backend** — FastAPI backend with a clean REST API

---

## 🧠 Tech Stack

| Layer | Technology |
|---|---|
| LLM | Google Gemini |
| Embeddings | BGE (BAAI/bge-base-en-v1.5) |
| Vector DB | ChromaDB |
| RAG Framework | LangChain |
| Backend | FastAPI |
| Frontend | Next.js + Tailwind CSS |
| PDF Parsing | PyMuPDF + Tesseract OCR |

---

## 📁 Project Structure

```
Metallurgy-AI-Chatbot/
│
├── Data/                         # Raw documents
│   ├── Books/
│   │   ├── Physical_Metallurgy/
│   │   ├── Corrosion/
│   │   ├── Thermodynamics/
│   │   └── Iron Making and Steel Making/
│   ├── Notes/
│   └── Research_Papers/
│
├── Preprocessing/
│   ├── load_documents.py         # Smart PDF loader (digital + scanned)
│   ├── clean_text.py             # OCR noise removal
│   ├── add_metadata.py           # Auto metadata from folder structure
│   └── chunk_documents.py        # RecursiveCharacterTextSplitter
│
├── vector_db/
│   ├── create_embeddings.py      # BGE embeddings
│   ├── build_chroma.py           # ChromaDB ingestion
│   └── chroma-db/                # Persisted vector store (~300MB, 33k chunks)
│
├── RAG/
│   ├── retriever.py              # MMR retrieval
│   ├── prompt_template.py        # Prompt engineering
│   ├── rag_chain.py              # Full RAG pipeline
│   └── citations.py             # Source extraction
│
├── Models/
│   └── llm.py                    # Gemini LLM setup
│
├── Backend/
│   └── main.py                   # FastAPI server
│
├── react/                        # Next.js frontend
│   └── src/
│       ├── components/metamind/
│       │   ├── chat-components.tsx
│       │   └── metamind-chat.tsx
│       └── styles/
│           └── metamind.css
│
└── Evaluation/
    ├── test_questions.txt
    └── evaluate.py
```

---

## ⚙️ Setup & Installation

### Prerequisites

- Python 3.10+
- Node.js 18+
- Tesseract OCR (`sudo apt install tesseract-ocr`)
- Poppler (`sudo apt install poppler-utils`)
- Google Gemini API key

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/Metallurgy-AI-Chatbot.git
cd Metallurgy-AI-Chatbot
```

### 2. Create virtual environment

```bash
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
```

### 3. Install Python dependencies

```bash
pip install -r requirements.txt
```

### 4. Set up environment variables

Create a `.env` file in the root directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 5. Install frontend dependencies

```bash
cd react
npm install
```

---

## 🏃 Running the Project

### Start the backend

```bash
cd Backend
uvicorn main:app --reload
```

Backend runs at `http://localhost:8000`

### Start the frontend

```bash
cd react
npm run dev
```

Frontend runs at `http://localhost:3000`

---

## 📊 Knowledge Base

| Category | Count |
|---|---|
| Textbooks | 22 |
| Class Notes | 3 |
| PPTs (converted to PDF) | 56 |
| Research Papers | 20 |
| **Total chunks indexed** | **~33,000** |

**Subjects covered:**
- Iron Making & Steel Making
- Physical Metallurgy
- Corrosion Engineering
- Thermodynamics of Materials
- Heat Treatment
- Materials Characterization
- Phase Transformations
- Material Charaterization
- Material Casting Technology
- Material Forming Technology
- Material Joining Technology
- Mineral Processing

---

## 🔌 API Reference

### POST `/chat`

Send a question and receive an answer with source citation.

**Request:**
```json
{
  "question": "What is the mechanism of bainite formation in steels?"
}
```

**Response:**
```json
{
  "answer": "Bainite forms by...",
  "sources": [
    {
      "file_name": "PhysicalMetallurgy.pdf",
      "page": 342,
      "subject": "Physical_Metallurgy",
      "category": "BOOKS"
    }
  ]
}
```

---

## 🏗️ Architecture

```
User Question
      ↓
Next.js Frontend (port 3000)
      ↓ HTTP POST /chat
FastAPI Backend (port 8000)
      ↓
LangChain RAG Chain
      ↓              ↓
ChromaDB          Gemini LLM
(MMR Retrieval)   (Answer Generation)
      ↓              ↓
        Answer + Citations
              ↓
        Frontend Display
```

---

## 🔮 Roadmap

- [ ] Metadata filtering by subject
- [ ] Hybrid search (BM25 + semantic)
- [ ] Reranking with cross-encoder
- [ ] Quiz generation
- [ ] Research paper summarization
- [ ] Docker containerization
- [ ] AWS deployment
- [ ] Voice interface

---

## 👨‍💻 Author

**Tushar Srivastava**
2nd Year MME Student, NIT Trichy
Interested in AI/ML + Materials Engineering

---

## 📄 License

This project is for educational purposes. The knowledge base consists of textbooks and materials used for academic study at NIT Trichy.
