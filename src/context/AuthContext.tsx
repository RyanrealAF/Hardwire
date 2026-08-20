import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth, signInWithGoogle, logOut, loadUserProgress, saveUserProgress, UserProgressData } from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  userProgress: UserProgressData | null;
  updateProgress: (completedLessons: string[], lastLessonId?: string, lastModuleId?: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userProgress, setUserProgress] = useState<UserProgressData | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Load cloud progress
        const cloudData = await loadUserProgress(currentUser.uid);
        if (cloudData) {
          setUserProgress(cloudData);
        }
      } else {
        setUserProgress(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      setLoading(true);
      const signedInUser = await signInWithGoogle();
      if (signedInUser) {
        const cloudData = await loadUserProgress(signedInUser.uid);
        if (cloudData) {
          setUserProgress(cloudData);
        }
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await logOut();
      setUser(null);
      setUserProgress(null);
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = async (completedLessons: string[], lastLessonId?: string, lastModuleId?: string) => {
    const newProgress: UserProgressData = {
      completedLessons,
      lastLessonId,
      lastModuleId,
      updatedAt: new Date().toISOString()
    };
    setUserProgress(newProgress);
    if (user) {
      await saveUserProgress(user.uid, newProgress);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn: handleSignIn,
        signOut: handleSignOut,
        userProgress,
        updateProgress
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
