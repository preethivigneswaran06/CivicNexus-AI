from llm.gemini_client import generate_content
import json

class InclusionAgent:
    def process(self, response_data: dict, citizen_profile: dict):
        """
        Adjusts the final response based on citizen profile.
        """
        original_response = response_data.get("response") or response_data.get("suggested_action") or "Request processed."
        
        if not citizen_profile:
            return response_data

        # Detect needs
        needs_simplification = citizen_profile.get("literacy_level") == "Low" or "Senior Citizen" in citizen_profile.get("tags", [])
        
        if needs_simplification:
            prompt = f"""
            Rewrite this government response to be extremely simple, warm, and easy to understand for an elderly or low-literacy citizen.
            If the input says "Complaint Filed", confirm it clearly: "Your complaint is filed. We will help you."
            Avoid jargon. Use comforting language.
            
            Original: "{original_response}"
            """
            simplified_response = generate_content(prompt)
            response_data["response_display"] = simplified_response.strip()
            response_data["accessibility_mode"] = True
        else:
            response_data["response_display"] = original_response
            
        return response_data
