from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import StreamingResponse
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chat.conversation_service import ConversationService
from app.services.chat.streaming import StreamingService

router = APIRouter()

_conv_service = ConversationService()
_stream_service = StreamingService()

def get_conversation_service() -> ConversationService:
    return _conv_service

def get_streaming_service() -> StreamingService:
    return _stream_service

@router.post("", response_model=ChatResponse)
async def chat_sync(
    request: ChatRequest,
    conv_service: ConversationService = Depends(get_conversation_service)
):
    """
    Synchronous chat endpoint for multi-turn conversational AI.
    """
    try:
        response = await conv_service.process_message(request)
        return response
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Chat generation failed: {str(e)}")

@router.post("/stream")
async def chat_stream(
    request: ChatRequest,
    stream_service: StreamingService = Depends(get_streaming_service)
):
    """
    Server-Sent Events (SSE) streaming endpoint for chat.
    """
    try:
        return StreamingResponse(
            stream_service.stream_chat(request),
            media_type="text/event-stream"
        )
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Streaming failed: {str(e)}")
