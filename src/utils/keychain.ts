import * as Keychain from 'react-native-keychain';


export let encryptionKey: string | null = null

export async function getOrCreateEncryptionKey(): Promise<string> {
    if (encryptionKey) {
        return encryptionKey;
    }
    // Read from Keychain
    try {
        const stored = await Keychain.getGenericPassword();
        if (stored && stored?.password) {
            return encryptionKey = stored.password;
        }
    } catch (err) {
        console.error('[MMKV] Failed to read from Keychain', err);
        throw new Error('Failed to access Keychain');
    }

    // Generate cryptographically secure key
    let key: string;
    try {
        const bytes = new Uint8Array(32);
        // @ts-ignore
        crypto.getRandomValues(bytes);

        key = Array.from(bytes)
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    } catch (err) {
        console.error('[MMKV] Failed to generate encryption key', err);
        throw new Error('Encryption key generation failed');
    }

    // Persist to Keychain
    try {
        await Keychain.setGenericPassword('mmkv', key, {
            accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
        });
    } catch (err) {
        console.error('[MMKV] Failed to store key in Keychain', err);
        throw new Error('Failed to persist encryption key');
    }

    return encryptionKey = key;
}