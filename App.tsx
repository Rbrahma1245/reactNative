import React, {useState} from 'react';
import {
  Button,
  Alert,
  Text,
  View,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

interface IToDo {
  id: any;
  name: string;
}
let edit_id: any;

function App(): JSX.Element {
  const [name, setName] = useState<string>('');
  const [todos, setTodos] = useState<IToDo[]>([]);

  function addbtn() {
    if (!name) {
      Alert.alert('please fill the field');
    } else {
      if (!edit_id) {
        const newTodo = {
          id: Date.now().toString(),
          name: name,
        };
        setTodos([...todos, newTodo]);
        setName('');
        console.log(todos);
      } else {
        todos.find((e, i) => {
          if (e.id === edit_id) {
            todos[i].name = name;
          }
        });
        edit_id = undefined;
      }
      setName('');
    }
  }
  console.log(edit_id);

  function handleDelete(id: any) {
    let todosList = todos.filter((elem: IToDo) => elem.id != id);
    setTodos(todosList);
  }

  function handleEdit(id: any) {
    edit_id = id;
    let updateValue = todos.find((elem: IToDo) => elem.id == id);
    setName(updateValue?.name!);
  }

  return (
    <View>
      <View style={styles.navbar}>
        <Image
          style={{width: 40, height: 40}}
          source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png',
          }}
        />
        <Text style={styles.headerText}>HOME</Text>
      </View>

      <Text style={{textAlign: 'center', marginTop: 20}}>TODO</Text>

      <TextInput
        style={styles.input}
        onChangeText={text => setName(text)}
        value={name}
      />
     {
      !edit_id ?  <Button title="ADD" onPress={addbtn} /> :
      <Button title="UPDATE" onPress={addbtn} />
     }

      {todos.map((todo: IToDo, index: number) => (
        <View style={styles.listItem} key={`${index}_${todo.name}`}>
          <Text style={styles.text}>{todo.name}</Text>

          <View style={{display: 'flex', flexDirection: 'row'}}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => handleEdit(todo.id)}>
              <Text style={{color: 'white'}}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleDelete(todo.id)}>
              <Text style={{color: 'white'}}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: '#8AAFF1',
    height: 40,
    flexDirection: 'row',
  },
  headerText: {
    marginLeft: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 4,
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,

    // marginBottom: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#F64343',
    height: 50,
    width: 80,
    borderRadius: 8,
    justifyContent: 'center',
  },
  editButton: {
    alignItems: 'center',
    backgroundColor: 'blue',

    borderRadius: 8,
    height: 50,
    width: 80,
    justifyContent: 'center',
  },

  text: {
    padding: 10,
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default App;
