// ============================================================================
// ZERO-CONFIG CROSS-TAB / MULTI-WINDOW REALTIME SYNCHRONIZATION
// Uses BroadcastChannel API with localStorage fallback
// Enables dual-screen demo (Laptop = 108 Command Console, Second Screen/Phone = Responder App)
// ============================================================================

const CHANNEL_NAME = 'pulse_ahmedabad_sync';

class SyncChannel {
  constructor() {
    this.channel = null;
    this.listeners = new Set();
    this.init();
  }

  init() {
    if (typeof window === 'undefined') return;

    if ('BroadcastChannel' in window) {
      try {
        this.channel = new BroadcastChannel(CHANNEL_NAME);
        this.channel.onmessage = (event) => {
          this.notify(event.data);
        };
      } catch (e) {
        console.warn('BroadcastChannel unavailable, falling back to storage events', e);
      }
    }

    // Fallback: window storage event
    window.addEventListener('storage', (event) => {
      if (event.key === CHANNEL_NAME && event.newValue) {
        try {
          const data = JSON.parse(event.newValue);
          this.notify(data);
        } catch {}
      }
    });
  }

  notify(data) {
    if (!data || !data.type) return;
    this.listeners.forEach((listener) => {
      try {
        listener(data);
      } catch (err) {
        console.error('Error in sync listener:', err);
      }
    });
  }

  /**
   * Broadcast an event to all other tabs and windows
   * @param {string} type Event type ('TRIGGER_SOS' | 'ACCEPT_MISSION' | 'UNLOCK_CABINET' | 'ARRIVE_SCENE' | 'DELIVER_SHOCK' | 'PARAMEDIC_HANDOFF' | 'RESET')
   * @param {object} payload Event payload
   */
  broadcast(type, payload = {}) {
    const message = { type, payload, timestamp: Date.now() };

    if (this.channel) {
      try {
        this.channel.postMessage(message);
      } catch (err) {
        console.warn('BroadcastChannel postMessage error:', err);
      }
    }

    // Also write to localStorage for non-supporting browsers / persistence
    try {
      localStorage.setItem(CHANNEL_NAME, JSON.stringify(message));
    } catch {}
  }

  /**
   * Subscribe to incoming cross-tab messages
   * @param {Function} callback (data) => void
   * @returns {Function} unsubscribe function
   */
  subscribe(callback) {
    this.listeners.add(callback);
    return () => {
      this.listeners.delete(callback);
    };
  }
}

export const syncChannel = new SyncChannel();

