import re
def clean_documents(documents):
    for doc in documents:
        text=doc.page_content
        #removing the extra white spaces
        text=re.sub(r"\s+"," ",text)
        #removing the multiple new lines
        text=re.sub(r"\n+","\n",text)
        #removing extra tabs
        text=text.replace("\t"," ")
        doc.page_content=text.strip()
    return documents
