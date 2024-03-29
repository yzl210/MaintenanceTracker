import {FlatList} from "react-native";
import React, {useState} from "react";
import {Image, Input, Separator, Text, View, XStack} from "tamagui";
import {router} from "expo-router";
import {getAllMachines, Machine} from "../../api/machine";
import {useQuery} from "@supabase-cache-helpers/postgrest-react-query";
import Loading from "../../components/Loading";

export default function Browse() {
    const [query, setQuery] = useState('');
    const {data: machines} = useQuery(getAllMachines());

    return (
        <View height={"100%"} backgroundColor={"white"}>
            <View>
                <Input
                    placeholder={"Search..."}
                    value={query}
                    onChangeText={setQuery}
                />
            </View>
            <Separator marginVertical={"$1"}/>
            <MachineList machines={machines ? query.length < 1 ? machines : machines.filter(m => search(m.name, query)) : undefined}/>
        </View>
    );
}

function search(string: string , query: string) {
    const mainLength: number = string.length;
    let searchIndex: number = 0;

    for (let i = 0; i < mainLength && searchIndex < query.length; i++) {
        if (query[searchIndex] === ' ' || query[searchIndex].toLowerCase() === string[i].toLowerCase()) {
            searchIndex++;
        }
    }
    return searchIndex === query.length;
}

function MachineList({machines}: {machines: Machine[] | null | undefined}) {
    if (!machines) {
        return <Loading/>;
    }

    if (machines.length < 1) {
        return <Text color={"gray"} alignSelf={"center"} marginVertical={"$2"}>No result</Text>;
    }

    let openMachine = (machine: Machine) => {
        router.navigate({pathname: '/machine', params: {id: machine.id}});
    }


    return <FlatList data={machines} renderItem={(item) => {
        return <View key={item.item.id} onPress={() => openMachine(item.item)}>
            <XStack alignItems={"center"}>
                <Image source={{uri: item.item.image, width: 50, height: 50}}/>
                <Separator backgroundColor={"darkgray"} marginHorizontal={"$2"} vertical/>
                <Text fontSize={20}>{item.item.name}</Text>
            </XStack>
            <Separator backgroundColor={"darkgray"} marginVertical={"$2"}/>
        </View>
    }}/>;
}