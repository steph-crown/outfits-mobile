import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BrandColors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { FolderIcon } from "@/components/icons/TabIcons";

export interface Collection {
  id: string;
  name: string;
}

interface CollectionsSelectorProps {
  collections: Collection[];
  selectedCollection: Collection | null;
  onSelectCollection: (collection: Collection) => void;
}

export function CollectionsSelector({
  collections,
  selectedCollection,
  onSelectCollection,
}: CollectionsSelectorProps) {
  return (
    <View style={styles.container}>
      {collections.map((collection) => (
        <TouchableOpacity
          key={collection.id}
          style={[
            styles.collectionOption,
            selectedCollection?.id === collection.id &&
              styles.selectedCollectionOption,
          ]}
          onPress={() => onSelectCollection(collection)}
        >
          <FolderIcon
            color={
              selectedCollection?.id === collection.id
                ? BrandColors.white
                : "#050413"
            }
          />
          <Text
            style={[
              styles.collectionOptionText,
              selectedCollection?.id === collection.id &&
                styles.selectedCollectionOptionText,
            ]}
          >
            {collection.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 32,
  },
  collectionOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 100,
    marginBottom: 4,
  },
  selectedCollectionOption: {
    backgroundColor: BrandColors.primaryBlack,
  },
  collectionOptionText: {
    fontFamily: Fonts.MonaSans.SemiBold,
    fontSize: 14,
    color: BrandColors.primaryBlack,
    marginLeft: 12,
  },
  selectedCollectionOptionText: {
    color: BrandColors.white,
  },
});
