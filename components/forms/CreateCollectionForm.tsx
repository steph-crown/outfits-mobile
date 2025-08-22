import { FolderIcon } from "@/components/icons/TabIcons";
import { InputField, toast } from "@/components/ui";
import { Button } from "@/components/ui/Button";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

interface CreateCollectionFormProps {
  onSubmit: (name: string) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export const CreateCollectionForm: React.FC<CreateCollectionFormProps> = ({
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [collectionName, setCollectionName] = useState("");

  const handleSubmit = async () => {
    if (!collectionName.trim()) {
      toast.error("Collection name is required");
      return;
    }

    if (collectionName.trim().length > 255) {
      toast.error("Collection name cannot exceed 255 characters");
      return;
    }

    try {
      await onSubmit(collectionName.trim());
      setCollectionName(""); // Reset form
    } catch {
      // console.error("Error creating collection:", error);
      toast.error("Failed to create collection. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          label="Collection name"
          value={collectionName}
          onChangeText={setCollectionName}
          icon={<FolderIcon size={20} color="#A0AEC0" />}
          placeholder="Enter collection name"
          autoCapitalize="words"
          autoCorrect={false}
          maxLength={255}
          isBottomSheet={true}
        />
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button
            title="Cancel"
            onPress={onCancel}
            variant="secondary"
            disabled={isLoading}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            title="Create collection"
            onPress={handleSubmit}
            variant="primary"
            loading={isLoading}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 32,
  },
  inputContainer: {
    marginBottom: 32,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  buttonWrapper: {
    flex: 1,
  },
});
