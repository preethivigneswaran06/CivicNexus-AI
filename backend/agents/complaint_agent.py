import random
from llm.gemini_client import generate_content
import json

class ComplaintAgent:
    def process(self, query: str):
        # Use LLM to understand intent, extract details, AND generate a human-like response
        prompt = f"""
        You are an intelligent Civic Complaint Bot.
        
        USER QUERY: "{query}"
        
        TASK:
        1. Analyze if this is a complaint about a civic issue (Water, Electricity, Road, Sanitation, etc.).
        2. If it IS a complaint (even a short one like "Streetlight not working"):
           - Extract 'department' (Water, Electricity, Sanitation, Works, Police, General).
           - Extract 'urgency' (Low, Medium, High).
           - Generate a 'response_text': A polite, professional confirmation that the complaint is filed. Mention what action will be taken.
           - Set 'status' to "Filed".
        3. If it is NOT a complaint (e.g. "Hello", "How are you"):
           - Set 'status' to "Needs Info".
           - Generate 'response_text' asking them to describe their issue.
        
        OUTPUT FORMAT (Strict JSON):
        {{
            "department": "...",
            "urgency": "...",
            "response_text": "...",
            "status": "Filed" or "Needs Info"
        }}
        """
        
        response_text = generate_content(prompt)
        clean_text = response_text.replace("```json", "").replace("```", "").strip()
        
        try:
            analysis = json.loads(clean_text)
        except:
            # Fallback if JSON fails, but unlikely with Gemini
            analysis = {
                "department": "General",
                "urgency": "Medium",
                "response_text": "I have noted your issue. We will look into it.",
                "status": "Filed" # Default to filing to avoid loops
            }

        # If status is Filed, generate ID and return structure
        if analysis.get("status") == "Filed":
            complaint_id = f"CMP-{random.randint(10000, 99999)}"
            return {
                "type": "complaint_logged",
                "complaint_id": complaint_id,
                "department": analysis.get("department", "General"),
                "urgency": analysis.get("urgency", "Medium"),
                "suggested_action": analysis.get("response_text"), # Use the LLM's text as the action/response
                "original_query": query
            }
        else:
            # Return as a normal chat response (not filing yet)
            return {
                "type": "chat_response",
                "response": analysis.get("response_text")
            }
