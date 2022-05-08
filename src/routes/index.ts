const sleep = async (n: number) => {
    await new Promise(r => setTimeout(r, n*1000));
};

export const get = async () => {
    await sleep(2);
    return {
        body: {
            
        }
    }
};
