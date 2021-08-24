import { exec } from 'child_process';

export const setLocation = async (latitude, longitude, device) => {
    const { stdout, stderr } = await exec("idb list-targets | grep -n 'Booted'");
    exec(`idb set-location --udid ${device._deviceId} ${latitude} ${longitude}`);
};