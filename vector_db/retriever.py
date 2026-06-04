import sys
import os

sys.path.append(
    os.path.dirname(
        os.path.dirname(
            os.path.abspath(__file__)
        )
    )
)
from langchain_chroma import Chroma
from vector_db.create_embeddings import (
    get_embeddings
)
def get_retriever():
    embeddings=get_embeddings()

    vector_store=Chroma(
        persist_directory="chroma-db",
        embedding_function=embeddings
    )
    retriever=vector_store.as_retriever(
        search_type="mmr",
        search_kwargs={
            "k":5,
            "fetch_k":20}
    )
    return retriever
if __name__=="__main__":
    retriever=get_retriever()
    docs=retriever.invoke("What is Corrosion")
    print(f"Retrieved {len(docs)} documents")
    print(docs[0].metadata)
    print(docs[0].page_content[:500])
