from langchain_core.prompts import PromptTemplate
def get_prompt():
    prompt = PromptTemplate(
        template="""
You are a metallurgy and materials science assistant.

Use the provided context to answer the question.

The context may not contain an exact definition.
If the context contains enough information to reasonably answer the question, provide the answer.

Only respond with:
"I could not find the answer in the provided knowledge base."

when the retrieved context is completely unrelated to the question.

Context:
{context}

Question:
{question}

Answer:
""",
        input_variables=[
            "context",
            "question"
        ]
    )
    return prompt
if __name__=="__main__":
    prompt=get_prompt()
    final_prompt=prompt.invoke(
        {
            "context":"Corrosion is degradation of metals due to interaction with the environment.",
            "question":"What is corrosion?"
        }
    )
    print(final_prompt.text)