from transformers import ReformerModelWithLMHead, ReformerTokenizer
import torch

tokenizer = ReformerTokenizer.from_pretrained("google/reformer-crime-and-punishment")
model = ReformerModelWithLMHead.from_pretrained("google/reformer-crime-and-punishment")

prompt = "Hola!!"
inputs = tokenizer.encode(prompt, return_tensors="pt")

output = model.generate(inputs, do_sample=True, temperature=0.8, max_length=120)
print(tokenizer.decode(output[0], skip_special_tokens=True))