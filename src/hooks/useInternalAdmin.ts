import { useState, useEffect } from 'react';

/**
 * Secret key or flag used to unlock internal admin debugging capabilities.
 * Checks for:
 * 1. Client-side build flag: `import.meta.env.VITE_ENABLE_ADMIN_PANEL === 'true'`
 * 2. URL query parameter: `?admin=true` or `?debug_distribution=1`
 * 3. Local session override: `localStorage.getItem('hwm_admin_debug') === 'true'`
 */
export function useInternalAdmin() {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      // 1. Check environment variable
      if (import.meta.env.VITE_ENABLE_ADMIN_PANEL === 'true' || import.meta.env.VITE_ADMIN_SECRET) {
        return true;
      }
      // 2. Check local dev mode or query parameter
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        if (params.get('admin') === 'true' || params.get('debug_distribution') === '1') {
          return true;
        }
        if (localStorage.getItem('hwm_admin_debug') === 'true') {
          return true;
        }
      }
    } catch {
      // Return false safely if environment or storage is restricted
    }
    return false;
  });

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        if (params.get('admin') === 'true' || params.get('debug_distribution') === '1') {
          setIsAdmin(true);
        }
      }
    } catch {
      // Ignore URL parsing errors
    }
  }, []);

  return { isAdmin, setIsAdmin };
}
