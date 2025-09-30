// Feature usage tracking utilities for localStorage
// Since this is a demo project, we use localStorage to persist feature usage per user

const STORAGE_KEY_PREFIX = 'atlas-feature-usage-';

export interface FeatureUsageData {
  [featureId: string]: number; // featureId -> usage count
}

/**
 * Get the storage key for a specific user
 */
function getStorageKey(userId: string): string {
  return `${STORAGE_KEY_PREFIX}${userId}`;
}

/**
 * Load feature usage data for a specific user from localStorage
 */
export function loadFeatureUsage(userId: string): FeatureUsageData {
  if (typeof window === 'undefined') return {};

  try {
    const key = getStorageKey(userId);
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Error loading feature usage from localStorage:', error);
    return {};
  }
}

/**
 * Save feature usage data for a specific user to localStorage
 */
export function saveFeatureUsage(userId: string, data: FeatureUsageData): void {
  if (typeof window === 'undefined') return;

  try {
    const key = getStorageKey(userId);
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving feature usage to localStorage:', error);
  }
}

/**
 * Get the current usage count for a specific feature
 */
export function getFeatureUsage(userId: string, featureId: string): number {
  const usageData = loadFeatureUsage(userId);
  return usageData[featureId] || 0;
}

/**
 * Update the usage count for a specific feature
 */
export function updateFeatureUsage(userId: string, featureId: string, newCount: number): void {
  const usageData = loadFeatureUsage(userId);
  usageData[featureId] = Math.max(0, newCount); // Ensure count doesn't go below 0
  saveFeatureUsage(userId, usageData);
}

/**
 * Increment usage count for a specific feature
 */
export function incrementFeatureUsage(userId: string, featureId: string): number {
  const currentCount = getFeatureUsage(userId, featureId);
  const newCount = currentCount + 1;
  updateFeatureUsage(userId, featureId, newCount);
  return newCount;
}

/**
 * Decrement usage count for a specific feature
 */
export function decrementFeatureUsage(userId: string, featureId: string): number {
  const currentCount = getFeatureUsage(userId, featureId);
  const newCount = Math.max(0, currentCount - 1);
  updateFeatureUsage(userId, featureId, newCount);
  return newCount;
}

/**
 * Reset usage count for a specific feature to 0
 */
export function resetFeatureUsage(userId: string, featureId: string): void {
  updateFeatureUsage(userId, featureId, 0);
}

/**
 * Clear all feature usage data for a specific user
 */
export function clearUserFeatureUsage(userId: string): void {
  if (typeof window === 'undefined') return;

  try {
    const key = getStorageKey(userId);
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error clearing feature usage from localStorage:', error);
  }
}
