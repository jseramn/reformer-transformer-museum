from transformers import ReformerModelWithLMHead, ReformerTokenizer

MODEL_ID = "google/reformer-crime-and-punishment"


class ReformerGenerator:
    def load(self) -> None:
        self.tokenizer = ReformerTokenizer.from_pretrained(MODEL_ID)
        self.model = ReformerModelWithLMHead.from_pretrained(MODEL_ID)
        self.model.eval()

    def generate(
        self,
        prompt: str,
        temperature: float = 0.8,
        max_length: int = 150,
    ) -> str:
        inputs = self.tokenizer(prompt, return_tensors="pt")

        output = self.model.generate(
            inputs.input_ids,
            do_sample=True,
            temperature=temperature,
            max_length=max_length,
            pad_token_id=self.tokenizer.pad_token_id,
            top_k=50,
        )

        return self.tokenizer.decode(output[0], skip_special_tokens=True)