from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import json
import os

# Import Agents and Utils
from llm.planner import plan_query
from agents.complaint_agent import ComplaintAgent
from agents.rag_agent import RagAgent
from agents.document_agent import DocumentAgent
from agents.inclusion_agent import InclusionAgent

app = FastAPI(title="CivicNexus AI Backend")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Citizen Profiles
CITIZEN_PROFILES = {}
try:
    with open("data/citizen_profiles.json", "r") as f:
        profiles = json.load(f)
        for p in profiles:
            CITIZEN_PROFILES[p["citizen_id"]] = p
except FileNotFoundError:
    print("Warning: citizen_profiles.json not found.")

# Initialize Agents
complaint_agent = ComplaintAgent()
rag_agent = RagAgent()
document_agent = DocumentAgent()
inclusion_agent = InclusionAgent()

class QueryRequest(BaseModel):
    query: str
    citizen_id: str = "CIT-001" # Default to senior citizen for demo
    language: str = "en"

@app.post("/query")
async def process_query(request: QueryRequest):
    print(f"Received query: {request.query} from {request.citizen_id}")
    
    try:
        # 1. Plan
        plan = await plan_query(request.query)
        print(f"Planner output: {plan}")
        
        tool_name = plan.get("tool")
        tool_input = plan.get("input")
        
        # 2. Execute Tool
        result = {}
        if tool_name == "complaint_agent":
            result = complaint_agent.process(tool_input)
        elif tool_name == "policy_agent":
            # Note: RagAgent expects 'query'
            result = rag_agent.process(tool_input)
        elif tool_name == "document_agent":
            result = document_agent.process(tool_input)
        else:
            # Fallback
            result = {"response": "I'm not sure how to handle that request. Please try rephrasing."}

        # 3. Inclusion / Tone Adjustment
        citizen_profile = CITIZEN_PROFILES.get(request.citizen_id)
        final_response = inclusion_agent.process(result, citizen_profile)
        
        return final_response
    except Exception as e:
        import traceback
        print(f"Error processing query: {e}")
        traceback.print_exc()
        return {"response": f"Error: {str(e)}", "response_display": f"System Error: {str(e)}"}

@app.get("/")
def read_root():
    return {"status": "CivicNexus AI Backend Running"}
