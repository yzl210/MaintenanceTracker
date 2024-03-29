import {Log} from "../../api/API";
import {Card, H2, Separator, Text, XStack} from "tamagui";

export default function MaintenanceLog({log}: { log: Log }) {

    let time = new Date(log.time);
    let timeString = time.toLocaleDateString() + " " + time.toLocaleTimeString();

    return <Card elevate bordered margin={"$2"} maxWidth={500}>
        <Card.Header>
            <H2 numberOfLines={1} textAlign={"center"}>{log.title}</H2>
            <XStack justifyContent={"space-between"}>
                <Text numberOfLines={1} marginHorizontal={10}>{timeString}</Text>
                <Text numberOfLines={1} marginHorizontal={10}>{log.author}</Text>
            </XStack>
            <Separator/>
        </Card.Header>
        <Text numberOfLines={10} marginVertical={5} marginHorizontal={10} textAlign={"center"}
              fontSize={18}>{log.content}</Text>
        <Card.Background/>
    </Card>
}