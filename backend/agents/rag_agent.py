from utils.vector_store import VectorStore
from llm.gemini_client import generate_content
import json

class RagAgent:
    def __init__(self):
        # Initialize vector store (loads data from backend/data/policies.json)
        self.vector_store = VectorStore(data_path="data/policies.json")

    def process(self, query: str):
        # 1. Retrieve relevant policies (Increased k for better context)
        retrieved_docs = self.vector_store.search(query, k=3)
        
        context_parts = []
        for d in retrieved_docs:
            context_parts.append(f"Scheme: {d['title']}\nDescription: {d['description']}\nDetails: {json.dumps(d.get('details', {}))}")
        
        context = "\n---\n".join(context_parts)
        
        # 2. Generate Answer via LLM
        prompt = f"""
        You are an expert government policy assistant for the 'CivicNexus' platform.
        Your goal is to answer citizen questions ACCURATELY based *only* on the provided context.
        
        CONTEXT DATA:
        {context}
        
        CITIZEN QUERY: "{query}"
        
        INSTRUCTIONS:
        - specific details (amounts, eligibility documents) from the context.
        - If the user asks about a scheme present in the context, explain it clearly.
        - If the context does not contain the answer, politely say you don't have that info.
        - Tone: Helpful, Professional, and Empathetic.
        - Do not mention "context" or "JSON" in your output. Just answer naturally.
        """
        
        answer = generate_content(prompt)
        
        return {
            "type": "policy_info",
            "response": answer,
            "sources": [d['title'] for d in retrieved_docs]
        }
