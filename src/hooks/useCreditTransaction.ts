import { useState, useCallback, useEffect } from 'react';
import { creditsApi } from '../services/api';
import { useCredits } from '../contexts/CreditContext';

interface ToolInfo {
  id: string;
  name: string;
  slug: string;
  creditCost: number;
  isActive: boolean;
}

interface TransactionResult {
  success: boolean;
  error?: string;
  remainingBalance?: number;
  data?: {
    required?: number;
    available?: number;
    shortfall?: number;
    toolName?: string;
  };
}

interface UseCreditTransactionReturn {
  toolInfo: ToolInfo | null;
  isLoading: boolean;
  isProcessing: boolean;
  canAfford: boolean;
  error: string | null;
  executeTransaction: () => Promise<TransactionResult>;
  resetError: () => void;
}

export function useCreditTransaction(toolSlug: string): UseCreditTransactionReturn {
  const { balance, refreshBalance, deductCredits } = useCredits();
  const [toolInfo, setToolInfo] = useState<ToolInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch tool info on mount
  useEffect(() => {
    const fetchToolInfo = async () => {
      try {
        setIsLoading(true);
        const response = await creditsApi.getTool(toolSlug);
        if (response.data?.data) {
          setToolInfo(response.data.data);
        } else if (response.error) {
          setError(response.error);
        }
      } catch (err) {
        console.error('Failed to fetch tool info:', err);
        setError('Failed to load tool information');
      } finally {
        setIsLoading(false);
      }
    };

    if (toolSlug) {
      fetchToolInfo();
    }
  }, [toolSlug]);

  // Check if user can afford the tool
  const canAfford = toolInfo ? balance >= toolInfo.creditCost : false;

  // Execute credit transaction
  const executeTransaction = useCallback(async (): Promise<TransactionResult> => {
    if (!toolInfo) {
      return { success: false, error: 'Tool information not loaded' };
    }

    // Free tools - no transaction needed
    if (toolInfo.creditCost === 0) {
      return { success: true, remainingBalance: balance };
    }

    // Check balance before making request
    if (!canAfford) {
      return {
        success: false,
        error: 'INSUFFICIENT_CREDITS',
        data: {
          required: toolInfo.creditCost,
          available: balance,
          shortfall: toolInfo.creditCost - balance,
          toolName: toolInfo.name,
        },
      };
    }

    setIsProcessing(true);
    setError(null);

    try {
      const response = await creditsApi.useCredits(toolSlug);

      if (response.error) {
        // Handle API-level error
        setError(response.error);
        return { success: false, error: response.error };
      }

      if (response.data?.success) {
        // Optimistically update balance
        deductCredits(toolInfo.creditCost);
        // Also refresh from server to ensure consistency
        refreshBalance();

        return {
          success: true,
          remainingBalance: response.data.data?.remainingBalance ?? balance - toolInfo.creditCost,
        };
      } else {
        // Handle insufficient credits error from server
        const errorData = response.data;
        if (errorData?.error === 'INSUFFICIENT_CREDITS') {
          return {
            success: false,
            error: 'INSUFFICIENT_CREDITS',
            data: errorData.data,
          };
        }
        return { success: false, error: errorData?.error || 'Transaction failed' };
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to process credit transaction';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsProcessing(false);
    }
  }, [toolSlug, toolInfo, balance, canAfford, deductCredits, refreshBalance]);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  return {
    toolInfo,
    isLoading,
    isProcessing,
    canAfford,
    error,
    executeTransaction,
    resetError,
  };
}
