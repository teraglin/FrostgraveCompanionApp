import { FlatList, Pressable, View, StyleSheet, Text } from "react-native"

function LoadCharacters({ data, initialState, loadSheet }) {
  function handlePress(initialState) {
    console.log("name", initialState)
    loadSheet(initialState)
  }

  const StandardButton = (props) => {
    return (
      <Pressable onPress={props.onPress} style={styles.standardButton}>
        <Text style={styles.standardButtonText}>{props.children}</Text>
      </Pressable>
    )
  }
  console.log("pew", initialState)

  return (
    <View style={styles.container}>
      <StandardButton onPress={handlePress.bind(this, initialState)}>
        New Sheet
      </StandardButton>
      <FlatList
        data={data}
        renderItem={(item) => {
          <StandardButton onPress={() => handlePress(item)}>
            {item.character.name}
          </StandardButton>
        }}
      />
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 64,
    marginHorizontal: 32,
    padding: 16
  },
  standardButton: {
    padding: 8,
    borderWidth: 2
  },
  standardButtonText: {
    // color: "cyan"
  }
})

export default LoadCharacters