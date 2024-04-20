import {Tag} from "../api/machine";
import {Text, XStack} from "tamagui";
import {Dot} from "@tamagui/lucide-icons";
import {newShade} from "../api/utils";


export default function TagComponent({tag}: { tag: Tag }) {
    let color = "#" + tag.color.toString(16);


    return (
        <XStack backgroundColor={color} borderRadius={8} padding={"$1"} alignItems={"center"}>
            <Dot color={newShade(color, -40)} scale={2.5}>
            </Dot>
            <Text marginRight={"$2.5"}>
                {tag.name}
            </Text>
        </XStack>
    );
}