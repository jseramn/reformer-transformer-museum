from transformers import ReformerModelWithLMHead, ReformerTokenizer

tokenizer = ReformerTokenizer.from_pretrained("google/reformer-crime-and-punishment")
model = ReformerModelWithLMHead.from_pretrained("google/reformer-crime-and-punishment")

def generate(prompt, temperature=0.8, max_length=150):
    inputs = tokenizer(prompt, return_tensors="pt")
    
    output = model.generate(
        inputs.input_ids,
        do_sample=True,
        temperature=temperature,
        max_length=max_length,
        pad_token_id=tokenizer.pad_token_id,
        top_k=50
    )
    
    print(f"\n--- Prompt: {prompt}")
    print(f"Temp: {temperature} | Max Length: {max_length}")
    print("Respuesta:", tokenizer.decode(output[0], skip_special_tokens=True))
    print("-" * 60)

# Pruebas
generate("Raskolnikov walked down the street", temperature=0.7, max_length=120)
generate("A few months later", temperature=1.0, max_length=100)
generate("He suddenly stopped and thought:", temperature=0.6, max_length=150)