from langchain_text_splitters import RecursiveCharacterTextSplitter
def chunk_documents(documents):
    splitter=RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200
    )
    chunks=splitter.split_documents(
        documents
    )
    return chunks
if __name__=="__main__":
    from load_documents import load_documents
    from clean_text import clean_documents
    docs=load_documents()
    docs=clean_documents(docs)
    chunks=chunk_documents(docs)
    print(f"Chunks:{len(chunks)}")
    print(chunks[0].metadata)
    print(chunks[0].page_content[:500])