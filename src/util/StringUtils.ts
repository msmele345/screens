export const getImageName = (url: string): string => {
    console.log("ENTRY STRING: ", url);
    const part1 = url.toString().indexOf('sa1/');
    const part2 = url.toString().indexOf('?');

    const final = url.toString().substring(part1+4, part2);
    console.log("FINAL STRING: ", final);
    return final;
};