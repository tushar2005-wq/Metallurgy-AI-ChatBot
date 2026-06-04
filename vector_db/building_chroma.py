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

from Preprocessing.load_documents import load_documents
from Preprocessing.clean_text import clean_documents
from Preprocessing.chunk_documents import chunk_documents

from vector_db.create_embeddings import get_embeddings

def build_chroma():
    documents=load_documents()
    cleaned_documents=clean_documents(
        documents
    )
    chunks=chunk_documents(
        cleaned_documents
    )
    embeddings=get_embeddings()
    vector_store=Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        persist_directory="chroma-db"
    )
    return vector_store
if __name__=="__main__":
    vector_store=build_chroma()
    print(
        f"Vector Store Created Succesfully"
        )

