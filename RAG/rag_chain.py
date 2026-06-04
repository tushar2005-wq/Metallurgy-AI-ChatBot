import sys
import os

sys.path.append(
    os.path.dirname(
        os.path.dirname(
            os.path.abspath(__file__)
        )
    )
)
from vector_db.retriever import get_retriever
from Models.llm import get_llm
from RAG.prompt import get_prompt
def get_rag_chain():
    retriever=get_retriever()

    llm=get_llm()

    prompt=get_prompt()
    
    def rag_pipeline(question):
        docs=retriever.invoke(
            question
        )
        for i, doc in enumerate(docs):
            print(f"\n========== DOC {i+1} ==========")
            print(doc.metadata)
            print(doc.page_content[:1000])
        context="\n\n".join(
            doc.page_content
            for doc in docs
        )
        chain=prompt | llm
        print(context[:3000])
        response=chain.invoke(
            {
                "context":context,
                "question": question
            }
        )
        sources=[]
        for doc in docs:
            sources.append(
                {
                    "file_name":doc.metadata.get(
                        "file_name"
                    ),
                    "page":doc.metadata.get(
                        "page"
                    ),
                    "subject":doc.metadata.get(
                        "subject"
                    ),
                    "category":doc.metadata.get(
                        "category"
                    )
                }
            )
        return{
            "answer":response.content,
            "sources":sources[:1]
        }
    return rag_pipeline

if __name__=="__main__":
    rag_chain=get_rag_chain()
    result=rag_chain(
        "Define Blast Furnace."
    )
    print(result["answer"])

    print("\nSources:\n")
    for source in result["sources"]:
        print(source)
