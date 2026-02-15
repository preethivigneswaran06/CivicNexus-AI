import os
import google.generativeai as genai
from dotenv import load_dotenv
import time
import random

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
MOCK_MODE = False

if GEMINI_API_KEY:
    try:
        genai.configure(api_key=GEMINI_API_KEY)
    except Exception as e:
        print(f"Error configuring Gemini: {e}. Switching to Mock Mode.")
        MOCK_MODE = True
else:
    print("Warning: GEMINI_API_KEY not found. Switching to Mock Mode.")
    MOCK_MODE = True

# Using Gemini 1.5 Flash for speed and efficiency
MODEL_NAME = "gemini-1.5-flash"

def generate_mock_response(prompt: str):
    time.sleep(1.5) # Simulate latency
    prompt_lower = prompt.lower()
    
    if "water" in prompt_lower:
        return "I understand you're facing a water supply issue. Could you please confirm your sector number so I can check the outage schedule?"
    elif "electricity" in prompt_lower or "light" in prompt_lower:
        return "I've noted the electricity issue. Is this a street light problem or a household power cut?"
    elif "policy" in prompt_lower or "scheme" in prompt_lower:
        return "I can help you with government schemes. We have information on PM-KISAN, Ayushman Bharat, and local housing schemes. Which one are you interested in?"
    elif "document" in prompt_lower or "upload" in prompt_lower:
        return "To verify your documents, please upload a clear photo or PDF of your Aadhaar Card or Voter ID in the 'Document Verification' section."
    else:
        return "I am your CivicNexus Assistant. I can help you file complaints, check policies, or verify documents. How can I assist you today?"

def generate_content(prompt: str):
    if MOCK_MODE:
        return generate_mock_response(prompt)
        
    try:
        model = genai.GenerativeModel(MODEL_NAME)
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"Error generating content: {e}")
        return generate_mock_response(prompt)
