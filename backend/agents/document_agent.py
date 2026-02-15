import random

class DocumentAgent:
    def process(self, query: str):
        # Simulate verification logic
        # In a real app, this would use OCR or database lookups
        
        statuses = ["Verified", "Pending", "Rejected"]
        status = random.choice(statuses)
        
        return {
            "type": "document_status",
            "response": f"The document related to '{query}' is currently {status}.",
            "status": status,
            "verification_id": f"VER-{random.randint(1000, 9999)}"
        }
