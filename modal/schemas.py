from pydantic import BaseModel, Field


class GenerateRequest(BaseModel):
    prompt: str = Field(..., min_length=1, max_length=300)
    temperature: float = Field(default=0.8, ge=0.1, le=1.5)
    max_length: int = Field(default=150, ge=50, le=200)


class GenerateResponse(BaseModel):
    text: str
    prompt: str