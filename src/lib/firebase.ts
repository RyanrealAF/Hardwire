import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User 
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  onSnapshot 
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App instance safely
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Authentication and Google Provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Firestore Database instance
export const db = firebaseConfig.firestoreDatabaseId 
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

/**
 * Sign in with Google Popup
 */
export async function signInWithGoogle(): Promise<User> {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;
  
  // Initialize or update user profile document in Firestore
  if (user) {
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, {
      uid: user.uid,
      displayName: user.displayName || 'Anonymous Student',
      email: user.email,
      photoURL: user.photoURL,
      lastActiveAt: new Date().toISOString()
    }, { merge: true });
  }

  return user;
}

/**
 * Sign out current user
 */
export async function logOut(): Promise<void> {
  await firebaseSignOut(auth);
}

/**
 * Interface for User Progress stored in Firestore
 */
export interface UserProgressData {
  completedLessons: string[];
  lastLessonId?: string;
  lastModuleId?: string;
  updatedAt?: string;
}

/**
 * Load user's lesson progress from Firestore
 */
export async function loadUserProgress(uid: string): Promise<UserProgressData | null> {
  try {
    const progressRef = doc(db, 'userProgress', uid);
    const snap = await getDoc(progressRef);
    if (snap.exists()) {
      return snap.data() as UserProgressData;
    }
    return null;
  } catch (err) {
    console.error('Error loading user progress:', err);
    return null;
  }
}

/**
 * Save user's lesson progress to Firestore
 */
export async function saveUserProgress(uid: string, progress: Partial<UserProgressData>): Promise<void> {
  try {
    const progressRef = doc(db, 'userProgress', uid);
    await setDoc(progressRef, {
      ...progress,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.error('Error saving user progress:', err);
  }
}

export type { User };
