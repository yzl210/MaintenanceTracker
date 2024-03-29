import {supabase} from "./supabase";

export function getAllMachines() {
    return supabase
        .from('machines')
        .select<'*', Machine>('*')
}

export function getMachine(machine_id: string) {
    return getAllMachines()
        .eq('id', machine_id)
        .single();
}

export function getMachines(machine_ids: string[]) {
    return getAllMachines()
        .in('id', machine_ids);
}

export function getMachineTasks(machine_id: string) {
    return supabase
        .from('machine_tasks')
        .select<'*', MachineTask>('*')
        .eq('machine', machine_id);
}

export function getTasks(tasks: MachineTask[], done?: boolean) {
    return getTasksByIds(tasks.map(t => t.task), done);
}

export function getTasksByIds(task_ids: string[], done?: boolean) {
    let request = supabase
        .from('tasks')
        .select<'*', Task>('*')
        .in('id', task_ids);


    if (done !== undefined)
        request = request.eq('done', done);

    return request
}

export function getMaintenanceNeeded() {
    return getAllMachines();
}

export function getPins() {
    return getAllMachines();
}

export interface Machine {
    id: string;
    created_at: Date;
    updated_at: Date;
    name: string;
    description: string;
    image: string;
}


export interface Task {
    id: string;
    machine_id: string;
    created_at: Date;
    name: string;
    description?: string;
    done: boolean;
}


export interface MachineTask {
    machine: string;
    task: string;
}