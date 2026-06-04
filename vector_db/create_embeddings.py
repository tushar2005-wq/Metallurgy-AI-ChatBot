from langchain_huggingface import HuggingFaceEmbeddings
def get_embeddings():
    embeddings=HuggingFaceEmbeddings(
        model_name="BAAI/bge-base-en-v1.5"
    )
    return embeddings
if __name__=="__main__":
    embeddings=get_embeddings()
    print("Model is loaded")