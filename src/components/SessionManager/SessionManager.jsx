import React, { useEffect, useRef, useCallback } from 'react';
import { useUserStore } from '../../Store/userStore';

/**
 * SessionManager Component
 * 
 * Globablly monitors user inactivity and tab visibility.
 * Implements performance-safe throttling and use of refs to avoid re-renders.
 */
const SessionManager = ({ children }) => {
    const { setIsLocked, isLocked } = useUserStore();
    const lastActivityTime = useRef(Date.now());
    const visibilityStartTime = useRef(null);

    // Thresholds: Configurable and easy to adjust
    const IDLE_TIMEOUT = 10 * 60 * 1000;         // Lock if no mouse/keyboard for 10 minutes
    const TAB_SWITCH_TIMEOUT = 1 * 60 * 1000;      // Lock if user switches tab for more than 3 minute

    const updateActivity = useCallback(() => {
        const now = Date.now();
        // Throttling: We only update the timestamp if 1s has passed.
        // This ensures zero impact on performance.
        if (now - lastActivityTime.current > 1000 && !isLocked) {
            lastActivityTime.current = now;
        }
    }, [isLocked]);

    // Reset activity timer whenever the screen is unlocked
    useEffect(() => {
        if (!isLocked) {
            lastActivityTime.current = Date.now();
            visibilityStartTime.current = null;
        }
    }, [isLocked]);

    useEffect(() => {
        if (isLocked) return;

        const handleVisibilityChange = () => {
            if (document.hidden) {
                // Record the timestamp when they switch away
                visibilityStartTime.current = Date.now();
            } else {
                // Check if they were away for TOO long when they come back
                if (visibilityStartTime.current) {
                    const awayDuration = Date.now() - visibilityStartTime.current;
                    if (awayDuration > TAB_SWITCH_TIMEOUT) {
                        setIsLocked(true);
                    }
                }
                visibilityStartTime.current = null;
                // Force an activity update when they return
                lastActivityTime.current = Date.now();
            }
        };

        const checkInactivity = setInterval(() => {
            // Background check every 10 seconds to save battery/CPU
            if (!isLocked && (Date.now() - lastActivityTime.current > IDLE_TIMEOUT)) {
                setIsLocked(true);
            }
        }, 10000); 

        // Listen for all common user activity signals (passive: true for performance)
        window.addEventListener('mousemove', updateActivity, { passive: true });
        window.addEventListener('keydown', updateActivity, { passive: true });
        window.addEventListener('scroll', updateActivity, { passive: true });
        window.addEventListener('mousedown', updateActivity, { passive: true });
        window.addEventListener('touchstart', updateActivity, { passive: true });
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            clearInterval(checkInactivity);
            window.removeEventListener('mousemove', updateActivity);
            window.removeEventListener('keydown', updateActivity);
            window.removeEventListener('scroll', updateActivity);
            window.removeEventListener('mousedown', updateActivity);
            window.removeEventListener('touchstart', updateActivity);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [isLocked, setIsLocked, updateActivity]);

    return <>{children}</>;
};

export default SessionManager;
