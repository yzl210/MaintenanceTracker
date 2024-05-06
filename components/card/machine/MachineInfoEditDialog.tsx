import {Machine, useInsertMachine, useUpdateMachine} from "../../../api/machine";
import {Dialog, Text, XStack, YStack} from "tamagui";
import React, {useState} from "react";
import {CheckCircle, XCircle} from "@tamagui/lucide-icons";
import {LmButton} from "@tamagui-extras/core";
import {LmInput} from "@tamagui-extras/form";
import {useIsWeb} from "../../../api/utils";
import SimpleDialog from "../SimpleDialog";

type CreateMachineType = {
    machine?: undefined;
    create: true;
    children: React.ReactNode;
}

type EditMachineType = {
    machine: Machine;
    create?: false;
    children: React.ReactNode;
}

export default function MachineInfoEditDialog({machine, create, children}: CreateMachineType | EditMachineType) {
    const {mutateAsync: updateMachine} = useUpdateMachine();
    const {mutateAsync: insertMachine} = useInsertMachine();


    const [status, setStatus] = useState<'editing' | 'loading' | 'closed'>('closed')
    const [name, setName] = useState(create ? "New Machine" : machine.name)
    const [brand, setBrand] = useState(create ? "" : machine.brand ?? "")
    const [model, setModel] = useState(create ? "" : machine.model ?? "")
    const [serial, setSerial] = useState(create ? "" : machine.serial ?? "")
    const [location, setLocation] = useState(create ? "" : machine.location ?? "")
    const [image, setImage] = useState(create ? "" : machine.image ?? "")
    const isWeb = useIsWeb();

    let openChange = (open: boolean) => {
        if (open)
            setStatus('editing')
        else if (!isWeb) {
            cancel();
            setStatus('closed')
        }
    }

    let cancel = () => {
        setStatus('closed')
        if (create) {
            setBrand("")
            setModel("")
            setSerial("")
            setLocation("")
            setImage("")
        } else {
            setName(machine.name)
            setBrand(machine.brand ?? "")
            setModel(machine.model ?? "")
            setSerial(machine.serial ?? "")
            setLocation(machine.location ?? "")
            setImage(machine.image ?? "")
        }
    }

    let confirm = () => {
        if (name.length < 1)
            return;
        setStatus('loading')
        let emptyToNull = (value: string) => value.length > 0 ? value : null

        if (create) {
            insertMachine({
                name: name,
                brand: emptyToNull(brand),
                model: emptyToNull(model),
                serial: emptyToNull(serial),
                location: emptyToNull(location),
                image: emptyToNull(image)
            }).then(() => {
                setStatus('closed')
            }).catch(e => {
                alert(e)
                setStatus('editing')
            })
        } else {
            updateMachine({
                name,
                id: machine.id,
                brand: emptyToNull(brand),
                model: emptyToNull(model),
                serial: emptyToNull(serial),
                location: emptyToNull(location),
                image: emptyToNull(image)
            }).then(() => {
                setStatus('closed')
            }).catch(e => {
                alert(e)
                setStatus('editing')
            })
        }
    }

    return <SimpleDialog open={status !== 'closed'} onOpenChange={openChange} trigger={children}>
        <Dialog.Title>
            {create ? "Create New Machine" : "Edit Machine Info"}
        </Dialog.Title>
        {!create ? <Dialog.Description alignItems={"center"}>
            Editing {machine.name}
            <Text color={"gray"}>{"\n("}{machine.id + ")"}</Text>
        </Dialog.Description> : null}
        <YStack gap={"$2"} width={"auto"}>
            <LmInput label={"Name"} value={name} onChangeText={setName} error={name.length < 1} labelInline/>
            <LmInput label={"Brand"} value={brand} onChangeText={setBrand} labelInline/>
            <LmInput label={"Model"} value={model} onChangeText={setModel} labelInline/>
            <LmInput label={"Serial No."} value={serial} onChangeText={setSerial} labelInline/>
            <LmInput label={"Location"} value={location} onChangeText={setLocation} labelInline/>
            <LmInput label={"Image"} value={image} onChangeText={setImage} labelInline/>
        </YStack>
        <XStack alignSelf={"center"} gap={"$3"} marginTop={"$3"}>
            <LmButton theme={"red"} onPress={cancel} disabled={status !== 'editing'} icon={<XCircle/>}>
                Cancel
            </LmButton>
            <LmButton theme={"green"} onPress={confirm} loading={status === 'loading'} icon={<CheckCircle/>}>
                Confirm
            </LmButton>
        </XStack>
    </SimpleDialog>
}
