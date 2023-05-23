import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as characterData from "./utils/characterData.json"

export default function App() {
  // const characterData = require('./utils/characterData.json')
  const character = characterData.character
  const apprentice = character.apprentice
  console.log(character)

  function determinePrefix(stat) {
    if (stat === "fight" || stat === "shoot" || stat === "will") {
      if (character.stats[stat] >= 0) {
        return "+"
      }
      return ""
    }
    return ""
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>
          Frostgrave Companion App
        </Text>
      </View>
      <View style={styles.content}>
        <Text>Wizard</Text>
        <Text style={styles.description}>Name: {character.name}</Text>
        <Text style={styles.description}>School: {character.school}</Text>
        <Text style={styles.description}>Gold: {character.gold}</Text>
        {Object.keys(character.stats).map((key, index) => {
          return (
            <Text key={index}>{key}: {determinePrefix(key)}{character.stats[key]}</Text>
          )
        })}
        {character.apprentice && (
          <>
            <Text>Apprentice</Text>
            <Text>Name: {apprentice.name}</Text>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'start',
    marginVertical: 64,
    marginHorizontal: 24,
    borderWidth: 2,
    borderColor: "black",
  },
  headingContainer: {
    height: 64,
    width: "100%",
    backgroundColor: "black",
    // flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  headingText: {
    color: "white",
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 600
  },
  content: {
    flex: 1,
    width: '100%',
    alignItems: 'start',
    justifyContent: 'start',
    padding: 16,
  },
  description: {
    textAlign: "left",
    alignItems: "start",
    justifyContent: "start",
    // borderWidth: 1
  }

});
