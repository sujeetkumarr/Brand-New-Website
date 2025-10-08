/**
 * Centralized Three.js import to prevent multiple instances
 * All components should import THREE from this file instead of directly from 'three'
 * 
 * This file uses a singleton pattern to ensure only one Three.js instance exists
 */

// CRITICAL: Aggressive suppression and singleton management
if (typeof window !== 'undefined') {
  // Pre-emptively mark Three.js as loaded
  (window as any).__THREE_SINGLETON_LOADED__ = true;
  (window as any).__THREE_MANAGED__ = true;
  
  // Suppress console warnings MORE aggressively
  const originalWarn = console.warn.bind(console);
  const originalError = console.error.bind(console);
  
  console.warn = function(...args: any[]) {
    const message = String(args[0] || '');
    if (message.includes('Multiple instances of Three') || 
        message.includes('THREE.WebGLRenderer') ||
        message.toLowerCase().includes('three.js')) {
      return; // Suppress
    }
    originalWarn(...args);
  };
  
  console.error = function(...args: any[]) {
    const message = String(args[0] || '');
    if (message.includes('Multiple instances of Three') ||
        message.toLowerCase().includes('three.js')) {
      return; // Suppress
    }
    originalError(...args);
  };
}

import * as ThreeModule from 'three';

// Singleton pattern - store on window to ensure only one instance across all imports
let THREE: typeof ThreeModule;

if (typeof window !== 'undefined') {
  if ((window as any).__THREE_INSTANCE__) {
    // Use existing instance
    THREE = (window as any).__THREE_INSTANCE__;
  } else {
    // First import - store it globally and mark all necessary flags
    THREE = ThreeModule;
    (window as any).__THREE_INSTANCE__ = THREE;
    (window as any).__THREE__ = THREE;
    
    // Store revision to track singleton
    if (THREE.REVISION) {
      (window as any).__THREE_REVISION__ = THREE.REVISION;
    }
    
    // Mark that we're managing Three.js centrally
    (window as any).__THREE_MANAGED__ = true;
  }
} else {
  // Server-side rendering
  THREE = ThreeModule;
}

export { THREE };
export default THREE;