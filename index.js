import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View
} from 'react-native';

export default function App() {
  const colorScheme = useColorScheme();
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState('');
  const [themeDark, setThemeDark] = useState(colorScheme === 'dark');

  useEffect(() => {
    loadNotes();
  }, []);

  useEffect(() => {
    saveNotes();
  }, [notes]);

  const saveNotes = async () => {
    try {
      await AsyncStorage.setItem('NOTES', JSON.stringify(notes));
    } catch (e) {
      console.error('Failed to save notes.', e);
    }
  };

  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem('NOTES');
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
      }
    } catch (e) {
      console.error('Failed to load notes.', e);
    }
  };

  const addNote = () => {
    if (text.trim()) {
      const newNote = {
        id: Date.now().toString(),
        text,
        done: false
      };
      setNotes([...notes, newNote]);
      setText('');
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const toggleDone = (id) => {
    const updated = notes.map(note =>
      note.id === id ? { ...note, done: !note.done } : note
    );
    // Move completed notes to bottom
    updated.sort((a, b) => a.done - b.done);
    setNotes(updated);
  };

  const toggleTheme = () => {
    setThemeDark(!themeDark);
  };

  const styles = createStyles(themeDark);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Note App</Text>
        <View style={styles.themeToggle}>
          <Ionicons name={themeDark ? 'moon' : 'sunny'} size={20} color={themeDark ? 'white' : 'black'} />
          <Switch value={themeDark} onValueChange={toggleTheme} />
        </View>
      </View>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Add a note"
          placeholderTextColor={themeDark ? '#aaa' : '#666'}
        />
        <TouchableOpacity style={styles.addButton} onPress={addNote}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={notes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.noteItem}>
            <TouchableOpacity onPress={() => toggleDone(item.id)}>
              <Ionicons
                name={item.done ? 'checkbox' : 'square-outline'}
                size={24}
                color={themeDark ? '#03DAC6' : '#6200EE'}
              />
            </TouchableOpacity>
            <Text style={[styles.noteText, item.done && styles.noteDone]}>
              {item.text}
            </Text>
            <TouchableOpacity onPress={() => deleteNote(item.id)}>
              <Ionicons name="trash" size={20} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const createStyles = (dark) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 60,
      paddingHorizontal: 20,
      backgroundColor: dark ? '#121212' : '#fff',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    title: {
      fontSize: 26,
      fontWeight: 'bold',
      color: dark ? '#fff' : '#000',
    },
    themeToggle: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    inputRow: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    input: {
      flex: 1,
      borderWidth: 1,
      borderColor: dark ? '#555' : '#ccc',
      color: dark ? '#fff' : '#000',
      padding: 10,
      borderRadius: 5,
      marginRight: 10,
    },
    addButton: {
      backgroundColor: dark ? '#03DAC6' : '#6200EE',
      padding: 12,
      borderRadius: 5,
    },
    noteItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: dark ? '#1f1f1f' : '#f9f9f9',
      padding: 12,
      marginBottom: 10,
      borderRadius: 5,
    },
    noteText: {
      flex: 1,
      marginHorizontal: 12,
      fontSize: 16,
      color: dark ? '#fff' : '#000',
    },
    noteDone: {
      textDecorationLine: 'line-through',
      color: '#888',
    },
  });
