import {FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View} from "react-native";

import React from "react";
import {ListRenderItemInfo} from "@react-native/virtualized-lists/Lists/VirtualizedList";
import {Octicons} from "@expo/vector-icons";
import Split from "../Split";
import {Machine, Task} from "../../api/machine";

export default function MachineTasks({machine}: { machine: Machine }) {

    let editTask = () => {
    }

    return (
        <Pressable onPress={editTask}>
            <View style={styles.container}>
                <Text style={styles.name}>Tasks</Text>
                <Split/>
                <Tasks done={false} machine={machine}/>
                <Split/>
                <Tasks done={true} machine={machine}/>
            </View>
        </Pressable>
    );
}

function Tasks({done, machine}: { done: boolean, machine: Machine }) {
    let tasks = machine.tasks.filter(task => task.done === done);

    let openTaskDetails = (task: Task) => {
        alert("Task Details Page of task " + task.name)
    }

    let taskRenderer = ({item}: ListRenderItemInfo<Task>) => (
        <TouchableOpacity onPress={() => openTaskDetails(item)}>
            <View style={styles.task}>
                <Octicons style={{paddingRight: 5, alignSelf: "center"}} name="dot-fill" size={16} color="#000"/>
                <Text style={{fontSize: 22}}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );

    let title = <Text style={styles.subtitle}>{done ? "Done" : "Todo"}</Text>

    if (tasks.length <= 0) {
        return <>{title}<Text style={styles.minor}>None</Text></>;
    }

    return (
        <View style={styles.tasks}>
            {title}
            <FlatList scrollEnabled={false} data={tasks} renderItem={taskRenderer}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        width: 380,
        elevation: 6,
        borderRadius: 10,
        backgroundColor: '#fff',
        margin: 10,
        alignSelf: 'center',
    },
    name: {
        fontSize: 32,
        textAlign: 'center',
        marginVertical: 10,
        marginHorizontal: 5,
    },
    subtitle: {
        fontSize: 24,
        marginVertical: 10,
        marginHorizontal: 5,
    },
    minor: {
        fontSize: 15,
        textAlign: 'center',
        color: 'gray',
    },
    task: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 5,
    },
    tasks: {
        marginHorizontal: 10,
        marginVertical: 5,
    }
});
