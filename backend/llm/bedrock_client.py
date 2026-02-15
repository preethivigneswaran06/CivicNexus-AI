"""
bedrock_client.py

This is a standalone Bedrock integration module.
It does NOT interfere with existing LLM logic.
It is not auto-imported.
It is safe to include in the project structure.

If not explicitly used, it does nothing.
"""

import json
from typing import Dict, Any, Optional


class BedrockClient:
    """
    Optional Amazon Bedrock integration layer.
    This class will only execute if explicitly instantiated.
    """

    def __init__(self,
                 region_name: Optional[str] = None,
                 model_id: Optional[str] = None):
        """
        Initialization does NOT auto-connect to AWS.
        It only stores configuration.
        """
        self.region_name = region_name
        self.model_id = model_id
        self._client = None  # Lazy initialization

    def _initialize_client(self):
        """
        Lazy-load boto3 client only if needed.
        Prevents breaking environments without AWS setup.
        """
        if self._client is None:
            try:
                import boto3
                self._client = boto3.client(
                    service_name="bedrock-runtime",
                    region_name=self.region_name or "us-east-1"
                )
            except Exception:
                raise RuntimeError(
                    "Bedrock client initialization failed. "
                    "Ensure AWS credentials are configured."
                )

    def invoke(self, prompt: str, max_tokens: int = 500) -> str:
        """
        Safe invoke method.
        Will only run if explicitly called.
        """
        self._initialize_client()

        body = {
            "messages": [
                {"role": "user", "content": prompt}
            ],
            "max_tokens": max_tokens
        }

        try:
            response = self._client.invoke_model(
                modelId=self.model_id or "anthropic.claude-3-sonnet-20240229-v1:0",
                body=json.dumps(body)
            )

            result = json.loads(response["body"].read())
            return result["content"][0]["text"]

        except Exception as e:
            return f"[Bedrock Error]: {str(e)}"

    def planner(self, user_query: str) -> Dict[str, Any]:
        """
        Optional multi-agent planner.
        Not executed unless explicitly used.
        """
        planner_prompt = f"""
        You are a civic AI planner.
        Decide which tool to use.
        Return JSON if tool needed.
        Query: {user_query}
        """

        response = self.invoke(planner_prompt)

        try:
            return json.loads(response)
        except:
            return {"response": response}
