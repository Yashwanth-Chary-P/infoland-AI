import time
import asyncio
from typing import List, Optional, Dict, Any
from app.schemas.chat import ChatMessage
from app.core.logging import logger
from app.core.config import settings

class SessionContext:
    def __init__(self, session_id: str):
        self.session_id = session_id
        self.history: List[ChatMessage] = []
        self.active_property_id: Optional[str] = None
        self.compared_property_ids: List[str] = []
        self.last_accessed: float = time.time()
        self.metadata: Dict[str, Any] = {}

class ConversationMemory:
    """
    In-memory session store for conversational context.
    Abstracted so it can be replaced with Redis later.
    """
    def __init__(self):
        self._sessions: Dict[str, SessionContext] = {}
        # Set expiration to 30 minutes by default
        self.expiration_seconds = getattr(settings, 'chat_session_expiration_seconds', 1800)

    def _cleanup_expired(self):
        now = time.time()
        expired = [sid for sid, ctx in self._sessions.items() if (now - ctx.last_accessed) > self.expiration_seconds]
        for sid in expired:
            del self._sessions[sid]
            logger.info(f"Cleaned up expired session: {sid}")

    def get_session(self, session_id: str) -> SessionContext:
        self._cleanup_expired()
        if session_id not in self._sessions:
            self._sessions[session_id] = SessionContext(session_id)
        
        # Touch session
        self._sessions[session_id].last_accessed = time.time()
        return self._sessions[session_id]

    def add_message(self, session_id: str, role: str, content: str):
        session = self.get_session(session_id)
        session.history.append(ChatMessage(role=role, content=content))
        # Keep history from growing indefinitely (keep last 20 messages)
        if len(session.history) > 20:
            session.history = session.history[-20:]

    def get_history(self, session_id: str) -> List[ChatMessage]:
        return self.get_session(session_id).history

    def set_active_property(self, session_id: str, property_id: str):
        session = self.get_session(session_id)
        if session.active_property_id != property_id:
            logger.info(f"Session {session_id} switched active property from {session.active_property_id} to {property_id}")
            session.active_property_id = property_id

    def get_active_property(self, session_id: str) -> Optional[str]:
        return self.get_session(session_id).active_property_id

    def set_compared_properties(self, session_id: str, property_ids: List[str]):
        session = self.get_session(session_id)
        session.compared_property_ids = property_ids

    def get_compared_properties(self, session_id: str) -> List[str]:
        return self.get_session(session_id).compared_property_ids

    def clear_session(self, session_id: str):
        if session_id in self._sessions:
            del self._sessions[session_id]

# Global singleton instance
memory_service = ConversationMemory()
