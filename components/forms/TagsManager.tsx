import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BrandColors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { HashtagIcon } from "@/components/icons";
import { InputField } from "@/components/common/InputField";
import { Button } from "@/components/common/Button";

interface TagsManagerProps {
  tags: string[];
  onTagsChange: (newTags: string[]) => void;
}

export function TagsManager({
  tags: initialTags,
  onTagsChange,
}: TagsManagerProps) {
  const [newTag, setNewTag] = useState("");
  const [localTags, setLocalTags] = useState<string[]>(initialTags);

  const handleAddTag = () => {
    if (newTag.trim()) {
      const updatedTags = [...localTags, newTag.trim()];
      setLocalTags(updatedTags);
      onTagsChange(updatedTags);
      setNewTag("");
    }
  };

  const handleRemoveTag = (index: number) => {
    const updatedTags = localTags.filter((_, i) => i !== index);
    setLocalTags(updatedTags);
    onTagsChange(updatedTags);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tagInputContainer}>
        <InputField
          label="Tag"
          placeholder="Enter a tag..."
          value={newTag}
          onChangeText={setNewTag}
          onSubmitEditing={handleAddTag}
          returnKeyType="done"
          isBottomSheet={true}
          icon={<HashtagIcon width={20} height={20} fill="#A0AEC0" />}
        />
      </View>

      <View style={styles.tagButtonContainer}>
        <Button
          title="Add Tag"
          onPress={handleAddTag}
          variant="primary"
          disabled={!newTag.trim()}
          fullWidth
        />
      </View>

      {localTags.length > 0 && (
        <View style={styles.tagsContainer}>
          {localTags.map((tag, index) => (
            <TouchableOpacity
              key={`${tag}-${index}`}
              style={styles.tagChip}
              onPress={() => handleRemoveTag(index)}
            >
              <Text style={styles.tagChipText}>#{tag}</Text>
              <Text style={styles.tagRemoveText}>×</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 32,
  },
  tagInputContainer: {
    marginBottom: 16,
  },
  tagButtonContainer: {
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tagChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  tagChipText: {
    fontFamily: Fonts.MonaSans.Medium,
    fontSize: 14,
    color: BrandColors.primaryBlack,
  },
  tagRemoveText: {
    fontSize: 16,
    color: BrandColors.black3,
  },
});
