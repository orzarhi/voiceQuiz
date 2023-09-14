import fs from 'fs/promises';

export const getStoredEasyQuestions = async () => {
    const rawFileContent = await fs.readFile('easyQuestions.json', { encoding: 'utf-8' });
    const data = JSON.parse(rawFileContent);
    const storedQuestions = data.easyQuestions ?? [];

    return storedQuestions;
}

export const getStoredMediumQuestions = async () => {
    const rawFileContent = await fs.readFile('mediumQuestions.json', { encoding: 'utf-8' });
    const data = JSON.parse(rawFileContent);
    const storedQuestions = data.mediumQuestions ?? [];

    return storedQuestions;
}

export const getStoredHardQuestions = async () => {
    const rawFileContent = await fs.readFile('hardQuestions.json', { encoding: 'utf-8' });
    const data = JSON.parse(rawFileContent);
    const storedQuestions = data.hardQuestions ?? [];

    return storedQuestions;
}