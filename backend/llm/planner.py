import json
from .gemini_client import generate_content

PLANNER_PROMPT = """
You are the Planner Agent for a Civic Governance AI.
Your job is to analyze the user's query and route it to the correct tool.

Available Tools:
1. "complaint_agent": For reporting issues like potholes, water problems, street lights, garbage, etc.
2. "policy_agent": For questions about rules, regulations, application processes, documents needed, gov schemes.
3. "document_agent": For verifying documents or status of applications.

Output strictly valid JSON in this format:
{{
  "tool": "tool_name",
  "input": "extracted_core_query"
}}

User Query: "{query}"
"""

async def plan_query(query: str):
    prompt = PLANNER_PROMPT.format(query=query)
    response_text = generate_content(prompt)
    
    # Clean up response if it contains markdown code blocks
    clean_text = response_text.replace("```json", "").replace("```", "").strip()
    
    try:
        plan = json.loads(clean_text)
        return plan
    except json.JSONDecodeError:
        # Fallback if JSON fails
        print(f"Failed to parse planner response: {response_text}")
        return {"tool": "policy_agent", "input": query}
