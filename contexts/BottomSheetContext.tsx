import React, {
  createContext,
  useContext,
  useRef,
  ReactNode,
  useState,
  useEffect,
} from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { CustomBottomSheet } from "@/components/ui/BottomSheet";

interface BottomSheetConfig {
  title: string;
  content: ReactNode;
  onClose?: () => void;
}

interface BottomSheetContextType {
  openBottomSheet: (config: BottomSheetConfig) => void;
  closeBottomSheet: () => void;
  isOpen: boolean;
}

const BottomSheetContext = createContext<BottomSheetContextType | null>(null);

interface BottomSheetProviderProps {
  children: ReactNode;
}

export const BottomSheetProvider: React.FC<BottomSheetProviderProps> = ({
  children,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<BottomSheetConfig | null>(null);

  const openBottomSheet = (newConfig: BottomSheetConfig) => {
    setConfig(newConfig);
    setIsOpen(true);
  };

  // Use useEffect to expand after the component is rendered
  useEffect(() => {
    if (isOpen && config) {
      const timer = setTimeout(() => {
        bottomSheetRef.current?.expand();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen, config]);

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
    setIsOpen(false);
    if (config?.onClose) {
      config.onClose();
    }
    // Clear config after a delay to allow animation to complete
    setTimeout(() => setConfig(null), 300);
  };

  const contextValue: BottomSheetContextType = {
    openBottomSheet,
    closeBottomSheet,
    isOpen,
  };

  return (
    <BottomSheetContext.Provider value={contextValue}>
      {children}

      {/* Generic Bottom Sheet */}
      {config && (
        <CustomBottomSheet
          ref={bottomSheetRef}
          title={config.title}
          onClose={closeBottomSheet}
        >
          {config.content}
        </CustomBottomSheet>
      )}
    </BottomSheetContext.Provider>
  );
};

export const useBottomSheet = (): BottomSheetContextType => {
  const context = useContext(BottomSheetContext);
  if (!context) {
    throw new Error("useBottomSheet must be used within a BottomSheetProvider");
  }
  return context;
};
