<script src="http://192.168.0.21:8097"></script>

import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as savedSheetsData from "./utils/savedSheets.json"
import * as initialState from "./utils/initialState.json"
import LoadCharacters from './screens/LoadCharacters';

export default function App() {
  const [character, setCharacter] = useState(initialState.character)
  const [apprentice, setApprentice] = useState(initialState.apprentice)
  const [warband, setWarband] = useState(initialState.warband)
  const [unitCount, setUnitCount] = useState(initialState.warband.length)
  const [unitSpace, setUnitSpace] = useState(10 - initialState.warband.length)
  const [sheetView, setSheetView] = useState(false)

  function loadSheet(data) {
    console.log("fire")
    if (data !== "new") {
      setCharacter(data.character)
      setApprentice(data.apprentice)
      setWarband(data.warband)
      setSheetView(true)
    }
  }

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

  useEffect(() => {
    setUnitCount(warband.length)
    setUnitSpace(10 - warband.length)
  }, [warband])

  const renderScreen = () => {
    if (sheetView) {
      return (
        <>
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
            {renderWarband()}{renderEmptyWarband()}
          </View>
        </>
      );
    } else {
      return (
        <LoadCharacters data={savedSheetsData} initialState={initialState} loadSheet={loadSheet} />
        // <Text>hello</Text>
      )
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {renderScreen()}
    </View>
  )
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
