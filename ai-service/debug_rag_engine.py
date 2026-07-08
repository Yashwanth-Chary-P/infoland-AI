import asyncio
import os
from typing import Dict, Any, Optional

from app.rag.retriever import InfoLandRetriever
from app.rag.context_builder import ContextBuilder
from app.rag.prompts import get_rag_prompt_template
from app.rag.llm_factory import get_llm_provider
from app.rag.validator import ResponseValidator
from app.rag.citations import CitationEngine
from langchain_core.output_parsers import StrOutputParser

async def debug_query(query: str):
    print(f"\n{'='*50}")
    print(f"QUERY: {query}")
    print(f"{'='*50}")

    # 1. Retrieve
    print("\n--- STEP 1: Debug Retrieval ---")
    retriever = InfoLandRetriever(collection_name="location", top_k=5)
    documents = await retriever.ainvoke(query)
    print(f"Retrieved {len(documents)} documents.")
    
    for i, doc in enumerate(documents):
        print(f"\nDocument {i+1}:")
        print(f"  Chunk length: {len(doc.page_content)}")
        print(f"  Dataset: {doc.metadata.get('dataset', 'N/A')}")
        print(f"  Property ID: {doc.metadata.get('property_id', 'N/A')}")
        print(f"  Document Type: {doc.metadata.get('document_type', 'N/A')}")
        print(f"  Source File: {doc.metadata.get('source_file', 'N/A')}")
        print(f"  Page Content (first 100 chars): {doc.page_content[:100]}...")

    # 2. Context Builder
    print("\n--- STEP 2: Debug Context Builder ---")
    context_str = ContextBuilder.build(documents)
    print(f"Final context string length: {len(context_str)}")
    print(f"COMPLETE CONTEXT:\n{context_str}")

    # 3. Prompt
    print("\n--- STEP 3: Debug Prompt ---")
    prompt = get_rag_prompt_template()
    formatted_prompt = await prompt.ainvoke({"context": context_str, "question": query})
    print("FINAL PROMPT:")
    # prompt is a ChatPromptValue, we can print it nicely
    for msg in formatted_prompt.messages:
        print(f"[{msg.type.upper()}]:\n{msg.content}\n")

    # 4. LLM Response
    print("\n--- STEP 4: Debug LLM Response ---")
    llm = get_llm_provider()
    chain = prompt | llm | StrOutputParser()
    raw_response = await chain.ainvoke({"context": context_str, "question": query})
    print(f"RAW LLM RESPONSE:\n{raw_response}")

    # 5. Validator
    print("\n--- STEP 5: Debug Validator ---")
    final_answer = ResponseValidator.validate_llm_response(raw_response)
    print(f"VALIDATED OUTPUT:\n{final_answer}")
    
    # 6. Citations
    print("\n--- STEP 6: Debug Citations ---")
    citations = CitationEngine.generate_citations(documents)
    print(f"Generated {len(citations)} citations.")
    if final_answer == ResponseValidator.INSUFFICIENT_CONTEXT_MSG:
        print("Citations cleared by validator (expected behavior).")

async def main():
    queries = [
        "hospital",
        "school",
        "City Care Hospital",
        "commercial hub",
        "Kokapet",
        "Mokila",
        "Shankarpally",
        "property"
    ]
    for q in queries:
        await debug_query(q)

if __name__ == "__main__":
    asyncio.run(main())
