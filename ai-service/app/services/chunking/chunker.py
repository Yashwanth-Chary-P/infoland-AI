from typing import List
from app.services.chunking.document import Document, Chunk
from app.core.config import settings


class ChunkBuilder:
    """
    Intelligently chunks text. Does not use LangChain.
    Implements a simple sliding window character chunker.
    """

    def __init__(self, chunk_size: int = None, chunk_overlap: int = None):
        self.chunk_size = chunk_size or settings.chunk_size
        self.chunk_overlap = chunk_overlap or settings.chunk_overlap

    def chunk_document(self, document: Document) -> List[Chunk]:
        """Splits a document into multiple overlapping chunks."""
        text = document.content
        chunks = []

        start = 0
        text_length = len(text)
        chunk_index = 0

        while start < text_length:
            end = start + self.chunk_size

            if end < text_length:
                last_newline = text.rfind("\n", start, end)
                if last_newline != -1 and last_newline > start + self.chunk_size // 2:
                    end = last_newline + 1
                else:
                    last_space = text.rfind(" ", start, end)
                    if last_space != -1 and last_space > start + self.chunk_size // 2:
                        end = last_space + 1

            chunk_content = text[start:end].strip()
            if chunk_content:
                chunk_id = f"{document.id}_chunk_{chunk_index}"
                chunks.append(
                    Chunk(
                        chunk_id=chunk_id,
                        document_id=document.id,
                        content=chunk_content,
                        metadata=document.metadata.copy(),
                    )
                )
                chunk_index += 1

            start = end - self.chunk_overlap
            if start <= end - self.chunk_size:
                start = end

        return chunks
