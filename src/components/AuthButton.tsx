import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogIn, LogOut, Loader2 } from 'lucide-react';

interface AuthButtonProps {
  compact?: boolean;
}

export const AuthButton: React.FC<AuthButtonProps> = ({ compact = false }) => {
  const { user, loading, signIn, signOut } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-zinc-100 text-zinc-500 text-xs font-mono">
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
        {!compact && <span>Syncing...</span>}
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-zinc-100 border border-zinc-200">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName || 'User'}
              className="w-5 h-5 rounded-full object-cover border border-zinc-300"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-5 h-5 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center text-[10px] font-bold">
              {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
            </div>
          )}
          {!compact && (
            <div className="text-left hidden sm:block">
              <p className="text-xs font-semibold text-zinc-800 leading-tight truncate max-w-[110px]">
                {user.displayName || 'Student'}
              </p>
              <p className="text-[9px] text-emerald-600 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Cloud Synced
              </p>
            </div>
          )}
        </div>
        <button
          onClick={signOut}
          title="Sign out of Google"
          className="p-1.5 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200 rounded-md transition-colors cursor-pointer text-xs flex items-center gap-1"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={signIn}
      className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#1A1A1A] hover:bg-[#333333] text-white text-xs font-medium rounded-md shadow-sm transition-all cursor-pointer"
    >
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="currentColor"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="currentColor"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        />
        <path
          fill="currentColor"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        />
      </svg>
      <span>Sign in with Google</span>
    </button>
  );
};
