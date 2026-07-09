import pytest
import time
from app.services.chat.memory import ConversationMemory
from app.schemas.chat import ChatMessage

def test_session_memory_add_get():
    memory = ConversationMemory()
    session_id = "test-session-1"
    
    memory.add_message(session_id, "user", "Hello")
    memory.add_message(session_id, "assistant", "Hi there")
    
    history = memory.get_history(session_id)
    assert len(history) == 2
    assert history[0].role == "user"
    assert history[1].role == "assistant"

def test_session_active_property():
    memory = ConversationMemory()
    session_id = "test-session-2"
    
    assert memory.get_active_property(session_id) is None
    memory.set_active_property(session_id, "PROP-KOK-123")
    assert memory.get_active_property(session_id) == "PROP-KOK-123"

def test_session_expiration():
    memory = ConversationMemory()
    memory.expiration_seconds = 0.5 # Fast expiration for testing
    session_id = "test-session-3"
    
    memory.add_message(session_id, "user", "Test")
    assert len(memory.get_history(session_id)) == 1
    
    # Wait for expiration
    time.sleep(0.6)
    
    # Session should be wiped out
    assert len(memory.get_history(session_id)) == 0

def test_compared_properties():
    memory = ConversationMemory()
    session_id = "test-session-4"
    
    memory.set_compared_properties(session_id, ["PROP-1", "PROP-2"])
    assert memory.get_compared_properties(session_id) == ["PROP-1", "PROP-2"]
