import faiss
import json
import numpy as np
from sentence_transformers import SentenceTransformer
import os

class VectorStore:
    def __init__(self, data_path: str = "data/policies.json", model_name: str = "all-MiniLM-L6-v2"):
        self.data_path = data_path
        self.model = SentenceTransformer(model_name)
        self.index = None
        self.policies = []
        self.dimension = 384 # Dimension for all-MiniLM-L6-v2
        
        self.load_data()
        self.build_index()

    def load_data(self):
        if os.path.exists(self.data_path):
            with open(self.data_path, 'r') as f:
                self.policies = json.load(f)
        else:
            print(f"Warning: {self.data_path} not found.")
            self.policies = []

    def build_index(self):
        if not self.policies:
            return

        texts = [f"{p['title']} {p['description']}" for p in self.policies]
        embeddings = self.model.encode(texts)
        
        # FAISS index
        self.index = faiss.IndexFlatL2(self.dimension)
        self.index.add(np.array(embeddings).astype('float32'))
        print(f"Indexed {len(self.policies)} policies.")

    def search(self, query: str, k: int = 2):
        if not self.index:
            return []

        query_vector = self.model.encode([query]).astype('float32')
        distances, indices = self.index.search(query_vector, k)
        
        results = []
        for i in range(k):
            idx = indices[0][i]
            if idx < len(self.policies) and idx >= 0:
                results.append(self.policies[idx])
        
        return results

# Singleton instance
vector_store = VectorStore()
