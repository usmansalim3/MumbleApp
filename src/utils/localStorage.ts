import { createMMKV, MMKV } from "react-native-mmkv";
import { getOrCreateEncryptionKey } from "./keychain";


export let storage: MMKV | null = null

export const initialiseStorage = async () => {
    if (storage) {
        return storage;
    }
    const encryptionKey = await getOrCreateEncryptionKey();
    return storage = createMMKV({
        id: "mumble-app-storage",
        encryptionKey
    });
}
