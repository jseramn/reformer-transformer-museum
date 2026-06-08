import modal
from fastapi import FastAPI

from model_service import ReformerGenerator
from schemas import GenerateRequest, GenerateResponse

app = modal.App("reformer-museum")

image = (
    modal.Image.debian_slim(python_version="3.11")
    .pip_install(
        "transformers==5.10.2",
        "torch",
        "fastapi",
        "pydantic",
    )
    .add_local_python_source("model_service", "schemas")
)


@app.cls(
    image=image,
    cpu=1.0,
    memory=2048,
    timeout=600,
    scaledown_window=300,
)
class ReformerService:
    @modal.enter()
    def load_model(self) -> None:
        self.generator = ReformerGenerator()
        self.generator.load()

    @modal.asgi_app(label="generate")
    def web(self):
        web_app = FastAPI(title="Reformer Museum")
        service = self

        @web_app.post("/generate", response_model=GenerateResponse)
        def generate(request: GenerateRequest) -> GenerateResponse:
            text = service.generator.generate(
                prompt=request.prompt,
                temperature=request.temperature,
                max_length=request.max_length,
            )
            return GenerateResponse(text=text, prompt=request.prompt)

        return web_app