// src/contexts/AuthContext.tsx
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useMemo,
  useEffect,
} from "react";

// Basic User interface (adjust as needed)
interface User {
  id: string;
  name: string;
  email: string;
}

// Interface for data stored in localStorage (INSECURE EXAMPLE)
interface StoredUser extends User {
  // !!! WARNING: Storing password/hash in localStorage is INSECURE !!!
  // Replace with secure backend authentication in a real application.
  passwordHash: string; // Placeholder representing stored password/hash
}

// Define the shape of the context value
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean; // Combined loading state (initial check + operations)
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  signup: (details: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// --- LocalStorage Keys ---
const USERS_STORAGE_KEY = "demo_users_list";
const CURRENT_USER_STORAGE_KEY = "demo_current_user"; // Key to store the logged-in user object
// --- End LocalStorage Keys ---

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true); // For checking localStorage on mount
  const [isProcessing, setIsProcessing] = useState(false); // For login/signup operations

  // Load user from localStorage on initial component mount
  useEffect(() => {
    console.log("AuthProvider: Checking localStorage for current user...");
    let foundUser: User | null = null;
    try {
      const storedUserJson = localStorage.getItem(CURRENT_USER_STORAGE_KEY);
      if (storedUserJson) {
        const storedUser = JSON.parse(storedUserJson);
        // Basic validation of the stored user object structure
        if (
          storedUser &&
          storedUser.id &&
          storedUser.email &&
          storedUser.name
        ) {
          foundUser = storedUser;
          console.log(
            "AuthProvider: User loaded from localStorage.",
            foundUser
          );
        } else {
          console.warn(
            "AuthProvider: Invalid user data found in localStorage."
          );
          localStorage.removeItem(CURRENT_USER_STORAGE_KEY); // Clear invalid data
        }
      } else {
        console.log("AuthProvider: No user found in localStorage.");
      }
    } catch (error) {
      console.error(
        "AuthProvider: Failed to load user from localStorage:",
        error
      );
      localStorage.removeItem(CURRENT_USER_STORAGE_KEY); // Clear potentially corrupted data
    } finally {
      setUser(foundUser); // Set user state (will be null if nothing found/invalid)
      setIsInitialLoading(false); // Mark initial loading as complete
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // Helper Functions for localStorage user list (with error handling)
  const getStoredUsers = (): StoredUser[] => {
    try {
      const stored = localStorage.getItem(USERS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("AuthContext: Failed to parse stored users:", error);
      localStorage.removeItem(USERS_STORAGE_KEY);
      return [];
    }
  };

  const saveStoredUsers = (users: StoredUser[]) => {
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    } catch (error) {
      console.error(
        "AuthContext: Failed to save users to localStorage:",
        error
      );
    }
  };

  // Login Function (Uses Local Storage - INSECURE placeholder)
  const login = async (credentials: {
    email: string;
    password: string;
  }): Promise<void> => {
    console.log(
      "AuthContext: Attempting login (localStorage):",
      credentials.email
    );
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 300)); // Simulate network delay

    try {
      const storedUsers = getStoredUsers();
      const foundUser = storedUsers.find(
        (u) => u.email.toLowerCase() === credentials.email.toLowerCase()
      );

      // *** INSECURE PASSWORD CHECK - FOR DEMO ONLY ***
      if (foundUser && foundUser.passwordHash === credentials.password) {
        const loggedInUser: User = {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
        };
        setUser(loggedInUser);
        // Store the logged-in user object in localStorage
        try {
          localStorage.setItem(
            CURRENT_USER_STORAGE_KEY,
            JSON.stringify(loggedInUser)
          );
          console.log("AuthContext: Logged-in user saved to localStorage.");
        } catch (error) {
          console.error("AuthContext: Failed to save current user:", error);
        }
        console.log("AuthContext: Login successful");
        setIsProcessing(false); // End processing
      } else {
        console.error("AuthContext: Login failed - Credentials mismatch");
        setIsProcessing(false); // End processing
        throw new Error("Invalid email or password.");
      }
    } catch (error) {
      setIsProcessing(false); // Ensure loading stops on any error
      console.error("AuthContext: Error during login:", error);
      // Re-throw specific credential error or a generic one
      if (
        error instanceof Error &&
        error.message === "Invalid email or password."
      ) {
        throw error;
      } else {
        throw new Error("An unexpected error occurred during login.");
      }
    }
  };

  // Logout Function (Uses Local Storage)
  const logout = () => {
    console.log("AuthContext: Logging out");
    setUser(null);
    try {
      // Remove the current user data from localStorage
      localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
      console.log("AuthContext: Current user removed from localStorage.");
    } catch (error) {
      console.error("AuthContext: Failed to remove current user:", error);
    }
    // No need to modify the users list on logout
  };

  // Signup Function (Uses Local Storage - INSECURE placeholder)
  const signup = async (details: {
    name: string;
    email: string;
    password: string;
  }): Promise<void> => {
    console.log(
      "AuthContext: Attempting signup (localStorage):",
      details.email
    );
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 300)); // Simulate delay

    try {
      const storedUsers = getStoredUsers();
      const emailExists = storedUsers.some(
        (u) => u.email.toLowerCase() === details.email.toLowerCase()
      );

      if (emailExists) {
        throw new Error("Email address is already registered.");
      }

      // *** STORING PASSWORD DIRECTLY IS INSECURE ***
      const newUser: StoredUser = {
        id: `user_${Date.now()}`, // Simple unique ID for demo
        name: details.name,
        email: details.email,
        passwordHash: details.password, // INSECURE PLACEHOLDER
      };

      const updatedUsers = [...storedUsers, newUser];
      saveStoredUsers(updatedUsers); // Save updated user list
      console.log("AuthContext: Signup successful, user added to list.");
      setIsProcessing(false); // End processing
      // Note: Does not automatically log in the user in this version
    } catch (error) {
      setIsProcessing(false); // Ensure loading stops on error
      console.error("AuthContext: Error during signup:", error);
      if (error instanceof Error) {
        throw error;
      } // Re-throw specific error
      else {
        throw new Error("An unexpected error occurred during signup.");
      }
    }
  };

  // Memoize context value to prevent unnecessary re-renders
  // Provide a combined loading state for simplicity in consuming components
  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      loading: isInitialLoading || isProcessing, // True if either initial check or an operation is running
      login,
      logout,
      signup,
    }),
    [user, isInitialLoading, isProcessing]
  ); // Dependencies updated

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
