import os
from pathlib import Path
from langchain_community.document_loaders import (
    PyMuPDFLoader
)
DATA_PATH = "C:/ABC/CLG/PYTHON PROG/LANGCHAIN/Metallurgy-AI-Chatbot/Data"
def is_scanned(docs):
    valid_pages=0
    for doc in docs:
        text=doc.page_content.strip()
        if len(text)>50:
            valid_pages+=1
    ratio=valid_pages/len(docs)
    return ratio < 0.3
def load_documents():
    documents=[]
    for root,dirs,files in os.walk(DATA_PATH):
        for file in files:
            if not file.endswith(".pdf"):
                continue
            file_path=os.path.join(root,file)
            try:
                #normal extraction
                loader=PyMuPDFLoader(file_path)
                docs=loader.load()
                if is_scanned(docs):
                    print(f"Scanned PDF detected:{file}")
                    raise Exception(
                        "Scanned PDF"
                    )
            except:
                print(
                    f"Skipping Scanned Files{file}"
                )
                continue
                
#now we will be adding the metadata
            path_parts=Path(
                file_path
            ).parts
            data_index = path_parts.index("Data")
            category=path_parts[data_index+1]
            if category=='RESEARCH PAPERS':
                subject="Research"
            else:
                subject = path_parts[data_index + 2]
            for doc in docs:
                doc.metadata['category']=category
                doc.metadata['subject']=subject
                doc.metadata['file_name']=file
            documents.extend(docs)
    return documents
if __name__=="__main__":
    docs=load_documents()
    print(
        "Loaded",len(docs),"pages"
    )
    print(docs[0].metadata)
    print(docs[0].page_content[:500])
    