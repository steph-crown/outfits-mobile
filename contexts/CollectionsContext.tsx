import React, { createContext, useContext, ReactNode, useState } from "react";
import { useBottomSheet } from "./BottomSheetContext";
import { CreateCollectionForm } from "@/components/forms/CreateCollectionForm";
import { collectionsApi } from "@/services/collectionsApi";
import { toast } from "@/components/ui";

interface CollectionsContextType {
  openCreateCollection: () => void;
  isCreating: boolean;
}

const CollectionsContext = createContext<CollectionsContextType | null>(null);

interface CollectionsProviderProps {
  children: ReactNode;
}

export const CollectionsProvider: React.FC<CollectionsProviderProps> = ({
  children,
}) => {
  const { openBottomSheet, closeBottomSheet } = useBottomSheet();
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateCollection = async (name: string) => {
    try {
      setIsCreating(true);

      const response = await collectionsApi.create({ name });

      if (response.success) {
        toast.success("Collection created successfully!");
        closeBottomSheet();
        // TODO: Refresh collections list when we implement fetching
      } else {
        toast.error(response.message || "Failed to create collection");
      }
    } catch (error: any) {
      console.error("Error creating collection:", error);

      // Handle specific error cases
      if (error.response?.status === 409) {
        toast.error("You already have a collection with this name");
      } else if (error.response?.status === 401) {
        toast.error("Please log in to create collections");
      } else {
        toast.error("Failed to create collection. Please try again.");
      }
    } finally {
      setIsCreating(false);
    }
  };

  const openCreateCollection = () => {
    openBottomSheet({
      title: "Create collection",
      content: (
        <CreateCollectionForm
          onSubmit={handleCreateCollection}
          onCancel={closeBottomSheet}
          isLoading={isCreating}
        />
      ),
      onClose: () => {
        // Reset form state when bottom sheet closes
        setIsCreating(false);
      },
    });
  };

  const contextValue: CollectionsContextType = {
    openCreateCollection,
    isCreating,
  };

  return (
    <CollectionsContext.Provider value={contextValue}>
      {children}
    </CollectionsContext.Provider>
  );
};

export const useCollections = (): CollectionsContextType => {
  const context = useContext(CollectionsContext);
  if (!context) {
    throw new Error("useCollections must be used within a CollectionsProvider");
  }
  return context;
};
