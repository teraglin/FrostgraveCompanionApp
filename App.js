import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as characterData from "./utils/characterData.json"

export default function App() {
  // const characterData = require('./utils/characterData.json')
  const character = characterData.character
  const apprentice = characterData.apprentice
  const warband = characterData.warband
  const unitCount = warband.length
  const unitSpace = 10 - warband.length

  console.log(unitCount)

  function determinePrefix(object, stat) {
    if (stat === "fight" || stat === "shoot" || stat === "will") {
      if (object.stats[stat] >= 0) {
        return "+"
      }
      return ""
    }
    return ""
  }

  function renderStats(object) {
    return Object.keys(object.stats).map((key, index) => {
      return (
        <Text key={index}>{key}: {determinePrefix(object, key)}{object.stats[key]}</Text>
      )
    })
  }

  const renderWarband = () => {
    for (i = unitCount; i < unitCount; i++) {
      console.log(warband[i])
      return (
        <>
          <Text>Name: {warband[i].name}</Text>
          <Text>Class: {warband[i].class}</Text>
          {renderStats(warband[i])}
        </>
      )
    }
  }
  const renderEmptyWarband = () => {
    for (i = unitCount; i < unitSpace; i++) {
      return <Text>...</Text>
    }
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
        <Text style={styles.sectionHeading}>Wizard</Text>
        <Text style={styles.description}>Name: {character.name}</Text>
        <Text style={styles.description}>School: {character.school}</Text>
        <Text style={styles.description}>Gold: {character.gold}</Text>
        {renderStats(character)}
        {character.apprentice && (
          <>
            <Text style={styles.sectionHeading}>Apprentice</Text>
            <Text>Name: {apprentice.name}</Text>
            {renderStats(apprentice)}
          </>
        )}
        <Text style={styles.sectionHeading}>Warband</Text>
        {renderWarband()}
        {renderEmptyWarband()}
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
    // alignItems: "start",
    // justifyContent: "start",
    // borderWidth: 1
  },
  sectionHeading: {
    width: "100%",
    textAlign: "center"
  }

});
