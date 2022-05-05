export const sleep = async (n: number) => {
    await new Promise(r => setTimeout(r, n*1000));
};

export const rand = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
